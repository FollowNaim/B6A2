import { Request } from "express";
import { pool } from "../../config/db";

const getBookings = async (req: Request) => {
  // ! TODO: will chagne layout if user is not admin
  const role = req.user?.role;
  const email = req.user?.email;
  console.log(req.user);
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email]
  );
  if (role === "customer") {
    console.log("role is cutomer");
    const personalBookings = await pool.query(
      `
      SELECT * FROM bookings WHERE customer_id=$1
      `,
      [user.rows[0].id]
    );
    const formatted = personalBookings.rows.map((b) => {
      const { customer_id, ...rest } = b;
      return rest;
    });
    return formatted;
  }
  try {
    const result = await pool.query(
      `
    SELECT * FROM bookings
    `
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const createBooking = async (req: Request) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;
  const s = new Date(rent_start_date);
  const e = new Date(rent_end_date);
  const diffTime = e.getTime() - s.getTime();
  const totalDays = diffTime / (1000 * 60 * 60 * 24);

  try {
    const vehicle = await pool.query(
      `
        SELECT * FROM vehicles WHERE id=$1
        `,
      [vehicle_id]
    );
    const totalPrice = vehicle.rows[0].daily_rent_price * totalDays;
    await pool.query(
      `
        UPDATE vehicles SET availability_status='booked' WHERE id=$1
        `,
      [vehicle_id]
    );
    const result = await pool.query(
      `
    INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3,$4,$5, $6) RETURNING *
    `,
      [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        totalPrice,
        "active",
      ]
    );
    return { result, vehicle };
  } catch (err) {
    throw err;
  }
};

const updateBooking = async (status: string, id: string) => {
  const booking = await pool.query(
    `
        SELECT * FROM bookings WHERE id=$1
        `,
    [id]
  );
  const vehicle = await pool.query(
    `
        SELECT * FROM vehicles WHERE id=$1
        `,
    [booking.rows[0].vehicle_id]
  );
  if (status === "returned") {
    try {
      await pool.query(
        `
        UPDATE vehicles SET availability_status='available' WHERE id=$1
        `,
        [vehicle.rows[0].id]
      );
      const result = await pool.query(
        `
          UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *
          `,
        [status, id]
      );
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  } else if (status === "cancelled") {
    try {
      await pool.query(
        `
        UPDATE vehicles SET availability_status='available' WHERE id=$1
        `,
        [vehicle.rows[0].id]
      );
      const result = await pool.query(
        `
          UPDATE bookings SET status='cancelled' WHERE id=$1 RETURNING *
          `,
        [id]
      );
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }
};

export const bookingServices = { createBooking, getBookings, updateBooking };
