import React, { useState, useEffect } from 'react';
import DocumentCount from './DocumentCount';
import Sock from './Sock';

// onHandleSetData and data props are being passed from the parent (App.jsx). 
// Shared state is stored in the parent.
const HomePager = ({onHandleSetData, data}) => {
    const [page, setPage] = useState(1); // State to store the current page number

    useEffect(() => {
        const fetchData = async () => {
            try {
                /**
                 * Fetches data from the SOCKS_API_URL.
                 *
                 * @typedef {Object} Response
                 * @property {string} status - The status of the response.
                 * @property {number} statusCode - The status code of the response.
                 * @property {string} message - The message from the response.
                 * @property {Object} data - The data returned from the response.
                 */
                const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}/${page}/10`); // Fetch data from the SOCKS_API_URL
                if (!response.ok) {
                    throw new Error('Data could not be fetched!'); // Throw an error if the response is not ok
                }
                const data = await response.json(); // Parse the response as JSON
                onHandleSetData(data); // Update the state with the fetched data
            } catch (error) {
                console.error('Error fetching socks:', error); // Log any errors that occur during fetching
            }
        };

        fetchData(); // Call the fetchData function when the component mounts or when the page state changes
    }, [page]);

    const handleNextPage = () => {
        setPage(page + 1); // Increment the page state by 1
    };

    const handlePreviousPage = () => {
        setPage(page - 1); // Decrement the page state by 1
    };

    const handleDelete = async (sockId) => {
        try {
            // Make an API request to delete the sock with the given sockId
            const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}/${sockId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Sock could not be deleted!');
            }
            // Update the state or fetch the updated data from the server
            const updatedData = data.filter(sock => sock._id !== sockId); // Remove the deleted sock from the data array
            onHandleSetData(updatedData); // Update the state with the updated data
        } catch (error) {
            console.error('Error deleting sock:', error);
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
            <DocumentCount input={data} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button className='btn btn-primary' onClick={handlePreviousPage}>Back</button>
                <button className='btn btn-primary' onClick={handleNextPage}>Next</button>
            </div>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {data.map((sock) => (
                    <Sock key={sock._id} sock={sock} handleDelete={handleDelete}/>
                ))}
            </div>
        </div>
    );
};

export default HomePager;
