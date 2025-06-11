import { PageResponseConfig } from "@/components/interfaces";
import { storage } from "@/components/config/config";
import { ref, getDownloadURL } from "firebase/storage";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getSinglePage(
  req: NextApiRequest,
  res: NextApiResponse<PageResponseConfig>
) {
  try {
    const { EBookUserId } = req.cookies || req.body;
    const { bookName, startFrom } = req.body;

    if (!EBookUserId || !bookName) {
      res.json({
        status: 300,
        pageData: [],
        totalPage: 0,
        message: "Book not found",
      });
      return;
    }
    const fileRef = ref(storage, `/${EBookUserId}/books/${bookName}`);

    const fileUrl = await getDownloadURL(fileRef);
    const fileRes = await fetch(fileUrl);
    const bookData = await fileRes.json();

    console.log(bookData.pageData);

    const startIdx = Number(startFrom) || 0; // Ensure `startFrom` is a valid number
    const endIdx = startIdx + 10;
    res.json({
      status: 200,
      pageData: bookData.pageData.data.slice(startIdx, endIdx) as string[],
      totalPage: bookData.totalPage,
      message: "Book fetched",
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: 300,
      pageData: [],
      totalPage: 0,
      message: "Book not found",
    });
  }
}
