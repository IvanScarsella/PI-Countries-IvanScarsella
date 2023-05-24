const axios = require("axios");
const { Country, Activity } = require("../db");
// const infoCleaner = require("../utils/genericFunctions")
const { Sequelize } = require("sequelize");
// const { Op } = require("sequelize");

const getAllCountries = async () => {

    // let infoApi = [];
    // infoApi.push((await axios(`https://restcountries.com/v3/all`)).data)

    // return infoCleaner(infoApi[0]);
    
    try{
        
        const countriesApi = await axios('https://rest-countries.up.railway.app/v3/all') //llamo al endpont  de la api // https://restcountries.com/v3/all
        const apiData = countriesApi.data?.map( async country => {
            await Country.findOrCreate({ //await, porque no se sabe cuento tarda a la respuesta entonces tengo que avisar
                where:{
                    id: country.cca3,
                    name: country.name['common'],
                    flag: country.flags[0],
                    continent: country.continents[0],
                    capital: country.capital !== undefined ? country.capital[0] : 'No esta definido Capital',
                    subregion: country.subregion !== undefined ? country.subregion : 'No esta definido Subregion',
                    area: country.area,
                    population: country.population,
                },
                row: false
            })
            await Promise.all(apiData)
            return apiData
        })
    } catch(error){
        console.log(error)
    }
}

const getCountriesApi = async function() {
    
    try{
        const countriesData = await getAllCountries()
        const getCountries = await Country.findAll({ //llamo los componentes que tengo en mi base de datos 
            attributes: ['id', 'name', 'flag', 'continent', "population"],
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }
        })
        // console.log(getCountries)
        return getCountries
    } catch(error){
        console.log(error)
    }
}

const getCountryById = async (id) => {
    // try {
    //     const infoApi = [];
    //     infoApi.push((await axios.get (`https://restcountries.com/v3/alpha/${id}`))
    //     .data)
    //     return infoCleaner(infoApi[0])
    // } catch (error) {
    //     console.log(error)
    // }
    try{
        const countriesData = await getAllCountries()
   const iD = id.toUpperCase() // convierte en mayusculas
   const detailCountry = await Country.findOne({
       where:{
           id: iD
       },
       include: {
              model: Activity,
              attributes: ["name", "difficulty", "duration", "season"],
              through: {
                  attributes: [],
              }
          },
   });
  
  return detailCountry

  } catch(error) {
      console.log(error)
  }
}

const getCountryByName = async function (name) {
   
    // try {
    //     const infoApi = (await axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    //     ).data;
    //     const countryApi = infoCleaner(infoApi);

    //     function searchCountry(name) {
    //         return name.name.toLowerCase() === country.toLowerCase();
    //     }

    //     let results = await countryApi.find(searchCountry);

    //     if (results) return results;
    // } catch (error) {
    //     return { error: error.message }
    // }

    const allCountries = getAllCountries()

    try{
        if(allCountries){

            const country = await Country.findAll({
                where: 
                { name: Sequelize.where( Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
            },
            
            raw: true
        })
        console.log(country)
        Promise.all(country)
        
        if(country.length > 0){
            return country
        } return 'No se encontro el país'
    }
    } catch(error) {
        console.log(error)
    }

}

module.exports = { getCountryById, getCountriesApi, getCountryByName, getAllCountries }