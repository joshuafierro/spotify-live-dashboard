import React, { useEffect, useState } from "react";
import Spotify from "spotify-web-api-js";
import UserProfile from "./userProfile";
import SongAnalysis from "./songAnalysis";
import NowPlayingDash from "./nowPlayingDash";

const spotifyWebApi = new Spotify();

const LiveDash = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [nowPlaying, setNowPlaying] = useState({
    song: "",
    artist: "",
    albumCover: "",
    id: "",
    user: "",
  });
  const [analysis, setAnalysis] = useState({
    acousticness: "",
    danceability: "",
    energy: "",
    instrumentalness: "",
    loudness: "",
    speechiness: "",
    tempo: "",
    valence: "",
  });

  const getNowPlaying = () => {
    spotifyWebApi
      .getMyCurrentPlaybackState()
      .then((response) => {
        if (response) {
          setNowPlaying({
            song: response.item.name,
            artist: response.item.artists[0].name,
            albumCover: response.item.album.images[0].url,
            id: response.item.id,
            user: response.device.name,
          });
          getAudioFeaturesForTrack();
        }
      })
      .catch((error) => {
        console.log("an error occurred " + error);
      });
  };

  const getAudioFeaturesForTrack = () => {
    spotifyWebApi.getAudioFeaturesForTrack(nowPlaying.id).then((response) => {
      setAnalysis({
        acousticness: (response.acousticness * 100).toFixed(1),
        danceability: (response.danceability * 100).toFixed(1),
        energy: (response.energy * 100).toFixed(1),
        instrumentalness: (response.instrumentalness * 100).toFixed(1),
        loudness: response.loudness,
        speechiness: response.speechiness,
        // tempo: response.tempo.toFixed(1),
        valence: (response.valence * 100).toFixed(1),
      });
    });
  };

  const getTopArtitsts = () => {
    spotifyWebApi
      .getMyTopArtists()
      .then((response) => {
        if (response) {
          setTopArtists([response.items]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTopTracks = () => {
    spotifyWebApi.getMyTopTracks().then((response) => {
      if (response.items) {
        setTopTracks([response.items]);
        return topTracks;
      }
    });
  };
  useEffect(() => {
    getTopArtitsts();
    getTopTracks();
  }, []);

  const artists = topArtists.map((artist) =>
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

  const tracks = topTracks.map((track) =>
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
        <NowPlayingDash nowPlaying={nowPlaying} getNowPlaying={getNowPlaying} />
      </div>
      <div className="col-md-8">
        <ul className="nav nav-tabs navbar-dark">
          <li className="nav-item active">
            <a data-toggle="tab" href="#home" className="nav-link active">
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
          <div id="home" className="tab-pane container fade show active">
            <div className="row">
              <UserProfile spotifyWebApi={spotifyWebApi} />
            </div>
          </div>
          <div id="top_artist" className="tab-pane container fade">
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
                nowPlaying={nowPlaying}
                getNowPlaying={getNowPlaying}
                analysis={analysis}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LiveDash;
