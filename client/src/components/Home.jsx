import React, { useState } from 'react';

const Home = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Home</h1>
      <div>Counter: {count}</div>
      <button className='btn btn-primary' onClick={incrementCount}>Increment</button>
    </div>
  );
};

export default Home;