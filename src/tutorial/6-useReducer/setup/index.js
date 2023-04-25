import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';

// reducer function
const reducer = (state, action) => {};

// defaultState
const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: '',
};

// Component
const Index = () => {
  // param 1: reducer function(RETURNS: a dispatch function)
  // param 2: initial state(RETURNS: A stateful value)
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      {/* &&: For showing the component */}
      {state.isModalOpen && <Modal modalContent={state.modalContent} />}
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <button type="submit">add </button>
      </form>
      {state.people.map(person => {
        return (
          <div key={person.id}>
            <h4>{person.name}</h4>
          </div>
        );
      })}
    </>
  );
};

export default Index;
