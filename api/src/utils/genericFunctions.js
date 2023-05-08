const infoCleaner = (arr) => {
    return arr.map((country) => {
        let { cca3, name, flags, continents, capital, subregion, area, population } = country;
        
        if(!capital) country.capital = ["unknown"];
        
        return {
            id: country.cca3,
            name: country.name.common,
            flag: country.flags[0],
            continent: country.continents[0],
            capital: country.capital[0],
            subregion: country.subregion,
            area: country.area,
            population: country.population
        }
    })
}

module.exports = infoCleaner;