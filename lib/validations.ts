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
  video:z.any(),
  description:z.string({message:"Description is required"}),
//   video:z.any(),
  reportedBy:z.string(),
  question:z.string(),
})

export type AttackData = z.infer<typeof attackSchema>;

export const questionSchema = z.object({
    questionText: z.string().min(1, "Question is required"),
    options: z.array(z.string()).min(4, "At least two options are required"),
    correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const quizSchema = z.object({
    title: z.string().min(1, "Title is required"),
    questions: z.array(questionSchema),
});

export type QuizData = z.infer<typeof quizSchema>;


export const userSchema = z.object({
    userName:z.string({message:"UserName is required"}),
    phone: z.string({message:"Email is required"}).regex(/^01[0-2,5]{1}[0-9]{8}$/, {
        message: "Phone must be a valid Egyptian number",
      }),
})

export const feedbackSchema = z.object({
    user:z.string({message:"UserName is required"}),
    content: z.string({message:"content is required"})
})