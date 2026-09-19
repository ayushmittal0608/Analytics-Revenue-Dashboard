'use client';

import { useRouter } from 'next/navigation';
import { apiFetch } from '../../lib/api';
import { User } from '../../types/auth';

interface DashboardHeaderProps {
  user: User;
}

export default function DashboardHeader({
  user,
}: DashboardHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await apiFetch('/auth/logout', {
      method: 'POST',
    });

    router.push('/login');
    router.refresh();
  }

  return (
    <header className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-slate-900">
          Analytics Dashboard
        </h1>

        <p className="break-all text-sm text-slate-500">
          {user.email}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 lg:justify-normal">
        <div className="min-w-0 truncate rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
          {user.role}
          {user.region && ` · ${user.region}`}
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border cursor-pointer border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
