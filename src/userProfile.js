import React, { useEffect, useState } from "react";
import AbstractDesign from "./assets/graphics/OSLO-12.svg";

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
    <section>
      <div className="profile-view">
        <img
          className={user.isPremium ? "is-premium" : "user-profile-pic"}
          alt="user profile"
          src={user.profilePic.url ? user.profilePic.url : AbstractDesign}
        />
        <h5 className="title">
          Spotify Analytics <br /> for&nbsp;
          <span className={user.isPremium ? "is-premium-name" : ""}>
            {user.name}
          </span>
        </h5>

        <a href="https://accounts.spotify.com/en/logout">
          <button className="btn btn-logout">logout</button>
        </a>
      </div>
    </section>
  );
};

export default UserProfile;
