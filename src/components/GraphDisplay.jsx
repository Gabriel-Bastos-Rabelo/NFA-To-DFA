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
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">AFD Resultante</h2>
          <div className="mb-2">
            <strong>Estados:</strong> {afd.states && afd.states.join(', ')}
          </div>
          <div className="mb-2">
            <strong>Transições:</strong> {afd.transitions && afd.transitions.join('; ')}
          </div>
          <div className="mb-2">
            <strong>Símbolos:</strong> {afd.alphabet && afd.alphabet.join(', ')}
          </div>
          <div className="mb-2">
            <strong>Estado Inicial:</strong> {afd.initialState && afd.initialState}
          </div>
          <div className="mb-2">
            <strong>Estados Finais:</strong> {afd.finalStates && afd.finalStates.join(', ')}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4 mb-4">
      <div id="graph"></div>
      </div>
    </div>
  );
};

export default GraphDisplay;
