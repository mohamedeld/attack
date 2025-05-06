import Image from "next/image";
import Link from "next/link";

interface IProps{
    title:string;
    subTitle:string;
}
const Hero = ({title,subTitle}:IProps) => {
  return (
    <div className="flex flex-col md:flex-row max-sm:text-center max-sm:py-8 px-2 items-center md:min-h-[60vh] w-full">
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-gray-800">{subTitle}</p>
            <Link href={"/attacks"} className="py-2 w-full md:w-fit md:px-6 rounded-md cursor-pointer bg-gray-950 text-white hover:bg-gray-900">Discover your attacks</Link>
        </div>
        <div className="relative  w-full h-[50vh] hidden md:block">
            <Image src="/hacker.png" alt="hacker image" fill className="object-contain"/>
        </div>
    </div>
  )
}

export default Hero