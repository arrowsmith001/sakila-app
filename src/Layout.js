
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';

import './styles/Layout.css';
import MovieList from './MovieList';
import * as sakilaApi from './sakilaApi';
import MovieDetail from './MovieDetail';
import FilmsByCategoryList from './FilmsByCategoryList';
import * as ReactDOM from 'react-dom';

function Layout() {
  const logo = require(`./assets/logo.png`);

  function firstTime() {

    localStorage.removeItem('isFirstVisit');
  }
  return (
    <div className="layout">
      <div className="sidebar">
        <div className="sidebar__logo">
          <img onClick={firstTime}
            src={logo}
            alt="Logo"
          />
        </div>
        <div className="sidebar__menu">
          <ul>
            <li>
              <Link to='/'>
                <h3>Home</h3>
              </Link>
            </li>
            <li>
              <Link to='/hot'>
                <h3>What's Hot</h3>
              </Link>
            </li>
            <li>
              <Link to='/category'>
                <h3>Categories</h3>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;