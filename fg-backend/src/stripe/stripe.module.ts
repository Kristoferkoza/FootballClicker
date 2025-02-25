import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'STRIPE',
      useFactory: (configService: ConfigService) => 
        new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
            apiVersion: '2025-02-24.acacia',
        }),
      inject: [ConfigService],
    },
  ],
  exports: ['STRIPE'],
})
export class StripeModule {}