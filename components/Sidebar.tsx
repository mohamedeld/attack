'use client';

import { LayoutDashboard, MessageCircleQuestion, Settings, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoutUser from './LogoutUser'
import { usePathname } from 'next/navigation';


const dashSidebar = [
    {
        title: "Dashboard",
        icon: <LayoutDashboard />,
        link: "/dashboard"
    },
    {
        title: "Settings",
        icon: <Settings />,
        link: "/settings"
    },
    {
        title: "Profile",
        icon: <User />,
        link: "/profile"
    },
    {
        title:"Questions",
        icon:<MessageCircleQuestion />,
        link:"/admin-questions"
    }
]

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <div className='flex flex-col gap-4 p-2 md:p-4 justify-between shadow'>
        <div className='flex flex-col gap-8'>
        <Link href={"/"} className={`cursor-pointer w-fit block`}>
            <Image src="/cyber.png" alt="cyber icon" width={50} height={50} className='!w-[50px] object-cover'/>
        </Link>
        <div className='flex flex-col gap-4'>
            {dashSidebar?.map((item)=>(
                <Link href={item?.link} key={item?.link} className={`flex items-center max-sm:justify-center gap-2 py-4 hover:bg-gray-500 hover:text-white px-2 rounded-md ${pathname === item?.link && 'bg-gray-500 text-white'}`}>
                    <span>{item?.icon}</span>
                    <span className='hidden md:block'>{item?.title}</span>
                </Link>
            ))}
        </div>
        </div>
            <LogoutUser/>
        
    </div>
  )
}

export default Sidebar