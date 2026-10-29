/**
 * @file scripts/data/support.js
 * Local FAQ answers and sample administration cases. No support messages are sent to a server.
 */
"use strict";

const faqs = [
  [
    "How do I book an item?",
    "Find a listing, choose pickup and return dates, then send a request. Once the owner confirms, track the details in My rentals.",
  ],
  [
    "What is the refundable deposit for?",
    "The deposit is separate from the rental price. Its amount and terms should be clear before you confirm. This frontend preview does not charge or hold any funds.",
  ],
  [
    "Why take photos before and after a rental?",
    "Photos and a condition report help both parties record the item. Include clear views of all sides, accessories and existing signs of use.",
  ],
  [
    "What if an item is damaged or not returned?",
    "Open a support request from the rental details. Describe the problem, attach photos and suggest a resolution. Support reviews both parties' records and messages.",
  ],
  [
    "Can I cancel a booking?",
    "Cancellation terms appear on each listing and before confirmation. Open the rental details and choose Request cancellation.",
  ],
  [
    "How do I create my first listing?",
    "Choose List an item. Add a title, description, photos, location, price and availability. Review your details before publishing.",
  ],
  [
    "How are fees and taxes displayed?",
    "The interface separates the rental price, platform fee and refundable deposit. A production tax model and payment processing must be specified and implemented in the backend.",
  ],
];

const adminTickets = [
  {
    id: "TI-0248",
    name: "Disagreement about lens condition",
    cat: "Item damage",
    person: "Ivan Petrović",
    priority: "High",
    status: "In review",
    age: "2 hours ago",
  },
  {
    id: "TI-0249",
    name: "Late tent return",
    cat: "Item not returned",
    person: "Ana Horvat",
    priority: "Medium",
    status: "New",
    age: "3 hours ago",
  },
  {
    id: "TI-0246",
    name: "Question about a held deposit",
    cat: "Payment",
    person: "Luka Babić",
    priority: "Medium",
    status: "Awaiting reply",
    age: "Yesterday",
  },
  {
    id: "TI-0242",
    name: "Listing does not match the photos",
    cat: "Listing content",
    person: "Petra Novak",
    priority: "Low",
    status: "Resolved",
    age: "10 Oct",
  },
];
