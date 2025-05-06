'use client';

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { quizSchema } from "@/lib/validations";
import { toast } from "sonner";
import axios from "axios";
import { createQuiz, updateQuiz } from "@/actions/quiz.action";
import { useRouter } from "next/navigation";
import { Quiz } from "@/lib/types";


interface IProps{
    update?:boolean;
    quiz?:Quiz
}
const QuizForm = ({update,quiz}:IProps) => {
    const router =useRouter();
    const form = useForm({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            title: quiz?.title ?? "",
            questions: quiz?.questions?.map((q) => ({
              questionText: q?.questionText,
              options: q?.options,
              correctAnswer: q?.correctAnswer,
            })) ?? [
              { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
            ],
          },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "questions",
    });
    const onSubmit = async (data: z.infer<typeof quizSchema>) => {
        try {
            if(update && quiz?._id){
                const res = await updateQuiz(quiz?._id,data);
                if (!res?.success) {
                    toast.error(res?.message);
                    return;
                }
                toast.success("Quiz update successfully");
            }else{
                const res = await createQuiz(data);
            if (!res?.success) {
                toast.error(res?.message);
                return;
            }
            toast.success("Quiz created successfully");
            router.push("/quizes")
            }
            
            form.reset(); // Reset form after submission
        } catch (error) {
            if (axios.isAxiosError(error) && error?.response) {
                toast.error(error?.response?.data?.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form?.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quiz Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter quiz title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {fields?.map((field, index) => (
                    <div key={field.id} className="mb-4">
                        <FormField
                            name={`questions.${index}.questionText`}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Question</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter question text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`questions.${index}.options`}
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormLabel className="py-4">Options</FormLabel>
                                    {field.value.map((_, optionIndex) => (
                                        <FormItem key={optionIndex} className="flex items-center mb-4">
                                            <FormControl>
                                                <Input
                                                    placeholder={`Option ${optionIndex + 1}`}
                                                    {...form.register(`questions.${index}.options.${optionIndex}`)}
                                                />
                                            </FormControl>
                                            <Button type="button"
                                            className="cursor-pointer" onClick={() => {
                                                const currentOptions = field.value;
                                                currentOptions.push(""); // Add a new option
                                                form.setValue(`questions.${index}.options`, [...currentOptions]); // Update options
                                            }}>
                                                <PlusCircle />
                                            </Button>
                                            <Button  type="button" onClick={() => {
                                                const currentOptions = field.value;
                                                currentOptions.splice(optionIndex, 1);
                                                form.setValue(`questions.${index}.options`, [...currentOptions]); // Update options
                                            }} className="ml-2 cursor-pointer">
                                                <Trash2 />
                                            </Button>
                                        </FormItem>
                                    ))}
                                    <FormMessage />
                                </>
                            )}
                        />
                        <FormField
  name={`questions.${index}.correctAnswer`}
  control={form.control}
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>Correct Answer</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter the correct answer"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
                        <div className="flex items-center gap-4 flex-col md:flex-row">
                        {fields.length > 1 && <Button type="button" className="cursor-pointer mt-4 ml-3" variant="destructive" onClick={() => {
                            if (fields.length > 1) {
                                remove(index); // Remove the question
                            }
                        }} >
                            Remove Question
                        </Button>}
                        <Button type="button" className="cursor-pointer mt-4" onClick={() => append({ questionText: "", options: ["", "", "", ""], correctAnswer: "" })}>
                            Add Question
                        </Button>
                        </div>
                    </div>
                ))}

                <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Submitting...' :'Submit Quiz'}</Button>
            </form>
        </Form>
    );
};

export default QuizForm;