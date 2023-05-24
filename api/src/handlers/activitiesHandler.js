const { saveAllActivities, createActivityDB } = require("../controllers/activitiesController");
const { Activity } = require("../db");
const getActivities = async (req, res) => { // obtengo todas las actividades

    try {
        let result = await Activity.findAll();
        if (!result.length) {
            return res
                .status(200)
                .send("No se encuentran actividades")
        }
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

const createActivity = async(req, res) => { // creo una actividad

    try{
        const dataBody = await createActivityDB(req.body)
        res.status(200).send(dataBody)
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    getActivities,
    createActivity
}