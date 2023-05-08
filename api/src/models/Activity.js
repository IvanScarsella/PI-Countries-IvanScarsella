const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    // id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   primaryKey: true,
    //   defaultvalue: UUIDV4
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
        type: DataTypes.ENUM('1','2','3','4','5'),
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    season: {
        type: DataTypes.ENUM('Summer','Autumn','Winter','Spring'), 
        allowNull: false
    }
  });
};
// ID. *
// Nombre. *
// Dificultad (número del 1 al 5). *
// Duración (en horas).
// Temporada (Verano, Otoño, Invierno o Primavera). *