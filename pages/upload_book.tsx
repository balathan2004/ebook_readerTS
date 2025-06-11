import React, { useState } from "react";
import styles from "@/styles/upload.module.css";
import { useRouter } from "next/router";
import { useUserCredContext } from "@/components/context/usercred_context";
import { Button } from "@mui/material";
export default function UploadBook() {
  const navigate = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [redirectMessage, setRedirectMessage] = useState("");
  const { userCred } = useUserCredContext();
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setFile(e.target.files[0]);
  }

  async function submit() {
    if (!file || !userCred) {
      console.log("file not selected");
      return;
    }
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("EBookUserId", userCred?.userId);
  //  const url = "http://localhost:3001/ebook_reader/upload_book";
  const localUrl='/api/books/upload_book'
    const res = await fetch(localUrl, {
      method: "POST",
      body: formdata,
    });
    var response = await res.json();
    console.log(response);
    if (response.message == "success") {
      setTimeout(() => {
        setRedirectMessage("File Uploaded Success Redirecting");
        navigate.push("/home");
      }, 5000);
    }
  }

  return (
    <div className="home_container">
      <div className="uploader-container">
        <div className={styles.card}>
          <h2>{redirectMessage ? redirectMessage : ""}</h2>
          <h3>Upload Files</h3>
          <div className={styles.drop_box}>
            <header>
              <h4>Select File here</h4>
            </header>
            <p>Files Supported: PDF, TEXT</p>
            <input type="file" onChange={handleFile}></input>
            <Button variant="contained" onClick={submit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
