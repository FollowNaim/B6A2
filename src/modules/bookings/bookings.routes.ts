import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingControllers } from "./bookings.controller";

const router = Router();

router.get(
  "/bookings",
  auth("admin", "customer"),
  bookingControllers.getBookings
);

router.post(
  "/bookings",
  auth("admin", "customer"),
  bookingControllers.createBooking
);

router.put(
  "/bookings/:bookingId",
  auth("admin", "customer"),
  bookingControllers.updateBooking
);

export const bookingsRoutes = { router };
