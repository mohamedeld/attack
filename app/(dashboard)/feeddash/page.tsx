import SubHeader from "@/components/dashboard/SubHeader";
import NoResult from "@/components/NoResult";
import { getFeedbacks } from "@/lib/fetchData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
                {res?.data?.length > 0 ? <></>    : <NoResult title="There are no attacks right now"/>
                }
    </div>
  )
}

export default FeedbackDashPage