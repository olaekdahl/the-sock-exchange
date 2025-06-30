import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { 
  SOCK_SIZES, 
  SOCK_CONDITIONS, 
  FOOT_OPTIONS, 
  DEFAULT_SOCK_DATA,
  API_BASE_URL 
} from "../constants";

const Add = () => {
  const [sockData, setSockData] = useState(DEFAULT_SOCK_DATA);
  const [message, setMessage] = useState(null);
  const { loading, error, apiCall, setError } = useApi();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in sockData.sockDetails) {
      setSockData({
        ...sockData,
        sockDetails: { ...sockData.sockDetails, [name]: value },
      });
    } else if (name in sockData.additionalFeatures) {
      setSockData({
        ...sockData,
        additionalFeatures: {
          ...sockData.additionalFeatures,
          [name]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setSockData({
        ...sockData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!sockData.userId.trim() || !sockData.sockDetails.color.trim() || 
        !sockData.sockDetails.material.trim() || !sockData.sockDetails.pattern.trim()) {
      setError("Please fill in all required fields");
      return;
    }
    
    setError(null);
    setMessage(null);
    
    // Add the current timestamp
    const submission = {
      ...sockData,
      addedTimestamp: new Date().toISOString(),
    };

    try {
      await apiCall(API_BASE_URL, {
        method: "POST",
        body: JSON.stringify(submission),
      });
      
      setMessage("Sock added successfully!");
      
      // Reset form
      setSockData(DEFAULT_SOCK_DATA);
    } catch (error) {
      console.error("Error posting data", error);
      setError("Failed to add sock. Please try again.");
    }
  };

  return (
    <div className="row">
      <div className="col-4">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-3">
          <div className="form-group">
            <label htmlFor="userId">User ID *</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              name="userId"
              value={sockData.userId}
              onChange={handleChange}
              required
              aria-describedby="userIdHelp"
            />
            <small id="userIdHelp" className="form-text text-muted">
              Enter your unique user identifier
            </small>
          </div>
          {/* Additional form groups for sock details */}
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <select
              className="form-control"
              id="size"
              name="size"
              value={sockData.sockDetails.size}
              onChange={handleChange}
            >
              {SOCK_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          {/* Sock Details */}
          <div className="form-group">
            <label htmlFor="color">Color *</label>
            <input
              type="text"
              className="form-control"
              id="color"
              name="color"
              value={sockData.sockDetails.color}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pattern">Pattern *</label>
            <input
              type="text"
              className="form-control"
              id="pattern"
              name="pattern"
              value={sockData.sockDetails.pattern}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="material">Material *</label>
            <input
              type="text"
              className="form-control"
              id="material"
              name="material"
              value={sockData.sockDetails.material}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="condition">Condition</label>
            <select
              className="form-control"
              id="condition"
              name="condition"
              value={sockData.sockDetails.condition}
              onChange={handleChange}
            >
              {SOCK_CONDITIONS.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="forFoot">For Foot</label>
            <select
              className="form-control"
              id="forFoot"
              name="forFoot"
              value={sockData.sockDetails.forFoot}
              onChange={handleChange}
            >
              {FOOT_OPTIONS.map((foot) => (
                <option key={foot} value={foot}>
                  {foot}
                </option>
              ))}
            </select>
          </div>
          {/* Additional Features */}
          <div className="row">
            <div className="form-check col">
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
            <div className="form-check col">
              <input
                className="form-check-input"
                type="checkbox"
                id="padded"
                name="padded"
                checked={sockData.additionalFeatures.padded}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="padded">
                Padded
              </label>
            </div>
            <div className="form-check col">
              <input
                className="form-check-input"
                type="checkbox"
                id="antiBacterial"
                name="antiBacterial"
                checked={sockData.additionalFeatures.antiBacterial}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="antiBacterial">
                Anti Bacterial
              </label>
            </div>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Adding Sock..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
