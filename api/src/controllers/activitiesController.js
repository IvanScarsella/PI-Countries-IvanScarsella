const axios = require("axios");
const { Activity, Country } = require("../db");
const { getAllCountries } = require("./countriesController");

const dbComplete = async () => {
    //consulta a la DB
    // console.log('Inicia consulta a DB')
    let countries = await Country.findAll();
    // console.log('Fin consulta a DB')

    //si la DB esta vacia cargo los datos
    if (countries.length === 0) {
        // solicitud a restcountries
        const arrCountries = await getAllCountries();
        // console.log(' en /countries InfoCountries ejemplo 1: ', arrCountries[0])

        // Creating in bulk, creo los datos en masa.
        //https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
        // console.log(' Inicia carga de DB con bulkCreate')
        await Country.bulkCreate(arrCountries);
        // console.log('Fin carga de DB con bulkCreate')
    }
};

const createActivityDB = async (act) => {

    // const createActivity = async function(activity) {
    const { name, difficulty, duration, season, country } = act;

    await dbComplete();

    // let newActivity = {         // creo nuevo objetos con datos de la actividad pasada x body
    //     name,
    //     difficulty,
    //     duration,
    //     season,
    //     country
    // }
    const newActivity = await Activity.create({
        name: act.name,
        difficulty: act.difficulty,
        duration: act.duration,
        season: act.season,
        country: act.country
    })
    // const [activity, created] = await Activity.findOrCreate({       // busco si existe, sino la creo 
    //     where: newActivity
    // });
    // console.log(created ? 'Se creo la actividad' : 'La actividad ya existe');
    // // console.log(activity)
    // country.forEach(async (c) => {
    //     const country = await Country.findOne({ where: { name: c } }); // para cada pais pasado lo busco
    //     if (country) { await activity.addCountry(country) };            // y le agrego la actividad pasada
    // });
    // let msg = `Se creo la actividad ${activity.name}.`
    console.log(newActivity.country);
    Promise.all(newActivity.country.map(async element => {
        let activityCountrie = await Country.findOne({
            where: {
                name: element
            }
        })
        await newActivity.addCountry(activityCountrie)
    }));

    // crear una ruta para ver todas las actividades creadas
}
// }

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


module.exports = { saveAllActivities, createActivityDB };