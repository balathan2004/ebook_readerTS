import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/components/config/config";

interface Props {
  textContent: Object;
  fileName: string;
  uid: string;
}

export default async function uploadFileString({
  textContent,
  fileName,
  uid,
}: Props) {
  const storageRef = ref(storage, `/${uid}/books/${fileName}`);
  await uploadString(storageRef, JSON.stringify(textContent));
  console.log("success");
}
