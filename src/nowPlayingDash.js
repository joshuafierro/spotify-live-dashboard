import React, { Component } from "react";
import "./App.css";
import ReadingSideDoodle from "./assets/ReadingSideDoodle.png";

class NowPlayingDash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    if (this.props.nowPlaying.song === "") {
      return (
        <div className="row info animated fadeIn">
          <div className="col-md-12">
            <h4>
              <span className="header">No songs playing right now.</span>
            </h4>
            <img
              className="notPlayingGraphic info animated fadeIn"
              src={ReadingSideDoodle}
              alt=""
            />
            <button
              className="btn btn-outline-spot"
              onClick={() => this.props.getNowPlaying()}
            >
              Check Now Playing
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row info animated fadeIn">
          <div className="col-md-12">
            <h4>
              <span className="header">Now Playing:</span>
            </h4>
            <h6>
              <span className="title2">{this.props.nowPlaying.song}</span>{" "}
              by&nbsp;
              <span className="title2">{this.props.nowPlaying.artist}</span>
            </h6>
            <img
              className="d-block album-cover animated fadeIn"
              src={this.props.nowPlaying.albumCover}
              alt="album cover"
            />
            <button
              className="btn btn-outline-spot"
              style={{ width: "75%" }}
              onClick={() => this.props.getNowPlaying()}
            >
              Check Now Playing
            </button>
          </div>
        </div>
      );
    }
  }
}

export default NowPlayingDash;
