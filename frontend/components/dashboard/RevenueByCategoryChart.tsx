'use client';

import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Rectangle,
  type BarShapeProps
} from 'recharts';

import { RevenueByCategory } from '../../types/auth';

interface RevenueByCategoryChartProps {
  data: RevenueByCategory[];
}

const COLORS = [
  '#818CF8', 
  '#34D399', 
  '#FBBF24', 
  '#F87171', 
  '#22D3EE', 
  '#A78BFA', 
];



export default function RevenueByCategoryChart({
  data,
}: RevenueByCategoryChartProps) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateCompactMode = () => setIsCompact(mediaQuery.matches);

    updateCompactMode();
    mediaQuery.addEventListener('change', updateCompactMode);

    return () =>
      mediaQuery.removeEventListener('change', updateCompactMode);
  }, []);

  const formatCompactRevenue = (value: number) =>
    `₹${new Intl.NumberFormat('en-IN', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value)}`;

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5 lg:p-6">
      <div className="mb-5 lg:mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Total Revenue by Course Category
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Revenue based on actual enrollment fees paid
        </p>
      </div>

      <div className="h-[190px] w-full sm:h-[200px]">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No revenue data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: isCompact ? 4 : 20,
                left: isCompact ? 0 : 10,
                bottom: isCompact ? 35 : 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="category"
                angle={isCompact ? -30 : 0}
                height={isCompact ? 48 : 30}
                textAnchor={isCompact ? 'end' : 'middle'}
                tick={{ fontSize: isCompact ? 9 : 10 }}
              />

              <YAxis
                width={isCompact ? 42 : 60}
                tick={{ fontSize: isCompact ? 9 : 10 }}
                tickFormatter={(value) =>
                  isCompact ? formatCompactRevenue(value) : `₹${value}`
                }
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString('en-IN')}`,
                  'Revenue',
                ]}
              />

              <Bar
                dataKey="totalRevenue"
                name="Revenue"
                shape={(props: BarShapeProps) => {
                  const { index } = props;
                  return (
                    <Rectangle
                      {...props}
                      radius={[4, 4, 0, 0]}
                      fill={COLORS[index % COLORS.length]}
                    />
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
