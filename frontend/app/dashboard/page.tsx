'use client';

import { useEffect, useState } from 'react';

import DashboardHeader from '../../components/dashboard/DashboardHeader';
import RegionFilter from '../../components/dashboard/RegionFilter';
import RevenueByCategoryChart from '../../components/dashboard/RevenueByCategoryChart';
import RevenueTrendChart from '../../components/dashboard/RevenueTrendChart';
import { apiFetch } from '../../lib/api';
import {
  RegionFilter as RegionFilterType,
  RevenueByCategory,
  User,
} from '../../types/auth';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  const [data, setData] = useState<RevenueByCategory[]>([]);

  const [selectedRegion, setSelectedRegion] =
    useState<RegionFilterType>('ALL');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadRevenue(
    currentUser: User,
    region: RegionFilterType,
  ) {
    setLoading(true);
    setError('');

    try {
      let endpoint = '/analytics/revenue-by-category';

      if (
        currentUser.role === 'ADMIN' &&
        region !== 'ALL'
      ) {
        endpoint += `?region=${region}`;
      }

      const result =
        await apiFetch<RevenueByCategory[]>(endpoint);

      setData(result);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to load dashboard',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function initialize() {
      try {
        const currentUser =
          await apiFetch<User>('/auth/me');

        setUser(currentUser);

        const initialRegion: RegionFilterType =
          currentUser.role === 'ADMIN'
            ? 'ALL'
            : currentUser.region ?? 'ALL';

        setSelectedRegion(initialRegion);

        await loadRevenue(
          currentUser,
          initialRegion,
        );
      } catch {
        window.location.href = '/login';
      }
    }

    initialize();
  }, []);

  async function handleRegionChange(
    region: RegionFilterType,
  ) {
    if (!user) return;

    setSelectedRegion(region);
    await loadRevenue(user, region);
  }

  if (!user) {
    return (
      <main className="flex h-screen items-center justify-center overflow-hidden">
        <p className="text-sm text-slate-500">
          Loading dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-[100dvh] flex-col bg-slate-50 lg:h-screen lg:overflow-hidden">
      <DashboardHeader user={user} />

      <div className="flex-1 lg:min-h-0">
        <div className="mx-auto flex w-full max-w-7xl flex-col p-3 sm:p-5 lg:h-full lg:p-6">
          <div className="flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 lg:min-h-0 lg:flex-1">
            {/* Header + Region Filter */}
            <div className="flex shrink-0 flex-col gap-4 border-b border-slate-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Revenue Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Analyze revenue across course categories
                </p>
              </div>

              <RegionFilter
                role={user.role}
                region={user.region}
                selectedRegion={selectedRegion}
                onChange={handleRegionChange}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="shrink-0 px-4 pt-4 sm:px-5">
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              </div>
            )}

            {/* Chart */}
            <div className="grid grid-cols-1 gap-3 p-3 sm:gap-5 sm:p-5 lg:min-h-0 lg:flex-1 lg:grid-cols-2">
              {/* Revenue by Category */}
              <section className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 lg:min-h-0">
                {loading ? (
                  <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-slate-50 lg:h-full lg:min-h-[350px]">
                    <p className="text-sm text-slate-500">
                      Loading revenue data...
                    </p>
                  </div>
                ) : (
                  <div className="min-h-[320px] lg:h-full lg:min-h-[350px]">
                    <RevenueByCategoryChart data={data} />
                  </div>
                )}
              </section>

              {/* Revenue Trend */}
              <section className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 lg:min-h-0">
                <div className="min-h-[320px] lg:h-full lg:min-h-[350px]">
                  <RevenueTrendChart region={selectedRegion} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
