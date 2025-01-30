"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  Box,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  
} from "@mui/material";

type Extra = { name: string; price: string };
type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  trip: {
    title: string;
    ppp: string;
    optional: Extra[];
    startCity: string;
  };
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, trip }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [tickets, setTickets] = useState(1);
  const [passengerNames, setPassengerNames] = useState<string[]>([""]);
  const [privateRoom, setPrivateRoom] = useState(false);
  const [startCity, setStartCity] = useState(trip.startCity);

  // Update passenger names dynamically based on ticket count
  const handleTicketChange = (change: number) => {
    const newCount = Math.max(1, tickets + change);
    setTickets(newCount);
    setPassengerNames((prev) => {
      const updatedPassengers = [...prev.slice(0, newCount)];
      while (updatedPassengers.length < newCount) updatedPassengers.push("");
      return updatedPassengers;
    });
  };

  // Calculate total price dynamically
  const basePrice = parseFloat(trip.ppp) * tickets;
  const extraCharge = privateRoom ? 20 * tickets : 0; // €20 extra per ticket for private room
  const totalPrice = basePrice + extraCharge;

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book Your Trip: {trip.title}</DialogTitle>
      <DialogContent>
        {/* Stepper UI */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {["Starting Location", "Tickets", "Passenger Names", "Room Selection", "Summary"].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1: Select Starting Location */}
        {activeStep === 0 && (
          <Box mt={2}>
            <Typography variant="h6">Select Starting Location</Typography>
            <TextField
              fullWidth
              label="Starting Location"
              value={startCity}
              onChange={(e) => setStartCity(e.target.value)}
              margin="normal"
            />
          </Box>
        )}

        {/* Step 2: Select Tickets */}
        {activeStep === 1 && (
          <Box mt={2} textAlign="center">
            <Typography variant="h6">How many tickets?</Typography>
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
              <Button variant="outlined" onClick={() => handleTicketChange(-1)} disabled={tickets === 1}>
                -
              </Button>
              <Typography variant="h5" sx={{ mx: 2 }}>{tickets}</Typography>
              <Button variant="outlined" onClick={() => handleTicketChange(1)}>+</Button>
            </Box>
          </Box>
        )}

        {/* Step 3: Enter Passenger Names */}
        {activeStep === 2 && (
          <Box mt={2}>
            <Typography variant="h6">Enter Passenger Names</Typography>
            {passengerNames.map((name, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Passenger ${index + 1} Name`}
                value={name}
                onChange={(e) => {
                  const newPassengers = [...passengerNames];
                  newPassengers[index] = e.target.value;
                  setPassengerNames(newPassengers);
                }}
                margin="normal"
              />
            ))}
          </Box>
        )}

        {/* Step 4: Room Selection */}
        {activeStep === 3 && (
          <Box mt={2}>
            <Typography variant="h6">Select Room Type</Typography>
            <FormControlLabel
              control={<Checkbox checked={privateRoom} onChange={() => setPrivateRoom(!privateRoom)} />}
              label={`Private Room (+€20 per person)`}
            />
          </Box>
        )}

        {/* Step 5: Final Summary */}
        {activeStep === 4 && (
          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6">Booking Summary</Typography>
            <Typography>Tickets: {tickets}</Typography>
            <Typography>Passengers: {passengerNames.join(", ")}</Typography>
            <Typography>Room Type: {privateRoom ? "Private Room (+€20 per person)" : "Shared Room"}</Typography>
            <Typography>Start City: {startCity}</Typography>
            <Typography variant="h5" color="primary" sx={{ mt: 2 }}>Total Price: €{totalPrice.toFixed(2)}</Typography>
            <PaymentButton tickets={tickets} totalPrice={totalPrice} tripTitle={trip.title} />

          </Paper>
        )}
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={handleBack} color="inherit" variant="outlined">
            Back
          </Button>
        )}
        {activeStep < 4 ? (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        ) : (
          <Button variant="contained" color="success">
            Confirm & Pay
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
interface PaymentButtonProps {
  tickets: number;
  totalPrice: number;
  tripTitle: string;
}
const PaymentButton: React.FC<PaymentButtonProps> = ({ tickets, totalPrice, tripTitle }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickets, totalPrice, tripTitle }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url; // Redirect to Stripe
      }
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="success"
      fullWidth
      onClick={handlePayment}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : "Proceed to Payment"}
    </Button>
  );
};
