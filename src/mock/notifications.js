const notifications = [
  {
    id: 1,
    type: "arrival",
    title: "Bus Arriving Soon",
    message: "Your bus will arrive in 10 minutes.",
    time: "09:00 AM",
    status: "Unread",
  },
  {
    id: 2,
    type: "delay",
    title: "Delay Alert",
    message: "Bus delayed by 5 minutes.",
    time: "09:30 AM",
    status: "Unread",
  },
  {
    id: 3,
    type: "route",
    title: "Route Change",
    message: "Route updated due to road maintenance.",
    time: "10:15 AM",
    status: "Read",
  },
  {
    id: 4,
    type: "emergency",
    title: "Emergency Alert",
    message: "Driver reported a vehicle issue.",
    time: "11:00 AM",
    status: "Unread",
  },
];

export default notifications;
