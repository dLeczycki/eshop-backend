import { NextFunction, Request, Response } from "express";
import { OrderToPlace } from "../types";
import { Log } from "./log";

class ValidationError extends Error { }

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  Log.error(`${err}`);

  if (err.name === 'UnauthorizedError') {
    return res
      .status(401)
      .json({ message: "Dostęp zabroniony" });
  }

  return res
    .status(err instanceof ValidationError ? 400 : 500)
    .json({
      message: err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie za kilka minut.'
    })
}

export const handleNotFound = (req: Request, res: Response) => res.status(404).json({ message: 'Nie odnaleziono zasobu' });

export const isOrderToPlaceValid = (orderToPlace: OrderToPlace): boolean => {
  let isValid = true;

  if (
    !orderToPlace.firstname ||
    !orderToPlace.lastname ||
    !orderToPlace.email ||
    !orderToPlace.postalCode ||
    !orderToPlace.city ||
    !orderToPlace.address ||
    !orderToPlace.shipmentName ||
    !orderToPlace.paymentName ||
    !orderToPlace.orderProducts.length
  ) isValid = false;

  return isValid;
}