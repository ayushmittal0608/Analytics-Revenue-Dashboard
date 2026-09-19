export type Role = 'ADMIN' | 'MANAGER';

export type Region =
  | 'NORTH'
  | 'SOUTH'
  | 'EAST'
  | 'WEST'
  | null;

export interface User {
  id: number;
  email: string;
  role: Role;
  region: Region;
}

export interface RevenueByCategory {
  category: string;
  totalRevenue: number;
}

export type RegionFilter =
  | 'ALL'
  | 'NORTH'
  | 'SOUTH'
  | 'EAST'
  | 'WEST';