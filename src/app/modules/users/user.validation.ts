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


export const userValidation = {
    createPatientValidationSchema
}