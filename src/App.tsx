import React from 'react';
import './styles/App.css';
import RootRouter from './routes/RootRouter'

function App() {
  return (
      <div className="App">
          <main>
              <RootRouter />
          </main>
      </div>
  );
}

export default App;
