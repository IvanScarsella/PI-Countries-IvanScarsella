const axios = require("axios");
const { Activity } = require("../db");

const saveAllActivities = async (id, source) => {
    try {
        const infoApi = [];
        const activity = source === "api"
        ?
        infoApi.push((await axios.get(`link`))
        .data)
        : await Activity.findByPk(id);
        // return infoCleaner(infoApi)
    } catch (error) {
        console.log(error)
    }
}

const createActivityDB = async (name, difficulty, duration, season) => {

}

module.exports = { saveAllActivities, createActivityDB };