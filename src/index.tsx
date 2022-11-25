import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from './routing'
import 'index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  </React.StrictMode>
);
export {findBest} from "./helpers/findBest";