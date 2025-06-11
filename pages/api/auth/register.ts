import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase, firestore } from "@/components/config/config";
import { NextApiRequest, NextApiResponse } from "next";
import { setDoc, doc } from "firebase/firestore";
import { setCookie } from "cookies-next";
import { AuthResponseConfig, UserDataInterface } from "@/components/interfaces";
import { generateUsername } from "unique-username-generator";
import { sendWelcomeEmail } from "@/components/server/sendWelcomeMail";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: "Method Not Allowed",
      status: 300,
      userCredentials: null,
    });
    return;
  }

  const auth = getAuth(firebase);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Missing email or password",
      status: 300,
      userCredentials: null,
    });
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    const username = generateUsername("_", 5);

    const userData: UserDataInterface = {
      userId: uid,
      email: email,
      username: username,
      createdAt: new Date().getTime(),
    };

    setCookie("EBookUserId", uid, {
      req,
      res,
      maxAge: new Date(Date.now() + 900000).getTime(),
      httpOnly: false,
      sameSite: "none",
      secure: true,
    });

    await setDoc(doc(firestore, "users", uid), userData);
    await sendWelcomeEmail({ userEmail: email, userName: userData.username });
    res.json({ message: "success", status: 200, userCredentials: userData });
  } catch (error: any) {
    console.error("Signup error:", error);

    let errorMessage = "An error occurred";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email is already registered";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password is too weak";
    }

    res
      .status(400)
      .json({ message: errorMessage, status: 300, userCredentials: null });
    return;
  }
}
