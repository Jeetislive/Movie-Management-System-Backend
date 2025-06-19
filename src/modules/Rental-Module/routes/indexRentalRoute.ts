// •	Rentals module 
import express from 'express';
import filmController from '../controllers/rentalController.js';

const indexRentalRoute = express.Router();

// List - List the rentals the movie, customer, store, amount paid, payment date and the rental duration. 
indexRentalRoute.get("/list", filmController.getAllRentals as express.RequestHandler);
indexRentalRoute.get("/:id/info", filmController.getRentalDetailsById as express.RequestHandler);
indexRentalRoute.get("/list/date", filmController.getAllRentalDetailsByRentalDates as express.RequestHandler);
indexRentalRoute.get("/:id/staffs", filmController.getAllStuffDetailsByRentalId as express.RequestHandler);

export default indexRentalRoute;
// Filter - I should be able to see all the rentals that happened within a specific time frame (date range). And filter by store, customer, movie.  Multiple filter conditions should work in AND mode.
// Rental details – On clicking a rental, a right panel should open where I can see the movie details, the customer and store details, payment details. 


