import React from 'react';
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
                <small className="text-muted">Added: {sock.addedTimestamp}</small>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(sock._id)}>Delete</button>
            </div>
        </div>
    );
};

export default Sock;