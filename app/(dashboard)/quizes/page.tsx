import SubHeader from '@/components/dashboard/SubHeader'
import NoResult from '@/components/NoResult';
import TableQuiz from '@/components/quizes/TableQuiz';
import { getQuizes } from '@/lib/fetchData';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const QuizPage = async () => {
        const token = (await cookies())?.get("token")?.value;
        if(!token){
            redirect("/login")
        }
        const quizes = await getQuizes(token);

  return (
    <>
    <SubHeader title="Quiz"linkHref="/quizes/add" linkText="New Quiz" />
    <div className="py-5 px-2">
        {quizes?.data?.length > 0 ? <TableQuiz quizes={quizes?.data}/>:(
            <NoResult title='There are no quizes right now'/>
        )}
    </div>
    </>
  )
}

export default QuizPage