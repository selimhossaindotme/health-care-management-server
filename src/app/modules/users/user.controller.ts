import type { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async ( req: Request, res: Response) => {

    const result = userService.createPatient(req)

    sendResponse( res, {
        statusCode: 201,
        success: true,
        message: "user created successfully",
        data: result
    })
})

export const userController = {
    createPatient
}