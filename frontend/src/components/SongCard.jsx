import React from "react";

export default function SongCard({ song, onLike, onFollow }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        marginBottom: "10px",
        padding: "10px",
      }}
    >
      <h4>{song.title}</h4>
      <p>
        <b>Artist:</b> {song.artist?.name || "Unknown"}
      </p>
      <p>
        <b>Genre:</b> {song.genre}
      </p>
      <p>
        <b>Language:</b> {song.language}
      </p>
      {onLike && <button onClick={() => onLike(song._id)}>Like</button>}
      {onFollow && song.artist && (
        <button onClick={() => onFollow(song.artist._id)}>Follow Artist</button>
      )}
    </div>
  );
}
