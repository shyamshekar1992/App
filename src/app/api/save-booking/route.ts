/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";
import Booking from "../../models/Booking";
import { sendEmail } from "../../lib/brevo";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";

export async function POST(req: Request) {
  try {
    const { tripTitle, tickets, totalPrice, startCity, privateRoom, passengerNames, customerEmail } = await req.json();

    if (!customerEmail) {
      console.error("❌ Missing customer email!");
      return NextResponse.json({ error: "Customer email is required" }, { status: 400 });
    }

    await connectToDatabase();

    console.log(`✅ Received email in request: ${customerEmail}`); // ✅ Log before saving

    // ✅ Save booking to DB
    const newBooking = new Booking({
      tripTitle,
      tickets,
      totalPrice,
      startCity,
      privateRoom,
      passengerNames,
      customerEmail, // ✅ Save email in MongoDB
      timestamp: new Date(),
    });

    await newBooking.save();

    console.log(`✅ Booking saved with email: ${customerEmail}`); // ✅ Log after saving

    // ✅ Generate QR Code URL
    const bookingId = newBooking._id.toString();
    const confirmationUrl = `http://localhost:3000/booking/${bookingId}`;
    const qrCodeDataURL = await QRCode.toDataURL(confirmationUrl);

    // ✅ Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("Booking Confirmation", { x: 50, y: height - 50, size: 20, font, color: rgb(0, 0, 0) });

    const details = [
      `Trip: ${tripTitle}`,
      `Starting City: ${startCity}`,
      `Tickets: ${tickets}`,
      `Passenger Names: ${passengerNames.join(", ") || "N/A"}`,
      `Private Room: ${privateRoom ? "Yes" : "No"}`,
      `Total Price: €${totalPrice.toFixed(2)}`,
      `Booking Time: ${new Date().toLocaleString()}`,
    ];

    details.forEach((detail, index) => {
      page.drawText(detail, { x: 50, y: height - 100 - index * 20, size: 12, font, color: rgb(0, 0, 0) });
    });

    // ✅ Embed QR Code in PDF
    const qrCodeBuffer = await fetch(qrCodeDataURL).then(res => res.arrayBuffer());
    const qrCodeImage = await pdfDoc.embedPng(qrCodeBuffer);
    page.drawImage(qrCodeImage, { x: 400, y: height - 200, width: 150, height: 150 });

    // ✅ Convert PDF to Base64
    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    // ✅ Email content
    const emailContent = `
      <h2>Thank you for your booking!</h2>
      <p>Your booking confirmation is attached.</p>
      <p><strong>View Online:</strong> <a href="${confirmationUrl}">Click here</a></p>
      <p>Safe travels! 🌍✈️</p>
    `;

    console.log(`✅ Sending email to ${customerEmail}`);

    // ✅ Send Email with PDF Attachment
    await sendEmail(customerEmail, `Booking Confirmation: ${tripTitle}`, emailContent, {
      filename: "BookingConfirmation.pdf",
      content: pdfBase64,
      encoding: "base64",
    });

    console.log(`✅ Email sent successfully to ${customerEmail}`);

    return NextResponse.json({ message: "Booking saved & email sent!", bookingId });
  } catch (error) {
    console.error("❌ Error processing booking:", error);
    return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
  }
}
