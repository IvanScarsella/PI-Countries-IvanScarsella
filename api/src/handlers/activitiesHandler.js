const { saveAllActivities, createActivityDB } = require("../controllers/activitiesController");

const getActivities = async (req, res) => {
    try {
        const response = await saveAllActivities();
        res.status(200).json({ response })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

const createActivity = async(req, res) => {

    try {
        const { name, difficulty, duration, season } = req.body;

        const response = await createActivityDB(name, difficulty, duration, season);
        res.status(200).json(response);
        console.log(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    getActivities,
    createActivity
}