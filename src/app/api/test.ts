import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function Test(req: NextApiRequest, res: NextApiResponse) {
  const { rows } = await sql`SELECT * FROM members`;
  res.status(200).json({ rows });
}
