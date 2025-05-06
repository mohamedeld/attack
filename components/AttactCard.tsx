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
}
const AttactCard = ({type,description}:IProps) => {
  return (
    <Card className="w-full cursor-pointer">
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