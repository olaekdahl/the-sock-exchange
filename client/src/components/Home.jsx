import { useState, useEffect, useCallback } from "react";
import DocumentCount from "./DocumentCount";
import Sock from "./Sock";
import Pagination from "./Pagination";
import { API_BASE_URL, ITEMS_PER_PAGE } from "../constants";

// onHandleSetData and data props are being passed from the parent (App.jsx).
// Shared state is stored in the parent.
const Home = ({ onHandleSetData, data }) => {
  const [currentPage, setCurrentPage] = useState(1); // State to store the current page number
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/count`);
        if (!response.ok) {
          throw new Error("Failed to fetch item count");
        }
        const countData = await response.json();
        setItemCount(countData.count);
      } catch (error) {
        console.error("Error fetching item count:", error);
        setError("Failed to load item count");
      }
    };

    fetchItemCount();
  }, [data]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/${currentPage}/${ITEMS_PER_PAGE}`
      ); // Fetch data from the SOCKS_API_URL
      if (!response.ok) {
        throw new Error("Data could not be fetched!"); // Throw an error if the response is not ok
      }
      const sockData = await response.json(); // Parse the response as JSON
      onHandleSetData(sockData); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching socks:", error); // Log any errors that occur during fetching
      setError("Failed to load socks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, onHandleSetData]);

  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts or when the page state changes
  }, [fetchData]);

  const handleDelete = async (sockId) => {
    try {
      // Make an API request to delete the sock with the given sockId
      const response = await fetch(
        `${API_BASE_URL}/${sockId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Sock could not be deleted!");
      }
      // Update the state or fetch the updated data from the server
      const updatedData = data.filter((sock) => sock._id !== sockId); // Remove the deleted sock from the data array
      onHandleSetData(updatedData); // Update the state with the updated data
    } catch (error) {
      console.error("Error deleting sock:", error);
      setError("Failed to delete sock. Please try again.");
    }
  };

  return (
    <div>
      <h1>The Sock Exchange</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {/* 
                This will re-render (re-paint) the DocumentCount component when there is a 
                change to the data prop. This will cause another API call to /api/socks/count
                to get the update count when a sock is added or deleted.
             */}
      <DocumentCount itemCount={itemCount} />
      <Pagination 
        totalItems={itemCount} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
      {loading ? (
        <div className="d-flex justify-content-center" role="status" aria-live="polite">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          className="card-container"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          {data.map((sock) => (
            <Sock key={sock._id} sock={sock} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
