/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Hardcoded Stripe Secret Key (Replace this later with env variable)
const stripe = new Stripe("sk_test_51QmzqPRtoJaLd27vc4yPKmMxek7oRpRgVKWD6k6fDJ3Mhr1SOGwnAFtP6YBa2h8zWNRiwphP7O9ZAjwI7WS5tOnj00OJEqIdPj", {
    apiVersion: "2023-10-16" as any, // ✅ Add 'as any' to avoid type enforcement issues
});

export async function POST(req: Request) {
  try {
    const { tickets, totalPrice, tripTitle } = await req.json();

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: tripTitle,
            },
            unit_amount: totalPrice * 100, // Convert to cents
          },
          quantity: tickets,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/sucess`,
      cancel_url: `http://localhost:3000/fail`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Failed to create payment session" }, { status: 500 });
  }
}
