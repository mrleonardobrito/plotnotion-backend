import { Request, Response, NextFunction } from "express"
import { PlotnotionError } from "../../../../../core/errors/error"
import UnexpectedInternalError from "../../../../../core/errors/UnexpectedInternalError"

export const defaultErrorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(error){
        console.log(error)
        if (error instanceof PlotnotionError) {
            return res.status(error.statusCode).json(error.toJSON());
        } else {
            return res.status(500).json(new UnexpectedInternalError().toJSON())
        }
    }
}
