import { BookDataResponseConfig } from "@/components/interfaces";
import { storage } from "@/components/config/config";
import { ref, listAll } from "firebase/storage";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<BookDataResponseConfig>
) => {
  var uid = req.query.id;

  if (!uid) {
    res.json({ status: 400, message: "uid not found", bookData: [] });
    return;
  }

  var storageRef = ref(storage, `${uid}/books/`);
  const result = await listAll(storageRef);
  // To get the actual files
  const bookNames = result.items.map((ele) => ele.name);
  console.log("alls ", bookNames);

  res.json({ status: 200, message: "success", bookData: bookNames });
};
