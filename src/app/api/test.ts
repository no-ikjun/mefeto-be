import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function Test(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const { rows } = await sql`SELECT * FROM users`;
      return rows;
    case "POST":
      return res.status(200).json({ message: "POST" });
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
