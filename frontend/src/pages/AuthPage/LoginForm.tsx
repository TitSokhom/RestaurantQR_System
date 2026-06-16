import { useState } from "react";
import { Eye, EyeOff, User, Lock, ArrowRightSquare } from "lucide-react";
import { login } from "../../services/auth.service";
import {
  validateEmail,
  validatePassword,
} from "../../validations/auth.validation";
import { useNavigate } from "react-router-dom";

type Props = {
  onSwitch: () => void;
};

export default function LoginForm({ onSwitch }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await login({ email, password });
      console.log("LOGIN RESPONSE:", res);

      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      switch (user.role) {
        case "ADMIN":
          navigate("/admin");
          break;

        case "CHEF":
          navigate("/chef");
          break;

        case "WAITER":
          navigate("/waiter");
          break;

        case "CASHIER":
          navigate("/cashier");
          break;

        default:
          navigate("/login");
          break;
      }
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md w-full p-4">
      <h2 className="text-center mb-10 text-2xl font-bold">Welcome Back</h2>

      {/* EMAIL */}
      <div className="mb-4">
        <label className="text-xs font-semibold">Email</label>

        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <User size={18} />
          </span>

          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
            className={`w-full pl-10 pr-3 py-3 rounded-xl border outline-none transition ${
              errors.email ? "border-red-500 bg-red-50" : "border-gray-200"
            }`}
            placeholder="Enter email"
          />
        </div>

        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="mb-4">
        <label className="text-xs font-semibold">Password</label>

        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <Lock size={18} />
          </span>

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: "" });
            }}
            className={`w-full pl-10 pr-10 py-3 rounded-xl border outline-none transition ${
              errors.password ? "border-red-500 bg-red-50" : "border-gray-200"
            }`}
            placeholder="Enter password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
      >
        {loading ? "Loading..." : "Login"}
        {!loading && <ArrowRightSquare size={18} />}
      </button>

      {/* SWITCH */}
      <p className="text-center mt-5 text-sm">
        Don't have account?{" "}
        <button
          type="button"
          onClick={() => onSwitch()}
          className="text-blue-600 font-bold"
        >
          Register
        </button>
      </p>
    </form>
  );
}
