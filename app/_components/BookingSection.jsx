import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession, signIn, signOut } from "next-auth/react"; // Add signOut here
import moment from "moment";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const { data: session } = useSession();

  // ... rest of your code ...

  return (
    <div>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50 p-5 flex justify-between items-center bg-white dark:bg-gray-900 shadow-lg">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src="/Service-modified.png" alt="Service" width={50} height={50} className="cursor-pointer"/>
          </Link>
          <div className="md:flex items-center gap-10 hidden">
            <Link href="/"><h2 className="hover:scale-110 hover:text-blue-600 cursor-pointer text-lg transition-transform duration-200 ease-in-out relative group dark:text-gray-100">Home</h2></Link>
            <Link href="/services"><h2 className="hover:scale-110 hover:text-blue-600 cursor-pointer text-lg transition-transform duration-200 ease-in-out relative group dark:text-gray-100">Services</h2></Link>
            <Link href="/about"><h2 className="hover:scale-110 hover:text-blue-600 cursor-pointer text-lg transition-transform duration-200 ease-in-out relative group dark:text-gray-100">About Us</h2></Link>
          </div>
        </div>
        <ThemeToggle />
        <div className="ml-auto">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image src={session.user.image || '/default-profile.png'} alt="user" width={40} height={40} className="rounded-full cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={'/mybooking'}>My Booking</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem> {/* Add signOut here */}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn('descope')} className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg">Login / Sign Up</Button>
          )}
        </div>
      </div>

      {/* ... rest of your code ... */}
    </div>
  );
}

export default BookingSection;