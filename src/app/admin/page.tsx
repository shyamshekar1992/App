"use client";

import { useEffect, useState } from "react";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface Booking {
  _id: string;
  tripTitle: string;
  startCity: string;
  tickets: number;
  passengerNames: string[];
  privateRoom: boolean;
  totalPrice: number;
  timestamp: string;
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/get-booking");
        const data = await res.json();
        setBookings(data);
        setFilteredBookings(data); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Handle search filter
  useEffect(() => {
    const filtered = bookings.filter((booking) =>
      booking.tripTitle.toLowerCase().includes(search.toLowerCase()) ||
      booking.startCity.toLowerCase().includes(search.toLowerCase()) ||
      booking.passengerNames.some(name => name.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredBookings(filtered);
  }, [search, bookings]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📋 Admin Dashboard - Bookings</h1>

      {/* Search Filter */}
      <TextField
        label="Search by Trip, City, or Passenger"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {/* Bookings Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trip Title</TableCell>
              <TableCell>Start City</TableCell>
              <TableCell>Tickets</TableCell>
              <TableCell>Passengers</TableCell>
              <TableCell>Private Room</TableCell>
              <TableCell>Total Price (€)</TableCell>
              <TableCell>Booking Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.tripTitle}</TableCell>
                <TableCell>{booking.startCity}</TableCell>
                <TableCell>{booking.tickets}</TableCell>
                <TableCell>{booking.passengerNames.join(", ") || "N/A"}</TableCell>
                <TableCell>{booking.privateRoom ? "Yes" : "No"}</TableCell>
                <TableCell>{booking.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{new Date(booking.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminDashboard;
