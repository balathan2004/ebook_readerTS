import { NextApiRequest, NextApiResponse } from "next";
import { generateUsername } from "unique-username-generator";
export default function (req: NextApiRequest, res: NextApiResponse) {
  const name = generateUsername("_", 5);
  console.log(name);

  res.json({ message: name });
}
