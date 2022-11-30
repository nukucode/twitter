import React, { useState, useEffect } from "react";
import "./Tweet.css";
import Avatar from "@mui/material/Avatar";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import Moment from "react-moment";
import db from "../../../Firebase/Firebase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";

function Tweet({ avatar, img, title, name, id, timetamp, varified, username }) {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const uid = useSelector((state) => state.login.user?.uid);


  useEffect(
    () =>
      db
        .collection("tweet")
        .doc(id)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        }),
    [db, id]
  );


  useEffect(
    () => setLike(likes.findIndex((like) => like.id === uid) !== -1),
    [db, likes]
  );


  const likeHandler = async () => {
    if (like) {
      db.collection("tweet").doc(id).collection("likes").doc(uid).delete();
    } else {
      await db.collection("tweet").doc(id).collection("likes").doc(uid).set({
        name: name,
      });
    }
  };

  return (
    <>
      <div className="tweett">
        <div className="tweet__top">
          <Avatar src={avatar} />
          <div className="user_info">
            <span>
              <span className="user_name">{name}</span> <p>@{username}</p> -
              <Moment fromNow className="moment">{timetamp?.toDate()}</Moment>
            </span>
            <p className="title">{title}</p>
          </div>
          <div className="tweet__btn">
            <MoreHorizOutlinedIcon />
          </div>
        </div>
        <div className="tweet__mid">
          <img src={img} alt="title" />
        </div>

        <div className="tweet__bottom">
          <ReplyIcon />
          <RepeatIcon />
          {like ? (
            <span className="fil">
              <FavoriteIcon onClick={() => likeHandler()} />
              {likes && <span>{likes.length}</span>}
            </span>
          ) : (
            <span onClick={() => likeHandler()} className="outline">
              <FavoriteBorderIcon />
              {likes && <span>{likes.length}</span>}
            </span>
          )}
          <ShareIcon />
        </div>
      </div>
    </>
  );
}

export default Tweet;
