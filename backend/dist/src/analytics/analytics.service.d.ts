import { AuthenticatedUser } from '../common/types/authenticated-user';
type RevenuePeriod = '3M' | '6M' | '1Y';
export declare class AnalyticsService {
    getRevenueByCategory(user: AuthenticatedUser, requestedRegion?: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST'): Promise<{
        category: string | null;
        totalRevenue: number;
    }[]>;
    getRevenueOverTime(user: AuthenticatedUser, period?: RevenuePeriod, requestedRegion?: 'ALL' | 'NORTH' | 'SOUTH' | 'EAST' | 'WEST'): Promise<{
        period: string;
        totalRevenue: number;
    }[]>;
}
export {};
