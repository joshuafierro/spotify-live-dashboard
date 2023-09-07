import React, { useEffect, useState } from "react";
import Spotify from "spotify-web-api-js";
import UserProfile from "./userProfile";
import SongAnalysis from "./songAnalysis";
import NowPlayingDash from "./nowPlayingDash";
import TopArtists from "./topArtists";
import TopSongs from "./topSongs";

const spotifyWebApi = new Spotify();

const LiveDash = (props) => {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [nowPlaying, setNowPlaying] = useState({
    song: "",
    artist: "",
    albumCover: "",
    popularity: "",
    id: "",
    user: "",
    progress_ms: "",
    duration_ms: "",
    isPlaying: false,
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

  useEffect(() => {
    if (nowPlaying.id && nowPlaying.isPlaying) {
      const interval = setInterval(() => {
        getNowPlaying();
      }, nowPlaying.duration_ms - nowPlaying.progress_ms);

      return () => clearInterval(interval);
    }
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
            popularity: response.item.popularity,
            id: response.item.id,
            user: response.device.name,
            progress_ms: response.progress_ms,
            duration_ms: response.item.duration_ms,
            isPlaying: response.is_playing,
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
      <TopArtists key={artistProfile.id} artist={artistProfile} />
    ))
  );

  const tracks = topTracks.map((track) =>
    track.map((song) => <TopSongs key={song.id} song={song} />)
  );

  const renderNavbar = () => {
    return (
      <ul className="nav nav-tabs navbar-dark">
        <li className="nav-item active">
          <a
            data-toggle="tab"
            href="#song_analysis"
            className="nav-link active"
          >
            Song Analysis
          </a>
        </li>
        <li className="nav-item">
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
          <a data-toggle="tab" href="#home" className="nav-link">
            Profile
          </a>
        </li>
      </ul>
    );
  };

  return props.loggedIn ? (
    <div className="grid-container section-push">
      <div className="grid-item grid-item-1">
        <NowPlayingDash nowPlaying={nowPlaying} getNowPlaying={getNowPlaying} />
      </div>
      <div className="grid-item grid-item-2">
        {renderNavbar()}
        <div className="tab-content">
          <div id="home" className="tab-pane fade">
            <div>
              <UserProfile spotifyWebApi={spotifyWebApi} />
            </div>
          </div>
          <div id="top_artist" className="tab-pane fade">
            <div>
              <span>{artists}</span>
            </div>
          </div>
          <div id="top_tracks" className="tab-pane fade">
            <div>
              <span>{tracks}</span>
            </div>
          </div>
          <div id="song_analysis" className="tab-pane fade show active">
            <div>
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
  ) : (
    props.renderLogIn()
  );
};
export default LiveDash;
