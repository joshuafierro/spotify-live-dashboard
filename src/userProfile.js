import React, { useEffect, useState } from "react";

import AbstractDesign from "./assets/abstract.jpg";

const UserProfile = (props) => {
  const [user, setUser] = useState({
    name: "",
    profilePic: "",
    isPremium: "",
    followerCount: "",
  });

  const getUserProfile = () => {
    props.spotifyWebApi
      .getMe()
      .then((response) => {
        if (response) {
          setUser({
            name: response.id,
            followerCount: response.followers.total,
            isPremium: response.product,
            profilePic: response.images,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <section
      className="row"
      style={{ marginTop: "10%", marginLeft: "25%", marginRight: "25%" }}
    >
      <div className="col-sm-12 col-md-12">
        <img
          className={user.isPremium ? "isPremium" : "userProfilePic"}
          alt="user profile"
          src={user.profilePic.url ? user.profilePic.url : AbstractDesign}
        />
        <h5 className="main title">
          Spotify Analytics <br /> for&nbsp;
          <span className={user.isPremium ? "isPremiumName" : ""}>
            {user.name}
          </span>
        </h5>
        <button className="btn btn-outline-spot btn-md">
          <a
            href="https://accounts.spotify.com/en/logout"
            style={{ color: "white", fontWeight: "bold" }}
          >
            logout
          </a>
        </button>
      </div>
    </section>
  );
};

export default UserProfile;
