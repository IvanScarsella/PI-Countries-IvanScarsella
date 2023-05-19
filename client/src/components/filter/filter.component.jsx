import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentPages, restartCurrentPage, clearFilters, filterChangeValue,
    filterCountries, getCountries, getContinents, getActivities
} from "../../redux/actions/actions";
import "../filter/filter.styles.css";

export default function FilterBy() {
    const [flagExecuteFilterCountries, setFlagExecuteFilterCountries] = useState(false);

    let { allCountries, filters, page, pages, allActivities } = useSelector(state => state);

    const continents = ["South America", "North America", "Antarctica", "Asia", "Africa", "Europe", "Oceania"]

    const dispatch = useDispatch();

    const handleChangeValue = (e) => {
        dispatch(clearFilters())
        dispatch(filterChangeValue(e.target.name, e.target.value))
        dispatch(filterCountries(allCountries, filters))
        setFlagExecuteFilterCountries(prev => !prev)
    }

    const handleRestart = () => {
        const find = Object.values(filters).find(e => e !== "")
        if (find) {
            dispatch(clearFilters())
            dispatch(restartCurrentPage(allCountries))
            // dispatch(getCurrentPages(allCountries))

        }
    }

    useEffect(() => {
        // dispatch(getContinents())
        dispatch(getActivities())
        dispatch(filterCountries(allCountries, filters))
    }, [dispatch, allCountries, filters, flagExecuteFilterCountries])

    // allCountries = useSelector(s => s.allCountries)

    // useEffect(() => {
    //     if (pages > page) {
    //         dispatch(getCurrentPages(allCountries))
    //     }
    // }, [dispatch, allCountries, pages, page])

    return (
        <form>
            <h1 className="filter">Puede filtrar los países y ordenarlos</h1>
            <div>
                {<><select name="continent" value={filters.continent} onChange={handleChangeValue} id='continent'>
                    <option value="allContinents" defaultValue>Continente</option>
                    {continents.map(continent => {
                        return <option name={continent} key={continent} value={continent}>{continent}</option>;
                    })}
                </select>

                    <select name="activity" value={filters.activity} onChange={handleChangeValue} id='activity'>
                        <option value="allActivities" defaultValue>Actividad turística</option>
                        {allActivities.map(activity => {
                            let actividad = `${activity.name} \n Dificultad: ${activity.difficulty}, Duración: ${activity.duration}`;
                            let actividadSeparadaEnDos = actividad.split("\n");
                            let actividadSeparadaEnRenglones = actividadSeparadaEnDos[0] + '\n' + actividadSeparadaEnDos[1]
                            return <option name={activity.name} key={activity.name} value={activity.name} title={actividadSeparadaEnRenglones}>{activity.name}</option>;
                        })}
                    </select>
                    
                    <select name="order" value={filters.order} onChange={handleChangeValue} id='order'>
                        <option value="" defaultValue>Orden</option>

                        <optgroup label="alfabético">
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </optgroup>

                        <optgroup label="población">
                        <option value="Ascendente">Ascendente</option>
                        <option value="Descendente">Descendente</option>
                        </optgroup>
                    </select>
                    
                    </>



                /*
                <select name="order" value={filters.order} onChange={handleChangeValue} id='order'>
                    <option value ="" >Orden</option>

                    <optgroup label="-rating">
                        <option value="max-min">Mayor a menor</option>
                        <option value="min-max">Menor a mayor</option>
                    </optgroup>
                    
                    <optgroup label="-alfabético">
                        <option value="A_Z">A-Z</option>
                        <option value="Z_A">Z-A</option>
                    </optgroup>
                </select> */}

                <div>
                    <button onClick={() => handleRestart()}> Borrar Filtro</button>
                </div>
            </div>
        </form>
    )
}
