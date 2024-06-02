import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GirlList from './GirlList'; 
import Adatbevitel from './Upload'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GirlList />} />
          <Route path="/upload" element={<Adatbevitel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
