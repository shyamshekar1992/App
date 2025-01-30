// src/data/faqData.ts

export type FAQItem = {
  title: string;
  content: string;
};

export const faqData: { category: string; items: FAQItem[] }[] = [
  {
    category: "Booking and Payment FAQs",
    items: [
      {
        title: "Bus seating arrangement (Premium seats and Booking seats together)",
        content: `There is the option for two additional add-ons for all trips which allow you to book particular seating arrangements. These are Premium Seats and Seats Together.`,
      },
      {
        title: "Can I bring my parents or children on a trip?",
        content: `Yes, they are more than welcome to join. Please note that there is a minimum age of 3 years old for our trips.`,
      },
      {
        title: "Do I have a Premium Seat during the whole trip?",
        content: `You will have your premium seat for the whole trip! However, these seats apply only when traveling with Wanderlust buses.`,
      },
      {
        title: "How can I book a trip with pm2am?",
        content: `Visit our website, select a trip, complete the booking form, and proceed with the payment.`,
      }
    ],
  },
  {
    category: "Post Booking FAQs",
    items: [
      {
        title: "Can I change my city of departure? And how?",
        content: `Yes, you can. Log in to your My Account page, select the new city, and pay the fare difference plus a change fee.`,
      },
      {
        title: "Can I transfer/sell my ticket to someone else? And how?",
        content: `Yes, you can transfer your ticket by logging into My Account and updating the details with the new guest information.`,
      },
      {
        title: "I cannot join the trip anymore, how can I cancel my ticket?",
        content: `To cancel your ticket, log into your My Account page and follow the cancellation instructions. Refund policies apply.`,
      },
      {
        title: "In case of cancellation, can I have my money back?",
        content: `Refunds are subject to our cancellation policy. Check the cancellation section in our terms for refund conditions.`,
      }
    ],
  },
  {
    category: "Departure and Travel FAQs",
    items: [
      {
        title: "How much luggage am I allowed to carry on your trips?",
        content: `Each passenger is allowed one carry-on and one checked-in bag. Lapland trips may have additional restrictions.`,
      },
      {
        title: "How will I know which bus is my bus?",
        content: `Buses are clearly labeled with the trip name, and our staff will assist you at departure points.`,
      },
      {
        title: "Is my luggage left in the bus insured?",
        content: `No, we recommend purchasing personal travel insurance for valuable items.`,
      },
      {
        title: "Will I need to exchange currency to visit any of the countries in your trips?",
        content: `It depends on your destination. Some trips travel to non-Eurozone countries, where local currency might be needed.`,
      }
    ],
  }
];
