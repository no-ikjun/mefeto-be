import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function Test(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const { rows } = await sql`SELECT * FROM sessions order by id asc;`;
        return res.status(200).json(rows);
      } catch (err: any) {
        return res.status(500).json({ err });
      }
    case "POST":
      return res.status(200).json({ message: "POST" });
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
