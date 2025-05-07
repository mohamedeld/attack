import AttactCard from "@/components/AttactCard";
import CustomPagination from "@/components/CustomPagination";
import { getAttacks } from "@/lib/fetchData";
import { IAttack } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IProps{
    params:Promise<{
        page?:string;
        limit?:string;
    }>
}

const AttacksPage = async ({params}:IProps) => {
    const {page,limit} = await params;
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        const token = (await cookies())?.get("token")?.value;
        if(!token){
            redirect("/login")
        }
        const attackRes = await getAttacks(pageNum,limitNum,token);
  return (
    <div className="py-4">
      <div className="flex items-center gap-3 flex-col md:flex-row px-2 flex-wrap">
        {attackRes?.data?.docs?.map((item:IAttack) => {
          return (
            <AttactCard
              type={item?.type}
              description={item?.description}
              key={item?._id}
            />
          );
        })}
      </div>
      {attackRes?.data?.totalPages > 1 && <CustomPagination totalPages={attackRes?.data?.totalPages} currentPage={attackRes?.data?.page}/>}
    </div>
  );
};

export default AttacksPage;
