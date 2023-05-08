const { Router } = require('express');
const { getFirstsCountries, getCountryDetail, searchCountryByName } = require("../handlers/countriesHandler")

const routesCountries = Router();

routesCountries.get("/all", getFirstsCountries)

routesCountries.get("/:id", getCountryDetail)

routesCountries.get(`/all/:id`, searchCountryByName)

module.exports = routesCountries;