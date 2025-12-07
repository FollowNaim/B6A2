import { Request } from "express";
import { pool } from "../../config/db";

const getVehicles = async () => {
  try {
    const result = await pool.query(`
            SELECT * FROM vehicles
            `);
    return result;
  } catch (err) {
    throw err;
  }
};

const getSingleVehicle = async (id: string) => {
  try {
    const result = await pool.query(
      `
            SELECT * FROM vehicles WHERE id=$1
            `,
      [id]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const createVehicle = async (req: Request) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  try {
    const result = await pool.query(
      `
        INSERT INTO vehicles(vehicle_name,type,registration_number, daily_rent_price, availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *
        `,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
      ]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const upadteVehicle = async (req: Request) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  try {
    const result = await pool.query(
      `
        UPDATE vehicles SET vehicle_name=$1,type=$2,registration_number=$3,daily_rent_price=$4,availability_status=$5 WHERE id=$6 RETURNING *
        `,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        req.params.vehicleId,
      ]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteVehicle = async (id: string) => {
  try {
    const result = await pool.query(
      `
        DELETE FROM vehicles WHERE id=$1
        `,
      [id]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

export const vehicleServices = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  upadteVehicle,
  deleteVehicle,
};
