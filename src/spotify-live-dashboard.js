import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import UserProfile from "./userProfile";
import SongAnalysis from "./songAnalysis";
import NowPlayingDash from "./nowPlayingDash";

const spotifyWebApi = new Spotify();

class LiveDash extends Component {
  constructor() {
    super();
    this.state = {
      topArtists: [],
      topTracks: [],
      nowPlaying: { song: "", artist: "", albumCover: "", id: "", user: "" },
      analysis: {
        acousticness: "",
        danceability: "",
        energy: "",
        instrumentalness: "",
        loudness: "",
        speechiness: "",
        tempo: "",
        valence: "",
      },
    };
    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.getAudioFeaturesForTrack = this.getAudioFeaturesForTrack.bind(this);
  }

  getNowPlaying() {
    spotifyWebApi
      .getMyCurrentPlaybackState()
      .then((response) => {
        if (response) {
          this.setState({
            nowPlaying: {
              song: response.item.name,
              artist: response.item.artists[0].name,
              albumCover: response.item.album.images[0].url,
              id: response.item.id,
              user: response.device.name,
            },
          });
          this.getAudioFeaturesForTrack();
        }
      })
      .catch((error) => {
        console.log("an error occurred " + error);
      });
  }

  getAudioFeaturesForTrack() {
    spotifyWebApi
      .getAudioFeaturesForTrack(this.state.nowPlaying.id)
      .then((response) => {
        this.setState({
          analysis: {
            acousticness: (response.acousticness * 100).toFixed(1),
            danceability: (response.danceability * 100).toFixed(1),
            energy: (response.energy * 100).toFixed(1),
            instrumentalness: (response.instrumentalness * 100).toFixed(1),
            loudness: response.loudness,
            speechiness: response.speechiness,
            tempo: response.tempo.toFixed(1),
            valence: (response.valence * 100).toFixed(1),
          },
        });
      });
  }

  getTopArtitsts() {
    spotifyWebApi
      .getMyTopArtists()
      .then((response) => {
        if (response) {
          this.setState({
            topArtists: [response.items],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTopTracks() {
    spotifyWebApi.getMyTopTracks().then((response) => {
      if (response.items) {
        this.setState({
          topTracks: [response.items],
        });
        return this.state.topTracks;
      }
    });
  }

  componentDidMount() {
    this.getTopArtitsts();
    this.getTopTracks();
  }

  render() {
    const artists = this.state.topArtists.map((artist) =>
      artist.map((artistProfile) => (
        <span key={artistProfile.id}>
          <div
            className="artistProfile animated fadeIn"
            alt="artist profile"
            style={{
              backgroundImage: `url(${artistProfile.images[0].url})`,
              display: "inline-block",
            }}
          >
            <h3 className="centerTitles">{artistProfile.name}</h3>
          </div>
        </span>
      ))
    );

    const tracks = this.state.topTracks.map((track) =>
      track.map((song) => (
        <span key={song.id}>
          <div
            className="artistProfile animated fadeIn"
            alt="artist profile"
            style={{
              backgroundImage: `url(${song.album.images[0].url})`,
              display: "inline-block",
            }}
          >
            <h3 className="centerTitles">{song.name}</h3>
          </div>
        </span>
      ))
    );
    return (
      <div className="row section-push">
        <div className="col-md-4">
          <NowPlayingDash
            nowPlaying={this.state.nowPlaying}
            getNowPlaying={this.getNowPlaying}
          />
        </div>
        <div className="col-md-8">
          <ul className="nav nav-tabs navbar-dark">
            <li className="nav-item active">
              <a data-toggle="tab" href="#home" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item active">
              <a data-toggle="tab" href="#top_artist" className="nav-link">
                Your Top Artists
              </a>
            </li>
            <li className="nav-item">
              <a data-toggle="tab" href="#top_tracks" className="nav-link">
                Your Top Tracks
              </a>
            </li>
            <li className="nav-item">
              <a data-toggle="tab" href="#song_analysis" className="nav-link">
                Song Analysis
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div id="home" className="active tab-pane container fade in">
              <div className="row">
                <UserProfile spotifyWebApi={spotifyWebApi} />
              </div>
            </div>
            <div id="top_artist" className="tab-pane container fade in">
              <div className="row">
                <span className="header">{artists}</span>
              </div>
            </div>
            <div id="top_tracks" className="tab-pane container fade">
              <div className="row">
                <span className="header">{tracks}</span>
              </div>
            </div>
            <div id="song_analysis" className="tab-pane container fade">
              <div className="row">
                <SongAnalysis
                  nowPlaying={this.state.nowPlaying}
                  getNowPlaying={this.getNowPlaying}
                  analysis={this.state.analysis}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LiveDash;
