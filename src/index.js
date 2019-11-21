import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const appWrapper = (
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);

ReactDOM.render(appWrapper, document.getElementById('root'));
