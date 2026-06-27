export const logout = (navigate: any) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/login", { replace: true });
};