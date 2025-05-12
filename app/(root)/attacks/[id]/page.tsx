import Question from "@/components/Question";
import { getAttacQuiz } from "@/lib/fetchData";
import { redirect } from "next/navigation";

interface IProps{
    params:Promise<{
        id:string;
    }>
}
const AttackDetailsPage = async ({params}:IProps) => {
    const {id} = await params;
    const question = await getAttacQuiz(id);
    if(!question?.success){
        redirect("/attacks");
    }
  return (
    <div>
        <div className="py-4 px-2">{question?.data?.question?.title}</div>
      <Question questions={question?.data?.question?.questions}/>
    </div>
  )
}

export default AttackDetailsPage