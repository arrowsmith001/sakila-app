
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';

import * as sakilaApi from './sakilaApi';
import FilmsByCategoryList from './FilmsByCategoryList';
import * as ReactDOM from 'react-dom';
import './styles/WhatsHot.css';
import Movie from './Movie';
import Spinner from './Spinner';


function WhatsHot() {

    var [movies, setMovies] = useState([]);
    var [loading, setLoading] = useState(true);

    const bg = require('./assets/cinema.jpg');

    useEffect(() => {

        sakilaApi.getPopularFilms(108).then((films) => {
            console.log(films);
            setMovies(films);
            setLoading(false);
        })

    }, []);

    return loading ? (<Spinner></Spinner>) : (
        <div id="whats-hot-loaded-root" className='container'>
            {/* <div class="title-container"  style={{ backgroundImage: `url(${bg})` }}> */}

            <h3 className='title'>Popular right now</h3>

            <div className='wrap-container'>


                {movies.map((m) => {

                    return (
                        <div className='movie-container'>
                            <Movie movie={m} />
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default WhatsHot;