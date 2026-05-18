"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface UnitProgress {
  unit_name: string;
  score_percentage: number;
  last_practiced: string;
}

export default function AnalyticsPage() {
  const supabase = createClient();
  const [stats, setStats] = useState({
    questions_answered: 0,
    average_score: 0,
    study_time_minutes: 0,
    xp_points: 0
  });
  const [unitProgress, setUnitProgress] = useState<UnitProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch profile stats
          const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          if (profile) {
            setStats({
              questions_answered: profile.questions_answered || 0,
              average_score: profile.average_score || 0,
              study_time_minutes: profile.study_time_minutes || 0,
              xp_points: profile.xp_points || 0
            });
          }

          // Fetch unit progress
          const { data: progress } = await supabase.from('unit_progress').select('*').eq('user_id', user.id);
          if (progress && progress.length > 0) {
            setUnitProgress(progress);
          } else {
            // Fallback sample data
            setUnitProgress([
              { unit_name: 'Medical-Surgical Nursing', score_percentage: 82, last_practiced: new Date().toISOString() },
              { unit_name: 'Community Health', score_percentage: 77, last_practiced: new Date().toISOString() },
              { unit_name: 'Maternal & Child Health', score_percentage: 71, last_practiced: new Date().toISOString() },
              { unit_name: 'Pharmacology', score_percentage: 58, last_practiced: new Date().toISOString() },
              { unit_name: 'Psychiatric Nursing', score_percentage: 68, last_practiced: new Date().toISOString() }
            ]);
          }
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [supabase]);

  const getUnitColor = (score: number) => {
    if (score >= 75) return { bg: '#DFFBF1', color: 'var(--green)', label: 'Strong' };
    if (score >= 60) return { bg: 'var(--amber-light)', color: 'var(--amber-dark)', label: 'Good' };
    return { bg: '#FFE8E8', color: 'var(--red)', label: 'Needs Work' };
  };

  const overallScore = unitProgress.length > 0
    ? Math.round(unitProgress.reduce((sum, unit) => sum + unit.score_percentage, 0) / unitProgress.length)
    : stats.average_score;

  const examReady = overallScore >= 70;

  if (loading) {
    return (
      <div className="view active">
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
          <p style={{ color: 'var(--mid)' }}>Loading your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view active">
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h2 className="card-title" style={{ marginBottom: '8px' }}>📈 Performance Analytics</h2>
        <p style={{ color: 'var(--mid)', fontSize: '14px' }}>Track your progress and identify areas for improvement</p>
      </div>

      {/* Overall Performance Card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          {/* Score Ring */}
          <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
            <svg viewBox="0 0 120 120" style={{ width: '120px', height: '120px', transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="10"/>
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={examReady ? 'var(--green)' : 'var(--amber)'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(overallScore / 100) * 314} 314`}
                style={{ transition: 'stroke-dasharray 1s ease' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--dark)' }}>{overallScore}%</div>
              <div style={{ fontSize: '11px', color: 'var(--mid)' }}>Overall</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--mid)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Questions Answered</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--dark)' }}>{stats.questions_answered}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--mid)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Study Time</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--dark)' }}>{Math.floor(stats.study_time_minutes / 60)}h {stats.study_time_minutes % 60}m</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--mid)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.05em' }}>XP Points</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--dark)' }}>{stats.xp_points}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--mid)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Exam Status</div>
              <div style={{
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: 'var(--r-full)',
                fontSize: '13px',
                fontWeight: 700,
                background: examReady ? '#DFFBF1' : 'var(--amber-light)',
                color: examReady ? 'var(--green)' : 'var(--amber-dark)'
              }}>
                {examReady ? '✓ Ready' : '⚡ Keep Going'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unit Breakdown */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 className="card-title" style={{ marginBottom: '16px' }}>Unit Performance Breakdown</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {unitProgress.sort((a, b) => a.score_percentage - b.score_percentage).map((unit, index) => {
            const colorScheme = getUnitColor(unit.score_percentage);
            return (
              <div key={index} style={{
                padding: '16px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r)',
                background: 'var(--white)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--dark)', marginBottom: '4px' }}>
                      {unit.unit_name}
                    </h4>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--r-full)',
                      background: colorScheme.bg,
                      color: colorScheme.color
                    }}>
                      {colorScheme.label}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: colorScheme.color }}>
                      {unit.score_percentage}%
                    </div>
                  </div>
                </div>
                
                <div style={{ height: '8px', background: 'var(--border)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${unit.score_percentage}%`,
                    background: colorScheme.color,
                    borderRadius: 'var(--r-full)',
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="card" style={{
        background: 'var(--amber-light)',
        border: '1px solid var(--amber)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ fontSize: '32px' }}>🎯</div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--dark)', marginBottom: '6px' }}>
              AI Study Recommendation
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--dark)', lineHeight: 1.6 }}>
              {unitProgress.length > 0 && unitProgress[0].score_percentage < 70
                ? `Focus on ${unitProgress[0].unit_name} - it's your weakest area at ${unitProgress[0].score_percentage}%. Spend 30-40 minutes practicing this unit today.`
                : 'Great work! Keep practicing all units to maintain your strong performance. Consider taking a mock exam to test your readiness.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
