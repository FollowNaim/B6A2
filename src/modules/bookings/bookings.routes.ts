import { Router } from "express";
import { bookingControllers } from "./bookings.controller";

const router = Router();

router.get("/bookings", bookingControllers.getBookings);

router.post("/bookings", bookingControllers.createBooking);

router.put("/bookings/:bookingId", bookingControllers.updateBooking);

export const bookingsRoutes = { router };
