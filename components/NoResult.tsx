import Image from "next/image";

interface IProps{
    title:string;
}
const NoResult = ({title}:IProps) => {
  return (
    <div className="w-full flex flex-col h-[90vh] gap-4 items-center justify-center">
        <Image src="/no_data.png" alt="no result image" width={150} height={150} className="object-cover"/>
        <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  )
}

export default NoResult