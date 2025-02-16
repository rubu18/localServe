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
import { useSession, signIn } from "next-auth/react";
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

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    if (date && business?.id) {
      fetchBookedSlots();
    }
  }, [date, business]);

  const fetchBookedSlots = async () => {
    try {
      const formattedDate = moment(date).format("DD-MMM-yyyy");
      const resp = await GlobalApi.BusinessBookedSlot(business.id, formattedDate);
      setBookedSlot(Array.isArray(resp) ? resp : []);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
      toast.error("Could not fetch available time slots");
    }
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }
    setTimeSlot(timeList);
  };

  const isSlotBooked = (time) => {
    return bookedSlot.some((slot) => slot.time === time);
  };

  const isPastDate = (date) => {
    return moment(date).startOf('day').isBefore(moment().startOf('day'));
  };

  const saveBooking = async () => {
    if (!session?.user) {
      toast.error("Please sign in to book a service");
      return;
    }

    if (!selectedTime || !date || !business?.id) {
      toast.error("Please select a date and time");
      return;
    }

    if (isPastDate(date)) {
      toast.error("Cannot book for past dates");
      return;
    }

    try {
      setIsBooking(true);
      const formattedDate = moment(date).format("DD-MMM-yyyy");
      
      const resp = await GlobalApi.createBooking(
        business.id,
        formattedDate,
        selectedTime,
        session.user.name,
        session.user.email
      );

      if (resp) {
        toast.success("Booking confirmed!");
        setSelectedTime(null);
        setDate(new Date());
        await fetchBookedSlots();
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

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
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn('descope')} className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg">Login / Sign Up</Button>
          )}
        </div>
      </div>

      {/* Content with padding to prevent overlap */}
      <div className="pt-20">
        <Sheet>
          <SheetTrigger asChild>{children}</SheetTrigger>
          <SheetContent className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Book a Service</SheetTitle>
              <SheetDescription>Select Date and Time slot to book a service</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-5 items-baseline">
              <h2 className="mt-5 font-bold">Select Date</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => isPastDate(date)}
                className="rounded-md border"
              />
            </div>
            <h2 className="my-5 font-bold">Select Time Slot</h2>
            <div className="grid grid-cols-3 gap-3">
              {timeSlot.map((item, index) => (
                <Button
                  key={index}
                  disabled={isSlotBooked(item.time)}
                  variant={selectedTime === item.time ? "default" : "outline"}
                  className={`border rounded-full p-2 px-3 ${
                    isSlotBooked(item.time) 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : selectedTime === item.time
                      ? "bg-primary text-white"
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => setSelectedTime(item.time)}
                >
                  {item.time}
                </Button>
              ))}
            </div>
            <SheetFooter className="mt-5">
              <SheetClose asChild>
                <div className="flex gap-5">
                  <Button variant="destructive">Cancel</Button>
                  <Button
                    disabled={isBooking || !selectedTime || !date || !session?.user}
                    onClick={saveBooking}
                    className={`rounded-lg px-6 py-3 font-semibold text-white ${
                      isBooking || !selectedTime || !date || !session?.user
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isBooking ? "Booking..." : "Book"}
                  </Button>
                </div>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default BookingSection;