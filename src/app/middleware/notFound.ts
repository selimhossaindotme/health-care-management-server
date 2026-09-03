import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Route not found",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found on this server"
        }
    })
}

export default notFound;