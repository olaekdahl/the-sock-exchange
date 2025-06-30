import { useState } from "react";
import { API_BASE_URL } from "../constants";

/**
 * Search component for searching socks by color.
 *
 */
const Search = ({ onHandleSetData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        body: JSON.stringify({ searchTerm: searchTerm.trim() }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Search failed");
      }
      
      const data = await response.json();
      onHandleSetData(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
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
      <button 
        className="btn btn-outline-success" 
        type="submit"
        disabled={loading || !searchTerm.trim()}
        aria-label="Search socks by color"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};



export default Search;
