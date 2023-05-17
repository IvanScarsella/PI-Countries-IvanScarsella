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

export function getCountries() {
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

export function getByName(name) {
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

export function getCountryDetail(id) {
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

export function clearDetail() {
    return async function (dispatch) {
        return dispatch({
            type: CLEAR_DETAIL,
            payload: {}
        })
    }
}

export function getCurrentPages(currentCountries) {
    try {
        if (currentCountries) {
            let countries = currentCountries
            let max = Math.ceil(countries.length / 10)

            let slicedCountries = [[1, countries.slice(0, 10)]]
            let i = 2

            while (max > 1) {
                slicedCountries.push([i, countries.slice(20 * (i - 1), 20 * i)])
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

export function restartCurrentPage(allCountries) {
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

export const filterCountries = (allCountries, {/* */ }) => {

    const results = getFilteredCountries(allCountries, {/* */ })

    const passToPages = getCurrentPages(results).payload

    return {
        type: FILTER_COUNTRIES,
        payload: passToPages
    }
}

function getFilteredCountries(allCountries, {/*  */ }) {
    let results = [...allCountries]

    // if (genre) {
    //     let filterByGenre = results.filter(game => {
    //         let flag = false
    //         game.genres.forEach(g => {
    //             const some = g === genre
    //             if (some) flag = true
    //         })
    //         if (flag) return game
    //         else return null
    //     })
    //     results = filterByGenre
    // }

    // //filtrar por plataforma
    // if (platform) {
    //     let filterByPlatform = results.filter(game => {
    //         let flag = false
    //         game.platforms.forEach(p => {
    //             const some = p === platform
    //             if (some) flag = true
    //         })
    //         if (flag) return game
    //         else return null
    //     })
    //     results = filterByPlatform
    // }

    // //orden
    // if (order) {
    //     switch (order) {
    //         case "max-min":
    //             results = results.sort((a, b) => b.rating - a.rating);
    //             break;
    //         case "min-max":
    //             results = results.sort((a, b) => a.rating - b.rating);
    //             break;
    //         case "A-Z":
    //             results = results.sort((a, b) => a.name.localeCompare(b.name))
    //             break;
    //         case "Z-A":
    //             results = results.sort((a, b) => b.name.localeCompare(a.name))
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // //origen
    // if (originData) {
    //     switch (originData) {
    //         case "all":
    //             results = allGames
    //             break;
    //         case "db":
    //             results = results.filter(game => {
    //                 if (game?.id?.toString().length > 10) return game
    //                 return null
    //             })
    //             break;
    //         case "api":
    //             results = results.filter(game => {
    //                 if (game.id.toString().length < 10) return game
    //                 return null
    //             })
    //             break;
    //         default:
    //             break;
    //     }
    // }

    return results
}

export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}

export function increasePage() {
    return {
        type: INCREASE_PAGE
    }
}

export function decreasePage() {
    return {
        type: DECREASE_PAGE
    }
}

export const filterChangeValue = (property, value) => {
    return {
        type: FILTER_CHANGE_VALUE,
        payload: { property, value }
    }
}
export const clearFilters = () => {
    return {
        type: CLEAR_FILTERS
    }
}

export function getActivities() {
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

export function createActivity(data) {
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