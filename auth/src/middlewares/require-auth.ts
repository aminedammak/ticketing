import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

/**
 * This middleware should be used after currentUser middleware
 * @param req
 * @param res
 * @param next
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
