import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: '',
};

const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newPeople = [...state.people, action.payload];
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: 'Item added',
    };
  }
  // We still wanna return our state here
  if (action.type === 'NO_VALUE') {
    return {
      ...state,
      isModalOpen: true,
      modalContent: 'Please enter value',
    };
  }
  throw new Error('no matching action type');
};

const Index = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (name) {
      // We have `setName()` to assign the e.target.value to name
      const newItem = { id: new Date().getTime().toString(), name };
      // Name convention
      dispatch({ type: 'ADD_ITEM', payload: newItem });
      setName('');
    } else {
      dispatch({ type: 'NO_VALUE' });
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
