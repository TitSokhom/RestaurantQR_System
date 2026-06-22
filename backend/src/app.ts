import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route";
import categoryRoutes from "./routes/category.route";
import foodRoutes from "./routes/food.route";
import orderRoutes from "./routes/order.route";
import tableRoutes from "./routes/table.route";
import dashboardRoute from "./routes/dashboard.route";
import paymentRoute from "./routes/payment.route";
import path from "node:path";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/payments", paymentRoute);

// app.use(
//   "/uploads",
//   express.static(path.join(process.cwd(), "uploads"))
// );

export default app;
