import { CirclePlus, ShieldHalf, Signal } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const aboutContent = [
    {
        title:"Precision Strikes",
        description:"We specialize in executing strategic attacks with pinpoint accuracy. Every operation is calculated, efficient, and designed for maximum impact.",
        icon:<CirclePlus />
    },
    {
        title:"Real-Time Intel",
        description:"Stay ahead of your enemies with real-time threat intelligence and live updates. Knowledge is power—use it to dominate.",
        icon:<Signal />
    },
    {
        title:"Tactical Teams",
        description:"Work with elite squads trained in digital and physical combat. Team coordination is the key to mission success.",
        icon:<ShieldHalf />
    }
]

const AboutUs = () => {
  return (
    <div className='flex items-center gap-6 flex-col md:flex-row px-2'>
        {aboutContent?.map((item)=>(
            <Card className="w-full" key={item?.title}>
            <CardHeader className="text-center flex flex-col gap-4 items-center">
              <CardTitle className='mx-auto'>{item?.icon}</CardTitle>
              <CardDescription className='text-center'>{item?.title}</CardDescription>
            </CardHeader>
            <CardContent>
              {item?.description}
            </CardContent>
            </Card>
        ))}
    </div>
  )
}

export default AboutUs