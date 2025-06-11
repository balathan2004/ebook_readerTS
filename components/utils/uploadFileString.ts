import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/components/config/config";

export default async function uploadFileString(
  textContent: any,
  fileName: string,
  uid: string
) {
  const storageRef = ref(storage, `/${uid}/books/${fileName}`);
  await uploadString(storageRef, JSON.stringify(textContent));
  console.log("success");
}
