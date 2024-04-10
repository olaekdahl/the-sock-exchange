import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]); // State to store the fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(import.meta.env.VITE_SOCKS_API_URL)
        const response = await fetch(import.meta.env.VITE_SOCKS_API_URL); // Fetch data from the SOCKS_API_URL
        if (!response.ok) {
          throw new Error('Data could not be fetched!'); // Throw an error if the response is not ok
        }
        const data = await response.json(); // Parse the response as JSON
        setData(data); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching socks:', error); // Log any errors that occur during fetching
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <div>
      <h1>The Sock Exchange</h1>
      <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.map((sock) => (
          <div key={sock._id} className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <img className="card-img-top" src="#" alt="Sock Image" />
            <div className="card-body">
              <h5 className="card-title">Sock Details</h5>
              <div className="card-text">Size: {sock.sockDetails.size}</div>
              <div className="card-text">Color: {sock.sockDetails.color}</div>
              <div className="card-text">Pattern: {sock.sockDetails.pattern}</div>
              <div className="card-text">Material: {sock.sockDetails.material}</div>
              <div className="card-text">Condition: {sock.sockDetails.condition}</div>
              <div className="card-text">For Foot: {sock.sockDetails.forFoot}</div>
            </div>
            <div className="card-body">
              <h5 className="card-title">Additional Features</h5>
              <div className="card-text">Water Resistant: {sock.additionalFeatures.waterResistant ? 'Yes' : 'No'}</div>
              <div className="card-text">Padded: {sock.additionalFeatures.padded ? 'Yes' : 'No'}</div>
              <div className="card-text">Anti Bacterial: {sock.additionalFeatures.antiBacterial ? 'Yes' : 'No'}</div>
            </div>
            <div className="card-footer">
              <small className="text-muted">Added: {sock.addedTimestamp}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default Home;