"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "../ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSchema } from "@/lib/validations";
import { useTransition } from "react";
import { deleteUser, updateUser } from "@/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IProps{
    session:{
        _id:string;
    userName:string;
    phone:string;
    }
}
const ProfileDetail = ({session}:IProps) => {
    const [isPending,startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<z.infer<typeof userSchema>>({
            resolver: zodResolver(userSchema),
            defaultValues: {
              phone: session?.phone,
              userName:session?.userName
            },
          })

          const onSubmit = async (data:z.infer<typeof userSchema>)=>{
            try{
                const res = await updateUser(session?._id,data?.userName);
                if(!res?.success){
                    toast.error(res?.message);
                    return;
                }
                toast.success(res?.message|| "user updated successfully");
                router.refresh();
            }catch(error){
                if (axios.isAxiosError(error) && error?.response) {
                                toast.error(error?.response?.data?.message)
                              } else {
                                toast.error("An unexpected error occurred")
                              }
            }
          }
          const isSubmitting = form.formState.isSubmitting;

          const deleteAccount = async()=>{
            try{
                startTransition(async ()=>{
                    const res = await deleteUser(session?._id);
                    if(!res?.success){
                        toast.error(res?.message);
                        return;
                    }
                    toast.success(res?.message);
                    router.replace("/login");
                })
            }catch(error){
                if (axios.isAxiosError(error) && error?.response) {
                                toast.error(error?.response?.data?.message)
                              } else {
                                toast.error("An unexpected error occurred")
                              }
            }
          }
  return (
    <div>
       <div className="py-5">
         <Button variant={"destructive"} onClick={deleteAccount} disabled={isPending}>{isPending ? 'Deleting...' : 'Delete Account'}</Button>
       </div>
        <Card className="w-[400px]">
      <CardHeader className="text-center">
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="Phone" disabled {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="userName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>User Name</FormLabel>
            <FormControl>
              <Input placeholder="username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-center justify-center">
        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>{
            isSubmitting ? 'Submitting...' : 'Edit'
            }</Button>
      </div>
    </form>
  </Form>
      </CardContent>
      </Card>
    </div>
  )
}

export default ProfileDetail