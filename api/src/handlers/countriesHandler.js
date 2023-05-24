const { getCountryById, getCountryByName, getCountriesApi } = require("../controllers/countriesController");

const getCountryDetail = async (req, res) => { // obtengo un país por ID

    const { id } = req.params;

    try {
        const response = await getCountryById(id)
        res.status(200).json(response)
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

const getFirstsCountries = async (req, res) => { // obtengo los países de la api

    try {
            const response = await getCountriesApi();
            return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

const searchCountryByName = async (req, res) => {
     const { name } = req.params.id;

     try {
        const response = await getCountryByName(req.params.id);
        res.status(200).json(response);
     } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
     }
}

module.exports = {
    getCountryDetail,
    getFirstsCountries,
    searchCountryByName
}