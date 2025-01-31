import stripe from '../../utils/stripe';

// Stripe.service: Module file for the Stripe.service functionality.
const createPaymentIntent = async (amount: number, paymentMethodId: string) => {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    payment_method: paymentMethodId,
    description: `Payment for booked slot`,
    confirm: true,
    off_session: true,
  });
};

export const StripeService = {
  createPaymentIntent,
};
