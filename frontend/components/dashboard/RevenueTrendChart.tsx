'use client';

import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { RegionFilter } from '../../types/auth';
import { apiFetch } from '../../lib/api';

type RevenuePeriod = '3M' | '6M' | '1Y';

interface RevenueTrend {
  period: string;
  totalRevenue: number;
}

interface RevenueTrendChartProps {
  region?: RegionFilter;
}

export default function RevenueTrendChart({
  region,
}: RevenueTrendChartProps) {
  const [period, setPeriod] = useState<RevenuePeriod>('3M');
  const [data, setData] = useState<RevenueTrend[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateCompactMode = () => setIsCompact(mediaQuery.matches);

    updateCompactMode();
    mediaQuery.addEventListener('change', updateCompactMode);

    return () =>
      mediaQuery.removeEventListener('change', updateCompactMode);
  }, []);

  useEffect(() => {
    async function fetchRevenueTrend() {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          period,
        });

        if (region) {
          params.set('region', region);
        }

        const response = await apiFetch(
          `/analytics/revenue-over-time?${params.toString()}`,
        ) as RevenueTrend[];

        setData(response);
      } catch (error) {
        console.error('Failed to fetch revenue trend:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRevenueTrend();
  }, [period, region]);

  const formattedData = data.map((item) => ({
    ...item,
    label: new Date(`${item.period}-01`).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }),
    shortLabel: new Date(`${item.period}-01`).toLocaleDateString('en-US', {
      month: 'short',
    }),
  }));

  const formatCompactRevenue = (value: number) =>
    `₹${new Intl.NumberFormat('en-IN', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value)}`;

  return (
    <div className="min-h-[320px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:h-[320px] lg:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Revenue Trend
          </h2>

          <p className="text-sm text-slate-500">
            Revenue generated from enrolled students
          </p>
        </div>

        <div className="flex w-full rounded-lg border border-slate-200 bg-slate-50 p-1 lg:w-auto">
          {(['3M', '6M', '1Y'] as RevenuePeriod[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPeriod(option)}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition lg:flex-none ${
                period === option
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[190px] w-full sm:h-[200px]">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Loading revenue data...
          </div>
        ) : formattedData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No revenue data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopOpacity={0.3} />
                  <stop offset="100%" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey={isCompact ? 'shortLabel' : 'label'}
                tickLine={false}
                axisLine={false}
                minTickGap={isCompact ? 12 : 0}
                tick={{ fontSize: isCompact ? 10 : 12 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                width={isCompact ? 46 : 60}
                tick={{ fontSize: isCompact ? 10 : 12 }}
                tickFormatter={(value) =>
                  isCompact
                    ? formatCompactRevenue(value)
                    : `₹${Number(value).toLocaleString('en-IN')}`
                }
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString('en-IN')}`,
                  'Revenue',
                ]}
                labelFormatter={(label) => label}
              />

              <Area
                type="monotone"
                dataKey="totalRevenue"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
