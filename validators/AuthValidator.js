const { z } = require('zod');

const Register = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim(),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be atleat 8 characters long." })
        .refine((value) => /[a-z]/.test(value), { message: "Password must include atleast one lowercase character." })
        .refine((value) => /[A-Z]/.test(value), { message: "Password must include atleast one uppercase character." })
        .refine((value) => /[0-9]/.test(value), { message: "Password must include atleast one digit." })
        .refine((value) => /[^a-zA-Z0-9]/.test(value), { message: "Password must include atleast one any special character." }),

    profile: z
        .string({ required_error: 'Profile picture is required.' })
        .trim()
});

const Login = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be atleat 8 characters long." })
        .refine((value) => /[a-z]/.test(value), { message: "Password must include atleast one lowercase character." })
        .refine((value) => /[A-Z]/.test(value), { message: "Password must include atleast one uppercase character." })
        .refine((value) => /[0-9]/.test(value), { message: "Password must include atleast one digit." })
        .refine((value) => /[^a-zA-Z0-9]/.test(value), { message: "Password must include atleast one any special character." }),
});

module.exports = { Register, Login };
