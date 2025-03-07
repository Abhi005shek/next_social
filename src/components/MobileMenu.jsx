"use client";
import Link from 'next/link';
import {useState} from 'react'

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenClose() {
    setIsOpen(p => !p);
  }

  return (
    <div className='md:hidden'>
        <div className='flex flex-col gap-[4.5px] cursor-pointer' onClick={handleOpenClose}>
            <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? 'rotate-45 origin-left' : ''} ease-in-out duration-500 origin-left`} />
            <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen && 'opacity-0'} ease-in-out duration-500`} />
            <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? '-rotate-45' : ''} ease-in-out duration-500 origin-left`} />
        </div>

        {isOpen && <div className='absolute gap-4 font-semibold text-lg z-10 bg-white w-full left-0 top-24 justify-center h-[calc(100vh-96px)] 
        flex flex-col items-center'>
            <Link href='/'>Home</Link>
            <Link href='/'>Friends</Link>
            <Link href='/'>Groups</Link>
            <Link href='/'>Stories</Link>
            <Link href='/'>Login</Link>
            </div>}
    </div>
  )
}

export default MobileMenu