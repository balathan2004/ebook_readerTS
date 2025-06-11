import { IncomingForm } from "formidable";
import PDFJS from "pdfjs-dist";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseConfig } from "@/components/interfaces";
import fs from "fs";
import { TextItem } from "pdfjs-dist/types/src/display/api";
import { storage } from "@/components/config/config";
import { ref, uploadString } from "firebase/storage";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) => {
  if (req.method == "POST") {
    post(req, res);
  }
};

const post = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) => {
  try {
    const form = new IncomingForm({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form Parsing Error:", err);
        res.status(500).json({ status: 300, message: "Form parsing failed" });
        return;
      }

      const EBookUserId =
        req.cookies?.EBookUserId || fields?.EBookUserId?.[0] || "";

      if (!files.file || files.file.length === 0) {
        return res.status(400).json({ status: 300, message: "File not found" });
      }
      var fileData = {
        fileName: files.file[0].originalFilename || "untitled_file",
        uid: EBookUserId,
      };

      const fileBuffer = fs.readFileSync(files.file[0].filepath);
      const uint8Array = new Uint8Array(fileBuffer);

      res.json({ status: 200, message: "success" });

      convertFile({
        fileBuffer: uint8Array,
        fileName: fileData.fileName,
        uid: fileData.uid,
      });
    });
  } catch (err) {
    res.json({ status: 300, message: err as string });
  }
};

interface Props {
  fileBuffer: Uint8Array<ArrayBuffer>;
  fileName: string;
  uid: string;
}

async function convertFile({ fileBuffer, fileName, uid }: Props) {
  try {
    const data = await GetSingleBookData(fileBuffer);
    console.log(data);
    const newFileName = `${fileName.replace(".pdf", "")}.json`;
    await uploadFileString(data, newFileName, uid);
  } catch (error) {
    console.error("Conversion Error:", error);
  }
}

async function GetSingleBookData(fileBuffer: Uint8Array | ArrayBuffer) {
  try {
    const pdfjs = await import("pdfjs-dist");
    const pdfDoc = await pdfjs.getDocument(fileBuffer).promise;
    const totalPages = pdfDoc.numPages;

    const pageTexts = await Promise.all(
      Array.from({ length: totalPages }, async (_, index) => {
        const page = await pdfDoc.getPage(index + 1);
        const textContent = await page.getTextContent();

        return textContent.items
          .map(
            (item) =>
              (item as TextItem).str?.replace(/ {2,}/g, " ").trim() || ""
          )
          .join(" ");
      })
    );

    return { pageData: { data: pageTexts }, totalPage: totalPages };
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    return { pageData: { data: [] }, totalPage: 0 };
  }
}

async function uploadFileString(
  textContent: any,
  fileName: string,
  uid: string
) {
  try {
    const storageRef = ref(storage, `/${uid}/books/${fileName}`);
    await uploadString(storageRef, JSON.stringify(textContent), "raw", {
      contentType: "application/json", // Set correct MIME type
    });
    console.log("Upload Successful:", fileName);
    return { success: true, message: "Upload completed" };
  } catch (error) {
    console.error("Upload Error:", error);
    return { success: false, message: "Upload failed" };
  }
}
