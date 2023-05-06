const { Router } = require('express');
const { getFirstsCountries, getCountryDetail } = require("../handlers/countriesHandler")

const routesCountries = Router();

routesCountries.get("/all", getFirstsCountries)

routesCountries.get("/:id", getCountryDetail)

routesCountries.get("/", getFirstsCountries)

module.exports = routesCountries;