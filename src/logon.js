import React, { Component } from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";
import LiveDash from "./spotify-live-dashboard";
import SelfieDoodle from "../src/assets/SelfieDoodle.png";

const spotifyWebApi = new Spotify();

class Logon extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyWebApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      loggedOut: token ? false : true,
    };
  }

  renderLogIn() {
    return (
      <div className="logon">
        <div className="col-md-12" style={{ marginTop: "auto" }}>
          {this.state.loggedOut && (
            <h1 className="title">Click below to Authorize Live Dashboard</h1>
          )}
          <img
            className="logon-graphics"
            src={SelfieDoodle}
            alt="album cover"
          />
        </div>
        <div className="col-md-12">
          <a href="http://localhost:8888/login">
            <button className="login btn btn-outline-spot btn-lg">
              Authorize Spotify
            </button>
          </a>
        </div>
      </div>
    );
  }

  getHashParams() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    // weird behavior with single '=' vs '==='
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <LiveDash
            loggedIn={this.state.loggedIn}
            renderLogIn={this.renderLogIn}
          />
        ) : (
          this.renderLogIn()
        )}
      </div>
    );
  }
}

export default Logon;
