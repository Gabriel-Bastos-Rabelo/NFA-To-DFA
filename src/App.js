import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';
import GraphDisplay from './components/GraphDisplay';
import { nfaToDfa } from './nfaToDfa';

const App = () => {
  const [afd, setAfd] = useState(null);

  const handleSubmit = (afn) => {
    const result = nfaToDfa(afn);
    setAfd(result);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Transformar AFN para AFD</h1>
      <Form onSubmit={handleSubmit} />
      {afd && (
        <div className="d-flex justify-content-center mt-5">
          <GraphDisplay afd={afd} />
        </div>
      )}
    </div>
  );
};

export default App;
