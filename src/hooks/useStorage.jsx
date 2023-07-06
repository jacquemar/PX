import { async } from "@firebase/util";
import { useState, useEffect } from "react";
import { db, idb } from "../firebase/config";
import { getStorage, ref } from "firebase/storage";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //references
    const storageRef = ref(file.name);
    idb.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadUrl();
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
