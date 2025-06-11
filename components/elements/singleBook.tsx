import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/Home.module.css";
import SendData from "../utils/sendFunction";

interface Props {
  bookName: string;
  allBookNames: string[];
  setBookFunction: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SingleBook({
  bookName,
  setBookFunction,
  allBookNames,
}: Props) {
  async function removeBook() {
    if (!bookName) {
      return;
    }
    var prom = prompt(
      "Do You want to remove" + bookName + "\n Yes or No"
    )?.toLowerCase();

    if (prom == "yes" || prom == "y") {
      var res = await SendData({
        data: { bookName: bookName },
        route: "/api/books/delete_book",
      });
      console.log(res);
      setBookFunction((prev) => prev.filter((book) => book != bookName));
    }
  }

  return (
    <div className={styles.book}>
      <span onClick={removeBook}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faTrash}
        ></FontAwesomeIcon>
      </span>
      <a href={`book/${bookName}`}>
        <div className={styles.book_div}>
          <img src={"./pdf-icon.png"} />
          <p>{bookName}</p>
        </div>
      </a>
    </div>
  );
}
