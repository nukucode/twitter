import React, { useState } from "react";
import "./Emoji.css";
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { useDispatch } from "react-redux";
import { emoji } from "../../../features/emojiSlice";

function Emoji({ show }) {
  const [chooseEmoji, setChooseEmoji] = useState(null);
  const dispatch = useDispatch();

  const onEmojiClick = (event, emojiObject) => {
    setChooseEmoji(emojiObject);
    dispatch(emoji(chooseEmoji));
  };
  return (
    <>
      <div className={show ? "emojii emoji_show" : "emojii"}>
      <Picker  onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
      </div>
    </>
  );
}

export default Emoji;
