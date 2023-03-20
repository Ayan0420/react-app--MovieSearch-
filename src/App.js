import {useEffect, useState} from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg'


const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=44a065d9';

const App = () => {

    //"movies" is the state(or dynamic variable) and "setMovies" is the function that set the value for the "movies" variable. and [] is the initial value of the state
    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const searchMovies = async (title) => {
        setIsLoading(true)
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
        setIsLoading(false)
    }
    
    //useEffect hook will trigger a certain function when the component loads up. 
    useEffect(() => {
        searchMovies("resident evil")
    }, []) //"[]" (empty dependency array) means that use effect will only run once

    return (
        <div className="app">
            <h1>MovieSearch</h1>
            <p className="sub-title">This simple react app uses the OMDB API to retrieve movie searches.</p>
            
            <div className="search">
                <input
                    placeholder="Search for movies "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            searchMovies(searchTerm)
                          }
                    }}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
                
            {
                isLoading ?
                (
                    <div className="empty">
                        <h2>Searching...</h2>
                    </div>
                ) :
                (movies?.length > 0
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
                    ))
            }
        <footer>
        <p className="sub-title">Design credits to JavascriptMastery.</p>
        </footer>
        </div>
    ); 
}

export default App;