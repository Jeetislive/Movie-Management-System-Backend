// •	Films module 
import express from 'express';
import filmController from '../controllers/filmController.js';

const indexFilmRoute = express.Router();

// •	List - It should list all the films with title, release year, language, length, replacement cost and rating. 
// •	Sort - I should be able to sort the columns title, release year, language, length and rating. 
indexFilmRoute.get("/list", filmController.getAllFilms as express.RequestHandler); 
// •	Movie details - On clicking a film, a right panel with multiple tabs should open. The first tab should display the film info. The next tab should display the actors.
indexFilmRoute.get("/:id/info", filmController.getFilmDetailsById as express.RequestHandler);
indexFilmRoute.get("/:id/actors", filmController.getFilmActorsById as express.RequestHandler);
// •	Views – I should be able to save the filter and sorting combination, by hitting a Save filter button which open a modal with a text field to take the view name. There should be a button in the list page called views, on clicking it should open a right panel with the list of saved views, I can run any saved view instantly by clicking on the saved view. When I run a view, it should also update the filter conditions.
indexFilmRoute.get("/filters", filmController.getFilterDetails as express.RequestHandler);
// •	Filter - I should be able to filter films by category, language, release year, length (greater than, less than, equal to) and actor. Multiple filter conditions should work in AND mode.  
export default indexFilmRoute;
