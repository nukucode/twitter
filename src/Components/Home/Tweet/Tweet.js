import React from "react";
import "./Tweet.css";
import Avatar from "@mui/material/Avatar";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

function Tweet({ avatar, img, title, name, timetamp, varified, username }) {
  return (
    <>
      <div className="tweett">
        <div className="tweet__top">
          <Avatar src={avatar} />
          <div className="user_info">
            <span>
              {name} - <p>@{username}</p> -<p>{new Date(timetamp?.toDate()).toLocaleDateString()}</p>
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
          <FavoriteBorderIcon />
          <ShareIcon />
        </div>
      </div>
    </>
  );
}

export default Tweet;
