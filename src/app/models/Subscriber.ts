import mongoose, { Schema, Document } from "mongoose";

export interface ISubscriber extends Document {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Subscriber =
  mongoose.models.Subscriber || mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);

export default Subscriber;
