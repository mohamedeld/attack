import { IAttack, IUser, Quiz } from "@/lib/types"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import AttackForm from "./AttackForm";
import CustomDelete from "../CustomDelete";
import { deleteAttack } from "@/actions/attack.action";

interface IProps{
    attacks:IAttack[];
    users:IUser[]
    questions:Quiz[]
    
}
const AttackTable = ({attacks,users,questions}:IProps) => {
  return (
    <div className="px-2 py-5">
        <Table className="overflow-y-auto">
  <TableCaption>A list of your recent attacks.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="">Type</TableHead>
      <TableHead>Description</TableHead>
      <TableHead>Report By</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        attacks?.map((attack:IAttack)=>(
            <TableRow key={attack?._id} className="py-4">
            <TableCell>{attack?.type}</TableCell>
            <TableCell>{attack?.description}</TableCell>
            <TableCell>{attack?.reportedBy?.userName}</TableCell>
            <TableCell>
                <div className="flex items-center gap-3">
                    <AttackForm questions={questions} update={true} users={users} attack={attack} />
                    <div>
                    <CustomDelete id={attack?._id} deleteAction={deleteAttack} title="Do you want to delete this attack?"/>
                    </div>
                </div>
            </TableCell>
            </TableRow>
        ))
    }
  </TableBody>
</Table>

    </div>
  )
}

export default AttackTable