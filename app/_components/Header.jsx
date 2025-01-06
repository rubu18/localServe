// Header.js
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from './ThemeToggle';  // Import ThemeToggle
import Link from 'next/link';

function Header() {
  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='p-5 flex justify-between items-center bg-white dark:bg-gray-900 shadow-lg'>
      <div className='flex items-center gap-8'>
        {/* Logo */}
        <Image src='/Service-modified.png' alt='Service' width={50} height={50} />
        
        {/* Navigation Links */}
        <div className='md:flex items-center gap-10 hidden'>
          <h2 className='hover:scale-110 hover:text-blue-600 cursor-pointer text-lg transition-transform duration-200 ease-in-out relative group dark:text-gray-100'>
            Home
            <span className='absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
          </h2>
          <h2 className='hover:scale-110 hover:text-blue-600 cursor-pointer text-lg transition-transform duration-200 ease-in-out relative group dark:text-gray-100'>
            Services
            <span className='absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
          </h2>
          <h2 className='hover:scale-110 hover:text-blue-600 cursor-pointer text-lg transition-transform duration-200 ease-in-out relative group dark:text-gray-100'>
            About Us
            <span className='absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
          </h2>
        </div>
      </div>
      
      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Get Started Button */}
      <div className='ml-auto'>
        {data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={data.user.image || '/default-profile.png'}
                alt='user'
                width={40}
                height={40}
                className='rounded-full cursor-pointer'
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={'/mybooking'}>My Booking</Link>
                
                </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => signIn('descope')}
            className='px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:bg-blue-700 hover:scale-105 focus:ring-4 focus:ring-blue-300 active:scale-95'
          >
            Login / Sign Up
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
