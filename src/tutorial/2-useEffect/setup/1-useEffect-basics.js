import React, { useState, useEffect } from 'react';
// by default runs after every re-render
// cleanup function
// second parameter
const UseEffectBasics = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log('call useEffect');
    document.title = `New Messages(${value})`;
  });

  console.log('render component');
  return (
    <>
      <h2>{value}</h2>
      <button className="btn" onClick={() => setValue(value + 1)}>
        click me
      </button>
    </>
  );
  // We can see 2 times log in our dev tool
  // Because of the `<React.StrictMode></React.StrictMode>`
  // Remove the `<App />` out of the `<React.StrictMode></React.StrictMode>`, and we can see only one log in console
};

export default UseEffectBasics;
