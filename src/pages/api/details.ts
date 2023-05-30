import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function Topics(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return await getDetail(req, res);
    default:
      return res.status(400).end(`Method Not Allowed`);
  }
}

const getDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  const order = req.query.order;
  if (!order) {
    return res.status(400).end(`There must be an id.`);
  } else {
    const temp_order = JSON.stringify(order).slice(1, -1);
    try {
      const { rows } = await sql`SELECT id,title,detail FROM topics where id=${temp_order};`;
      return res.status(200).json(rows);
    } catch (err: any) {
      return res.status(500).json({ err });
    }
  }
};
