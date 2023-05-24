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

    const filters = useSelector((state) => state.filters);

    const allCountries = useSelector((state) => state.allCountries);

    const allActivities = useSelector((state) => state.allActivities);

    const [searchString, setSearchString] = useState("");

    const [filtered, setFiltered] = useState(allCountries);

    function handleSubmit(e) {
        let paisesFiltrados = [];
        e.preventDefault();

        if (e.target.id === 'busqueda') {
            // if(filtered){
            //     setSearchString(e.target.value)
            //     if (!paisesFiltrados.length)
            //     filtered.forEach(country => {
            //         if (country.name.toLowerCase().includes(e.target.value.toLowerCase()))
            //         paisesFiltrados.push(country)
            //     })
            // } else {
                setSearchString(e.target.value)
                if (!paisesFiltrados.length){

                    let temporal = [];
                    allCountries.forEach(country => {
                        if (country.name.toLowerCase().includes(e.target.value.toLowerCase()))
                        temporal.push(country)
                    })
                    paisesFiltrados = temporal;
                }
            // }
        }
        setFiltered(paisesFiltrados)

        if (e.target.id === 'continent' && e.target.value !== 'allContinents') {

            if (filters.continent) {
                let temporal = [];
                allCountries.forEach(country => {
                    if (country.continent.includes(e.target.value)) {
                        temporal.push(country)
                    }
                });
                paisesFiltrados = temporal
            } else {
                let temporal = [];
                filtered.forEach(country => {
                    if (country.continent.includes(e.target.value)) {
                        temporal.push(country)
                    }
                });
                paisesFiltrados = temporal
            }
        }
        setFiltered(paisesFiltrados)



        if (e.target.id === 'activity' && e.target.value !== 'allActivities') {
            let paisesConActividades = []
            let activity = allActivities.find(activity => activity.name === e.target.value);
            // console.log(allActivities, "ALL ACTIVITIES")

            for (let i = 0; i < allActivities.length; i++) {  // paisesConActividades queda como un array de arrays que contienen los países con actividades
                paisesConActividades.push(allActivities[i].country)
            }

            // console.log(paisesConActividades, "PAISES CON ACTIVIDADES")
            let paisesConActividadesSeparados = [];

            paisesConActividades.forEach(array => {// paisesConActividadesSeparados queda como un array que incluye solo el nombre de los países con actividades
                for (let i = 0; i < array.length; i++) {
                    if(!paisesConActividadesSeparados.includes(array[i]))
                    paisesConActividadesSeparados.push(array[i])
                }
            })
            // console.log(paisesConActividadesSeparados, "PAISES CON ACTIVIDADE SEPARADOS")
            let paisesParaMostrar = [];

            if (filters.activity) {

                for (let i = 0; i < paisesConActividadesSeparados.length; i++) { // paisesParaMostrar queda como un array que contiene los objetos de los paises con actividades turisticas
                    allCountries.forEach(country => {
                        if (country.name === paisesConActividadesSeparados[i]) {
                            paisesParaMostrar.push(country)
                        }
                    })
                }
            } else {

                for (let i = 0; i < paisesConActividadesSeparados.length; i++) { // paisesParaMostrar queda como un array que contiene los objetos de los paises con actividades turisticas
                    filtered.forEach(country => {
                        if (country.name === paisesConActividadesSeparados[i]) {
                            paisesParaMostrar.push(country)
                        }
                    })
                }
            }
            // console.log(paisesParaMostrar, "PAISES PARA MOSTRAR")
            let paisesRenderizados = [];

            for (let i = 0; i < activity.country.length; i++) { // paisesFiltrados queda como un array con los paises con las actividades para renderizar
                paisesParaMostrar.forEach(country => {
                    if (country.name === activity.country[i])
                        paisesRenderizados.push(country)
                })
            }
            // console.log(paisesRenderizados, "PAISES RENDERIZADOS")
            paisesFiltrados = paisesRenderizados
        }
        setFiltered(paisesFiltrados)

        if (e.target.id === 'order' && e.target.value !== "") {
            let paisesOrdenados = [];
            switch (e.target.value) {
                case "A-Z":
                    paisesOrdenados = filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "Z-A":
                    paisesOrdenados = filtered.sort((a, b) => b.name.localeCompare(a.name))
                    break;
                case "Ascendente":
                    paisesOrdenados = filtered.sort((a, b) => b.population - a.population);
                    break;
                case "Descendente":
                    paisesOrdenados = filtered.sort((a, b) => a.population - b.population);
                    break;
                default:
                    paisesOrdenados = filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }
            setFiltered(paisesOrdenados)
        }
    }

    if (searchString) dispatch(getCurrentPages(filtered))
    if (!searchString && filtered) dispatch(getCurrentPages(filtered))

    useEffect(() => {
        if (allCountries) {
            setFiltered(allCountries)
            dispatch(getCurrentPages(filtered))
        }
    }, [allCountries])

    useEffect(() => {
        if (!allCountries) {
            dispatch(getCountries())
        }
        dispatch(getByName(searchString));
        dispatch(clearFilters());
        setFiltered(allCountries)
        dispatch(getCurrentPages(filtered))
        // return (() => {
        //     clearDetail()          // completar
        // })
    }, [dispatch])

    // console.log(allActivities);
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