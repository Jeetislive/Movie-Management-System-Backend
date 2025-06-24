import { NextFunction, Request, Response } from "express";
import filmService from "../services/filmService.js";
import { filmQuerySchema } from "../../../middleware/FilmModule/film.query.schema.js";

const getAllFilms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Validate and parse query params
    const parsedQuery = filmQuerySchema.parse(req.query);
    console.log(req.query);

    const { limit, pageNo, orderBy, orderType, filtersCategory, filtersLanguage, filtersRelease_year, filtersLength_type, filtersLength_value, filtersActor  } = parsedQuery;
    const skip = (pageNo * limit) - limit;

    // 2. Call service with validated values
    const filmDetails = await filmService.getAllFilms(
      limit,
      skip,
      orderBy,
      orderType,
      filtersCategory,
      filtersLanguage,
      filtersRelease_year,
      filtersLength_type,
      Number(filtersLength_value),
      filtersActor
    );
        // console.log(filmDetails);
        res.status(200).json(filmDetails);
    }catch (err: any) {
        console.log("Something Went Wrong", err.message);
        next(err);
    }
}
const getFilmDetailsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const filmDetails = await filmService.getFilmDetailsById(Number(id));
        res.status(200).json(filmDetails);
    }catch (err: any) {
        console.log("Something Went Wrong", err.message);
        next(err);
    }
}
const getFilmActorsById = async (req: Request,res: Response,next: NextFunction ) => {
  try {
    const { id } = req.params;
    const filmDetails = await filmService.getFilmActorsById(Number(id));
    res.status(200).json(filmDetails);
  } catch (err: any) {
    console.log("Something Went Wrong", err.message);
    next(err);
  }
};
const getFilterDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filmDetails = await filmService.getFilterDetails();
    res.status(200).json(filmDetails);
  } catch (err: any) {
    console.log("Something Went Wrong", err.message);
    next(err);
  }
}

export default {
    getAllFilms,
    getFilmDetailsById,
    getFilmActorsById,
  getFilterDetails,
}