import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPages, restartCurrentPage, clearFilters, filterChangeValue, filterCountries, getCountries, /* getGenres, getPaltforms */ } from "../../redux/actions/actions";
import "../filter/filter.styles.css";

export default function FilterBy () {
    const [flagExecuteFilterCountries, setFlagExecuteFilterCountries] = useState(false);

    let { allCountries, filters, page, pages, /* apiPlatforms, apiGenres */} = useSelector(state => state);
    const dispatch = useDispatch();

    const handleChangeValue = (e) => {
        dispatch(filterChangeValue(e.target.name, e.target.value))
        setFlagExecuteFilterCountries(prev => !prev)
    }

    useEffect(() => {
        dispatch(getCountries())
        // dispatch(getPlarforms())
        dispatch(filterCountries(allCountries. filters))
    }, [dispatch, allCountries, filters, flagExecuteFilterCountries])

    allCountries = useSelector(s => s.allCountries)

    useEffect(() => {
        if (pages > page) {
            dispatch(getCurrentPages(allCountries))
        }
    }, [dispatch, allCountries, pages, page])

    const handleRestart = () => {
        const find = Object.values(filters).find(e => e !== "")
        if (find) {
            dispatch(clearFilters())
            dispatch(restartCurrentPage(allCountries))
        }
    }

    return (
        <form>
            <h1 className="filter">Puede filtrar los países y ordenarlos</h1>
            <div>
                {/* <select name="genre" value={filters.genre} onChange={handleChangeValue} id='genre'>
                    <option value="allGenres" >Género</option>
                    {apiGenres[0]?.map(genre => {
                        return <option name={genre.name} key={genre.name} value={genre.name}>{genre.name}</option>
                    })}
                </select>

                <select name="platform" value={filters.platform} onChange={handleChangeValue} id='platform'>
                    <option value="allPlatform" >Género</option>
                    {apiGenres[0]?.map(platform => {
                        return <option name={platform.name} key={platform.name} value={platform.name}>{platform.name}</option>
                    })}
                </select>

                <select name="originData" value={filters.originData} onChange={handleChangeValue} id='created'>
                    <option value="allOrigins">Origen</option>
                    <option value="all">Todos</option>
                    <option value="db">DB</option>
                    <option value="api">API</option>
                </select>

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
