import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { filterFilmsByDirector, getListOf, getFilmStats } from "../helpers/film.helpers";

function FilmsPage(props) {
    let [list, setList] = useState([]);
    let [searchDirector, setSearchDirector] = useState("");

    function getFilms() {
        fetch("https://studioghibliapi-d6fc8.web.app/films")
            .then((response) => response.json())
            .then((films) => setList(films))
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        getFilms();
    }, []);


    let filmsByDirector = filterFilmsByDirector(list, searchDirector);
    let directors = getListOf(list, "director");
    let { avg_score, latest, total } = getFilmStats(filmsByDirector);


    return (
        <div>
            <h1>Studio Ghibli Films</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="searchDirector">Filter By Director </label>
                    <select
                        name="searchDirector"
                        id="searchDirector"
                        value={searchDirector} 
                        onChange={(event) => setSearchDirector(event.target.value)}
                    >
                        <option value="">All</option>
                        {directors.map((director, idx) => {
                            return (
                                <option key={director + idx} value={director}>{director}</option>
                            );
                        })}
                    </select>
                </div>
            </form>
            <div>
                <div>
                    <span># Of Films </span>
                    <span>{total}</span>
                </div>
                <div>
                    <span>Average Rating </span>
                    <span>{avg_score.toFixed(2)}</span>
                </div>
                <div>
                    <span>Latest Film </span>
                    <span>{latest}</span>
                </div>
            </div>
            <ul>
                {filmsByDirector.map((film) => {
                    return (
                        <li key={film.id}>
                            <Link to={`/films/${film.id}`}>{film.release_date} - {film.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

}

export default FilmsPage;