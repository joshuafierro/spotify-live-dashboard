import React, { Component } from "react";

import AbstractDesign from "./assets/abstract.jpg";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        profilePic: "",
        isPremium: "",
        followerCount: "",
      },
    };
  }

  getUserProfile() {
    this.props.spotifyWebApi
      .getMe()
      .then((response) => {
        if (response) {
          this.setState({
            user: {
              name: response.id,
              followerCount: response.followers.total,
              isPremium: response.product,
              profilePic: response.images,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUserProfile();
  }

  render() {
    return (
      <section
        className="col-sm-12 col-md-12"
        style={{ marginTop: "10%", marginLeft: "25%", marginRight: "25%" }}
      >
        <img
          className={this.state.user.isPremium ? "isPremium" : "userProfilePic"}
          alt="user profile"
          src={
            this.state.user.profilePic.url
              ? this.state.user.profilePic.url
              : AbstractDesign
          }
        />
        <h5 className="main title">
          Spotify Analytics <br /> for&nbsp;
          <span className={this.state.user.isPremium ? "isPremiumName" : ""}>
            {this.state.user.name}
          </span>
        </h5>
      </section>
    );
  }
}

export default UserProfile;
