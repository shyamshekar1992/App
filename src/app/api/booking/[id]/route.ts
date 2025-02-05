import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import Booking from "../../../models/Booking";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase(); // ✅ Connect to MongoDB

    const booking = await Booking.findById(params.id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking); // ✅ Return the booking data
  } catch (error) {
    console.error("❌ Error fetching booking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
