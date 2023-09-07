import React, { useEffect, useState } from "react";

const topSongs = (props) => {
  console.log(props);
  const [song, setSong] = useState({
    id: "",
    image: "",
    name: "",
  });

  useEffect(() => {
    setSong({
      id: props.song.id,
      image: props.song.album.images[0].url,
      name: props.song.name,
    });
  }, []);
  return (
    <span key={song.id}>
      <div
        className="artist-profile animated fadeIn"
        alt="artist profile"
        style={{
          backgroundImage: `url(${song.image})`,
          display: "inline-block",
        }}
      >
        <h3 className="artist-song-titles">{song.name}</h3>
      </div>
    </span>
  );
};

export default topSongs;
