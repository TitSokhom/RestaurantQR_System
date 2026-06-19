import { useState } from "react";
import { register } from "../../services/auth.service";
import {validateEmail,validatePassword,validateName,validateEmployeeId,} from "../../validations/auth.validation";
import type { Role } from "../../types/auth";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("WAITER");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    employeeId: "",
    email: "",
    password: "",
    role: "",
    agreeTerms: "",
  });

  const validate = () => {
    const err = {
      name: validateName(name),
      employeeId: validateEmployeeId(employeeId),
      email: validateEmail(email),
      password: validatePassword(password),
      role: role ? "" : "Role required",
      agreeTerms: agreeTerms ? "" : "You must accept privacy policy",
    };

    setErrors(err);

    return !Object.values(err).some((e) => e);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    await register({
      name,
      employeeId,
      email,
      password,
      role,
    });

    alert("Register success");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* HEADER */}
      <h2 className=" mb-6 text-2xl font-bold tracking-tight text-gray-900">
        Employee Registration
      </h2>

      {/* INPUT FIELDS */}
      <div className="space-y-4">
        {/* FULL NAME */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Full Name
          </label>

          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({ ...errors, name: "" });
              }}
              className={`w-full rounded-xl border bg-gray-50 py-3 px-4 text-sm outline-none transition-all
              ${
                errors.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-[#0052cc] focus:bg-white focus:ring-1 focus:ring-[#0052cc]"
              }`}
              placeholder="Enter your full name"
            />
          </div>

          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* EMPLOYEE ID + ROLE */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Employee ID
            </label>

            <input
              type="text"
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);
                setErrors({ ...errors, employeeId: "" });
              }}
              className={`w-full rounded-xl border bg-gray-50 py-3 px-4 text-sm outline-none transition-all
              ${
                errors.employeeId
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-[#0052cc] focus:bg-white focus:ring-1 focus:ring-[#0052cc]"
              }`}
              placeholder="ID-0000"
            />

            {errors.employeeId && (
              <p className="text-xs text-red-500 mt-1">{errors.employeeId}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Primary Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className={`w-full appearance-none rounded-xl border bg-gray-50 py-3 px-4 text-sm outline-none transition-all
              ${
                errors.role
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-[#0052cc] focus:bg-white focus:ring-1 focus:ring-[#0052cc]"
              }`}
            >
              <option value="WAITER">Waiter</option>
              <option value="CHEF">Chef</option>
              <option value="CASHIER">Cashier</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Work Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
            className={`w-full rounded-xl border bg-gray-50 py-3 px-4 text-sm outline-none transition-all
            ${
              errors.email
                ? "border-red-500 bg-red-50"
                : "border-gray-200 focus:border-[#0052cc] focus:bg-white focus:ring-1 focus:ring-[#0052cc]"
            }`}
            placeholder="name@company.com"
          />

          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Create Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              className={`w-full rounded-xl border bg-gray-50 py-3 px-4 pr-11 text-sm outline-none transition-all
              ${
                errors.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-[#0052cc] focus:bg-white focus:ring-1 focus:ring-[#0052cc]"
              }`}
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>
      </div>

      {/* PRIVACY */}
      <div className="mt-5 flex items-start gap-2.5">
        <input
          id="privacy"
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => {
            setAgreeTerms(e.target.checked);
            setErrors({ ...errors, agreeTerms: "" });
          }}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#0052cc] focus:ring-[#0052cc]"
        />

        <label className="text-xs text-gray-600">
          I agree to the Security & Privacy Policy
        </label>
      </div>

      {errors.agreeTerms && (
        <p className="text-xs text-red-500 mt-1">{errors.agreeTerms}</p>
      )}

      {/* BUTTON */}
      <button
        type="submit"
        className="mt-6 rounded-xl bg-[#0052cc] py-3.5 font-semibold text-white shadow-md hover:bg-[#0043b3]"
      >
        Register Account
      </button>

      {/* SWITCH */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-bold text-[#0052cc] hover:underline"
        >
          Log in
        </button>
      </p>
    </form>
  );
}
