'use client';

import { login } from "@/actions/auth.action";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          phone: "",
          password:""
        },
      })

      const onSubmit = async (data:z.infer<typeof loginSchema>) =>{
        try{
            const res = await login(data?.phone,data?.password);
            if(!res?.success){
                toast.error(res?.message);
                return;
            }
            toast.success("Login Successfully");
            router.replace("/")
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
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="Phone" disabled={isSubmitting} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
                <div className="relative">
              <Input placeholder="Password" disabled={isSubmitting} type={showPassword ? "text" : "password"} {...field} />
              <Button 
              variant={"ghost"}
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
                </div>
            </FormControl>
            <FormMessage />

          </FormItem>
        )}
      />
      <div className="flex items-center justify-center">
        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>{
            isSubmitting ? 'Submitting...' : 'Login'
            }</Button>
      </div>
      <div>
        <p className="text-sm text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </form>
  </Form>
  )
}

export default Login