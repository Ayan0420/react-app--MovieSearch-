import {useEffect, useState} from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg'


const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=44a065d9';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }
    
    //useEffect hook will trigger a certain function when the component loads up. 
    useEffect(() => {
        searchMovies("resident evil")
    }, []) //"[]" (empty dependency array) means that use effect will only run once

    return (
        <div className="app">
            <h1>MovieSearch</h1>
            <div className="search">
                <input
                    placeholder="Search for movies "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? 
                (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}

        </div>
    ); 
}

export default App;