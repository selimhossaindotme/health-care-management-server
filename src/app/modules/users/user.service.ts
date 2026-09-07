import type { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import bcrypt from "bcryptjs";
import { envVars } from "../../../config";
import { prisma } from "../../shared/prisma";

const createPatient = async (req: Request) => {
    if (req.file) {
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        // console.log("uploadedResult : ", uploadedResult);
        req.body.patient.profilePicture = uploadedResult?.secure_url;
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, Number(envVars.BCRYPT_SALT_ROUNDS));

    const userData = {
        email: req.body.patient.email,
        password: hashedPassword,
    }
   
    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createAdminData = await transactionClient.patient.create({
            data: req.body.patient
        })

        return createAdminData;
    })

    return result;
}

const createAdmin = async (req: Request) => {

    if (req.file) {
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.admin.profilePicture = uploadedResult?.secure_url;

    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, Number(envVars.BCRYPT_SALT_ROUNDS));

    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
    }

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: userData
        });
        const createAdminData = await tnx.admin.create({
            data: req.body.admin
        })
        return createAdminData;
    })

    return result;

}

const createDoctor = async ( req: Request ) => {
    if ( req.file ) {
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.doctor.profilePicture = uploadedResult?.secure_url;
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, Number(envVars.BCRYPT_SALT_ROUNDS));

    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
    }

    const result = await prisma.$transaction(async ( tnx ) => {
        await tnx.user.create({
            data: userData
        });
        const createDoctorData = await tnx.doctor.create({
            data: req.body.doctor
        })
        return createDoctorData;

    })
    return result;
}

export const userService = {
    createPatient,
    createAdmin,
    createDoctor
}