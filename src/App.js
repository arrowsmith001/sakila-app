
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './styles/Layout.css';
import * as ReactDOM from 'react-dom';
import FilmsByCategoryList from './FilmsByCategoryList';
import MovieDetail from './MovieDetail';
import './styles/App.css';
import Layout from './Layout';
import Checkout from './Checkout';
import FinalCheckout from './FinalCheckout';


function App() {
  return (
    <div className="app">
      <BrowserRouter basename="">
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<FilmsByCategoryList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/checkout/:film_id/customer/:customer_id" element={<FinalCheckout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;