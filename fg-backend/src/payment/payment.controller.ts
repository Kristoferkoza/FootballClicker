import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject('STRIPE') private readonly stripe: Stripe,
    private configService: ConfigService
  ) {}

  @Post('create-session')
  async createCheckoutSession(@Body() body: { micropayment: any, userId: string }) {
    try {
      const baseUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:4200';
      
      const unitAmount = Math.round(Number(body.micropayment.price) * 100);
      if (isNaN(unitAmount)) {
        throw new Error('Invalid price format');
      }

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'pln',
            product_data: {
              name: body.micropayment.name,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${baseUrl}/shop?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/shop?canceled=true`,
        metadata: {
          userId: body.userId,
          reward: body.micropayment.reward
        }
      });

      return { sessionId: session.id };
    } catch (error) {
      console.error('Error creating session:', error);
      throw new Error('Payment processing failed');
    }
  }
}