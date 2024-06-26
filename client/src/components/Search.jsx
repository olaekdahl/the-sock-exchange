import React, { useState } from "react";

/**
 * Search component for searching socks by color.
 *
 */
const Search = ({ onHandleSetData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_SOCKS_API_URL}/search`, {
      method: "POST",
      body: JSON.stringify({ searchTerm }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        onHandleSetData(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        id="search"
        className="form-control me-2"
        type="search"
        placeholder="Color"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
