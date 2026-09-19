import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../common/types/authenticated-user';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('revenue-by-category')
  async getRevenueByCategory(
    @Req() request: Request,

    @Query('region')
    region?: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST',
  ) {
    const user = request.user as AuthenticatedUser;

    return this.analyticsService.getRevenueByCategory(user, region);
  }

    @UseGuards(AuthGuard('jwt'))
  @Get('revenue-over-time')
  async getRevenueOverTime(
    @Req() request: Request,
    @Query('period')
    period: '3M' | '6M' | '1Y' = '3M',
    @Query('region')
    region: 'ALL' | 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' = 'ALL',
  ) {
    const user = request.user as AuthenticatedUser;

    return this.analyticsService.getRevenueOverTime(
      user,
      period,
      region,
    );
  }
}