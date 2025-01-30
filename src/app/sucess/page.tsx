"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Typography, Container, CircularProgress } from "@mui/material";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("✅ Payment Successful!");
    setTimeout(() => router.push("/"), 5000);
  }, []);

  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" color="green">🎉 Payment Successful!</Typography>
      <Typography variant="body1">Thank you for booking your trip. You will receive a confirmation email soon.</Typography>
      <CircularProgress sx={{ mt: 2 }} />
    </Container>
  );
};

export default SuccessPage;
