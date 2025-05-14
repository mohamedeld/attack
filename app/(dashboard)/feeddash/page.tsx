import SubHeader from "@/components/dashboard/SubHeader";
import NoResult from "@/components/NoResult";
import { getFeedbacks } from "@/lib/fetchData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const FeedbackDashPage = async () => {
    const token = (await cookies())?.get("token")?.value;
    if(!token){
        redirect("/login")
    }
    const res = await getFeedbacks(token)

  return (
    <div>
        <SubHeader title="Feedbacks">
            <></>
                </SubHeader>
                {res?.data?.length > 0 ? <>
                <div className="px-2 py-5">
                        <Table className="overflow-y-auto">
                  <TableCaption>A list of your recent attacks.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Content</TableHead>
                      <TableHead>User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                        res?.data?.map((attack:{_id:string;content:string;user:string})=>(
                            <TableRow key={attack?._id} className="py-4">
                            <TableCell>{attack?.content}</TableCell>
                            <TableCell>{attack?.user}</TableCell>
                            </TableRow>
                        ))
                    }
                  </TableBody>
                </Table>
                
                    </div>
                </>    : <NoResult title="There are no feedback right now"/>
                }
    </div>
  )
}

export default FeedbackDashPage