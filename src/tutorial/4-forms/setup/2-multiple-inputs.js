import React, { useState } from 'react';
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange
// dynamic object keys

const ControlledInputs = () => {
  const [person, setPerson] = useState({ firstName: '', email: '', age: '' });
  const [people, setPeople] = useState([]);

  // Change the value(firstName, email, age) of state while user is changing the inputs
  const handleChange = e => {
    const name = e.target.name; // Set the `name` in `<input>` as the 'key'
    const value = e.target.value; // Set the `value` in `<input>` as the 'value'

    // https://react.dev/learn/updating-objects-in-state
    // 👉🏻 Using spread syntax to keep the previous values for all other fields.
    setPerson({
      ...person, // Copy other fields
      [name]: value, // Dynamically set the specific key
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Fields are not empty!
    if (person.firstName && person.email && person.age) {
      const newPerson = { ...person, id: new Date().getTime().toString() };
      setPeople([...people, newPerson]);
      // And remember to set `person` as an empty state
      setPerson({ firstName: '', email: '', age: '' });
    }
  };

  return (
    <>
      <article>
        <form className="form">
          <div className="form-control">
            <label htmlFor="firstName">Name : </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={person.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              value={person.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="age">Age : </label>
            <input
              type="text"
              id="age"
              name="age"
              value={person.age}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            add person
          </button>
        </form>
        {people.map((person, index) => {
          const { id, firstName, email, age } = person;
          return (
            <div className="item" key={id}>
              <h4>{firstName}</h4>
              <p>{age}</p>
              <p>{email}</p>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default ControlledInputs;
