import React, { useState } from 'react';

const Contact = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Contact</h1>
      <div>Counter: {count}</div>
      <button className='btn btn-primary' onClick={incrementCount}>Increment</button>
    </div>
  );
};

export default Contact;