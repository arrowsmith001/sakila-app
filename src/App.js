
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


function App() {

  const [isLoading, setIsLoading] = useState(true);

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
              </Route>

              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/checkout/:film_id/customer/:customer_id" element={<FinalCheckout />} />
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