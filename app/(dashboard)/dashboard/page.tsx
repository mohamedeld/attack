import AttackForm from "@/components/dashboard/AttackForm"
import SubHeader from "@/components/dashboard/SubHeader"

const DashboardPage = () => {
  return (
    <div>
        <SubHeader title="Attacks">
            <AttackForm/>
        </SubHeader>

    </div>
  )
}

export default DashboardPage