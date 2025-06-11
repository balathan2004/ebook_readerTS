import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";
import { useLoadingContext } from "@/components/context/loading_context";
import { useReplyContext } from "@/components/context/reply_context";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
export default function Page() {
  const [pageData, setPageData] = useState("");
  const wordLimit = 3000;
  const [wordRemaining, setWordRemaining] = useState(wordLimit);
  const textareaRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { setLoading } = useLoadingContext();
  const { setReply } = useReplyContext();

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

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    if (value.length <= wordLimit) {
      setPageData(value);
      setWordRemaining(wordLimit - value.length);
    } else {
      // Limit to the first 3000 characters
      setPageData(value.substring(0, wordLimit));
      setWordRemaining(0);
    }
  };

  const sendAudioRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAudioUrl("");

    if (pageData) {
      await reqAudio(pageData.trim());
    } else {
      setReply("Enter valid text for conversion");
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = "ebook-reader-output.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl; // Set the audio source
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
        <div className={styles.reader}>
          <h1>Quick Convert</h1>
          <span></span>

          <form onSubmit={sendAudioRequest}>
            <TextField
              value={pageData}
              onChange={handleInput}
              placeholder="Enter the text to speech"
              ref={textareaRef}
              multiline
              fullWidth
              required
            ></TextField>
            <span>
              {wordRemaining} characters remaining - {wordLimit} characters
              limit
            </span>
            {audioUrl ? (
              <>
                <audio ref={audioRef} controls>
                  <p>Your browser does not support the audio element.</p>
                </audio>
              </>
            ) : null}
            <div className={styles.btn_container}>
              <Button variant="outlined" disabled={!pageData} type="submit">
                Convert
              </Button>
              <Button
                variant="outlined"
                disabled={!audioUrl || !pageData}
                onClick={() => audioControl("play")}
              >
                Speak Now
              </Button>
              <Button
                variant="outlined"
                disabled={!audioUrl || !pageData}
                onClick={() => audioControl("pause")}
              >
                Pause
              </Button>
              <Button
                variant="outlined"
                disabled={!audioUrl || !pageData}
                onClick={() => audioControl("play")}
              >
                Resume
              </Button>
              <Button
                variant="outlined"
                disabled={!audioUrl || !pageData}
                onClick={() => audioControl("restart")}
              >
                start over
              </Button>

              <Button
                variant="outlined"
                disabled={!audioUrl || !pageData}
                onClick={() => audioControl("cancel")}
              >
                Cancel
              </Button>
              {/* <button onClick={handleDownload}>Download Audio</button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
