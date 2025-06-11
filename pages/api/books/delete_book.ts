import { ResponseConfig } from "@/components/interfaces";
import { storage } from "@/components/config/config";
import { ref, deleteObject } from "firebase/storage";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) => {
  const uid = req.cookies.EBookUserId || req.body.EBookUserId;
  const { bookName } = req.body;
  console.log(bookName);

  const fileRef = ref(storage, `${uid}/books/${bookName}`);
  await deleteObject(fileRef)
    .then(console.log)
    .catch((err) => {
      console.log(err);
      res.json({ status: 200, message: err });
      return;
    });
  res.json({ status: 200, message: "File Deleted Successfully" });
};
