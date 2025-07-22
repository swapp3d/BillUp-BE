import { ZodType, z } from 'zod';
import { RegisterFormData } from './types';


export const RegistrationSchema: ZodType<RegisterFormData> = z
    .object({
        name: z
            .string()
            .min(1, { message: 'Name is required.' })
            .max(50, { message: 'Name cannot exceed 50 characters.' }),

        surname: z
            .string()
            .min(1, { message: 'Surname is required.' })
            .max(50, { message: 'Surname cannot exceed 50 characters.' }),

        residency: z
            .string()
            .min(1, { message: 'Username is required.' })
            .max(50, { message: 'Username cannot exceed 50 characters.' }),

        email: z
            .string()
            .min(1, { message: 'Email address is required.' })
            .email({ message: 'Invalid email address.' }),

        phoneNumber: z
            .string()
            .min(1, { message: 'Phone number is required.' })
            .max(15, { message: 'Phone number cannot exceed 15 characters.' })
            .regex(/^\+?[0-9]{1,15}$/, {
                message: 'Invalid phone number format. Must be a valid international number.'
            }),

        role: z.enum(
            ['CLIENT', 'COMPANY'] as const,
            { message: 'Role is required and must be either CLIENT or COMPANY.' }
        ),


        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long.' })
            .max(50, { message: 'Password cannot exceed 50 characters.' })
            .regex(/[A-Z]/, {
                message: 'Password must include at least one uppercase letter.'
            })
            .regex(/[a-z]/, {
                message: 'Password must include at least one lowercase letter.'
            })
            .regex(/\d/, { message: 'Password must include at least one number.' })
            .regex(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/, {
                message: 'Password must include at least one special character.'
            }),

        repeatedPassword: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long.' }),

    })
    .refine(
        (values) => {
            return values.password === values.repeatedPassword;
        },
        {
            message: 'Passwords must match!',
            path: ['repeatedPassword']
        }
    );