import LoginForm from "../../components/forms/LoginForm";

function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <div>
        <h1>
          College Bus Tracking
        </h1>

        <LoginForm />
      </div>
    </div>
  );
}

export default Login;