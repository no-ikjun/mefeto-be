import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function Topics(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return await getTopics(req, res);
    case "POST":
      return await addTopics(req, res);
    default:
      return res.status(400).end(`Method Not Allowed`);
  }
}

const getTopics = async (req: NextApiRequest, res: NextApiResponse) => {
  const order = req.query.order;
  if (!order) {
    try {
      const { rows } = await sql`SELECT id,title,created,modified,url FROM topics order by id asc;`;
      return res.status(200).json(rows);
    } catch (err: any) {
      return res.status(500).json({ err });
    }
  } else {
    const temp_order = JSON.stringify(order).slice(1, -1);
    try {
      const { rows } = await sql`SELECT id,title,created,modified,url FROM topics where id=${temp_order};`;
      return res.status(200).json(rows);
    } catch (err: any) {
      return res.status(500).json({ err });
    }
  }
};

const addTopics = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, detail, created, modified, url } = req.body;
    const result = await sql`INSERT INTO sessions (title, detail, created, modified, url) VALUES (${title}, ${detail}, ${created}, ${modified}, ${url});`;
    return res.status(200).json({ result });
  } catch (err: any) {
    return res.status(500).json({ err });
  }
};
