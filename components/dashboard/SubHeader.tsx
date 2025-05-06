import Link from "next/link";
import { ReactNode } from "react";

interface IProps{
    title:string;
    linkText?:string;
    linkHref?:string;
    children?:ReactNode
}
const SubHeader = ({title,linkHref,linkText,children}:IProps) => {
  return (
    <div className="py-4 flex items-center justify-between px-2">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {linkHref && linkText && <Link href={linkHref} className="bg-gray-900 text-white py-2 px-6 rounded-md cursor-pointer">{linkText}</Link>}
        {children}
    </div>
  )
}

export default SubHeader