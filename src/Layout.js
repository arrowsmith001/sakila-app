
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, NavLink, Outlet, Route, Routes } from 'react-router-dom';

import './styles/Layout.css';
import MovieList from './MovieList';
import * as sakilaApi from './sakilaApi';
import MovieDetail from './MovieDetail';
import FilmsByCategoryList from './FilmsByCategoryList';
import * as ReactDOM from 'react-dom';

function Layout() {
  const logoPath = require(`./assets/logo.png`);
  const searchPath = require(`./assets/search.png`);
  const homePath = require(`./assets/home.png`);
  const categoriesPath = require(`./assets/categories.png`);
  const hotPath = require(`./assets/fire.png`);

  function firstTime() {

    localStorage.removeItem('isFirstVisit');
  }

  function handleChange(e) {
    console.log('click' + e.target);
  }

  return (
    <div className="layout">
      <div className="sidebar">
        <div className="sidebar__logo">
          <img onClick={firstTime}
            src={logoPath}
            alt="Logo"
          />
        </div>
        <div className="sidebar__menu">
          <ul>
            <li>
              <Link to='/' >
                <img className='icon' src={homePath}></img>
                <h3>Home</h3>
              </Link>
            </li>
            <li>
              <Link to='/hot' >
                <img className='icon' src={hotPath}></img>
                <h3>What's Hot</h3>
              </Link>
            </li>
            <li>
              <Link to='/category'>
                <img className='icon' src={categoriesPath}></img>
                <h3>Categories</h3>
              </Link>
            </li>
            <li>
              <Link to='/search'>
                <img className='icon' src={searchPath}></img>
                <h3>Search</h3>

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