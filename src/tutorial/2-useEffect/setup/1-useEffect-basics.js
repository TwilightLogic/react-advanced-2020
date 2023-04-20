import React, { useState, useEffect } from 'react';
const UseEffectBasics = () => {
  const [value, setValue] = useState(0);

  // The dependencies list: `value` ⬇️
  // If we change the `value`, it will trigger this `useEffect` one more time.
  useEffect(() => {
    console.log('call useEffect');
    if (value > 1) {
      document.title = `New Messages(${value})`;
    }
  }, [value]);

  // Only call it once when initializing the render
  useEffect(() => {
    console.log('hello useEffect');
  }, []);

  console.log('render component');
  return (
    <>
      <h2>{value}</h2>
      <button className="btn" onClick={() => setValue(value + 1)}>
        click me
      </button>
    </>
  );
};

export default UseEffectBasics;
