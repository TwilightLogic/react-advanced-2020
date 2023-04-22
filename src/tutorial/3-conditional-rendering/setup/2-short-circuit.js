import React, { useState } from 'react';
// short-circuit evaluation
// ternary operator

const ShortCircuit = () => {
  const [text, setText] = useState('');
  const firstValue = text || 'hello world';
  const secondValue = text && 'hello world';

  return (
    <>
      {/* <h1>{firstValue}</h1>
      <h1>Value: {secondValue}</h1> */}
      {/* ❌ if () {console.log("hello world!")} */}

      <h1>{text || 'Lucas Law'}</h1>
      {/* We can use `&&` to display or hide the elements or components */}
      {text && <h1>Hello World</h1>}
    </>
  );
};

export default ShortCircuit;
