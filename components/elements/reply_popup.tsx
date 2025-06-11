import { useReplyContext } from "../context/reply_context";
import { Snackbar } from "@mui/material";

export default function SnackbarComponent() {
  const { reply, setReply } = useReplyContext();

  function handleClose() {
    setReply("");
  }

  if (reply) {
    return (
      <>
        <Snackbar
          open={!!reply}
          autoHideDuration={6000}
          onClose={handleClose}
          message={reply}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </>
    );
  }
}
