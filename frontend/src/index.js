import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your main CSS file, which will now include Tailwind
import App from './App';
import reportWebVitals from './reportWebVitals'; // Keep if you want performance reporting

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
