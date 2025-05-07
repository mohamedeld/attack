import AboutUs from '@/components/About'
import AttactCard from '@/components/AttactCard'
import Hero from '@/components/Hero'
import HomeContainer from '@/components/HomeContainer'
import { getAttacks } from '@/lib/fetchData'
import { IAttack } from '@/lib/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const RootPage = async () => {
    const token = (await cookies())?.get("token")?.value;
    if(!token){
        redirect("/login")
    }
    const attacks = await getAttacks(1,4,token);
  return (
    <div>
        <Hero title='Launch Your Strike. Lead the Attack.' subTitle="Join the elite force in a high-stakes digital battlefield. Whether you're defending or attacking, the mission is clear: dominate."/>
        <HomeContainer linkHref='/attacks' title="Attacks">
        <div className="flex items-center gap-3 flex-col md:flex-row px-2">
        {attacks?.data?.docs?.map((item:IAttack)=>{
            return (
                    <AttactCard type={item?.type} description={item?.description} key={item?._id}/>
                )
            })}
            </div>
        </HomeContainer>
        <div className='py-6'></div>
        <HomeContainer title='About Us'>
            <AboutUs/>
        </HomeContainer>
    </div>
  )
}

export default RootPage