
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
import WhatsHot from './WhatsHot';
import Home from './Home';
import SplashScreen from './SplashScreen';
import { Helmet } from "react-helmet";
import Search from './Search';


function App() {

  const [isLoading, setIsLoading] = useState(true);

  const slogo = require("./assets/slogo.png");

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('isFirstVisit');

    if (isFirstVisit == null) {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('isFirstVisit', 'false');
      }, 4000);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="App">

      <Helmet>
        <title>Sakila</title>
        <link rel="icon" type="image/png" href="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/240px-Instagram-Icon.png" sizes="16x16" />
      </Helmet>

      {isLoading ? (
        <SplashScreen escape={() => setIsLoading(false)} />
      ) : (
        <div className="app">
          <BrowserRouter basename="">
            <Routes>

              <Route path="/" element={<Layout />}>

                <Route index element={<Home />} />
                <Route path="/hot" element={<WhatsHot />} />
                <Route path="/category" element={<FilmsByCategoryList />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/search" element={<Search />} />
              </Route>

              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/checkout/:filmId/customer/:customerId" element={<FinalCheckout />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;