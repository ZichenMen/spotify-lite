import axios from "axios";

const API = axios.create({
  baseURL: "/",
});

// SONGS
export const searchSongs = (query) => API.get(`/songs`, { params: query });

export const likeSong = (userId, songId) =>
  API.put("/songs/like", { userId, songId });

// USERS
export const getLikedSongs = (userId) => API.get(`/user/${userId}/songs`);

// FOLLOW ARTIST
export const followArtist = (userId, artistId) =>
  API.put("/artists/follow", { userId, artistId });
