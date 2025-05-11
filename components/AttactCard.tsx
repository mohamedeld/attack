import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface IProps{
    type:string;
    description:string;
    video:string;
}
const AttactCard = ({type,description,video}:IProps) => {
  return (
    <Card className="w-full cursor-pointer">
        <div className="">
        <video
            src={video}
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
        <></>
      </CardContent>
      </Card>
  )
}

export default AttactCard