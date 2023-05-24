import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_CURRENT_PAGES = "GET_CURRENT_PAGES";
export const INCREASE_PAGE = "INCREASE_PAGE";
export const DECREASE_PAGE = "DECREASE_PAGE";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const RESTART_CURRENT_PAGE = "RESTART_CURRENT_PAGE";
export const FILTER_CHANGE_VALUE = "FILTER_CHANGE_VALUE";
export const FILTER_COUNTRIES = "FILTER_COUNTRIES";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const GET_CONTINENTS = "GET_CONTINENTS";

export function getCountries() { // obtiene todos los países de la base de datos
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/countries/all");
            return dispatch({
                type: GET_COUNTRIES,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
            throw new Error('No se pudieron obtener los países')
        }
    }
}

export function getByName(name) { // busca el país por nombre
    return async function (dispatch) {
        try {
            const response = await axios(`http://localhost:3001/countries/all?search=${name}`);
            return dispatch({
                type: GET_BY_NAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
            throw new Error('No se encontró el país solicitado')
        }
    }
}

export function getCountryDetail(id) { // busca el país con el id determinado
    return async function (dispatch) {
        try {
            if (id) {
                const response = (await axios.get(`http://localhost:3001/countries/${id}`));
                dispatch({
                    type: GET_COUNTRY_DETAIL,
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function clearDetail() { // borro el id del país que se muestra en detail para que se pueda mostrar otro
    return async function (dispatch) {
        return dispatch({
            type: CLEAR_DETAIL,
            payload: {}
        })
    }
}

export function getCurrentPages(currentCountries) { // retorna la cantidad de páginas a mostrar según la cantidad de países mostrados actualmente
    try {
        if (currentCountries) {
            let countries = currentCountries
            let max = Math.ceil(countries.length / 10)

            let slicedCountries = [[1, countries.slice(0, 10)]]
            let i = 2

            while (max > 1) {
                slicedCountries.push([i, countries.slice(10 * (i - 1), 10 * i)])
                i++
                max--
            }

            return ({
                type: GET_CURRENT_PAGES,
                payload: slicedCountries
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export function restartCurrentPage(allCountries) { // vuelvo a la página 1
    return async function (dispatch) {
        try {
            if (allCountries) {
                const countries = await getCurrentPages(allCountries).payload
                return dispatch({
                    type: RESTART_CURRENT_PAGE,
                    payload: countries
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const filterCountries = (allCountries, { continent, activity, order }) => { // ejecuta los filtros y retorna la cantidad de páginas según la cantidad de países encontrados

    const results = getFilteredCountries(allCountries, { continent, activity, order })

    const passToPages = getCurrentPages(results).payload

    return {
        type: FILTER_COUNTRIES,
        payload: passToPages
    }
}

function getFilteredCountries(allCountries, { continent, activity, order }) { // filtro los países
    let results = [...allCountries]

    if (continent) {
        let filterByContinent = results.filter(country =>
            country.continent === continent
        )
        results = filterByContinent
    }
    return results
}

export function changePage(page) { // cambio la páginca actual
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}

export function increasePage() { // voy a la página siguiente
    return {
        type: INCREASE_PAGE
    }
}

export function decreasePage() { // voy a la página anterior
    return {
        type: DECREASE_PAGE
    }
}

export const filterChangeValue = (property, value) => { // cambio el valor del filtro
    return {
        type: FILTER_CHANGE_VALUE,
        payload: { property, value }
    }
}
export const clearFilters = () => { // reinicio los filtros
    return {
        type: CLEAR_FILTERS
    }
}

export function getActivities() { // obtengo todas las actividades de la base de datos
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/activities");
            return dispatch({
                type: GET_ACTIVITIES,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
            throw new Error('No se pudieron obtener las actividades')
        }
    }
}

export function createActivity(data) { // obtengo los datos para crear una nueva actividad
    return async (dispatch) => {
        try {
            await axios.post(`http://localhost:3001/activities/`, data).then((result) => {
                return dispatch({
                    type: CREATE_ACTIVITY,
                    payload: result
                })
            })
        } catch (error) {
            console.log(error.message)
            throw new Error('No se ha podido crear la actividad')
        }
    }
}

export function getContinents() { // obtengo todos los continentes de los países
    return async function (dispatch) {
        try {
            const countries = await axios.get("http://localhost:3001/countries/all")
            let continents = [];
            countries.data.forEach(country => {
                continents.push(country.continent)
            });
            let allContinents = [];
            continents.forEach(continent => {
                if (allContinents.includes(continent))
                    allContinents.push(continent)
            })
            return dispatch({
                type: GET_CONTINENTS,
                payload: allContinents
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}