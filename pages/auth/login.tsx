import styles from "@/styles/auth.module.css";
import React, { useState } from "react";
import SendAuthData from "@/components/utils/sendAuthData";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLoadingContext } from "@/components/context/loading_context";
import { useReplyContext } from "@/components/context/reply_context";
import { useUserCredContext } from "@/components/context/usercred_context";
import { useNavContext } from "@/components/context/navbar_context";

export default function Login() {
  const router = useRouter();
  const { loading, setLoading } = useLoadingContext();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { setUserNav } = useNavContext();
  const { setReply } = useReplyContext();
  const { setUserCred } = useUserCredContext();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userData.email || !userData.password) {
      console.log("fields missing");
      return;
    }

    setLoading(true);

    var res = await SendAuthData({
      route: "/api/auth/login",
      data: userData,
    });

    setReply(res.message);

    setLoading(false);

    if (res.status == 200) {
      setUserCred(res.userCredentials);
      setUserNav();
      // setTimeout(() => {
      //   router.push("/home");
      // }, 1000);
       router.push("/home");
    }
  }

  return (
    <div className="home_container">
      <div className={styles.login}>
        <form onSubmit={handleSubmit}>
          <h1>Login to Ebook Reader</h1>
          <div className={styles.input_box}>
            <label>Enter Email</label>
            <TextField
              onChange={handleInput}
              fullWidth
              required
              type="text"
              name="email"
              placeholder="Email"
              className={styles.input}
              autoCapitalize="none"
            />
          </div>

          <div className={styles.input_box}>
            <label>Enter Password</label>
            <TextField
              onChange={handleInput}
              fullWidth
              name="password"
              required
              type="text"
              placeholder="Password"
              className={styles.input}
              autoCapitalize="none"
            />
          </div>

          <Button className={styles.button} fullWidth variant="text">
            <Link href="/auth/reset-password">forget password ?</Link>
          </Button>

          <Button
            disabled={loading}
            className={styles.button}
            fullWidth
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </form>

        <Button className={styles.button} fullWidth variant="text">
          <Link href="/auth/register">Signup now</Link>
        </Button>
      </div>
    </div>
  );
}
