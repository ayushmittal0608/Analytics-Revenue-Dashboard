import { Request } from 'express';
import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getRevenueByCategory(request: Request, region?: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST'): Promise<{
        category: string | null;
        totalRevenue: number;
    }[]>;
    getRevenueOverTime(request: Request, period?: '3M' | '6M' | '1Y', region?: 'ALL' | 'NORTH' | 'SOUTH' | 'EAST' | 'WEST'): Promise<{
        period: string;
        totalRevenue: number;
    }[]>;
}
