import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch({ search: query });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search songs or artists..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
