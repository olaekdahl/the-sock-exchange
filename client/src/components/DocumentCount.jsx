import React, { useState, useEffect } from 'react';

const DocumentCount = ({ input }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SOCKS_API_URL}/count`)
            .then(response => response.json())
            .then(data => setCount(data.count))
            .catch(error => console.error(error));
    }, [input]);

    return (
        <div>
            <strong>Total Document Count: {count}</strong>
        </div>
    );
};

export default DocumentCount;