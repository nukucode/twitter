import React, { useState, useEffect } from "react";
import "./Post.css";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Avatar from "@mui/material/Avatar";
import { storage } from "../../../Firebase/Firebase";
import db from "../../../Firebase/Firebase";
import firebase from "firebase/compat/app";

function Post() {
  const [{ alt, src }, setImg] = useState({
    src: "",
    alt: "Upload an Image",
  });

  const [title, setTitle] = useState("");
  const [imgPre, setImgPre] = useState("");
  const [show, setShow] = useState(false)

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: e.target.files[0],
        alt: e.target.files[0].name,
      });

      setImgPre(URL.createObjectURL(e.target.files[0]));
    }
    setShow(true)
  };

  const handleUplode = () => {
    const uplodeTask = storage.ref(`media/${src.name}`).put(src);
    uplodeTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },

      (error) => {
        // error fuction //
        console.log(error);
      },
      () => {
        storage.ref("media").child(src.name).getDownloadURL()
          .them((url) => {
           console.log(url);
          });

        setTitle("");
      }
    );
  };

  ///

  return (
    <>
      <div className="post">
        <div className="post__top">
          <Avatar />
          <input
            type="text"
            placeholder="What happening?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="post__bottom">
          <label htmlFor="media">
            <input
              type="file"
              accept="image/*"
              id="media"
              multiple
              onChange={(e) => handleImg(e)}
            />
            <InsertPhotoOutlinedIcon />
          </label>
          <GifOutlinedIcon />
          <PollOutlinedIcon />
          <SentimentSatisfiedAltOutlinedIcon />
          <PendingActionsOutlinedIcon />
          <LocationOnOutlinedIcon />
          <button className="btn" onClick={handleUplode}>
            Tweet
          </button>
        </div>
      </div>

      <div className={show ? "img__preview img__preview_show" : "img__preview"}>
        <img src={imgPre} alt="" />
      </div>
      <div
        className={show ? "layer_show layer" : "layer"}
        onClick={() => setShow(false)}
      ></div>
    </>
  );
}

export default Post;
