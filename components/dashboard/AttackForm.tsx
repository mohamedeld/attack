'use client';

import { attackSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button";

const AttackForm = () => {
    const form = useForm<z.infer<typeof attackSchema>>({
            resolver: zodResolver (attackSchema),
            defaultValues: {
              type: "",
              description:"",
              reportedBy:""
            },
          })
          const isSubmitting = form.formState.isSubmitting;
          const onSubmit = (data:z.infer<typeof attackSchema>)=>{
            console.log(data);
          }
  return (
    <Dialog>
  <DialogTrigger className="bg-gray-900 py-2 px-4 rounded-md cursor-pointer text-white font-semibold">New Attack</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Attack</DialogTitle>
      <DialogDescription>
        
      </DialogDescription>
    </DialogHeader>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <FormControl>
              <Input placeholder="Type" disabled={isSubmitting} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Description" disabled={isSubmitting} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-center justify-center">
        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>{
            isSubmitting ? 'Submitting...' : 'Submit'
            }</Button>
      </div>

    </form>
  </Form>
  </DialogContent>
</Dialog>
  )
}

export default AttackForm