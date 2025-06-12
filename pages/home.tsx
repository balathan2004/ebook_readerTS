import React, { useState, useEffect } from "react";
import SingleBook from "@/components/elements/singleBook";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import * as cookie from "cookie";
import { GetServerSidePropsContext } from "next";
import { BookDataResponseConfig } from "@/components/interfaces";
import { redirect } from "next/dist/server/api-utils";


interface Props {
  data: string[];
  error: string | null;
}

export default function Home({ data, error }: Props) {
  const navigator = useRouter();
  const [books, setBooks] = useState<string[]>(data || []);
  console.log(data);

  useEffect(() => {
    if (error || data.length==0) {
      const timer = setTimeout(() => {
        navigator.push("/upload_book");
      }, 3000);

      // Clean up the timer on unmount
      return () => clearTimeout(timer);
    }
  }, [error, navigator]);

  return (
    <div className="home_container">
      <div className={styles.container}>
        {books.length > 0
          ? books.map((x, index) => {
              return (
                <SingleBook
                  bookName={x}
                  key={index}
                  allBookNames={books}
                  setBookFunction={setBooks}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");
    const uid = cookies.EBookUserId || null;

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? `${process.env.HOSTING_URL}/api/books/get_book_names?id=${uid}`
        : `http://localhost:3000/api/books/get_book_names?id=${uid}`;

    console.log(apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = (await response.json()) as BookDataResponseConfig;
    console.log(responseJson);

    return {
      props: {
        data: responseJson.status == 200 ? responseJson.bookData : [],
        error: null,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect:{
        path:"/upload_book"
      }
  }
}
}
