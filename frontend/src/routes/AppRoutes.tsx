import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { DashboardLayout } from '../layouts/DashboardLayout';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const ApplicationsPage = lazy(() => import('../pages/ApplicationsPage'));
const SchemesPage = lazy(() => import('../pages/SchemesPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));

const Loading = () => (
  <div className="flex h-screen items-center justify-center text-slate-500">Loading...</div>
);

export function AppRoutes() {
  const element = useRoutes([
    {
      path: '/login',
      element: (
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      )
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <DashboardPage />
            </Suspense>
          )
        },
        {
          path: 'applications',
          element: (
            <Suspense fallback={<Loading />}>
              <ApplicationsPage />
            </Suspense>
          )
        },
        {
          path: 'schemes',
          element: (
            <Suspense fallback={<Loading />}>
              <SchemesPage />
            </Suspense>
          )
        }
      ]
    }
  ]);

  return element;
}
