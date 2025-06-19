// •	Stores module 
import express from 'express';
import filmController from '../controllers/storeController.js';

const indexStoreRoute = express.Router();

// •	List - List the stores. store id, store manager, address and number of times movies has been rented from the store and the staff count. On clicking the number of times rented, it should open a right panel and should show the all the rentals with pagination. On clicking the staff count, it should open a right panel and should show all the staffs with pagination. 
indexStoreRoute.get("/list", filmController.getAllStores as express.RequestHandler);
indexStoreRoute.get("/:id/info", filmController.getStoreDetailsById as express.RequestHandler);
indexStoreRoute.get("/:id/rentals", filmController.getAllRentalDetailsByStoreId as express.RequestHandler);
indexStoreRoute.get("/:id/staffs", filmController.getAllStuffDetailsByStoreId as express.RequestHandler);

export default indexStoreRoute;
// •	Sort – I should be able to sort the stores alphabetically, staff count, rental count. 
// •	Filter - I should be able to filter a store by city, zip code, staff count (greater than, less than, equal to). Multiple filter conditions should work in AND mode.  
// •	Store details – On Clicking the store id, a right panel should open which should have 3 tabs. The first tab should show the store details (manager, address etc). The second tab should show the list of staff in the store. The third tab should show the list of rentals from that store.

