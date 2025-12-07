import express from "express";
import nodeCron from "node-cron";
import { config } from "./config";
import { initDB, pool } from "./config/db";
import { bookingsRoutes } from "./modules/bookings/bookings.routes";
import { userRoutes } from "./modules/users/users.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicles.routes";

const app = express();
app.use(express.json());

initDB();

app.use("/api/v1", userRoutes.router);

app.use("/api/v1", vehicleRoutes.router);

app.use("/api/v1", bookingsRoutes.router);

nodeCron.schedule("0 0 * * *", async () => {
  console.log("running a task every day");
  const today = new Date().toISOString().split("T")[0];
  try {
    const { rows: bookings } = await pool.query(
      `
      SELECT * FROM bookings WHERE rent_end_date::date < $1 
      `,
      [today]
    );
    for (const booking of bookings) {
      await pool.query(
        `
        UPDATE bookings SET status='returned' WHERE id=$1
        `,
        [booking.id]
      );
      await pool.query(
        `
        UPDATE vehicles SET availability_status='available' WHERE id=$1
        `,
        [booking.vehicle_id]
      );
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(config.port, () => {
  console.log("server is running on port ", config.port);
});
