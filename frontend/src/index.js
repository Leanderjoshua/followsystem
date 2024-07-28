import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import App from './App';

// Creating a root element using React 18's createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside the StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
