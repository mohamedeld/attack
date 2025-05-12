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
import { IAttack, IUser, Quiz } from "@/lib/types";
import axios from "axios";
import { toast } from "sonner";
import { createAttack, updateAttack } from "@/actions/attack.action";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { baseUrl } from "@/lib/utils";

interface IProps {
    users: IUser[];
    update?: boolean;
    attack?: IAttack;
    questions:Quiz[]
}
const AttackForm = ({ users, update, attack,questions }: IProps) => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof attackSchema>>({
        resolver: zodResolver(attackSchema),
        defaultValues: {
            type: attack?.type ? attack?.type : "",
            description: attack?.description ? attack?.description : "",
            reportedBy: attack?.reportedBy ? attack?.reportedBy?._id : "",
            question: attack?.question ? attack?.question?._id : ""
        },
    })
    const isSubmitting = form.formState.isSubmitting;
    const onSubmit = async (data: z.infer<typeof attackSchema>) => {
        try {
            if (update && attack?._id) {
                const res = await updateAttack(attack?._id, data);
                if (!res?.success) {
                    toast.error(res?.message);
                    return;
                }
                toast.success("Attack updated successfully");
            } else {
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
            <DialogTrigger className={`${update ? 'border p-2 rounded-md cursor-pointer' : 'bg-gray-900 py-2 px-4 rounded-md cursor-pointer text-white font-semibold'}`}>{update ? <Pencil className="w-6 h-6" /> : 'Add New Attack'}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{update ? 'Update' : 'Add New'} Attack</DialogTitle>
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
                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Question</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select question to add" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem value="select" disabled>Select Question</SelectItem>
                                            {questions?.map((question: Quiz) => (
                                                <SelectItem key={question?._id} value={question?._id}>{question?.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="video"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel htmlFor="picture">Vido</FormLabel>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Input
                                            id="video"
                                            type="file"
                                            className="w-full"
                                            accept="video/*"
                                            disabled={isSubmitting}
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                const formData = new FormData();
                                                formData.append("video", file);

                                                try {
                                                    const response = await axios.post(`${baseUrl}video/upload`, formData, {
                                                        headers: {
                                                            "Content-Type": "multipart/form-data",
                                                        },
                                                    });
                                                    const videoUrl = response.data?.videoUrl;
                                                    if (!videoUrl) {
                                                        toast.error("Upload failed, no URL returned");
                                                        return;
                                                    }

                                                    // Set the form value to the uploaded video URL
                                                    field.onChange(videoUrl);
                                                    toast.success("Video uploaded successfully");
                                                } catch (error) {
                                                    toast.error("Video upload failed");
                                                    console.log(error);
                                                }
                                            }}
                                        />
                                    </div>
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