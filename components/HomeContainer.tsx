import Link from "next/link";
import { ReactNode } from "react";


interface IProps{
    title:string;
    children:ReactNode;
    linkHref?:string;
}
const HomeContainer = ({title,children,linkHref}:IProps) => {
  return (
    <div className="flex flex-col gap-4 px-2 relative">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {children}
        <div className="flex items-center justify-center">
        {linkHref && <Link href={linkHref} className="py-2 w-full text-center md:w-fit md:px-6 rounded-md cursor-pointer bg-gray-950 text-white hover:bg-gray-900">View All</Link>}
        </div>
    </div>
  )
}

export default HomeContainer