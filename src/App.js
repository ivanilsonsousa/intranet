import React from 'react';
import { Router } from 'react-router-dom';

import './App.css';

import Routes from './routes';
import history from './history';

import { AuthProvider } from './Context/AuthContext';

const DIR = process.env.REACT_APP_DIR;

function App() {
  return (
    <AuthProvider>
      <Router history={history} basename={`/${DIR}`} >
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
