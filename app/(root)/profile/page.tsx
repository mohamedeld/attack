import { getSession } from "@/actions/auth.action"
import ProfileDetail from "@/components/profile/profileDetail"

const ProfilePage = async () => {
    const session = await getSession();
  return (
    <div className="flex flex-col gap-2 h-[90vh] justify-center items-center">
        <ProfileDetail session={session?.data}/>
    </div>
  )
}

export default ProfilePage