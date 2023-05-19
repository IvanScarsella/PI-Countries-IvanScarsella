import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getByName, getCountries, getCurrentPages, clearFilters, } from "../../redux/actions/actions";
import Navbar from "../../components/navbar/navbar.component";
import Cards from "../../components/cards/cards.component";
import Menu from "../../components/menu/menu.component";
import "./home.styles.css";

function Home() {

    const dispatch = useDispatch();

    const allCountries = useSelector((state) => state.allCountries);

    const allActivities = useSelector((state) => state.allActivities);
    
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

        if (e.target.id === 'continent' && e.target.value !== 'allContinents') {

            let temporal = [];
            filtered.forEach(country => {
                if (country.continent.includes(e.target.value)) {
                    temporal.push(country)
                }
            });
            paisesFiltrados = temporal
        }
        setFiltered(paisesFiltrados)

        if (e.target.id === 'activity' && e.target.value !== 'allActivities') {
            let paisesConActividades = []
            let activity = allActivities.find(activity => activity.name === e.target.value);

            for (let i = 0; i < allActivities.length; i++) {  // paisesConActividades queda como un array de arrays que contienen los países con actividades
                paisesConActividades.push(allActivities[i].country)
            }

            let paisesConActividadesSeparados = [];

            paisesConActividades.forEach(array => {// paisesConActividadesSeparados queda como un array que incluye solo el nombre de los países con actividades
                for (let i = 0; i < array.length; i++) {
                    paisesConActividadesSeparados.push(array[i])
                }
            })

            let paisesParaMostrar = [];

            for (let i = 0; i < paisesConActividadesSeparados.length; i++) { // paisesParaMostrar queda como un array que contiene los objetos de los paises con actividades turisticas
                filtered.forEach(country => {
                    if (country.name === paisesConActividadesSeparados[i]) {
                        paisesParaMostrar.push(country)
                    }
                })
            }

            let paisesRenderizados = [];

            for (let i = 0; i < activity.country.length; i++) { // paisesFiltrados queda como un array con los paises con las actividades para renderizar
                paisesParaMostrar.forEach(country => {
                    if (country.name === activity.country[i])
                        paisesRenderizados.push(country)
                })
            }
            paisesFiltrados = paisesRenderizados
        }
        setFiltered(paisesFiltrados)

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

    if (searchString) dispatch(getCurrentPages(filtered))
    if (!searchString && filtered) dispatch(getCurrentPages(filtered))

    useEffect(() => {
        if (allCountries) {
            setFiltered(allCountries)
            dispatch(getCurrentPages(filtered))
        }
    }, [allCountries])

    useEffect( () => {
        if (!allCountries) {
            dispatch(getCountries())
        }

        dispatch(getByName(searchString));
        // dispatch(getCountries());
        dispatch(clearFilters());
        setFiltered(allCountries)
        dispatch(getCurrentPages(allCountries))
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