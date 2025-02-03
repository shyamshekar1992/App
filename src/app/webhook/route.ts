/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDatabase } from "../lib/mongodb";
import Booking from "../models/Booking";
import Stripe from "stripe";

// Initialize Stripe with the Secret Key
const stripe = new Stripe("sk_test_51QmzqPRtoJaLd27vc4yPKmMxek7oRpRgVKWD6k6fDJ3Mhr1SOGwnAFtP6YBa2h8zWNRiwphP7O9ZAjwI7WS5tOnj00OJEqIdPj", {
  apiVersion: "2023-10-16" as any, // ✅ Add 'as any' to avoid type enforcement issues
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") as string;

  let event;
  try {
    // Hardcoded Webhook Secret
    const webhookSecret = "whsec_tWikt30yXtlHPsq9Ca3FmYwOC9gxgGzN";

    // Verify Stripe Webhook Signature
    const rawBody = await req.text(); // Get raw body for verification
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);

    console.log("✅ Webhook event verified:", event.type);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract metadata from Stripe session
    const tripTitle = session.metadata?.tripTitle;
    const startCity = session.metadata?.startCity;
    const tickets = parseInt(session.metadata?.tickets || "1", 10);
    const passengerNames = JSON.parse(session.metadata?.passengerNames || "[]");
    const privateRoom = session.metadata?.privateRoom === "true";
    const totalPrice = session.amount_total ? session.amount_total / 100 : 0;

    try {
      await connectToDatabase();

      // Save booking to MongoDB
      const newBooking = new Booking({
        tripTitle,
        startCity,
        tickets,
        passengerNames,
        privateRoom,
        totalPrice,
        timestamp: new Date(),
      });

      await newBooking.save();
      console.log(`✅ Booking saved: ${tripTitle}`);
    } catch (error) {
      console.error("❌ Error saving booking:", error);
    }
  }

  return NextResponse.json({ received: true });
}
