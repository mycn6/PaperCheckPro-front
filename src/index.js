import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import 'normalize.css'
import store from './store/index';
import { Provider } from 'react-redux';
import '@ant-design/v5-patch-for-react-19';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
