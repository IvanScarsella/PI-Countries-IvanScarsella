import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restartCurrentPage, clearFilters, filterChangeValue,
    filterCountries, getActivities
} from "../../redux/actions/actions";
import "../filter/filter.styles.css";

export default function FilterBy() {
    let { allCountries, filters, allActivities } = useSelector(state => state);

    const continents = ["South America", "North America", "Antarctica", "Asia", "Africa", "Europe", "Oceania"]

    const dispatch = useDispatch();

    const handleChangeValue = (e) => { // función para cambiar el valor del filtro
        dispatch(clearFilters())
        dispatch(filterChangeValue(e.target.name, e.target.value))
        dispatch(filterCountries(allCountries, filters))
    }

    const handleRestart = () => { // función para borrar los filtros
        const find = Object.values(filters).find(e => e !== "")
        if (find) {
            dispatch(clearFilters())
            dispatch(restartCurrentPage(allCountries))
        }
    }

    useEffect(() => {
        dispatch(getActivities())
        dispatch(filterCountries(allCountries, filters))
    }, [dispatch, allCountries, filters])

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
                        {allActivities
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(activity => {
                            switch (activity.season) {
                                case "Summer": activity.season = "Verano"; break;
                                case "Autumn": activity.season = "Otoño"; break;
                                case "Winter": activity.season = "Invierno"; break;
                                case "Spring": activity.season = "Primavera"; break;
                                default :
                            }
                            let actividad = `${activity.name} \n Dificultad: ${activity.difficulty}, Duración: ${activity.duration}, Estación: ${activity.season}`; // obtengo los datos de cada actividad y los muestro cuando paso el mouse por encima de cada opción
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
                }
                <div>
                    <button onClick={() => handleRestart()}> Borrar Filtro</button>
                </div>
            </div>
        </form>
    )
}