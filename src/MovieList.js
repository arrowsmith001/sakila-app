// MovieList.js
import React, { useEffect, useState } from 'react';
import './styles/MovieList.css';
import * as sakilaApi from './sakilaApi';
import { Link } from 'react-router-dom';
import Movie from './Movie';

const posterSrc = "https://postercollector.co.uk/site/posters/2018/01/The-Thing.jpg";

function MovieList({ category: category }) {

    var [movies, setMovies] = useState([]);
    const [translateX, setTranslateX] = useState(0);

    const moviesPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {

        sakilaApi.getAllFilmsByCategoryId(category.category_id).then((films) => {
            setMovies(films);
        })

    }, []);

    const startIndex = currentPage * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const currentMovies = movies.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);

        //setTranslateX(currentPage * -((200 + 10) * moviesPerPage));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div className='movie-list-genre'>

            <div>
                <h1>{category.name}</h1>
            </div>

            <div className='movie-list-with-buttons'>
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage == 0}
                    className="pagination__button"
                >
                    {"<"}
                </button>

                <div className="movieList">


                    <div className="movieList__container"

                        style={{ transform: `translateX(${translateX}px)` }}>

                        {currentMovies.map((movie) => {

                            return (<Movie movie={movie} />)
                        })}
                    </div>
                    <div className="movieList__pagination">


                    </div>
                </div>
                <button
                    onClick={handleNextPage}
                    disabled={endIndex >= movies.length}
                    className="pagination__button"
                >

                    {">"}
                </button>
            </div>

        </div>

    );
}




export default MovieList;