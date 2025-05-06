import SubHeader from "@/components/dashboard/SubHeader";
import QuizForm from "@/components/quizes/QuizForm";
import { getQuiz } from "@/lib/fetchData";
import { redirect } from "next/navigation";

interface IProps{
    params:Promise<{
        id:string
    }>
}
const UpdateQuizPage = async ({params}:IProps) => {
    const {id} = await params;
    const quiz = await getQuiz(id);
    if(!quiz){
        redirect("/quizes")
    }
  return (
    <div>
                <SubHeader title="Update Question">
                    <></>
                </SubHeader>
                <div className="max-w-7xl mx-auto px-2 md:px-5 py-3">
                    <QuizForm update={true} quiz={quiz?.data}/>
                </div>
    </div>
  )
}

export default UpdateQuizPage