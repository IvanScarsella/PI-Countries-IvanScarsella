const axios = require("axios");
const { Country, Activity } = require("../db");
const infoCleaner = require("../utils/genericFunctions")
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const { info } = require("console");

const getCountryById = async (id, /*source*/) => {
    try {
        const infoApi = [];
        infoApi.push((await axios.get (`https://restcountries.com/v3/alpha/${id}`))
        .data)
        return infoCleaner(infoApi[0])
    } catch (error) {
        console.log(error)
    }
}

const getAllCountries = async () => {

    let infoApi = [];
    infoApi.push((await axios(`https://restcountries.com/v3/all`)).data)

    return infoCleaner(infoApi[0]);

}

const getCountryByName = async (country) => {
   
    try {
        const infoApi = (await axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
        ).data;
        const countryApi = infoCleaner(infoApi);

        function searchCountry(name) {
            // let lowerCase = country;
            return name.name.toLowerCase() === country.toLowerCase();
        }

        let results = await countryApi.find(searchCountry);

        if (results) return results;
    } catch (error) {
        return { error: error.message }
    }

}

module.exports = { getCountryById, getAllCountries, getCountryByName }