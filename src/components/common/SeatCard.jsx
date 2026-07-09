function SeatCard({ occupied }) {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: occupied ? "red" : "green",
        borderRadius: "8px",
      }}
    ></div>
  );
}

export default SeatCard;
