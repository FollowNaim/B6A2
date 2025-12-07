import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getBookings();
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createBooking = async (req: Request, res: Response) => {
  try {
    const { result, vehicle } = await bookingServices.createBooking(req);
    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: {
        ...result.rows[0],
        vehicle: {
          vehicle_name: vehicle.rows[0].vehicle_name,
          daily_rent_price: vehicle.rows[0].daily_rent_price,
        },
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.updateBooking(
      req.body.status,
      req.params.bookingId as string
    );
    if (req.body.status === "returned") {
      res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: {
          ...result?.rows[0],
          vehicle: {
            availability_status: "available",
          },
        },
      });
    } else if (req.body.status === "cancelled") {
      res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result?.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const bookingControllers = {
  createBooking,
  getBookings,
  updateBooking,
};
