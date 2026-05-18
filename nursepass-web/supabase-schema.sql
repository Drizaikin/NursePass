-- NurseFiti Supabase Schema

-- 1. Create Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('student', 'tutor')),
  cadre TEXT CHECK (cadre IN ('KRCHN', 'BScN') OR cadre IS NULL),
  questions_answered INTEGER DEFAULT 0,
  average_score NUMERIC DEFAULT 0.0,
  study_time_minutes INTEGER DEFAULT 0,
  xp_points INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, cadre)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'role',
    new.raw_user_meta_data->>'cadre'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Create Activities Table (for Recent Activity feed)
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity_type TEXT CHECK (activity_type IN ('mock_exam', 'practice', 'flashcards', 'group_challenge')),
  topic TEXT NOT NULL,
  score_text TEXT,
  detail_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own activities" ON public.activities FOR SELECT USING (auth.uid() = user_id);

-- 3. Create Unit Progress Table (for AI Study Recommendations)
CREATE TABLE public.unit_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  unit_name TEXT NOT NULL,
  score_percentage INTEGER DEFAULT 0,
  last_practiced TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, unit_name)
);

ALTER TABLE public.unit_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own unit progress" ON public.unit_progress FOR SELECT USING (auth.uid() = user_id);

-- 4. Create Tutors Profile Table (for Expert Tutors section)
CREATE TABLE public.tutors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  specialty TEXT NOT NULL,
  avatar_initials TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

ALTER TABLE public.tutors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active tutors" ON public.tutors FOR SELECT USING (is_active = TRUE);

-- ==========================================
-- SEED DATA (For immediate testing)
-- ==========================================
INSERT INTO public.tutors (title, specialty, avatar_initials) VALUES 
  ('Sr. Sarah Akinyi', 'Critical Care & Med-Surg', 'SA'),
  ('Dr. David Kiprop', 'Community Health & Research', 'DK'),
  ('RN Rose Mutisya', 'Maternal & Child Health', 'RM');
