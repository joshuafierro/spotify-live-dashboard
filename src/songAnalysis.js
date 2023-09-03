import React, { Component } from "react";
import "./App.css";
import LayingDoodle from "./assets/LayingDoodle.png";
import { HorizontalBar } from "react-chartjs-2";
import { defaults } from "chart.js";

class songAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getNowPlaying();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.nowPlaying.id !== this.props.nowPlaying.id) {
      this.props.getNowPlaying();
    }
  }

  render() {
    defaults.global.legend.display = false;
    defaults.global.responsive = true;
    // defaults.global.startAngle = 0.5 * Math.PI;
    const data = {
      datasets: [
        {
          // label: "Song Analysis",
          data: [
            this.props.analysis.danceability,
            this.props.analysis.energy,
            this.props.analysis.instrumentalness,
            this.props.analysis.acousticness,
            this.props.analysis.valence,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
          ],
        },
      ],
      labels: [
        "danceability",
        "energy",
        "instrumentalness",
        // 'speechiness',
        "acousticness",
        "valence",
      ],
    };
    if (this.props.nowPlaying.song === "") {
      return (
        <div className="info animated fadeIn">
          <div>
            <h4>
              <span>Waiting to analyze...</span>
            </h4>
            <img
              className="noAnalysis info animated fadeIn"
              src={LayingDoodle}
              alt=""
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="info animated fadeIn">
          <div>
            <h1 className="title">
              Populairty:{" "}
              {this.props.nowPlaying.popularity >= 50
                ? "Very popular"
                : "Not as popular"}
            </h1>
            <HorizontalBar data={data} height={200} width={400} />
          </div>
          <div className="" />
        </div>
      );
    }
  }
}
export default songAnalysis;
