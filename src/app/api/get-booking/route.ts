import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";
import Booking from "../../models/Booking";

export async function GET() {
  try {
    await connectToDatabase();
    const bookings = await Booking.find().sort({ timestamp: -1 }); // Sort by latest

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
