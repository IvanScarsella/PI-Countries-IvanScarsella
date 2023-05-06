const { getCountryById, getCountryByName, getAllCountries } = require("../controllers/countriesController");

const getCountryDetail = async (req, res) => {

    const { id } = req.params;

    // const source = isNaN(id) ? "bdd" : "api";

    try {
        const response = await getCountryById(id, /*source*/)
        res.status(200).json(response)
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

const getFirstsCountries = async (req, res) => {

    const { name } = req.query;

    try {
        if (name) {
            const countryByName = await getCountryByName(name);
            return res.status(200).json(countryByName);
        }
        else {
            const response = await getAllCountries();
            return res.status(200).json(response);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getCountryDetail,
    getFirstsCountries
}