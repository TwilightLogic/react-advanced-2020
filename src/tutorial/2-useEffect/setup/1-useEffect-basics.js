import React, { useState, useEffect } from 'react';
// by default runs after every re-render
// cleanup function
// second parameter
const UseEffectBasics = () => {
  useEffect(() => {
    console.log('call useEffect');
  });
  console.log('render component');
  return <h2>useEffect Basics</h2>;
  // We can see 2 times log in our dev tool
  // Because of the `<React.StrictMode></React.StrictMode>`
  // Remove the `<App />` out of the `<React.StrictMode></React.StrictMode>`, and we can see only one log in console
};

export default UseEffectBasics;
