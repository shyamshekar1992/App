import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  tripTitle: string;
  startCity: string;
  tickets: number;
  passengerNames: string[];
  privateRoom: boolean;
  totalPrice: number;
  customerEmail: string; // ✅ Add this field
  timestamp: Date;
}

// Define the schema
const BookingSchema = new Schema<IBooking>({
  tripTitle: { type: String, required: true },
  startCity: { type: String, required: true },
  tickets: { type: Number, required: true },
  passengerNames: { type: [String], required: true },
  privateRoom: { type: Boolean, default: false },
  totalPrice: { type: Number, required: true },
  customerEmail: { type: String, required: true }, // ✅ Ensure email is required
  timestamp: { type: Date, default: Date.now },
});

// Export the model
export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
