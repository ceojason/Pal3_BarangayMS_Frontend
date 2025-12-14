import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import StoreContext from './store/StoreContext';
import rootStore from './store/RootStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={{ store: rootStore }}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>
);