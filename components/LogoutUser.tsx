'use client';

import { LogOut } from 'lucide-react';
import { Button } from './ui/button'
import { logout } from '@/actions/auth.action'

const LogoutUser = () => {

  return (
    <div className='py-4'>
        <Button variant={"ghost"} className='cursor-pointer' onClick={logout}>
            <span className='hidden md:block'>Logout</span>
            <LogOut className='block md:hidden'/>
        </Button>
    </div>
  )
}

export default LogoutUser