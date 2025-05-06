'use client';
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface IProps{
  id:string;
  deleteAction: (id:string) => Promise<any>;
  title:string;
}
const CustomDelete = ({id,deleteAction,title}:IProps) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try{
      if(!id){
        toast.error("Attack not found");
        return;
      }
      startTransition(async () => {
        const res = await deleteAction(id);
      if(!res.success){
        toast.error(res?.message);
        return;
      }else{
        toast.success("Deleted successfully");
        setOpen(false);

      }
      });
    }catch(error){
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
     <Button variant={"ghost"} className="cursor-pointer">
        <Trash2 className="text-red-500" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="py-4  text-[1rem]">{title}</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="flex items-center gap-4 flex-col md:flex-row">
        <Button className=" w-full md:w-fit bg-transparent hover:bg-red-650 text-red-650 hover:text-white py-3" onClick={() => setOpen(false)} disabled={isPending}>
          Cancel
        </Button>
        <Button className="hover:bg-red-500  w-full md:w-fit py-3 bg-red-500 text-white" onClick={handleDelete} disabled={isPending}>
          {isPending ? "Deleting..." : "Delete"}
        </Button>
        </div>
      </DialogContent>
      </Dialog>
  )
}

export default CustomDelete