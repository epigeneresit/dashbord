import { Outlet, useLocation, Link } from 'react-router-dom';

import { useTheme } from '../store/theme';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/applications', label: 'Applications' },
  { to: '/schemes', label: 'Schemes' }
];

export function DashboardLayout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold text-slate-800">Maharashtra Scheme Dashboard</h1>
          <nav className="flex items-center gap-4 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded px-3 py-1 transition-colors ${
                  location.pathname === link.to
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="rounded bg-slate-100 px-3 py-1 text-slate-600 hover:bg-slate-200"
            >
              {theme === 'light' ? 'Dark' : 'Light'} mode
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
