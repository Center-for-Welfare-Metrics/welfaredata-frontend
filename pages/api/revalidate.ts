// pages/api/revalidate.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { specie, secret } = req.query;

  if (secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!specie || typeof specie !== "string") {
    return res.status(400).json({ message: "Missing or invalid specie" });
  }

  try {
    const path = `/processograms/${specie}`;
    await res.revalidate(path);
    return res.json({ revalidated: true, path });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error revalidating");
  }
}
