import {z , ZodSchema} from 'zod';

export const formSchema = z.object({
    url: z.string().url(),
});

export const QrGeneratorSchema = z.object({
    truckLicensePlate: z.string().min(6, {
        message: 'Trailer number must be 6 characters or more'
    }).max(7, {
        message: 'Trailer number must be 7 characters or less'
    }),
    cargoBoxNumber: z.string().min(6, {
        message: 'Cargo Box number must be 6 characters or more'
    }).max(7, {
        message: 'Cargo Box number must be 7 characters or less'
    }),
    cargoBoxLicensePlate: z.string().min(6, {
        message: 'Cargo Box number must be 6 characters or more'
    }).max(7, {
        message: 'Cargo Box number must be 7 characters or less'
    }),


});


export function validateWithZodSchema<T>(
    schema: ZodSchema<T>,
    data: unknown
): T {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.errors.map((error) => error.message);
        throw new Error(errors.join(', '));
    }
    return result.data;
}
