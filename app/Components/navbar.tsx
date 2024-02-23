'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import profile from '../images/profilePic.png';

const NavBar: React.FC = () => {
  const router = useRouter();
  

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className='bg-white dark:bg-gray-800 pb-3 w-screen flex items-center justify-center shadow-sm shadow-slate-300 z-20'> 
      <div className='mx-auto flex space-x-8 mt-3 font-bold font-sans uppercase text-md text-black dark:text-white md:space-x-36 md:text-sd sm:space-x-16 items-center'>
        <h1 className='nav cursor-default' onClick={() => navigateTo('/home')}>Събития</h1>
        <h1 className='nav cursor-default' onClick={() => navigateTo('/create')}>Създай</h1>
        <h1 className='nav cursor-default' onClick={() => navigateTo('/land')}>Начало</h1>
      </div>
    </div>
  );
};

export default NavBar;