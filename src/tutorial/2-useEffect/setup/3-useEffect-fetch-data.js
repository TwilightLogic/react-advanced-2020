import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users';

const UseEffectFetchData = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    // What if we put `setUsers(users)` here?
    // Recap:
    // What is `setUsers()` doing?
    // 1. Preserve the value `users`
    // 2. Triggers re-render
    // So:
    // We `setUsers(users)` here, and update the `users` value.
    // It triggers re-render after updating `users`.
    // After re-render, it will call `getUsers()` again in `useEffect()`
    // Finally, we will get an infinite loop
    // SOLUTION: add an empty array as dependencies list (Only triggers `useEffect` once when rendering at first time)
    setUsers(users);
    console.log(users);
  };

  // `useEffect` cannot be an async function and returns any `Promises`
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h3>github users</h3>
    </>
  );
};

export default UseEffectFetchData;
