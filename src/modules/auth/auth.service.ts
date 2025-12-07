import bcrypt from "bcrypt";
import { Request } from "express";
import { pool } from "../../config/db";
import { Jwt } from "jsonwebtoken";

const loginUser = async (req: Request) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query(
      `
          SELECT * FROM users WHERE email=$1
          `,
      [email]
    );
    const decryptPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    return { decryptPassword, token: "1234" };
  } catch (err) {
    throw err;
  }
};

export const authServices = { loginUser };
