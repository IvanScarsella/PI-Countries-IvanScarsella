import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getByName, getCountries, getCurrentPages, clearFilters } from "../../redux/actions/actions";
import Navbar from "../../components/navbar/navbar.component";
import Cards from "../../components/cards/cards.component";
import Menu from "../../components/menu/menu.component";
import "./home.styles.css";

function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.allCountries);

    const [searchString, setSearchString] = useState("");

    const [filtered, setFiltered] = useState(allCountries);

    function handleSubmit(e) {
        e.preventDefault();
        let paisesFiltrados = [];

        if (e.target.id === 'busqueda') {
            setSearchString(e.target.value)

            allCountries.forEach(country => {
                if (country.name.toLowerCase().includes(e.target.value.toLowerCase()))
                    paisesFiltrados.push(country)
            })
        }
        setFiltered(paisesFiltrados)

        // if (e.target.id === 'genre' && e.target.value !== 'allGenres') {
        //     let temporal = [];
        //     filtered.forEach(element => {
        //         if (element.genres.includes(e.target.value)) {
        //             temporal.push(element)
        //         }
        //     });
        //     paisesFiltrados = temporal
        // }
        // setFiltered(paisesFiltrados)

        // if ((e.target.id === 'platform') && (e.target.value !== 'allPlatforms')) { // filtro por plataforma
        //     let temporal = []
        //     filtered.forEach(element => {
        //       if (element.platforms.includes(e.target.value)) {
        //         temporal.push(element)
        //       }
        //     });
        //     juegosFiltrados = temporal
        //   }
        //   setFiltered(juegosFiltrados)

        // if((e.target.id === 'originData') && (e.target.value !== 'allOrigins')) {
        //     let temporal = []
        //     filtered.forEach(element => {
        //         if (element.created === true) {
        //             temporal.push(element)
        //         }
        //     });
        //     paisesFiltrados = temporal
        // }
        // setFiltered(paisesFiltrados)
    }

    useEffect(() => {
        if (allCountries) {
            setFiltered(allCountries)
            dispatch(getCurrentPages(filtered))
        }
    }, [allCountries])

    useEffect(() => {
        if (!allCountries){
            dispatch(getCountries())
        }
        dispatch(getByName(searchString));
        // dispatch(getCountries());
        dispatch(clearFilters());
        // return (() => {
        //     clearDetail()          // completar
        // })
    }, [dispatch])

    return (
        <div className="Home">
            <h2 className="Home-title">PI Countries</h2>
            <Link to="/landing">
                <button className="backToLanding">Volver a la landing Page</button>
            </Link>

            <Navbar handleSubmit={handleSubmit} />

            <Menu />

            {filtered ?
                <Cards allCountries={filtered} />
                : <Cards allCountries={allCountries} />
            }
        </div>
    );
}

export default Home;