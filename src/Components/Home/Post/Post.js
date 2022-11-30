import React, { useState, useEffect } from "react";
import "./Post.css";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Avatar from "@mui/material/Avatar";
import { storage } from "../../../Firebase/Firebase";
import db from "../../../Firebase/Firebase";
import firebase from "firebase/compat/app";
import LinearProgress from "@mui/material/LinearProgress";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";

function Post() {
  const [img, setImg] = useState(null);

  const [show, setShow] = useState(false);
  const [pshow, setPshow] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const user = useSelector((state) => state.login.user);
  const [image, setImage] = useState(null);

  const [text, setText] = useState("");

  const handleImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImage(e.target.files[0]);
    }
    reader.onload = (eventResult) => {
      setImg(eventResult.target.result);
    };

    setShow(true);
  };

  const handleUplode = () => {
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
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
          .child(image.name)
          .getDownloadURL()
          .then((img) => {
            console.log(img);
            db.collection("tweet").add({
              timetamp: firebase.firestore.FieldValue.serverTimestamp(),
              avatar: user.avatar,
              title: text,
              img: img,
              varified: true,
              username: user.username,
              name: user.name,
            });

            setText("");
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
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            onEnter={(e) => setText(e.target.value)}
            placeholder="Type a message"
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
          <div onClick={() => setShow(true)}>
            <SentimentSatisfiedAltOutlinedIcon />
          </div>
          <PollOutlinedIcon />
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
        <img src={img} />
        <button className="button" onClick={() => setShow(false)}>
          Choose
        </button>
      </div>
      <div
        className={show ? "layer_show layer" : "layer"}
        onClick={() => setShow(false)}
      ></div>
    </>
  );
}

export default Post;
