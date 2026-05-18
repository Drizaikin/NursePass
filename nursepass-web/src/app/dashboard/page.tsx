"use client";

import Link from 'next/link';

export default function DashboardHome() {
  return (
    <div className="view active">
      {/* Welcome banner */}
      <div className="welcome-banner">
        <div className="wb-left">
          <h2>Good morning, Mercy 👋</h2>
          <p>You&apos;re on a 14-day streak! Your exam is in <strong style={{ color: 'var(--amber)' }}>47 days</strong>. Stay consistent.</p>
          <div className="wb-actions">
            <Link href="/dashboard/practice" className="btn btn-primary btn-sm" style={{ padding: '8px 16px', fontSize: '13px' }}>📚 Continue Practice</Link>
            <Link href="/dashboard/mockexam" className="btn btn-outline btn-sm" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)', padding: '8px 16px', fontSize: '13px' }}>🎯 Take Mock Exam</Link>
          </div>
        </div>
        <div className="wb-right">
          <div className="wb-exam-label">⏳ Time to Exam</div>
          <div className="wb-countdown">
            <div className="wb-cd-unit"><span className="wb-cd-num">47</span><span className="wb-cd-sub">Days</span></div>
            <div className="wb-cd-unit"><span className="wb-cd-num">08</span><span className="wb-cd-sub">Hrs</span></div>
            <div className="wb-cd-unit"><span className="wb-cd-num">33</span><span className="wb-cd-sub">Min</span></div>
            <div className="wb-cd-unit"><span className="wb-cd-num">21</span><span className="wb-cd-sub">Sec</span></div>
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
          <div className="stat-value">1,284</div>
          <div className="stat-delta delta-up">↑ 52 today</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon si-amber">
            <svg viewBox="0 0 24 24" stroke="var(--amber-dark)"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div className="stat-label">Average Score</div>
          <div className="stat-value">74%</div>
          <div className="stat-delta delta-up">↑ 3% this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon si-green">
            <svg viewBox="0 0 24 24" stroke="var(--green)"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="stat-label">Study Time</div>
          <div className="stat-value">38h</div>
          <div className="stat-delta delta-up">↑ 2.5h today</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon si-red">
            <svg viewBox="0 0 24 24" stroke="var(--red)"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
          </div>
          <div className="stat-label">XP Points</div>
          <div className="stat-value">2,840</div>
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
                <div className="dc-title">Complete 30 Pharmacology MCQs</div>
              </div>
              <span className="dc-xp">+120 XP</span>
            </div>
            <div className="dc-progress-row">
              <div className="prog-track" style={{ flex: 1 }}>
                <div className="prog-fill prog-amber" style={{ width: '60%' }}></div>
              </div>
              <span className="dc-pct">18/30</span>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Link href="/dashboard/practice" className="btn btn-primary btn-sm" style={{ padding: '8px 16px', fontSize: '13px' }}>Continue Challenge →</Link>
            </div>
          </div>

          <div className="ai-rec-card">
            <div className="ai-rec-header">
              <div className="ai-icon">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              </div>
              <div>
                <div className="ai-rec-title">AI Study Recommendation</div>
                <div className="ai-rec-sub">Based on your last 7 sessions</div>
              </div>
            </div>
            <div style={{ background: 'var(--amber-light)', border: '1px solid rgba(245,166,35,.3)', borderRadius: 'var(--r-sm)', padding: '12px 14px', marginBottom: '14px', fontSize: '13px', color: 'var(--dark)' }}>
              <strong style={{ color: 'var(--amber-dark)' }}>⚡ Priority Focus:</strong> Pharmacology is your weakest unit at 54%. Spend 40 min on it today before your mock exam tomorrow.
            </div>
            <ul className="ai-unit-list">
              <li className="ai-unit-row">
                <div className="ai-unit-name">Pharmacology</div>
                <div className="prog-track" style={{ width: '100px' }}><div className="prog-fill prog-red" style={{ width: '54%' }}></div></div>
                <div className="ai-unit-pct ai-crit">54%</div>
              </li>
              <li className="ai-unit-row">
                <div className="ai-unit-name">Psychiatric Nursing</div>
                <div className="prog-track" style={{ width: '100px' }}><div className="prog-fill prog-amber" style={{ width: '62%' }}></div></div>
                <div className="ai-unit-pct ai-warn">62%</div>
              </li>
              <li className="ai-unit-row">
                <div className="ai-unit-name">Med-Surgical Nursing</div>
                <div className="prog-track" style={{ width: '100px' }}><div className="prog-fill prog-green" style={{ width: '82%' }}></div></div>
                <div className="ai-unit-pct ai-good">82%</div>
              </li>
              <li className="ai-unit-row">
                <div className="ai-unit-name">Community Health</div>
                <div className="prog-track" style={{ width: '100px' }}><div className="prog-fill prog-teal" style={{ width: '78%' }}></div></div>
                <div className="ai-unit-pct ai-good">78%</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div className="card-title">Recent Activity</div>
            <span className="tag tag-teal" style={{ background: 'var(--teal-light)', color: 'var(--teal)', padding: '4px 8px', borderRadius: 'var(--r-full)', fontSize: '11px', fontWeight: 700 }}>Last 7 days</span>
          </div>
          <ul className="recent-activity">
            <li className="activity-row">
              <div className="act-icon si-teal"><svg viewBox="0 0 24 24" stroke="var(--teal)" fill="none" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/></svg></div>
              <div><div className="act-text">Mock Exam — KRCHN Paper 1</div><div className="act-sub">2 hours ago · 100 questions</div></div>
              <div className="act-score" style={{ color: 'var(--green)' }}>78%</div>
            </li>
            <li className="activity-row">
              <div className="act-icon si-amber"><svg viewBox="0 0 24 24" stroke="var(--amber-dark)" fill="none" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4z"/></svg></div>
              <div><div className="act-text">Practice — Pharmacology</div><div className="act-sub">Yesterday · 45 questions</div></div>
              <div className="act-score" style={{ color: 'var(--amber-dark)' }}>61%</div>
            </li>
            <li className="activity-row">
              <div className="act-icon si-green"><svg viewBox="0 0 24 24" stroke="var(--green)" fill="none" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/></svg></div>
              <div><div className="act-text">Flashcards — Midwifery Terms</div><div className="act-sub">2 days ago · 40 cards reviewed</div></div>
              <div className="act-score" style={{ color: 'var(--teal)' }}>SRS</div>
            </li>
            <li className="activity-row">
              <div className="act-icon si-teal"><svg viewBox="0 0 24 24" stroke="var(--teal)" fill="none" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
              <div><div className="act-text">Group Challenge — KRCHN Cohort A</div><div className="act-sub">3 days ago · Ranked 2nd</div></div>
              <div className="act-score" style={{ color: 'var(--amber)' }}>🏆 #2</div>
            </li>
            <li className="activity-row">
              <div className="act-icon si-amber"><svg viewBox="0 0 24 24" stroke="var(--amber-dark)" fill="none" strokeWidth="2"><path d="M12 20h9"/></svg></div>
              <div><div className="act-text">Practice — Community Health</div><div className="act-sub">4 days ago · 60 questions</div></div>
              <div className="act-score" style={{ color: 'var(--green)' }}>80%</div>
            </li>
          </ul>
        </div>
      </div>

      {/* Expert Tutors Section */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="card-title">Expert Tutors — Book a Session</div>
          <span className="tag tag-amber" style={{ background: 'var(--amber-light)', color: 'var(--amber-dark)', padding: '4px 8px', borderRadius: 'var(--r-full)', fontSize: '11px', fontWeight: 700 }}>1-on-1 Help</span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--mid)', marginBottom: '16px' }}>Stuck on a challenging topic? Schedule a direct session with our vetted registered nurse educators.</p>
        <div className="grid-3">
          <div className="testi-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '16px' }}>
            <div className="testi-avatar" style={{ width: '60px', height: '60px', fontSize: '20px', background: 'var(--teal-light)', color: 'var(--teal)', marginBottom: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>SA</div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--dark)', marginBottom: '4px' }}>Sr. Sarah Akinyi</h3>
            <p style={{ fontSize: '12px', color: 'var(--mid)', marginBottom: '12px', lineHeight: 1.4 }}>Critical Care & Med-Surg</p>
            <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Schedule Session</button>
          </div>
          <div className="testi-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '16px' }}>
            <div className="testi-avatar" style={{ width: '60px', height: '60px', fontSize: '20px', background: '#DFFBF1', color: '#0F6E56', marginBottom: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>DK</div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--dark)', marginBottom: '4px' }}>Dr. David Kiprop</h3>
            <p style={{ fontSize: '12px', color: 'var(--mid)', marginBottom: '12px', lineHeight: 1.4 }}>Community Health & Research</p>
            <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Schedule Session</button>
          </div>
          <div className="testi-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '16px' }}>
            <div className="testi-avatar" style={{ width: '60px', height: '60px', fontSize: '20px', background: 'var(--amber-light)', color: 'var(--amber-dark)', marginBottom: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>RM</div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--dark)', marginBottom: '4px' }}>RN Rose Mutisya</h3>
            <p style={{ fontSize: '12px', color: 'var(--mid)', marginBottom: '12px', lineHeight: 1.4 }}>Maternal & Child Health</p>
            <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Schedule Session</button>
          </div>
        </div>
      </div>
    </div>
  );
}
