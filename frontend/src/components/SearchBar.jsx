import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");

  const handleSearch = () => {
    onSearch({ search: query, genre, language });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title or artist..."
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">All Genres</option>
        <option value="Pop">Pop</option>
        <option value="Hip-Hop">Hip-Hop</option>
        <option value="Soul">Soul</option>
      </select>

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="">All Languages</option>
        <option value="English">English</option>
        <option value="Korean">Korean</option>
        <option value="Spanish">Spanish</option>
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
