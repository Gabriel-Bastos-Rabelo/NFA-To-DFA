import React, { useEffect } from 'react';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';

const GraphDisplay = ({ afd }) => {
  useEffect(() => {
    const viz = new Viz({ Module, render });
    const dot = `
      digraph finite_state_machine {
        rankdir=LR;
        size="10,5"
        node [shape = doublecircle]; ${afd.finalStates.map((state) => `"${state}"`)};
        node [shape = circle];  ${afd.transitions.map(([from, symbol, to]) => `"${from}" -> "${to}" [ label = "${symbol}" ];`).join('\n')}
        
      }
    `;

    viz.renderSVGElement(dot)
      .then(element => {
        const graphContainer = document.getElementById('graph');
        graphContainer.innerHTML = '';  
        graphContainer.appendChild(element);
      })
      .catch(error => {
        console.error(error);
      });
  }, [afd]);

  return (
    <div>
      <div className="card mt-4 shadow">
      <div className="card-body">
        <h2 className="card-title text-center">AFD Resultante</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Estados:</strong> {afd.states && afd.states.join(', ')}
          </li>
          <li className="list-group-item">
            <strong>Transições:</strong>
            <ul>
              {afd.transitions && afd.transitions.map((t, index) => (
                <li key={index}>{`${t[0]} --${t[1]}--> ${t[2]}`}</li>
              ))}
            </ul>
          </li>
          <li className="list-group-item">
            <strong>Símbolos:</strong> {afd.alphabet && afd.alphabet.join(', ')}
          </li>
          <li className="list-group-item">
            <strong>Estado Inicial:</strong> {afd.initialState && afd.initialState}
          </li>
          <li className="list-group-item">
            <strong>Estados Finais:</strong> {afd.finalStates && afd.finalStates.join(', ')}
          </li>
        </ul>
      </div>
    </div>
      <div className="d-flex justify-content-center mt-4 mb-4">
      <div id="graph"></div>
      </div>
    </div>
  );
};

export default GraphDisplay;
