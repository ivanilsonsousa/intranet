import React from 'react';
import { Router } from 'react-router-dom';

import './App.css';

import Routes from './routes';
import history from './history';

import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router history={history} basename="/home" >
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
