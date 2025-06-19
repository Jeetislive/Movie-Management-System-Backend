import { NextFunction, Request, Response } from "express";
import rentalService from "../services/rentalService.js";

const getAllRentals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, pageNo, orderBy, orderType } = req.query;
    console.log( limit, orderBy, orderType, pageNo);
    const rentalDetails = await rentalService.getAllRentals(
      Number(limit),
      orderBy as string,
      orderType as "asc" | "desc",
      Number(pageNo)
    );
    res.status(200).json(rentalDetails);
  } catch (err: any) {
    console.log("Something Went Wrong", err.message);
    next(err);
  }
}
const getRentalDetailsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const rentalDetails = await rentalService.getRentalDetailsById(Number(id));
    res.status(200).json(rentalDetails);
  } catch (err: any) {
    console.log("Something Went Wrong", err.message);
    next(err);
  }
}
const getAllRentalDetailsByRentalDates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate, store_id, customer_id, film_id } = req.query;
    console.log(startDate, endDate, store_id, customer_id, film_id);
    const sDate = startDate
      ? new Date(startDate as string)
      : new Date("1990-01-01");
    const eDate = endDate ? new Date(endDate as string) : new Date();

    const rentalDetails = await rentalService.getAllRentalDetailsByRentalDates(
      sDate,
      eDate,
      store_id ? Number(store_id) : undefined,
      customer_id ? Number(customer_id) : undefined,
      film_id ? Number(film_id) : undefined
    )
    res.status(200).json(rentalDetails);

    // console.log(sDate, eDate);

  } catch (err: any) {
    console.log("Something Went Wrong", err.message);
    next(err);
  }
}; const getAllStuffDetailsByRentalId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const rentalDetails = await rentalService.getAllStuffDetailsByRentalId(Number(id));
    res.status(200).json(rentalDetails);
  } catch (err: any) {
    console.log("Something Went Wrong", err.message);
    next(err);
  }
}

export default {
  getAllRentals,
  getRentalDetailsById,
  getAllRentalDetailsByRentalDates,
  getAllStuffDetailsByRentalId,
}