import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { InitProvider } from './contexts/InitContext';
import reportWebVitals from './reportWebVitals';
import "./i18n"

ReactDOM.render(
  <React.StrictMode>
    <InitProvider>
      <App />
    </InitProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
