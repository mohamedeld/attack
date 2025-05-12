import { getSession } from "@/actions/auth.action";
import FeedbackForm from "@/components/FeedbackForm"

const FeedBackPage = async () => {
        const session = await getSession();
    
  return (
    <div className="flex flex-col gap-2 h-[90vh] justify-center items-center">
        <FeedbackForm session={session?.data}/>
    </div>
  )
}

export default FeedBackPage