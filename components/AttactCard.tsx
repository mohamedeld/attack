'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";

interface IProps{
    type:string;
    description:string;
    video:string;
    id:string;
}
const AttactCard = ({type,description,video,id}:IProps) => {
  return (
    <Card className="w-full cursor-pointer">
        <div className="">
        <video
            src={`${video}`}
            controls
            className="w-full rounded-xl shadow-lg"
            preload="metadata"
          />
        </div>
      <CardHeader className="text-center">
        <CardTitle>{type}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/attacks/${id}`} className="inline-block w-full md:w-fit bg-black text-white py-2  px-4 text-center rounded-md cursor-pointer hover:bg-gray-800">Start Quiz</Link>
      </CardContent>
      </Card>
  )
}

export default AttactCard