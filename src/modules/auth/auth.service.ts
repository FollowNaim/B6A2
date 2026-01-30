import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { pool } from "../../config/db";

const loginUser = async (req: Request) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      `
          SELECT * FROM users WHERE email=$1
          `,
      [email],
    );
    if (!result.rows.length) {
      throw new Error("Invalid email or password");
    }
    const user = result.rows[0];
    const decryptPassword = await bcrypt.compare(password, user.password);
    if (!decryptPassword) {
      throw new Error("Invalid email or password");
    }

    const { name, email: dbEmail, role } = user;
    const token = jwt.sign(
      { name, email: dbEmail, role },
      config.jwt_secret as string,
      {
        expiresIn: "1d",
      },
    );
    const { password: _password, ...userWithoutPassword } = user;
    return { decryptPassword, token, user: userWithoutPassword };
  } catch (err) {
    throw err;
  }
};

export const authServices = { loginUser };
