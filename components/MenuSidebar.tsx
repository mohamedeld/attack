"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = [
    {
        name:"Home",
        href:"/"
    },
    {
        name:"AttacKs",
        href:"/attacts"
    },
    {
        name:"Feedback",
        href:"/feedback"
    }
]


const MenuSidebar = () => {
  return (
    <div className="block md:hidden">
        <Sheet>
      <SheetTrigger>
        <Menu/>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
          <Link href={"/"} className='cursor-pointer'>
            <Image src="/cyber.png" alt="cyber icon" width={70} height={70} className='object-cover'/>
        </Link>
          </SheetTitle>
          <SheetDescription>
            
          </SheetDescription>
        </SheetHeader>
        <div className=' flex md:hidden items-center gap-5 flex-col py-4 hover:bg-gray-300'>
            {links?.map((item)=>(
                <Link href={item?.href} key={item?.name} className='hover:underline'>{item?.name}</Link>
            ))}
        </div>
      </SheetContent>
    </Sheet>
    </div>
  );
};

export default MenuSidebar;
