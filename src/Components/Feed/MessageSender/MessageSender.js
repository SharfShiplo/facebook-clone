import React, { useState } from "react";
import "./MessageSender.css";
import { Avatar, CircularProgress } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useStateValue } from "../../../ContextApi/StateProvider";
import db, { storage } from "../../../firebase";
import firebase from "firebase";
function MessageSender() {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  // const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const uploadAnImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              message: input,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              profilePic: user.photoURL,
              username: user.displayName,
              image: url,
            });
            setProgress(0);
            setImage(null);
            setInput("");
          });
      }
    );
  };

  let circular = null;
  if (progress != 0) {
    circular = <CircularProgress value={progress} />;
  }

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        {circular}
        <Avatar src={user.photoURL} />
        <form>
          <input
            className="messageSender__input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Whats on your mind, ${user.displayName}?`}
          />
          {/* <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image url (optional)"
          /> */}
          <button type="submit" onClick={handleSubmit}>
            Hidden Submit
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo / Video</h3>
          <div className="messageSender__option__fileUploader">
            <input type="file" onChange={uploadAnImage} />
          </div>
        </div>
        <div className="messageSender__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Feeling / Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
