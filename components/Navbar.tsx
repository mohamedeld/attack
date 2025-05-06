import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MenuSidebar from './MenuSidebar'
import UserAvatar from './UserAvatar'

const links = [
    {
        name:"Home",
        href:"/"
    },
    {
        name:"Attacks",
        href:"/attacks"
    },
    {
        name:"Feedback",
        href:"/feedback"
    }
]

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-3  max-w-7xl mx-auto px-2'>
        <Link href={"/"} className='cursor-pointer'>
            <Image src="/cyber.png" alt="cyber icon" width={70} height={70} className='object-cover'/>
        </Link>
        <div className='hidden md:flex items-center gap-5'>
            {links?.map((item)=>(
                <Link href={item?.href} key={item?.name} className='hover:underline'>{item?.name}</Link>
            ))}
        </div>
        <div className="hidden md:flex">
            <UserAvatar/>
        </div>
        <MenuSidebar/>
    </div>
  )
}

export default Navbar