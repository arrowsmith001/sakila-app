
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';

import * as sakilaApi from './sakilaApi';
import FilmsByCategoryList from './FilmsByCategoryList';
import * as ReactDOM from 'react-dom';
import './styles/WhatsHot.css';
import Movie from './Movie';
import Spinner from './Spinner';


function Search() {

    var [movies, setMovies] = useState([]);
    var [term, setTerm] = useState("");

    var [isLoading, setIsLoading] = useState(false);


    const bg = require('./assets/cinema.jpg');

    async function handleSearchTermEntry(term) {
        setTerm(term);
        if (term !== "") {
            runSearch(term);
        }
    }

    async function runSearch(term) {
        setIsLoading(true);

        if (term == "") {
            setMovies([]);
        }
        else {
            sakilaApi.searchFilmsByTerm(term, 20).then((films) => {
                setMovies(films);
                setIsLoading(false);
            });
        }
    }

    return (
        <div className='container'>
            {/* <div class="title-container"  style={{ backgroundImage: `url(${bg})` }}> */}

            <div style={{ paddingLeft: '32px' }}>

                <label style={{ fontSize: "32px" }}>Search: </label>
                <input style={{ color: 'black' }} id="search-input" onChange={(e) => handleSearchTermEntry(e.target.value)}></input>
            </div>

            {isLoading ? (<Spinner></Spinner>) :
                term === "" ? (<div></div>) :
                    movies.length == 0 ? (<div style={{ padding: "32px" }}><h1>No Results for "{term}"</h1></div>) : (<div className='wrap-container'>


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