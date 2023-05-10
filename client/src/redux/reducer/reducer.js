import {
    GET_COUNTRIES, GET_BY_NAME, GET_CURRENT_PAGES, CLEAR_FILTERS
} from "../actions/actions";

let initialState = {
    allCountries: [],
    page: 1, // página actual
    pages: 0, // páginar totales
    currentPages: [],
    filters: {
        // genre: "",
        // platform: "",
        // order: "",
        // originData: ""
    }
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
        case GET_CURRENT_PAGES:
            return {
                ...state,
                currentPages: action.payload,
                pages: action.payload.length
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    // genre:"",
                    // platform: "",
                    // order: "",
                    // originData: ""
                }

            }
        default:
            return state;
    }
}

export default rootReducer