import React from "react";
import SongCard from "./SongCard";

export default function SongList({ songs = [], onLike, onFollow, onUnlike }) {
  if (!songs.length) {
    return <p>No songs found.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {songs.map((song) => (
        <SongCard
          key={song._id}
          song={song}
          onLike={onLike}
          onFollow={onFollow}
          onUnlike={onUnlike} // <-- Pass onUnlike here
        />
      ))}
    </div>
  );
}
