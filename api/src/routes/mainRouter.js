const { Router } = require('express');
const routesCountries = require('./routesCountries');
const routesActivities = require('./routesActivities')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.use("/countries", routesCountries);
mainRouter.use("/activities", routesActivities);


module.exports = mainRouter;
