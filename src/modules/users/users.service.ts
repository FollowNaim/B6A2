import bcrypt from "bcrypt";
import { Request } from "express";
import { pool } from "../../config/db";
import { CreateUserPayload } from "../../types/users";

const createUser = async (payload: CreateUserPayload) => {
  const { name, email, password, phone, role } = payload;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      `
    INSERT INTO users(name, email, password, phone, role) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
      [name, email, encryptedPassword, phone, role]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const getUsers = async () => {
  try {
    const result = await pool.query(`
            SELECT * FROM users
            `);
    return result;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (re: Request) => {
  const { name, email, phone, role } = re.body;
  const id = re.params.userId;
  try {
    const result = await pool.query(
      `
            UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *
            `,
      [name, email, phone, role, id]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (id: string) => {
  try {
    const re = await pool.query(
      `
      SELECT * FROM bookings WHERE customer_id=$1
      `,
      [id]
    );
    if (re.rows.length) {
      return {
        success: false,
        message: "user's booking is exists. can't be deleted the user!",
      };
    }
    await pool.query(
      `
            DELETE FROM users WHERE id=$1 RETURNING *
            `,
      [id]
    );
    return { success: true, message: "User deleted successfully" };
  } catch (err) {
    throw err;
  }
};

export const usersServices = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
