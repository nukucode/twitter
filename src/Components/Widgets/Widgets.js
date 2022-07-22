import React from "react";
import "./Widgets.css";
import SearchIcon from "@mui/icons-material/Search";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";

function Widgets() {
  return (
    <>
      <div className="widgets">
        <div className="search__bar">
          <SearchIcon />
          <input type="text" placeholder="Search Twitter" />
        </div>
        <div className="centerContent">
  <div className="selfCenter spaceBetween">
    <TwitterTimelineEmbed
      backgroundColor="#202327"
      noScrollbar
      onLoad={function noRefCheck(){}}
      options={{
        height: 800
      }}
      screenName="elonmusk"
      sourceType="widget"
      theme="dark"
    />
  </div>
</div>
      </div>
    </>
  );
}

export default Widgets;
