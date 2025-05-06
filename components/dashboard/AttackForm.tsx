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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { IAttack, IUser } from "@/lib/types";
import axios from "axios";
import { toast } from "sonner";
import { createAttack, updateAttack } from "@/actions/attack.action";
import { useState } from "react";
import { Pencil } from "lucide-react";

interface IProps {
    users: IUser[];
    update?: boolean;
    attack?:IAttack
}
const AttackForm = ({ users,update,attack }: IProps) => {
    const [open,setOpen] = useState(false);
    const form = useForm<z.infer<typeof attackSchema>>({
        resolver: zodResolver(attackSchema),
        defaultValues: {
            type: attack?.type ? attack?.type :"",
            description: attack?.description ? attack?.description : "",
            reportedBy:attack?.reportedBy ? attack?.reportedBy?._id : ""
        },
    })
    const isSubmitting = form.formState.isSubmitting;
    const onSubmit = async (data: z.infer<typeof attackSchema>) => {
        try {
            if(update && attack?._id){
                const res = await updateAttack(attack?._id,data);
                if (!res?.success) {
                    toast.error(res?.message);
                    return;
                }
                toast.success("Attack updated successfully");
            }else{
                const res = await createAttack(data);
                if (!res?.success) {
                    toast.error(res?.message);
                    return;
                }
                toast.success("Attack created successfully");
            }
            setOpen(false)
        } catch (error) {
            if (axios.isAxiosError(error) && error?.response) {
                toast.error(error?.response?.data?.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={`${update ? 'border p-2 rounded-md cursor-pointer' : 'bg-gray-900 py-2 px-4 rounded-md cursor-pointer text-white font-semibold'}`}>{update ? <Pencil className="w-6 h-6"/> : 'Add New Attack'}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{update ? 'Update':'Add New'} Attack</DialogTitle>
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
                        <FormField
                            control={form.control}
                            name="reportedBy"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Reported to</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select user to report" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem value="select" disabled>Select user</SelectItem>
                                            {users?.map((user: IUser) => (
                                                <SelectItem key={user?._id} value={user?._id}>{user?.userName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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