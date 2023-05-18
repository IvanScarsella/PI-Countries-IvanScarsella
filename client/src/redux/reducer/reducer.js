import {
    GET_COUNTRIES, GET_BY_NAME, GET_CURRENT_PAGES, CLEAR_FILTERS, GET_COUNTRY_DETAIL,
    CLEAR_DETAIL, INCREASE_PAGE, DECREASE_PAGE, CHANGE_PAGE, FILTER_CHANGE_VALUE,
    FILTER_COUNTRIES, RESTART_CURRENT_PAGE, GET_ACTIVITIES, CREATE_ACTIVITY, GET_CONTINENTS
} from "../actions/actions";

let initialState = {
    allCountries: [],
    countryDetail: {},
    page: 1, // página actual
    pages: 0, // páginas totales
    currentPages: [],
    filters: {
         continent: "",
         activity: "",
         order: "",
    },
    allActivities: [],
    continents: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
            }
        case GET_BY_NAME:
            return {
                ...state,
                allCountries: action.payload,
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                countryDetail: {}
            }
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case GET_CURRENT_PAGES:
            return {
                ...state,
                currentPages: action.payload,
                pages: action.payload.length
            }
        case INCREASE_PAGE:
            return {
                ...state,
                page: state.page < state.pages ? state.page + 1 : state.page
            }
        case DECREASE_PAGE:
            return {
                ...state,
                page: state.page > 1 ? state.page - 1 : state.page
            }
        case RESTART_CURRENT_PAGE:
            return {
                ...state,
                currentPages: action.payload,
                pages: action.payload.length,
                page: 1
            }
        case FILTER_CHANGE_VALUE: 
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.property]: action.payload.value
                }
            }
        case FILTER_COUNTRIES:
            return {
                ...state,
                currentPages: action.payload,
                filteredPages: action.payload,
                page: 1,
                pages: action.payload.length
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    continent:"",
                    activity: "",
                    order: "",
                }

            }
        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload,
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
                allActivities: [...state.allActivities, action.payload]
            }
        case GET_CONTINENTS:
            return {
                ...state,
                continents: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer