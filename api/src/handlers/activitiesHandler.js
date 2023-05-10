const { saveAllActivities, createActivityDB } = require("../controllers/activitiesController");
const { Activity } = require("../db");
const getActivities = async (req, res) => {

    // const { id } = req.params;

    // const source = isNaN(id) ? "bdd" : "api";
    
    // try {
    //     const response = await saveAllActivities();
    //     res.status(200).json({ response })
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).json({ error: error.message })
    // }

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

const createActivity = async(req, res) => {

    // try {
    //     const { name, difficulty, duration, season } = req.body;

    //     const response = await createActivityDB(name, difficulty, duration, season);
    //     res.status(200).json(response);
    //     console.log(response)
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).json({ error: error.message })
    // }
    try{
        const dataBody = await createActivityDB(req.body)
        res.status(200).send(dataBody)
    } catch(e) {
        console.log(e)
        // next(e)
    }
}

module.exports = {
    getActivities,
    createActivity
}