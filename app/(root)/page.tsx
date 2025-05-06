import AboutUs from '@/components/About'
import AttactCard from '@/components/AttactCard'
import Hero from '@/components/Hero'
import HomeContainer from '@/components/HomeContainer'
import React from 'react'

const RootPage = () => {
  return (
    <div>
        <Hero title='Launch Your Strike. Lead the Attack.' subTitle="Join the elite force in a high-stakes digital battlefield. Whether you're defending or attacking, the mission is clear: dominate."/>
        <HomeContainer linkHref='/attacks' title="Attacks">
        <div className="flex items-center gap-3 flex-col md:flex-row px-2">
        {Array.from({length:4})?.map((item)=>{
            return (
                    <AttactCard type={"First card"} description='Welcome in first card' key={String(item)}/>
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