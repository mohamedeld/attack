"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { logout } from "@/actions/auth.action";
import { useRouter } from "next/navigation";

const UserAvatar = () => {
    const router = useRouter();
    const handleLogout = ()=>{
        logout();
        router.push("/login")
    }
    return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center flex-col gap-4">
          <Link href="/profile" className="hover:bg-gray-500">Profile</Link>
          <Button variant={"ghost"} className="hover:bg-gray-500" onClick={handleLogout}>Logout</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
