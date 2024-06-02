// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming you have an App component

// Create a root container and render the app
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
