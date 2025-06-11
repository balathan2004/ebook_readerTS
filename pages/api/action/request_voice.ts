import { PassThrough } from "stream";
import { NextApiRequest, NextApiResponse } from "next";

import gTTS from 'gtts'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { text } = req.body;
    const gtts = new gTTS(text, "en");
    const stream = new PassThrough();
    gtts.stream().pipe(stream);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", 'attachment; filename="output.mp3"');
    stream.pipe(res);
  } catch (error) {
    console.error("Error during TTS conversion:", error);
    if (error instanceof Error && (error as any).code === "ETIMEDOUT") {
      res.status(504).json({ error: "TTS service timed out." }); // 504 Gateway Timeout
    } else {
      res
        .status(500)
        .json({ error: "An error occurred during TTS conversion." }); // 500 Internal Server Error
    }
  }
}
