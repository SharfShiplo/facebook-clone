import React, { useState, useEffect, useRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import db from "../../../firebase";
import { useStateValue } from "../../../ContextApi/StateProvider";
import firebase from "firebase";
function Post({ postId, profilePic, image, username, timestamp, message }) {
  const [{ user }, dispatch] = useStateValue();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isliked, setIsliked] = useState(false);
  const commentRef = useRef();
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setComments(snapshot.docs.map((doc) => doc.data()))
        );
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const submitComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userImage: user.photoURL,
    });
    setComment("");
  };
  const commentnow = () => {
    commentRef.current.focus();
  };
  const likedOption = () => {
    setIsliked(!isliked);
  };
  return (
    <div className="post">
      <div className="post__top">
        <Avatar className="post__avatar" src={profilePic} />
        <div className="post_topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
      </div>
      <div className="post__image">
        <img src={image} alt="" />
      </div>
      <div className="post__options">
        <div
          className={`post__option ${isliked && "Post__optionLiked"}`}
          onClick={likedOption}
        >
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="post__option" onClick={commentnow}>
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <ShareOutlinedIcon />
          <p>Share</p>
        </div>
        <div className="post__option">
          <AccountCircleOutlinedIcon />
          <ExpandMoreOutlinedIcon />
        </div>
      </div>
      {comments.map((comment, i) => (
        <div key={i} className="post__commentsLoad">
          <Avatar src={comment.userImage} />
          <div className="post__commentsInfo">
            <h4>{comment.username}</h4>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
      <div className="post__commentsSend">
        <Avatar src={user.photoURL} />
        <form className="post__form">
          <input
            ref={commentRef}
            type="text"
            placeholder="write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" onClick={submitComment}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
