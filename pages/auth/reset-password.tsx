import styles from "@/styles/auth.module.css";
import React, { useState } from "react";
import SendAuthData from "@/components/utils/sendAuthData";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLoadingContext } from "@/components/context/loading_context";

export default function Login() {
  const router = useRouter();
  const { setLoading } = useLoadingContext();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit() {
    if (!userData.email || !userData.password) {
      console.log("fields missing");
      return;
    }

    var res = await SendAuthData({
      route: "login",
      data: userData,
      setLoading,
    });
    if (res.status == 200) {
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    }
  }

  return (
    <div className="home_container">
      <div className={styles.login}>
        <form onSubmit={handleSubmit}>
          <h1>Request Password Reset Email</h1>
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

          <Button
            className={styles.button}
            fullWidth
            type="submit"
            variant="contained"
          >
            Send Email
          </Button>
        </form>

        <Button
          className={styles.button}
          fullWidth
          type="submit"
          variant="text"
        >
          <Link href="/auth/login">Login here</Link>
        </Button>
      </div>
    </div>
  );
}
