import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import 'focus-visible';
import { ThemeContextProvider, SizeContextProvider } from './Context/ToggleContexts.js';

ReactDOM.render(
    <ThemeContextProvider>
      <SizeContextProvider>
        <App />
      </SizeContextProvider>
    </ThemeContextProvider>,
  document.getElementById('root')
);
