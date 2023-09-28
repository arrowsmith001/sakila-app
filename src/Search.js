
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';

import * as sakilaApi from './sakilaApi';
import FilmsByCategoryList from './FilmsByCategoryList';
import * as ReactDOM from 'react-dom';
import './styles/WhatsHot.css';
import Movie from './Movie';


function Search() {

    var [movies, setMovies] = useState([]);
    var [term, setTerm] = useState("");

    var [loaded, setLoaded] = useState(true);


    const bg = require('./assets/cinema.jpg');

    async function handleSearchTermEntry(term) {
        runSearch(term);
    }

    async function runSearch(term) {
        setLoaded(false);

        if (term == "") {
            setMovies([]);
        }
        else {
            sakilaApi.searchFilmsByTerm(term, 20).then((films) => {
                setMovies(films);
                setLoaded(true);
            });
        }
    }

    return (
        <div className='container'>
            {/* <div class="title-container"  style={{ backgroundImage: `url(${bg})` }}> */}

            <label>Search: </label>
            <input style={{ color: 'black' }} id="search-input" onChange={(e) => handleSearchTermEntry(e.target.value)}></input>

            {loaded && (<div className='wrap-container'>


                {movies.map((m) => {

                    return (
                        <div className='movie-container'>
                            <Movie movie={m} />
                        </div>
                    )

                })}
            </div>)}
        </div>
    )
}

export default Search;