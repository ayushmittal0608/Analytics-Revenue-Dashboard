'use client';

import { Region, RegionFilter as RegionFilterType } from '../../types/auth';

interface RegionFilterProps {
  role: 'ADMIN' | 'MANAGER';
  region: Region;
  selectedRegion: RegionFilterType;
  onChange: (region: RegionFilterType) => void;
}

export default function RegionFilter({
  role,
  region,
  selectedRegion,
  onChange,
}: RegionFilterProps) {
  if (role === 'MANAGER') {
    return (
      <div className="w-full rounded-lg bg-slate-100 px-4 py-2.5 text-sm text-slate-700 lg:w-auto">
        Region:{' '}
        <span className="font-semibold">
          {region}
        </span>
      </div>
    );
  }

  return (
    <select
      value={selectedRegion}
      onChange={(event) =>
        onChange(event.target.value as RegionFilterType)
      }
      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 lg:w-auto"
    >
      <option value="ALL">All Regions</option>
      <option value="NORTH">North</option>
      <option value="SOUTH">South</option>
    </select>
  );
}
