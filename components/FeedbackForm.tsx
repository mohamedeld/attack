"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { feedbackSchema } from "@/lib/validations";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createFeedback } from "@/actions/attack.action";

interface IProps{
    session:{
        _id:string;
    userName:string;
    phone:string;
    }
}
const FeedbackForm = ({session}:IProps) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof feedbackSchema>>({
            resolver: zodResolver(feedbackSchema),
            defaultValues: {
              user: session?._id,
              content:""
            },
          })

          const onSubmit = async (data:z.infer<typeof feedbackSchema>)=>{
            try{
                const res = await createFeedback(data?.user,data?.content);
                if(!res?.success){
                    toast.error(res?.message);
                    return;
                }
                toast.success(res?.message || "Thanks alot");
                router.push("/");
            }catch(error){
                if (axios.isAxiosError(error) && error?.response) {
                                toast.error(error?.response?.data?.message)
                              } else {
                                toast.error("An unexpected error occurred")
                              }
            }
          }
          const isSubmitting = form.formState.isSubmitting;

          
  return (
    <div>
        <Card className="w-[400px]">
      <CardHeader className="text-center">
        <CardTitle>Feedback</CardTitle>
        <CardDescription>Write your feedback we are excited to see that</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
                <Textarea placeholder="Write your feed" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-center justify-center">
        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>{
            isSubmitting ? 'Submitting...' : 'Send'
            }</Button>
      </div>
    </form>
  </Form>
      </CardContent>
      </Card>
    </div>
  )
}

export default FeedbackForm