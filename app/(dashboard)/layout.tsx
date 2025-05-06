import Sidebar from '@/components/Sidebar';
import React from 'react'

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className='grid grid-cols-[auto_1fr] md:grid-cols-[250px_1fr] gap-2 md:gap-4 min-h-screen'>
        <Sidebar/>
        <div className='py-4'>
        {children}
        </div>
        </div>
    );
  }