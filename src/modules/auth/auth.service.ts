import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { pool } from "../../config/db";

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
    console.log(user.rows[0]);
    const { name, email: dbEmail, role } = user.rows[0];
    const token = jwt.sign(
      { name, email: dbEmail, role },
      config.jwt_secret as string,
      {
        expiresIn: "1d",
      }
    );
    return { decryptPassword, token };
  } catch (err) {
    throw err;
  }
};

export const authServices = { loginUser };
