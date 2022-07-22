import React, { useEffect, useState } from "react";
import "./Home.css";
import FlareIcon from "@mui/icons-material/Flare";
import Post from "./Post/Post";
import Tweet from "./Tweet/Tweet";
import db from "../../Firebase/Firebase";

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    db.collection("tweet").orderBy("timetamp", "desc").onSnapshot((snapshot) =>
      setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  console.log(data);

  return (
    <>
      <div className="home">
        <div className="home__top">
          <span>Latest Tweets</span>
          <FlareIcon />
        </div>
        <Post />
        {data &&
          data.map((data) => (
            <Tweet
              id={data.id}
              avatar={data.data.avatar}
              username={data.data.username}
              name={data.data.name}
              timetamp={data.data.timetamp}
              title={data.data.title}
              img={data.data.img}
              varified={data.data.varified}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
