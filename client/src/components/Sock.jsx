import PropTypes from 'prop-types';
import imagePlaceHolder from '../assets/images/sock_placeholder.png';

const Sock = ({ sock, handleDelete }) => {
    return (
        <div key={sock._id} className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <img className="card-img-top" src={imagePlaceHolder} alt="Sock" />
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
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <small className="text-muted">Added: {new Date(sock.addedTimestamp).toLocaleDateString()}</small>
                <button 
                  className="btn btn-sm btn-danger" 
                  onClick={() => handleDelete(sock._id)}
                  aria-label={`Delete sock ${sock._id}`}
                >
                  Delete
                </button>
            </div>
        </div>
    );
};

Sock.propTypes = {
  sock: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    sockDetails: PropTypes.shape({
      size: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      pattern: PropTypes.string.isRequired,
      material: PropTypes.string.isRequired,
      condition: PropTypes.string.isRequired,
      forFoot: PropTypes.string.isRequired,
    }).isRequired,
    additionalFeatures: PropTypes.shape({
      waterResistant: PropTypes.bool.isRequired,
      padded: PropTypes.bool.isRequired,
      antiBacterial: PropTypes.bool.isRequired,
    }).isRequired,
    addedTimestamp: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Sock;