import Link from 'next/link';

export default function RegisterRoleSelection() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream-warm)' }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', margin: '20px', padding: '40px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="logo-mark" style={{ margin: '0 auto 16px', width: '48px', height: '48px' }}>
            <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'none', stroke: 'var(--amber)', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--dark)' }}>Join NurseFiti</h1>
          <p style={{ fontSize: '14px', color: 'var(--mid)', marginTop: '8px' }}>Select your role to continue</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Student Role */}
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', border: '2px solid var(--border)', borderRadius: 'var(--r-lg)', textDecoration: 'none', transition: 'all 0.2s', background: 'var(--white)' }} className="role-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', stroke: 'var(--teal)', fill: 'none', strokeWidth: 2 }}>
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--dark)' }}>I am a Student</h3>
              <p style={{ fontSize: '13px', color: 'var(--mid)', marginTop: '4px' }}>I want to prepare and practice for my NCK exams.</p>
            </div>
          </Link>

          {/* Tutor Role */}
          <Link href="/tutor_dashboard.html" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', border: '2px solid var(--border)', borderRadius: 'var(--r-lg)', textDecoration: 'none', transition: 'all 0.2s', background: 'var(--white)' }} className="role-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--amber-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', stroke: 'var(--amber-dark)', fill: 'none', strokeWidth: 2 }}>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--dark)' }}>I am an Expert Tutor</h3>
              <p style={{ fontSize: '13px', color: 'var(--mid)', marginTop: '4px' }}>I want to teach, review questions, and earn.</p>
            </div>
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--teal)', fontWeight: 700, textDecoration: 'none' }}>← Back to Home</Link>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .role-card:hover {
            border-color: var(--teal) !important;
            box-shadow: var(--shadow);
            transform: translateY(-2px);
          }
        `}} />
      </div>
    </div>
  );
}
