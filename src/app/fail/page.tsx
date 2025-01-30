"use client";
import React from "react";
import { Typography, Container, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const CancelPage = () => {
  const router = useRouter();

  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" color="error">⚠️ Payment Failed!</Typography>
      <Typography variant="body1">Your payment was not processed. Please try again.</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => router.push("/")}>
        Go Back
      </Button>
    </Container>
  );
};

export default CancelPage;
