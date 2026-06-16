import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

type Props = {
  mode: "login" | "register";
};

export default function AuthPage({ mode }: Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      {mode === "login" ? (
        <LoginForm onSwitch={() => navigate("/register")} />
      ) : (
        <RegisterForm onSwitch={() => navigate("/login")} />
      )}
    </div>
  );
}