import { firestore } from "@/components/config/config";
import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthResponseConfig, UserDataInterface } from "@/components/interfaces";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) => {
  const { EBookUserId } = req.cookies;

  if (!EBookUserId) {
    res.status(400).json({
      message: "User not authenticated. Please log in.",
      status: 300,
      userCredentials: null,
    });
    return;
  }

  try {
    const userDocRef = doc(firestore, "users", EBookUserId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return res.status(400).json({
        message: "User data not found in database",
        status: 300,
        userCredentials: null,
      });
    }

    const userData = userDocSnap.data() as UserDataInterface;

    // Successful response
    res.status(200).json({
      message: "Login successful",
      status: 200,
      userCredentials: userData,
    });
  } catch (error: any) {
    console.error("Login Error:", error.message);
    res.status(400).json({
      message: error.code || "Login failed",
      status: 300,
      userCredentials: null,
    });
    return;
  }
};
