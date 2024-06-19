export const nfaToDfa = (nfa) => {
    let nfa_transactions = {};
    let dfa_transactions = {};
    let programFunction = nfa.transitions;
    let finalStates = nfa.finalStates;
    let alphabet = nfa.alphabet;
    let initialState = nfa.initialState;
    let states = nfa.states;
    for (let transition of programFunction) {
      let key = [transition.from, transition.symbol];
      if (key in nfa_transactions) {
          nfa_transactions[key].push(transition.to);
      } else {
          nfa_transactions[key] = [transition.to];
      }
    }
  
  
    let all_combinations = [];
  
    for (let r = 1; r <= states.length; r++) {
        let combination = combinations(states, r);
        for (let combo of combination) {
            all_combinations.push(combo.join('-'));
        }
    }
  
    all_combinations.sort();
  
    for (let state of all_combinations) {
        for (let letter of alphabet) {
            dfa_transactions[[state, letter]] = [];
        }
    }
    
  
  
    for (let state in dfa_transactions) {
      let key = state.split(',')
      let s = key[0].split('-');
      for (let i of s) {
          if (nfa_transactions[`${i},${key[1]}`]) {
              for (let j of nfa_transactions[`${i},${key[1]}`]) {
                  if (!dfa_transactions[state].includes(j)) {
                      dfa_transactions[state].push(j);
                  }
                  dfa_transactions[state].sort();
              }
          }
      }
    }
    

  
    let visited = new Set();
    for (let letra of alphabet) {
        dfs([initialState, letra], alphabet, visited, dfa_transactions);
    }
  
  
    let filtered_transitions = {}
  
  
    for (let key in dfa_transactions) {
      if (visited.has(key)) {
          filtered_transitions[key] = dfa_transactions[key]
      }
    }
  
    dfa_transactions = filtered_transitions
  
    
    let keys_to_remove = [];
    for (let state in dfa_transactions) {
        if (dfa_transactions[state].length === 0) {
            
            keys_to_remove.push(state);
            
        }
    }
  
    for (let key of keys_to_remove) {
        delete dfa_transactions[key];
    }
  
    for (let state in dfa_transactions) {
        dfa_transactions[state] = dfa_transactions[state].join('-');
    }
    let newStates = []
    let newFinalStates = []
    let newTransitions = []
  
    

  for(let state in dfa_transactions){
      let key = state.split(',')
      if(!newStates.includes(key[0])){
          newStates.push(key[0])
      }
      if(!newFinalStates.includes(key[0])){
          let s = key[0].split('-');
          for(let i of s){
              if(finalStates.includes(i)){
                  newFinalStates.push(key[0])
                  break;
              }
          }
      }
      if(!newStates.includes(dfa_transactions[state])){
          newStates.push(dfa_transactions[state])
      }
      if(!newFinalStates.includes(dfa_transactions[state])){
          let pointedState = dfa_transactions[state].split('-');
          for(let i of pointedState){
              if(finalStates.includes(i)){
                  newFinalStates.push(dfa_transactions[state]);
                  break;
              }
          }
      }
  
      if(!newTransitions.includes([key[0], key[1], dfa_transactions[state]])){
          newTransitions.push([key[0], key[1], dfa_transactions[state]])
      }
     
    }
  
    console.log("Novos estados: ", newStates)
    console.log("Estado inicial: ", initialState)
    console.log("Alfabeto: ", alphabet)
    console.log("Novas transições: ", newTransitions)
    console.log("Novos estados finais: ", newFinalStates)
  
    return {states: newStates, initialState: initialState, alphabet: alphabet, transitions: newTransitions, finalStates: newFinalStates}
  
    
  }

//Usado somente para testes
let teste1 = {initialState: '0', finalStates: ['2'], alphabet: ['a', 'b', 'c'], transitions: [
    { from: '0', symbol: 'a', to: '0' },
    { from: '0', symbol: 'b', to: '0' },
    { from: '0', symbol: 'c', to: '1' },
    { from: '0', symbol: 'c', to: '0' },
    { from: '1', symbol: 'c', to: '2' },
    { from: '2', symbol: 'a', to: '2' },
    { from: '2', symbol: 'b', to: '2' },
    { from: '2', symbol: 'c', to: '2' }
]
, states: ['0', '1', '2']}

let teste2 = {initialState: '0', finalStates: ['2'], alphabet: ['a', 'b'], transitions: [
    { from: '0', symbol: 'a', to: '0' },
    { from: '0', symbol: 'a', to: '1' },
    { from: '0', symbol: 'b', to: '0' },
    { from: '1', symbol: 'a', to: '2' },
    { from: '2', symbol: 'a', to: '2' },
    { from: '2', symbol: 'b', to: '2' }
], states: ['0', '1', '2']}


let teste3 = {initialState: '0', finalStates: ['0', '3'], alphabet: ['a', 'b'], transitions: [
    { from: '0', symbol: 'a', to: '2' },
    { from: '0', symbol: 'a', to: '3' },
    { from: '2', symbol: 'b', to: '1' },
    { from: '1', symbol: 'b', to: '0' }
], states: ['0', '1', '2', '3']}

let teste4 = {initialState: '0', finalStates: ['3'], alphabet: ['a', 'b'], transitions: [
    { from: '0', symbol: 'a', to: '0' },
    { from: '0', symbol: 'a', to: '1' },
    { from: '0', symbol: 'b', to: '0' },
    { from: '0', symbol: 'b', to: '2' },
    { from: '1', symbol: 'a', to: '3' },
    { from: '2', symbol: 'b', to: '3' },
    { from: '3', symbol: 'a', to: '3' },
    { from: '3', symbol: 'b', to: '3' }
], states: ['0', '1', '2', '3']}
nfaToDfa(teste4)
  
  
  function combinations(arr, r) {
    let result = [];
    function combinate(current, start) {
        if (current.length === r) {
            result.push(current.slice());
            return;
        }
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            combinate(current, i + 1);
            current.pop();
        }
    }
    combinate([], 0);
    return result;
  }
  
  
  function dfs(vertice, alphabet, visited, dfa_transactions) {
      if (!visited.has(`${vertice[0]},${vertice[1]}`)) {
          visited.add(`${vertice[0]},${vertice[1]}`);
      } else {
          return;
      }
      if(dfa_transactions[`${vertice[0]},${vertice[1]}`]?.length > 0){
  
        let s = dfa_transactions[`${vertice[0]},${vertice[1]}`].join('-');
        for (let letra of alphabet) {
            dfs([s, letra], alphabet, visited, dfa_transactions);
        }
      }
  }
  
  
  
  
  
  