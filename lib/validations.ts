import { z } from "zod";


export const loginSchema = z.object({
    phone: z.string({message:"Email is required"}).regex(/^01[0-2,5]{1}[0-9]{8}$/, {
        message: "Phone must be a valid Egyptian number",
      }),
    password: z.string({message:"Password is required"}).min(6,{message: "Password must be at least 6 characters long"}),
})

export const registerSchema = z.object({
    userName:z.string({message:"UserName is required"}),
    phone: z.string({message:"Email is required"}).regex(/^01[0-2,5]{1}[0-9]{8}$/, {
        message: "Phone must be a valid Egyptian number",
      }),
    password: z.string({message:"Password is required"}).min(6,{message: "Password must be at least 6 characters long"}),
})


export const attackSchema = z.object({
  type:z.string({message:"Type is required"}),
  description:z.string({message:"Description is required"}),
  video:z.any(),
  reportedBy:z.string()
})