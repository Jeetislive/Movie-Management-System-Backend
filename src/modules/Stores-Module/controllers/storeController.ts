import { NextFunction, Request, Response } from "express";
import storeService from "../services/storeService.js";
import { resourceLimits } from "worker_threads";

const getAllStores = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const {  } = req.query;
        // console.log();
        const storeDetails = await storeService.getAllStores();
        res.status(200).json(storeDetails);
    }catch (err: any) {
        console.log("Something Went Wrong", err.message);
        next(err);
    }
}
const getStoreDetailsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const storeDetails = await storeService.getStoreDetailsById(Number(id));
    res.status(200).json(storeDetails);
  } catch (err: any) {
    console.log("Something Went Wrong", err.message);
    next(err);
  }
}
const getAllRentalDetailsByStoreId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { pageNo, pageSize } = req.query;
    const storeDetails = await storeService.getAllRentalDetailsByStoreId(
      Number(id), 
      Number(pageNo),
      Number(pageSize)
    );
    res.status(200).json(storeDetails);
  } catch (err: any) {
    console.log("Something Went Wrong", err.message);
    next(err);
  }
};
const getAllStuffDetailsByStoreId = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const storeDetails = await storeService.getAllStuffDetailsByStoreId(Number(id));
        res.status(200).json(storeDetails);
    }catch (err: any) {
        console.log("Something Went Wrong", err.message);
        next(err);
    }
}

export default {
    getAllStores,
    getStoreDetailsById,
    getAllRentalDetailsByStoreId,
    getAllStuffDetailsByStoreId,
}