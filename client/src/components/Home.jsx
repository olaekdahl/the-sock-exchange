import React, { useState, useEffect } from "react";
import DocumentCount from "./DocumentCount";
import Sock from "./Sock";
import Pagination from "./Pagination";

// onHandleSetData and data props are being passed from the parent (App.jsx).
// Shared state is stored in the parent.
const Home = ({ onHandleSetData, data }) => {
  const [currentPage, setCurrentPage] = useState(1); // State to store the current page number

  const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SOCKS_API_URL}/count`)
            .then(response => response.json())
            .then(data => setItemCount(data.count))
            .catch(error => console.error(error));
    }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SOCKS_API_URL}/${currentPage}/10`
        ); // Fetch data from the SOCKS_API_URL
        if (!response.ok) {
          throw new Error("Data could not be fetched!"); // Throw an error if the response is not ok
        }
        const data = await response.json(); // Parse the response as JSON
        onHandleSetData(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching socks:", error); // Log any errors that occur during fetching
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when the page state changes
  }, [currentPage]);

  const handleDelete = async (sockId) => {
    try {
      // Make an API request to delete the sock with the given sockId
      const response = await fetch(
        `${import.meta.env.VITE_SOCKS_API_URL}/${sockId}`,
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
    }
  };

  return (
    <div>
      <h1>The Sock Exchange</h1>
      {/* 
                This will re-render (re-paint) the DocumentCount component when there is a 
                change to the data prop. This will cause aanother API call to /api/socks/count
                to get the update count when a sock is added or deleted.
             */}
      <DocumentCount itemCount={itemCount} />
      <Pagination totalItems={itemCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div
        className="card-container"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
      >
        {data.map((sock) => (
          <Sock key={sock._id} sock={sock} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;
