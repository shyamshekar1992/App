import { NextResponse } from "next/server";
import { connectToDatabase } from '../../lib/mongodb';

export async function POST(request: Request) {
  try {
    const db = await connectToDatabase();
    const body = await request.json();

    const { trip, name, email, phone, message } = body;

    if (!trip || !name || !email || !phone || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const collection = db.collection("contacts");

    await collection.insertOne({
      trip,
      name,
      email,
      phone,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Form submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving contact form data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
