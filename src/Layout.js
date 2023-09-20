
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import './styles/Layout.css';
import MovieList from './MovieList';
import * as sakilaApi from './sakilaApi';
import MovieDetail from './MovieDetail';
import FilmsByCategoryList from './FilmsByCategoryList';
import * as ReactDOM from 'react-dom';

function Layout() {

  return (
    <div className="layout">
      <div className="sidebar">
        <div className="sidebar__logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Logo"
          />
        </div>
        <div className="sidebar__menu">
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-home"></i> Home
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-film"></i> Movies
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-user"></i> Profile
              </a>
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