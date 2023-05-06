const { Router } = require('express');
const { getActivities, createActivity } = require("../handlers/activitiesHandler");

const routesActivities = Router();

routesActivities.get("/", getActivities);

routesActivities.post("/", createActivity);

module.exports = routesActivities;