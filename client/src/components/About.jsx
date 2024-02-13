import React, { useState } from 'react';

const About = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>About</h1>
      <div>Counter: {count}</div>
      <button className='btn btn-primary' onClick={incrementCount}>Increment</button>
    </div>
  );
};

export default About;