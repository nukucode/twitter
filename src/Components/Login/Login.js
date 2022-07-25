import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/loginSlice";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [username, setUsername] = useState("");
  const user = useSelector((state) => state.login.user);
  console.log(user);
  const [{ src, alt }, setImg] = useState({
    src: "",
    alt: "Uplde",
  });

  const [imgPrev, setImgPrev] = useState("");

  const imghandler = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: e.target.files[0],
        alt: e.target.files[0].name,
      });
    }

    setImgPrev(URL.createObjectURL(e.target.files[0]));
  };

  const dispatch = useDispatch();
  console.log(name, email, password);

  const handleAuth = (e) => {
    e.preventDefault();
    dispatch(
      login({
        name: name,
        email: email,
        password: password,
        loggedIn: true,
        username: username,
        avatar: imgPrev,
      })
    );
  };

  return (
    <>
      <div className="login__container">
        <form className="login">
          <h3 className="heading">Login 👇</h3>
          <Avatar src={imgPrev} />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => imghandler(e)}
            />
            <PhotoCamera />
            <span>Choose Your Avatar</span>
          </IconButton>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="@username"
            value={`${username}`}
            onChange={(e) => setUsername(e.target.value)}
            min="5"
            max="10"
            spellCheck="true"
            style={{ textTransform: "lowercase" }}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => handleAuth(e)}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Login;
