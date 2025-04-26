import { z } from "zod";

export const menuSchema = z.object({
    _id: z.string().optional(),
    name: z.string().nonempty({ message: "Name is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    price: z.number().min(0, { message: "Price cannot be negative" }),
    image: z.custom<File | undefined>((file) => file instanceof File || file === undefined, {
        message: "Invalid image file",
    }).optional(),
    
});

export type MenuFormSchema = z.infer<typeof menuSchema>;
