import React, { useEffect, useState } from 'react';
import './styles/FilmsByCategoryList.css';
import * as sakilaApi from './sakilaApi';
import { useParams } from 'react-router-dom';
import MovieList from './MovieList';
import Spinner from './Spinner';



function FilmsByCategoryList() {

    var [categories, setCategories] = useState([]);

    var [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        sakilaApi.getAll(sakilaApi.Entities.Category).then((c) => {
            console.log(c);
            const clean = c.filter((c) => c.name != null && c.name != 'New Category');
            setCategories(clean);
            setIsLoading(false);
        })

    }, []);

    return isLoading ? (<Spinner></Spinner>) : (
        <div class="films-by-category-list-container">

            <h3 className='title'>Films by category</h3>
            {
                categories.map((c) => {
                    return (
                        <div class='movie-list-panel'>
                            <MovieList category={c} />
                        </div>
                    );
                })
            }

        </div>
    );
}

export default FilmsByCategoryList;