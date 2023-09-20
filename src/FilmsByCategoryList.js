import React, { useEffect, useState } from 'react';
import './styles/FilmsByCategoryList.css';
import * as sakilaApi from './sakilaApi';
import { useParams } from 'react-router-dom';
import MovieList from './MovieList';



function FilmsByCategoryList() {

    var [categories, setCategories] = useState([]);

    useEffect(() => {

        sakilaApi.getAll(sakilaApi.Entities.Category).then((c) => {
            setCategories(c);
        })

    }, []);

    return (
        <div>
            {
                categories.map((c) => {
                    return (<MovieList category={c} />);
                })
            }

        </div>
    );
}

export default FilmsByCategoryList;