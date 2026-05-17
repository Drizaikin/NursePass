"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './dashboard.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const navLinks = [
    { href: '/dashboard', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>, label: 'Dashboard' },
    { href: '/dashboard/practice', icon: <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></>, label: 'Practice MCQs' },
    { href: '/dashboard/mockexam', icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>, label: 'Mock Exam' },
    { href: '/dashboard/flashcards', icon: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 8v8M8 12h8"/></>, label: 'Flashcards' },
  ];

  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="logo-text" style={{ color: 'var(--white)' }}>Nurse<span>Pass</span></span>
        </div>

        <div className="sidebar-user">
          <div className="su-avatar">MW</div>
          <div>
            <div className="su-name">Mercy Wanjiku</div>
            <div className="su-cadre">KRCHN · August Exam</div>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="nav-section-label">Main</div>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''} onClick={closeSidebar}>
              <svg viewBox="0 0 24 24">{link.icon}</svg>
              {link.label}
            </Link>
          ))}
          
          <div className="nav-section-label" style={{ marginTop: '8px' }}>Progress</div>
          <Link href="/dashboard/analytics" className={pathname === '/dashboard/analytics' ? 'active' : ''} onClick={closeSidebar}>
            <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Analytics
          </Link>
          <Link href="/dashboard/achievements" className={pathname === '/dashboard/achievements' ? 'active' : ''} onClick={closeSidebar}>
            <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            Achievements
          </Link>
        </div>

        <div className="sidebar-streak">
          <div className="streak-row">
            <span className="streak-fire">🔥</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span className="streak-count">14</span>
                <span style={{ fontSize: '12px', color: 'var(--amber)' }}>day streak</span>
              </div>
              <div className="streak-label">Keep it up, Mercy!</div>
            </div>
          </div>
          <div className="streak-dots" style={{ marginTop: '10px' }}>
            <div className="streak-dot done">✓</div>
            <div className="streak-dot done">✓</div>
            <div className="streak-dot done">✓</div>
            <div className="streak-dot done">✓</div>
            <div className="streak-dot done">✓</div>
            <div className="streak-dot done">✓</div>
            <div className="streak-dot today">★</div>
          </div>
        </div>

        <div className="sidebar-plan">
          <div className="plan-pill">
            <div>
              <div className="plan-pill-name">Pro Plan</div>
              <div className="plan-pill-days">23 days remaining</div>
            </div>
            <span className="plan-pill-badge">PRO</span>
          </div>
        </div>
      </div>

      {sidebarOpen && <div className="sidebar-overlay" style={{ display: 'block' }} onClick={closeSidebar}></div>}

      {/* MAIN AREA */}
      <div className="main-area">
        {/* TOP BAR */}
        <div className="topbar-dash">
          <div className="topbar-left">
            <div className="breadcrumb"><strong>Dashboard</strong></div>
          </div>
          <div className="topbar-right">
            <div className="topbar-streak-badge">🔥 14 days</div>
            <div className="xp-badge">⚡ 2,840 XP</div>
            <button className="icon-btn" title="Notifications">
              <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              <span className="notif-dot"></span>
            </button>
            <div className="topbar-avatar">MW</div>
            <button className="icon-btn mobile-menu-btn" onClick={toggleSidebar}>
               <svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}
