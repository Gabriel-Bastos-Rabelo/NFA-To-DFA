import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = ({ onSubmit }) => {
  const [states, setStates] = useState([]);
  const [newState, setNewState] = useState('');
  const [transitions, setTransitions] = useState([]);
  const [newTransition, setNewTransition] = useState({ from: '', symbol: '', to: '' });
  const [alphabet, setAlphabet] = useState([]);
  const [newSymbol, setNewSymbol] = useState('');
  const [initialState, setInitialState] = useState('');
  const [finalStates, setFinalStates] = useState([]);
  const [newFinalState, setNewFinalState] = useState('');

  const handleAddState = () => {
    setStates([...states, newState]);
    setNewState('');
  };

  const handleAddTransition = () => {
    setTransitions([...transitions, newTransition]);
    setNewTransition({ from: '', symbol: '', to: '' });
  };

  const handleAddSymbol = () => {
    setAlphabet([...alphabet, newSymbol]);
    setNewSymbol('');
  };

  const handleAddFinalState = () => {
    setFinalStates([...finalStates, newFinalState]);
    setNewFinalState('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const afn = {
      states,
      transitions,
      alphabet,
      initialState,
      finalStates
    };
    onSubmit(afn);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5 p-4 border rounded bg-light shadow">
      <h2 className="mb-4 text-center">Transformar AFN para AFD</h2>
      <div className="mb-3">
        <label className="form-label">Estados:</label>
        <div className="d-flex mb-2">
          <input
            type="text"
            className="form-control me-2"
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
            placeholder="Novo estado"
          />
          <button type="button" className="btn btn-secondary" onClick={handleAddState}>Adicionar</button>
        </div>
        <div>{states.join(', ')}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Transições:</label>
        <div className="d-flex mb-2">
          <input
            type="text"
            className="form-control me-2"
            value={newTransition.from}
            onChange={(e) => setNewTransition({ ...newTransition, from: e.target.value })}
            placeholder="De"
          />
          <input
            type="text"
            className="form-control me-2"
            value={newTransition.symbol}
            onChange={(e) => setNewTransition({ ...newTransition, symbol: e.target.value })}
            placeholder="Símbolo"
          />
          <input
            type="text"
            className="form-control me-2"
            value={newTransition.to}
            onChange={(e) => setNewTransition({ ...newTransition, to: e.target.value })}
            placeholder="Para"
          />
          <button type="button" className="btn btn-secondary" onClick={handleAddTransition}>Adicionar</button>
        </div>
        <div>{transitions.map(t => `${t.from}${t.symbol}${t.to}`).join(', ')}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Símbolos:</label>
        <div className="d-flex mb-2">
          <input
            type="text"
            className="form-control me-2"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            placeholder="Novo símbolo"
          />
          <button type="button" className="btn btn-secondary" onClick={handleAddSymbol}>Adicionar</button>
        </div>
        <div>{alphabet.join(', ')}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Estado Inicial:</label>
        <input
          type="text"
          className="form-control"
          value={initialState}
          onChange={(e) => setInitialState(e.target.value)}
          placeholder="Estado Inicial"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Estados Finais:</label>
        <div className="d-flex mb-2">
          <input
            type="text"
            className="form-control me-2"
            value={newFinalState}
            onChange={(e) => setNewFinalState(e.target.value)}
            placeholder="Novo estado final"
          />
          <button type="button" className="btn btn-secondary" onClick={handleAddFinalState}>Adicionar</button>
        </div>
        <div>{finalStates.join(', ')}</div>
      </div>
      <button type="submit" className="btn btn-primary w-100">Transformar</button>
    </form>
  );
};

export default Form;
