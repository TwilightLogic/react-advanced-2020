import React, { useState, useEffect } from 'react';

// cleanup function
// second argument

const UseEffectCleanup = () => {
  const [size, setSize] = useState(window.innerWidth);

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', checkSize);

    // If we don't use cleanup function.
    // We will see bunch of event listeners in 'Elements' of out browser.
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  });

  return (
    <>
      <h1>Window</h1>
      <h2>{size}</h2>
    </>
  );
};

export default UseEffectCleanup;
