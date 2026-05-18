"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function DashboardHome() {
  const supabase = createClient();
  const [fullName, setFullName] = useState('Student');
  const [stats, setStats] = useState({
    questions_answered: 0,
    average_score: 0,
    study_time_minutes: 0,
    xp_points: 0,
    streak_days: 0
  });
  const [tutors, setTutors] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [unitProgress, setUnitProgress] = useState<any[]>([]);

  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFullName(user.user_metadata?.full_name || 'Student');
        
        // Fetch profile stats
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (profile) {
          setStats({
            questions_answered: profile.questions_answered || 0,
            average_score: profile.average_score || 0,
            study_time_minutes: profile.study_time_minutes || 0,
            xp_points: profile.xp_points || 0,
            streak_days: profile.streak_days || 0
          });
        }

        // Fetch activities
        const { data: activitiesData } = await supabase.from('activities').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5);
        if (activitiesData && activitiesData.length > 0) {
          setActivities(activitiesData);
        }

        // Fetch unit progress
        const { data: progressData } = await supabase.from('unit_progress').select('*').eq('user_id', user.id).order('score_percentage', { ascending: true });
        if (progressData && progressData.length > 0) {
          setUnitProgress(progressData);
        }
      }

      // Fetch tutors
      const { data: tutorsData } = await supabase.from('tutors').select('*').eq('is_active', true).limit(3);
      if (tutorsData && tutorsData.length > 0) {
        setTutors(tutorsData);
      } else {
        // Fallback dummy tutors
        setTutors([
          { id: 1, title: 'Sr. Sarah Akinyi', specialty: 'Critical Care & Med-Surg', avatar_initials: 'SA' },
          { id: 2, title: 'Dr. David Kiprop', specialty: 'Community Health & Research', avatar_initials: 'DK' },
          { id: 3, title: 'RN Rose Mutisya', specialty: 'Maternal & Child Health', avatar_initials: 'RM' }
        ]);
      }
    };
    fetchData();
  }, [supabase]);

  // Real-time countdown to exam
  useEffect(() => {
    const target = new Date('2026-08-15T08:00:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setCountdown({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setCountdown({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="view active">
      {/* Welcome banner */}
      <div className="welcome-banner">
        <div className="wb-left">
          <h2>{getGreeting()}, {fullName.split(' ')[0]} 👋</h2>
          <p>You&apos;re on a {stats.streak_days}-day streak! Your exam is in <strong style={{ color: 'var(--amber)' }}>{countdown.d} days</strong>. Stay consistent.</p>
          <div className="wb-actions">
            <Link href="/dashboard/practice" className="btn btn-primary btn-sm" style={{ padding: '8px 16px', fontSize: '13px' }}>📚 Continue Practice</Link>
            <Link href="/dashboard/mockexam" className="btn btn-outline btn-sm" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)', padding: '8px 16px', fontSize: '13px' }}>🎯 Take Mock Exam</Link>
          </div>
        </div>
        <div className="wb-right">
          <div className="wb-exam-label">⏳ Time to Exam</div>
          <div className="wb-countdown">
            <div className="wb-cd-unit"><span className="wb-cd-num">{String(countdown.d).padStart(2, '0')}</span><span className="wb-cd-sub">Days</span></div>
            <div className="wb-cd-unit"><span className="wb-cd-num">{String(countdown.h).padStart(2, '0')}</span><span className="wb-cd-sub">Hrs</span></div>
            <div className="wb-cd-unit"><span className="wb-cd-num">{String(countdown.m).padStart(2, '0')}</span><span className="wb-cd-sub">Min</span></div>
            <div className="wb-cd-unit"><span className="wb-cd-num">{String(countdown.s).padStart(2, '0')}</span><span className="wb-cd-sub">Sec</span></div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid-4" style={{ marginBottom: '20px' }}>
        <div className="stat-card">
          <div className="stat-icon si-teal">
            <svg viewBox="0 0 24 24" stroke="var(--teal)"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4z"/></svg>
          </div>
          <div className="stat-label">Questions Answered</div>
          <div className="stat-value">{stats.questions_answered.toLocaleString()}</div>
          <div className="stat-delta delta-up">↑ keep going</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon si-amber">
            <svg viewBox="0 0 24 24" stroke="var(--amber-dark)"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div className="stat-label">Average Score</div>
          <div className="stat-value">{stats.average_score}%</div>
          <div className="stat-delta delta-up">↑ solid accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon si-green">
            <svg viewBox="0 0 24 24" stroke="var(--green)"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="stat-label">Study Time</div>
          <div className="stat-value">{Math.floor(stats.study_time_minutes / 60)}h {stats.study_time_minutes % 60}m</div>
          <div className="stat-delta delta-up">↑ dedicated learner</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon si-red">
            <svg viewBox="0 0 24 24" stroke="var(--red)"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
          </div>
          <div className="stat-label">XP Points</div>
          <div className="stat-value">{stats.xp_points.toLocaleString()}</div>
          <div className="stat-delta delta-up">↑ Level 12</div>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid-2" style={{ marginBottom: '20px' }}>
        {/* Daily challenge + AI rec */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="daily-challenge-card">
            <div className="dc-header">
              <div>
                <div className="dc-label">⚡ Daily Challenge</div>
                <div className="dc-title">
                  {stats.questions_answered === 0 
                    ? "Start your first Practice MCQ session!" 
                    : "Complete 30 Pharmacology MCQs"}
                </div>
              </div>
              <span className="dc-xp">{stats.questions_answered === 0 ? "+50 XP" : "+120 XP"}</span>
            </div>
            <div className="dc-progress-row">
              <div className="prog-track" style={{ flex: 1 }}>
                <div className="prog-fill prog-amber" style={{ width: stats.questions_answered === 0 ? '0%' : `${Math.min((stats.questions_answered / 30) * 100, 100)}%` }}></div>
              </div>
              <span className="dc-pct">
                {stats.questions_answered === 0 
                  ? "0/10" 
                  : `${Math.min(stats.questions_answered, 30)}/30`}
              </span>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Link href="/dashboard/practice" className="btn btn-primary btn-sm" style={{ padding: '8px 16px', fontSize: '13px' }}>
                {stats.questions_answered === 0 ? "Start Practice →" : "Continue Challenge →"}
              </Link>
            </div>
          </div>

          <div className="ai-rec-card">
            <div className="ai-rec-header">
              <div className="ai-icon">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              </div>
              <div>
                <div className="ai-rec-title">AI Study Recommendation</div>
                <div className="ai-rec-sub">Based on your session history</div>
              </div>
            </div>

            {unitProgress.length === 0 ? (
              <div style={{ padding: '8px 4px', fontSize: '13px', color: 'var(--mid)', lineHeight: 1.6 }}>
                Welcome to NurseFiti! 🚀 Complete a practice test or take a mock exam so our AI can analyze your performance and recommend which medical units to focus on first.
              </div>
            ) : (
              <>
                <div style={{ background: 'var(--amber-light)', border: '1px solid rgba(245,166,35,.3)', borderRadius: 'var(--r-sm)', padding: '12px 14px', marginBottom: '14px', fontSize: '13px', color: 'var(--dark)' }}>
                  <strong style={{ color: 'var(--amber-dark)' }}>⚡ Priority Focus:</strong> {unitProgress[0].unit_name} is your weakest unit at {unitProgress[0].score_percentage}%. Spend some time practicing this topic today.
                </div>
                <ul className="ai-unit-list">
                  {unitProgress.map((unit) => {
                    let progClass = 'prog-teal';
                    let pctClass = 'ai-good';
                    if (unit.score_percentage < 60) {
                      progClass = 'prog-red';
                      pctClass = 'ai-crit';
                    } else if (unit.score_percentage < 75) {
                      progClass = 'prog-amber';
                      pctClass = 'ai-warn';
                    }
                    return (
                      <li key={unit.id} className="ai-unit-row">
                        <div className="ai-unit-name">{unit.unit_name}</div>
                        <div className="prog-track" style={{ width: '100px' }}>
                          <div className={`prog-fill ${progClass}`} style={{ width: `${unit.score_percentage}%` }}></div>
                        </div>
                        <div className={`ai-unit-pct ${pctClass}`}>{unit.score_percentage}%</div>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div className="card-title">Recent Activity</div>
            <span className="tag tag-teal" style={{ background: 'var(--teal-light)', color: 'var(--teal)', padding: '4px 8px', borderRadius: 'var(--r-full)', fontSize: '11px', fontWeight: 700 }}>Last 7 days</span>
          </div>
          
          {activities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--mid)' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
              <p style={{ fontSize: '13px', lineHeight: 1.5 }}>No activity recorded yet. Start practicing or take a mock exam to see your history!</p>
            </div>
          ) : (
            <ul className="recent-activity">
              {activities.map((act) => {
                let icon = (
                  <div className="act-icon si-teal">
                    <svg viewBox="0 0 24 24" stroke="var(--teal)" fill="none" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
                  </div>
                );
                if (act.activity_type === 'practice') {
                  icon = (
                    <div className="act-icon si-amber">
                      <svg viewBox="0 0 24 24" stroke="var(--amber-dark)" fill="none" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4z"/></svg>
                    </div>
                  );
                } else if (act.activity_type === 'flashcards') {
                  icon = (
                    <div className="act-icon si-green">
                      <svg viewBox="0 0 24 24" stroke="var(--green)" fill="none" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                    </div>
                  );
                }
                return (
                  <li key={act.id} className="activity-row">
                    {icon}
                    <div>
                      <div className="act-text">{act.topic}</div>
                      <div className="act-sub">{act.detail_text}</div>
                    </div>
                    <div className="act-score" style={{ color: act.score_text?.includes('%') && parseInt(act.score_text) >= 75 ? 'var(--green)' : 'var(--amber-dark)' }}>
                      {act.score_text}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Expert Tutors Section */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="card-title">Expert Tutors — Book a Session</div>
          <span className="tag tag-amber" style={{ background: 'var(--amber-light)', color: 'var(--amber-dark)', padding: '4px 8px', borderRadius: 'var(--r-full)', fontSize: '11px', fontWeight: 700 }}>1-on-1 Help</span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--mid)', marginBottom: '16px' }}>Stuck on a challenging topic? Schedule a direct session with our vetted registered nurse educators.</p>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {tutors.map((tutor, idx) => {
            const bgColors = ['var(--teal-light)', '#DFFBF1', 'var(--amber-light)'];
            const textColors = ['var(--teal)', '#0F6E56', 'var(--amber-dark)'];
            return (
              <div key={tutor.id} className="testi-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '16px' }}>
                <div className="testi-avatar" style={{ width: '60px', height: '60px', fontSize: '20px', background: bgColors[idx % 3], color: textColors[idx % 3], marginBottom: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{tutor.avatar_initials}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--dark)', marginBottom: '4px' }}>{tutor.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--mid)', marginBottom: '12px', lineHeight: 1.4 }}>{tutor.specialty}</p>
                <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center', border: `1.5px solid ${textColors[idx % 3]}`, color: textColors[idx % 3] }}>Schedule Session</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
