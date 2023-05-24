const axios = require("axios");
const { Activity, Country } = require("../db");
const { getAllCountries } = require("./countriesController");

const dbComplete = async () => {//consulta a la DB
    
    let countries = await Country.findAll();

    
    if (countries.length === 0) { //si la DB esta vacia cargo los datos
        
        const arrCountries = await getAllCountries();// solicitud a la api
        
        await Country.bulkCreate(arrCountries);// Creating in bulk, creo los datos en masa.
    }
};

const createActivityDB = async (act) => {

    const { name, difficulty, duration, season, country } = act;

    await dbComplete();

    const newActivity = await Activity.create({// creo nuevo objetos con datos de la actividad pasada x body
        name: act.name,
        difficulty: act.difficulty,
        duration: act.duration,
        season: act.season,
        country: act.country
    })
   
    Promise.all(newActivity.country.map(async country => { // agrego la actividad a cada país
        let activityCountrie = await Country.findOne({
            where: {
                name: country
            }
        })
        await newActivity.addCountry(activityCountrie)
    }));
}

const saveAllActivities = async (id, source) => { // guardo la actividad en la base de datos
    try {
        const infoApi = [];
        const activity = source === "api"
            ?
            infoApi.push((await axios.get(`link`))
                .data)
            : await Activity.findByPk(id);
    } catch (error) {
        console.log(error)
    }
}


module.exports = { saveAllActivities, createActivityDB };