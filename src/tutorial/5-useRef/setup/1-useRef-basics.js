import React, { useEffect, useRef } from 'react';

// preserves value
// DOES NOT trigger re-render
// target DOM nodes/elements

const UseRefBasics = () => {
  const refContainer = useRef(null);
  const divContainer = useRef(null);

  // `useEffect` dose not trigger the re-renders
  useEffect(() => {
    console.log(refContainer.current);
    refContainer.current.focus();
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(refContainer.current.value);
    console.log(divContainer.current);
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {/* Now the `refContainer.current` is a node `<input type="text" />` while we set `ref={refContainer} */}
        <input type="text" ref={refContainer} />
        <button type="submit">submit</button>
      </form>
      <div ref={divContainer}>hello the fucking world</div>
    </>
  );
};

export default UseRefBasics;
