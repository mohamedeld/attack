import { Quiz } from "@/lib/types"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import QuizForm from "./QuizForm"
import CustomDelete from "../CustomDelete"
import { deleteQuiz } from "@/actions/quiz.action"
import Link from "next/link"
import { Pencil } from "lucide-react"

interface IProps{
    quizes:Quiz[]
}
const TableQuiz = ({quizes}:IProps) => {
  return (
    <div className="px-2 py-5">
        <Table className="overflow-y-auto">
  <TableCaption>A list of your recent quizes.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="">Title</TableHead>
      <TableHead>questions</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        quizes?.map((attack:Quiz)=>(
            <TableRow key={attack?._id} className="py-4">
            <TableCell>{attack?.title}</TableCell>
            <TableCell>{attack?.questions?.length}</TableCell>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Link href={`/quizes/update/${attack?._id}`}>
                        <Pencil/>
                    </Link>
                    <div>
                    <CustomDelete id={attack?._id} deleteAction={deleteQuiz} title="Do you want to delete this quiz?"/>
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

export default TableQuiz