import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
import { firebase, firestore } from "@/components/config/config";
import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthResponseConfig, UserDataInterface } from "@/components/interfaces";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) => {
  const auth = getAuth(firebase);

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Email and password are required",
      status: 300,
      userCredentials: null,
    });
    return;
  }
  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user) {
      res.status(400).json({
        message: "Account not found",
        status: 300,
        userCredentials: null,
      });
      return;
    }

    const userDocRef = doc(firestore, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return res.status(400).json({
        message: "User data not found in database",
        status: 300,
        userCredentials: null,
      });
    }

    const userData = userDocSnap.data() as UserDataInterface;

    // Set authentication cookie
    setCookie("EBookUserId", user.uid, {
      req,
      res,
      maxAge: 900000, // 15 minutes
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

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
