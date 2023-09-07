import React, { useEffect, useState } from "react";

const topArtists = (props) => {
  const [artist, setArtist] = useState({
    name: "",
    image: "",
    id: "",
  });

  useEffect(() => {
    setArtist({
      name: props.artist.name,
      image: props.artist.images[0].url,
      id: props.artist.id,
    });
  }, []);
  return (
    <span key={artist.id}>
      <div
        className="artist-profile animated fadeIn"
        alt="artist profile"
        style={{
          backgroundImage: `url(${artist.image})`,
          display: "inline-block",
        }}
      >
        <h3 className="artist-song-titles">{artist.name}</h3>
      </div>
    </span>
  );
};

export default topArtists;
