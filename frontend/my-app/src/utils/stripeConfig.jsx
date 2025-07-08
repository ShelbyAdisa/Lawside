import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51RiX3qBHnuH9MYZ3No97OApwAUet1MWXQMZgAlNJu64k2bf0fCKXOk8IaxGR8JQ4MZi8pvr3CjkN8YAwPP0VUtSn002LapSlr4');

export default stripePromise;