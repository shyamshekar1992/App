/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CircularProgress, Typography, Paper, Box } from "@mui/material";

interface Booking {
  error: string | undefined;
  _id: string;
  tripTitle: string;
  startCity: string;
  tickets: number;
  passengerNames: string[];
  privateRoom: boolean;
  totalPrice: number;
  timestamp: string;
}

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/booking/${id}`);
        const data: Booking = await res.json();

        if (!res.ok) throw new Error(data.error);
        setBooking(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBooking();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">❌ {error}</Typography>;
  if (!booking) return <Typography>No booking found.</Typography>;

  return (
    <Paper sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h4">Booking Details</Typography>
      <Box mt={2}>
        <Typography><strong>Trip:</strong> {booking.tripTitle}</Typography>
        <Typography><strong>Starting City:</strong> {booking.startCity}</Typography>
        <Typography><strong>Tickets:</strong> {booking.tickets}</Typography>
        <Typography><strong>Passengers:</strong> {booking.passengerNames.join(", ")}</Typography>
        <Typography><strong>Private Room:</strong> {booking.privateRoom ? "Yes" : "No"}</Typography>
        <Typography><strong>Total Price:</strong> €{booking.totalPrice.toFixed(2)}</Typography>
        <Typography><strong>Booking Time:</strong> {new Date(booking.timestamp).toLocaleString()}</Typography>
      </Box>
    </Paper>
  );
};

export default BookingDetails;
