/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51QmzqPRtoJaLd27vc4yPKmMxek7oRpRgVKWD6k6fDJ3Mhr1SOGwnAFtP6YBa2h8zWNRiwphP7O9ZAjwI7WS5tOnj00OJEqIdPj", {
    apiVersion: "2023-10-16" as any, // ✅ Avoids TypeScript strict checking issues
});

export async function POST(req: Request) {
  try {
    const { tickets, totalPrice, tripTitle, startCity, privateRoom, passengerNames, customerEmail } = await req.json();

    if (!customerEmail) {
      return NextResponse.json({ error: "Customer email is required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: customerEmail, // ✅ Pass customer email to Stripe
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: tripTitle },
            unit_amount: totalPrice * 100, // Convert to cents
          },
          quantity: tickets,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success?tripTitle=${encodeURIComponent(tripTitle)}&tickets=${tickets}&totalPrice=${totalPrice}&startCity=${encodeURIComponent(
        startCity || "Unknown"
      )}&privateRoom=${privateRoom ? "true" : "false"}&passengerNames=${encodeURIComponent(
        JSON.stringify(passengerNames || [])
      )}&customerEmail=${encodeURIComponent(customerEmail)}`, // ✅ Include customer email in success URL
      cancel_url: `http://localhost:3000/fail`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe Error:", error);
    return NextResponse.json({ error: "Failed to create payment session" }, { status: 500 });
  }
}
