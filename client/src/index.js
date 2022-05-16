import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Inicio from './routes/inicio.jsx';
import Crear from './routes/crear.jsx';
import Details from './routes/details';
import Home from './routes/home.jsx';



ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/inicio' element={<Inicio />} ></Route>
        <Route path="/home" element={<Home />} />
        <Route path='/crear' element={<Crear />} />
        <Route path="/receta/:id" element={<Details />} />
        <Route path='*' element={<Inicio />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
