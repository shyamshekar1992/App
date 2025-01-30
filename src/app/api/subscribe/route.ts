import { NextResponse } from "next/server";
import { connectToDatabase } from '../../lib/mongodb';
import Subscriber from '../../models/Subscriber';

export async function POST(request: Request) {
  try {
    await connectToDatabase(); // Ensure database connection

    const { firstName, lastName, email } = await request.json();

    // Validate input
    if (!firstName || !lastName || !email) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Check if email is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json({ message: "Email already subscribed" }, { status: 409 });
    }

    // Save subscriber
    const newSubscriber = new Subscriber({ firstName, lastName, email });
    await newSubscriber.save();

    return NextResponse.json({ message: "Subscription successful!" }, { status: 201 });
  } catch (error) {
    console.error("Error saving subscriber:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
