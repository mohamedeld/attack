import SubHeader from "@/components/dashboard/SubHeader"
import QuizForm from "@/components/quizes/QuizForm"

const QuizAddPage = () => {
  return (
    <>
    <SubHeader title="Add Quiz" >
        <></>
    </SubHeader>
    <div className="py-5 max-w-7xl mx-auto px-2 shadow">
        <QuizForm/>
    </div>
    </>
  )
}

export default QuizAddPage