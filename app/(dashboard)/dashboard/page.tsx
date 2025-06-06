import { getSession } from "@/actions/auth.action";
import CustomPagination from "@/components/CustomPagination";
import AttackForm from "@/components/dashboard/AttackForm"
import AttackTable from "@/components/dashboard/AttackTable";
import SubHeader from "@/components/dashboard/SubHeader"
import NoResult from "@/components/NoResult";
import { getAttacks, getQuizes, getUsers } from "@/lib/fetchData"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IProps{
    params:Promise<{
        page?:string;
        limit?:string;
    }>
}
const DashboardPage = async ({params}:IProps) => {
    const {page,limit} = await params;
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    const token = (await cookies())?.get("token")?.value;
    if(!token){
        redirect("/login")
    }
    const session = await getSession();
        if(session?.data?.role !== "admin"){
            redirect("/")
        }
    const res = await getUsers(1,10000,token);
    const attackRes = await getAttacks(pageNum,limitNum,token);
    const questions = await getQuizes(token);
  return (
    <div>
        <SubHeader title="Attacks">
            <AttackForm users={res?.data?.docs} questions={questions?.data}/>
        </SubHeader>
        {attackRes?.data?.docs?.length > 0 ? 
        <AttackTable questions={questions?.data} attacks={attackRes?.data?.docs} users={res?.data?.docs}/>
        : <NoResult title="There are no attacks right now"/>
    }
    {attackRes?.data?.totalPages > 1 && <CustomPagination totalPages={attackRes?.data?.totalPages} currentPage={attackRes?.data?.page}/>}
    </div>
  )
}

export default DashboardPage