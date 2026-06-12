import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";

function StudentLayout({
  children,
}) {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />

        <div
          style={{
            padding: "20px",
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default StudentLayout;