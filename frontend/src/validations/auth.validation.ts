export const validateEmail = (email: string): string => {
  if (!email.trim()) return "Email is required";

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!regex.test(email)) return "Invalid email address";

  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";

  if (password.length < 8) return "Minimum 8 characters";
  if (!/[A-Z]/.test(password)) return "Must include uppercase letter";
  if (!/[a-z]/.test(password)) return "Must include lowercase letter";
  if (!/[0-9]/.test(password)) return "Must include number";

  return "";
};

export const validateName = (name: string): string => {
  if (!name.trim()) return "Name is required";
  return "";
};

export const validateEmployeeId = (id: string): string => {
  if (!id.trim()) return "Employee ID is required";
  return "";
};