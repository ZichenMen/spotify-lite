import React, { useEffect, useState } from "react";
import { getLikedSongs } from "../services/api";
import SongList from "../components/SongList";
import axios from "axios";

const fakeUserId = "686b922692dbe5b5393b0589"; // Replace with actual ID from MongoDB

export default function Profile() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "", // Optional
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch liked songs
        const likedRes = await getLikedSongs(fakeUserId);
        setLikedSongs(likedRes.data);

        // Fetch full user profile
        const profileRes = await axios.get(`/user/${fakeUserId}`);
        setFollowedArtists(profileRes.data.followedArtists || []);
        setProfileInfo({
          username: profileRes.data.username,
          email: profileRes.data.email,
        });

        setFormData({
          username: profileRes.data.username || "",
          email: profileRes.data.email || "",
          password: "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/user/${fakeUserId}`, formData);
      alert("Profile updated!");

      // Update display
      setProfileInfo({
        username: res.data.username,
        email: res.data.email,
      });

      setFormData((prev) => ({ ...prev, password: "" }));
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating profile");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>

      {!editMode ? (
        <>
          <p>
            <b>Username:</b> {profileInfo.username}
          </p>
          <p>
            <b>Email:</b> {profileInfo.email}
          </p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      ) : (
        <form onSubmit={handleUpdate} style={{ marginBottom: "20px" }}>
          <label>
            Username:
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
          <br />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      )}

      <h3>Liked Songs ❤️</h3>
      {likedSongs.length === 0 ? (
        <p>No liked songs yet.</p>
      ) : (
        <SongList songs={likedSongs} />
      )}

      <h3>Followed Artists 🎧</h3>
      {followedArtists.length === 0 ? (
        <p>No followed artists yet.</p>
      ) : (
        <ul>
          {followedArtists.map((artist) => (
            <li key={artist._id}>{artist.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
