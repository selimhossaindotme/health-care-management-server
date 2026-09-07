import z from "zod";

const createPatientValidationSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    patient: z.object({
        name: z.string(),
        email: z.email(),
        profilePicture: z.string().optional(),
        phoneNumber: z.string().optional(),
        address: z.string().optional(),
    })
})

const createAdminValidationSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    admin: z.object({
        name: z.string(),
        email: z.email(),
        profilePicture: z.string().optional(),
        phoneNumber: z.string().optional(),
        address: z.string().optional(),

    })
})

const createDoctorValidationSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    doctor: z.object({
        name: z.string(),
        email: z.email(),
        profilePicture: z.string().optional(),
        phoneNumber: z.string().optional(),
        address: z.string().optional(),
        licenseNumber: z.string().optional(),
        registrationNumber: z.string().optional(),
        experienceYears: z.number().optional(),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
        appointmentFee: z.number().optional(),
        qualifications: z.string().optional(),
        currentWorkplace: z.string().optional(),
        designation: z.string().optional()
    })
})



export const userValidation = {
    createPatientValidationSchema,
    createAdminValidationSchema,
    createDoctorValidationSchema
}