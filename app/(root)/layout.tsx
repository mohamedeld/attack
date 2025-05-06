import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react'

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
      <div className='shadow relative '>
        <Navbar/>
      </div>
        <div className='max-w-7xl mx-auto flex-1 w-full'>
        {children}
        </div>
        <div className='pt-5'>
        <Footer/>
        </div>
        </>
    );
  }