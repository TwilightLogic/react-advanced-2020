import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users/QuincyLarson';

const MultipleReturns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState('default user');

  // Fetching data
  // Using `then` without `async/await`
  // `Response.json()` Returns Value: ⬇️
  // A Promise that resolves to a JavaScript object.
  // This object could be anything that can be represented by JSON — an object
  // , an array, a string, a number...
  useEffect(() => {
    fetch(url)
      .then(resp => resp.json())
      .then(user => {
        const { login } = user;
        setUser(login);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2>Error...</h2>
      </div>
    );
  }

  return <h2>{user}</h2>;
};

export default MultipleReturns;
