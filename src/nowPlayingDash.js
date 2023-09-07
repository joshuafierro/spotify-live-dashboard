import React, { useEffect } from "react";
import "./App.css";
import HeadphonesGraphic from "./assets/graphics/headphones.png";

const NowPlayingDash = (props) => {
  useEffect(() => {
    props.getNowPlaying();
  }, []);
  if (props.nowPlaying.song === "") {
    return (
      <div className="info animated fadeIn">
        <h4>
          <span className="header">No songs playing right now.</span>
        </h4>
        <img
          className="not-playing-graphic info animated fadeIn"
          src={HeadphonesGraphic}
          alt=""
        />
        <button
          className="btn btn-outline-spot"
          onClick={() => props.getNowPlaying()}
        >
          Check Now Playing
        </button>
      </div>
    );
  } else {
    return (
      <div className="info animated fadeIn">
        <h4>
          <span className="header">Now Playing:</span>
        </h4>
        <h6>
          <span className="title2">{props.nowPlaying.song}</span> by&nbsp;
          <span className="title2">{props.nowPlaying.artist}</span>
        </h6>
        <img
          className="d-block album-cover animated fadeIn"
          src={props.nowPlaying.albumCover}
          alt="album cover"
        />
        <button
          className="btn btn-outline-spot"
          style={{ width: "75%" }}
          onClick={() => props.getNowPlaying()}
        >
          Check Now Playing
        </button>
      </div>
    );
  }
};

export default NowPlayingDash;
