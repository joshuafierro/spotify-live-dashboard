/*spotify dashboard api*/
import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios';

const spotifyWebApi = new Spotify();

class LiveDash extends Component {

  state = {
    favArtists: []
  }

  
     getNowPlaying = () => {
        spotifyWebApi.getMyCurrentPlaybackState()
          .then((response) => {
            this.setState({
              nowPlaying: {
                  song: response.item.name,
                  albumCover: response.item.album.images[0].url,
                  artist: response.item.artists[0].name,
                  song: response.item.name,
                  time: ((response.progress_ms/1000)).toString(),
                  user: response.device.name
                }
            });
          })
      }

      componentDidMount(){
        axios.get('https://api.spotify.com/v1/me/top/{artists}')
        .then(res => {
          const favArtists = res.data;
          this.setState(favArtists({favArtists}))
          console.log(favArtists);
        })
      }
    }

    export default LiveDash;