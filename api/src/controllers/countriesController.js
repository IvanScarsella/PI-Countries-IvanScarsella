const axios = require("axios");
const { Country, Activity } = require("../db");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

const getCountryById = async (id, /*source*/) => {

}

const getAllCountries = async () => {

}

const getCountryByName = async (country) => {

}

module.exports = { getCountryById, getAllCountries, getCountryByName }