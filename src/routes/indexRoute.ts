import express from 'express';
import indexFilmRoute from '../modules/Films-Module/routes/indexFilmRoute.js';
import indexStoreRoute from '../modules/Stores-Module/routes/indexStoreRoute.js';
import indexRentalRoute from '../modules/Rental-Module/routes/indexRentalRoute.js';

const indexRoute = express.Router();

indexRoute.use("/film",indexFilmRoute);
indexRoute.use("/store",indexStoreRoute);
indexRoute.use("/rental",indexRentalRoute);

export default indexRoute;