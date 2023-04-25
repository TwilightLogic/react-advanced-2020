import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: '',
};

const reducer = (state, action) => {
  if (action.type === 'TESTING') {
    return {
      ...state,
      people: data,
      isModalOpen: true,
      modalContent: 'Item added',
    };
  }
};

const Index = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (name) {
      dispatch({ type: 'TESTING' });
    }
  };

  return (
    <>
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
