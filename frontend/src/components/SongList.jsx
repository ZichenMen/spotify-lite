import React from "react";
import SongCard from "./SongCard";

export default function SongList({ songs, onLike, onFollow }) {
  return (
    <div>
      {songs.map((song) => (
        <SongCard
          key={song._id}
          song={song}
          onLike={onLike}
          onFollow={onFollow}
        />
      ))}
    </div>
  );
}
