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
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

function Post() {
  const [{ alt, src }, setImg] = useState({
    src: "",
    alt: "Upload an Image",
  });

  const [title, setTitle] = useState("");
  const [imgPre, setImgPre] = useState("");
  const [show, setShow] = useState(false);
  const [pshow, setPshow] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const user = useSelector((state) => state.login.user);

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: e.target.files[0],
        alt: e.target.files[0].name,
      });

      setImgPre(URL.createObjectURL(e.target.files[0]));
    }
    setShow(true);
  };

  const handleUplode = () => {
    const uploadTask = storage.ref(`/images/${src.name}`).put(src);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const ps = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        );
        setProgress(ps);
        setPshow(true);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(src.name)
          .getDownloadURL()
          .then((img) => {
            console.log(img);
            db.collection("tweet").add({
              timetamp: firebase.firestore.FieldValue.serverTimestamp(),
              avatar: user.avatar,
              title: title,
              img: img,
              varified: true,
              username: user.username,
              name: user.name,
            });

            setTitle("");
            setPshow(false);
          });
      }
    );
  };

  return (
    <>
      <div className="post">
        <div className="post__top">
          <Avatar src={user.avatar} />
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
        <LinearProgress
          variant="determinate"
          value={progress}
          className={pshow ? "pp ps" : "pp"}
        />
      </div>

      <div className={show ? "img__preview img__preview_show" : "img__preview"}>
        <img src={imgPre} alt="" />
        <div className="button" onClick={() => setShow(false)}>
          Choose
        </div>
      </div>
      <div
        className={show ? "layer_show layer" : "layer"}
        onClick={() => setShow(false)}
      ></div>
    </>
  );
}

export default Post;
