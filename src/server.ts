import express from "express";
import { config } from "./config";
import { initDB } from "./config/db";
import { userRoutes } from "./modules/users/users.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicles.routes";

const app = express();
app.use(express.json());

initDB();

app.use("/api/v1", userRoutes.router);

app.use("/api/v1", vehicleRoutes.router);

app.listen(config.port, () => {
  console.log("server is running on port ", config.port);
});
