import { NextFunction, Request, Response } from "express";
import filmService from "../services/filmService.js";

const getAllFilms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, pageNo, orderBy, orderType } = req.query;
        console.log(limit, orderBy, orderType);
        const numericLimit = Number(limit) || 10;
        const numericPageNo = Number(pageNo) || 1;
        const skip = (numericPageNo * numericLimit) - numericLimit;
        const filmDetails = await filmService.getAllFilms(
            numericLimit,
            skip,
            typeof orderBy === "string" ? orderBy : undefined,
            typeof orderType === "string" ? orderType : undefined,
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

export default {
    getAllFilms,
    getFilmDetailsById,
    getFilmActorsById,
}