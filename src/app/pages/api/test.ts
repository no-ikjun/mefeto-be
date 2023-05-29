import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function Sessions(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return await getSessions(req, res);
    case "POST":
      return await addSession(req, res);
    default:
      return res.status(400).end(`Method Not Allowed`);
  }
}

const getSessions = async (req: NextApiRequest, res: NextApiResponse) => {
  const order = req.query.order;
  if (!order) {
    try {
      const { rows } = await sql`SELECT * FROM sessions order by id asc;`;
      return res.status(200).json(rows);
    } catch (err: any) {
      return res.status(500).json({ err });
    }
  } else {
    const temp_order = JSON.stringify(order).slice(1, -1);
    try {
      const { rows } = await sql`SELECT * FROM sessions where id=${temp_order};`;
      return res.status(200).json(rows);
    } catch (err: any) {
      return res.status(500).json({ err });
    }
  }
};

const addSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { count, datetime, place, participant, description } = req.body;
    const result = await sql`INSERT INTO sessions (count, datetime, place, participant, description) VALUES (${count}, ${datetime}, ${place}, ${participant}, ${description});`;
    return res.status(200).json({ result });
  } catch (err: any) {
    return res.status(500).json({ err });
  }
};
