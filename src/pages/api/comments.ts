import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function Topics(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return await getComment(req, res);
    case "POST":
      return await addComment(req, res);
    default:
      return res.status(400).end(`Method Not Allowed`);
  }
}

const getComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const order = req.query.order;
  if (!order) {
    return res.status(400).end(`There must be an id.`);
  } else {
    const temp_order = JSON.stringify(order).slice(1, -1);
    try {
      const { rows } = await sql`SELECT id, position FROM topic_comment where topic=${temp_order};`;
      return res.status(200).json(rows);
    } catch (err: any) {
      return res.status(500).json({ err });
    }
  }
};

const addComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { author, content, position, created, topic } = req.body;
    const result = await sql`INSERT INTO topic_comment (author, content, position, created, topic) VALUES (${author}, ${content}, ${position}, ${created}, ${topic});`;
    return res.status(200).json({ result });
  } catch (err: any) {
    return res.status(500).json({ err });
  }
};
