import z from "zod";

export const registerSchema = z.object({
    name:z.string().min(3,"name should be more than 3 characters").max(50,"name should be less that 50 characters"),
    email:z.email("please enter valid email"),
    password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/,"please enter a strong password (upper and lower case , min 8 length)")
})