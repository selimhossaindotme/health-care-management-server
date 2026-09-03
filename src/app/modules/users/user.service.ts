import type { Request } from "express";

const createPatient = async ( req: Request  ) => {
    console.log(req.body)

}

export const userService = {
    createPatient
}