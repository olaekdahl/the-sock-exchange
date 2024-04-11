import React, { useState } from 'react';

const Upload = () => {
  const [sockData, setSockData] = useState({
    userId: '',
    sockDetails: {
      size: 'Medium', // Default set as 'Medium'
      color: '',
      pattern: '',
      material: '',
      condition: '',
      forFoot: ''
    },
    additionalFeatures: {
      waterResistant: false,
      padded: false,
      antiBacterial: false
    },
    addedTimestamp: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in sockData.sockDetails) {
      setSockData({
        ...sockData,
        sockDetails: { ...sockData.sockDetails, [name]: value }
      });
    } else if (name in sockData.additionalFeatures) {
      setSockData({
        ...sockData,
        additionalFeatures: { ...sockData.additionalFeatures, [name]: type === 'checkbox' ? checked : value }
      });
    } else {
      setSockData({
        ...sockData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the current timestamp
    const submission = {
      ...sockData,
      addedTimestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Handle post submission logic (like showing a success message)
    } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="form-group">
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          className="form-control"
          id="userId"
          name="userId"
          value={sockData.userId}
          onChange={handleChange}
        />
      </div>
      {/* Additional form groups for sock details */}
      <div className="form-group">
        <label htmlFor="size">Size</label>
        <select className="form-control" id="size" name="size" value={sockData.sockDetails.size} onChange={handleChange}>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>
      {/* Add similar blocks for color, pattern, material, condition, forFoot */}
      {/* Example for color */}
      <div className="form-group">
        <label htmlFor="color">Color</label>
        <input
          type="text"
          className="form-control"
          id="color"
          name="color"
          value={sockData.sockDetails.color}
          onChange={handleChange}
        />
      </div>
      {/* Include form groups for pattern, material, condition, and forFoot similar to above */}
      {/* Additional Features */}
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="waterResistant"
          name="waterResistant"
          checked={sockData.additionalFeatures.waterResistant}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="waterResistant">
          Water Resistant
        </label>
      </div>
      {/* Include checkboxes for padded and antiBacterial similar to above */}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Upload;