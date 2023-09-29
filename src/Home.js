
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';

import * as sakilaApi from './sakilaApi';
import FilmsByCategoryList from './FilmsByCategoryList';
import * as ReactDOM from 'react-dom';
import './styles/WhatsHot.css';
import Movie from './Movie';
import Spinner from './Spinner';


function Home() {

    var [movies, setMovies] = useState([]);

    var [loaded, setLoaded] = useState(false);

    const bg = require('./assets/cinema.jpg');

    useEffect(() => {

        sakilaApi.getRandomFilmSelection(108).then((films) => {
            console.log(films);
            setMovies(films);
            setLoaded(true);
        })

    }, []);

    return !loaded ? (<Spinner></Spinner>) : (
        <div className='container'>
            {/* <div class="title-container"  style={{ backgroundImage: `url(${bg})` }}> */}

            <h3 className='title'>Welcome to the Home of Fake Cinema</h3>

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

export default Home;