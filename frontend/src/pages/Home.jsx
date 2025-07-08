import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SongList from "../components/SongList";
import { searchSongs, likeSong, followArtist } from "../services/api";

const fakeUserId = "686c33b01c95489eb43a3f85"; // Replace with actual ID from MongoDB

export default function Home() {
  const [songs, setSongs] = useState([]);

  const handleSearch = async (query) => {
    const res = await searchSongs(query);
    setSongs(res.data);
  };

  const handleLike = async (songId) => {
    try {
      await likeSong(fakeUserId, songId);
      alert("Song liked!");
    } catch (err) {
      console.error("Error liking song:", err);
    }
  };

  const handleFollow = async (artistId) => {
    try {
      await followArtist(fakeUserId, artistId);
      alert("Artist followed!");
    } catch (err) {
      console.error("Error following artist:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Spotify Lite 🎵</h2>
      <SearchBar onSearch={handleSearch} />
      <SongList songs={songs} onLike={handleLike} onFollow={handleFollow} />
    </div>
  );
}
