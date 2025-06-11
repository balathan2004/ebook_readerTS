import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";
import { useLoadingContext } from "@/components/context/loading_context";
import { useReplyContext } from "@/components/context/reply_context";
import { Button } from "@mui/material";
import { PageResponseConfig } from "@/components/interfaces";
import { useUserCredContext } from "@/components/context/usercred_context";

export default function Page() {
  const router = useRouter();
  const [pageNum, setPageNum] = useState(0);
  const [limiter, setLimiter] = useState(0);
  const [pageData, setPageData] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState("");
  // const [VoiceNum, setVoiceNum] = useState(0);
  const { setLoading } = useLoadingContext();
  const { setReply } = useReplyContext();
  const [totalPage, setTotalPage] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { userCred } = useUserCredContext();
  const [disableNextBtn, setDisableNextBtn] = useState(false);

  const id = router.query.id as string;

  function setPages(value: number) {
    localStorage.setItem(id, String(value));
  }

  async function fetchData() {
    const dataNeed = {
      startFrom: limiter,
      bookName: id,
      EBookUserId: userCred?.userId || "",
    };
    try {
      setLoading(true);
      setDisableNextBtn(true);
      const res = await fetch(`/api/books/get_single_page?limit=10`, {
        method: "POST",
        body: JSON.stringify(dataNeed),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await res.json()) as PageResponseConfig;
      console.log(data);
      if (data.status == 200) {
        setPageData((prev) => {
          const newData = [...prev, ...data.pageData];
          setCurrentPage(newData[pageNum]);
          return newData;
        });
        setTotalPage(data.totalPage);
      }
    } catch (err) {
      console.log(err);
    }
    setDisableNextBtn(false);
    setLoading(false);
  }

  function NextPage() {
    if (pageNum + 1 >= totalPage) return;
    setLoading(true);
    setAudioUrl("");
    setPageNum((prev) => {
      const newPageNum = prev + 1;
      setCurrentPage(pageData[newPageNum]); // Use modulo to get local page
      return newPageNum;
    });
    if ((pageNum + 1) % 10 === 0) {
      setLimiter((prev) => prev + 10);
    }

    setReply("Moving to next page");
    //setPages(pageNum + 1);
    setLoading(false);
  }

  function audioControl(action: "play" | "pause" | "cancel" | "restart") {
    const actions = {
      play: () => audioRef.current?.play(),
      pause: () => audioRef.current?.pause(),
      cancel: () => {
        audioRef.current?.pause();
        audioRef.current && (audioRef.current.currentTime = 0);
      },
      restart: () => {
        audioRef.current?.pause();
        audioRef.current && (audioRef.current.currentTime = 0);
        audioRef.current?.play();
      },
    };

    actions[action]?.();
  }

  function gotoPage() {
    const newPageNum = parseInt(prompt("Enter Page Number") || "");
    if (
      !Number.isInteger(newPageNum) ||
      newPageNum < 1 ||
      newPageNum > totalPage
    ) {
      alert("Invalid Page Number");
      return;
    }
    setPageNum(newPageNum - 1);
    setPages(newPageNum - 1);
  }

  useEffect(() => {
    fetchData();
  }, [id, limiter]);

  useEffect(() => {
    if (audioRef.current) {
      if (audioUrl) {
        audioRef.current.src = audioUrl; // Set the audio source
      } else {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    }
  }, [audioUrl]);

  const reqAudio = async (pageData: string) => {
    if (!pageData) return;
    const response = await fetch("/api/action/request_voice", {
      body: JSON.stringify({ text: pageData }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("error conversion");
    } else {
      console.log("audio got");
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    }
  };

  return (
    <div className="home_container">
      <div className={styles.text_book}>
        <div className={styles.contentDetails}>
          <h1>{id}</h1>
          <span>
            {totalPage ? `Current Page ${pageNum + 1}/${totalPage}` : null}
          </span>
        </div>
        <p className={styles.para}>
          {currentPage == "" ? "Empty Page" : currentPage}
        </p>
        <audio ref={audioRef} controls>
          <p>Your browser does not support the audio element.</p>
        </audio>
        <div className={styles.btn_container}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => reqAudio(currentPage)}
          >
            Generate Voice
          </Button>
          <Button
            variant="outlined"
            disabled={!audioUrl || !currentPage}
            onClick={() => audioControl("play")}
          >
            Speak Now
          </Button>
          <Button
            variant="outlined"
            disabled={!audioUrl || !currentPage}
            onClick={() => audioControl("pause")}
          >
            Pause
          </Button>
          <Button
            variant="outlined"
            disabled={!audioUrl || !currentPage}
            onClick={() => audioControl("play")}
          >
            Resume
          </Button>
          <Button
            variant="outlined"
            disabled={!audioUrl || !currentPage}
            onClick={() => audioControl("restart")}
          >
            start over
          </Button>

          <Button
            variant="outlined"
            disabled={!audioUrl || !currentPage}
            onClick={() => audioControl("cancel")}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            disabled={disableNextBtn}
            onClick={NextPage}
          >
            Next Page
          </Button>
          <Button variant="outlined" onClick={gotoPage}>
            Goto Page
          </Button>
        </div>
      </div>
    </div>
  );
}
