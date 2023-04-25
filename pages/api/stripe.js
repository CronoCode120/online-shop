import { useStateContext } from '@/context/StateContext';
const { calculateDiscount } = useStateContext();

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.cartItems);

    try {
      // Create Checkout Sessions from body params.

      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
            { shipping_rate: 'shr_1MzODdHod9oIzuhBVQCy0mjC' },
            { shipping_rate: 'shr_1Mz2w1Hod9oIzuhBKMe806FW' }
        ],
        line_items: req.body.cartItems.map(item => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/zktrrjf8/production/').replace('-webp', '.webp');
          
          if(item.discount) {
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: item.name,
                  images: [newImage]
                },
                unit_amount: Math.floor(Number(calculateDiscount(item.price, item.discount)) * 100),
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity
            }
          } else {
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: item.name,
                  images: [newImage]
                },
                unit_amount: Math.floor(item.price.toFixed(2) * 100),
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity
            }
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
