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
import { useSession } from "next-auth/react";
import moment from "moment";
import { toast } from "sonner";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    if (date && business?.id) {
      console.log("Fetching booked slots for business:", business.id, "on date:", moment(date).format("DD-MMM-yyyy"));
      fetchBookedSlots();
    }
  }, [date, business]);

  const fetchBookedSlots = async () => {
    try {
      const resp = await GlobalApi.BusinessBookedSlot(business.id, moment(date).format("DD-MMM-yyyy"));
      console.log("Fetched booked slots:", resp); // Debugging the response
      setBookedSlot(resp);
    } catch (err) {
      console.error("Error while fetching booked slots:", err);
      toast.error("Error fetching booked slots.");
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

  const saveBooking = async () => {
    if (selectedTime && date && business?.id && data?.user?.email && data?.user?.name) {
      console.log("Booking input data:", {
        businessId: business.id,
        date: moment(date).format("DD-MMM-yyyy"),
        time: selectedTime,
        userName: data.user.name,
        userEmail: data.user.email,
      });

      try {
        const resp = await GlobalApi.createBooking(
          business.id,
          moment(date).format("DD-MMM-yyyy"),
          selectedTime,
          data.user.name,
          data.user.email
        );
        console.log("Booking response:", resp); // Debugging response
        if (resp) {
          setDate(new Date());
          setSelectedTime("");
          toast.success("Service booked successfully!");
        }
      } catch (err) {
        toast.error("Error while creating booking");
        console.error("Error while booking:", err);
      }
    } else {
      toast.error("Please select a valid date and time.");
    }
  };

  const isSlotBooked = (time) => {
    return bookedSlot.some((item) => item.time === time);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book a Service</SheetTitle>
            <SheetDescription>
              Select Date and Time slot to book a service
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-5 items-baseline">
            <h2 className="mt-5 font-bold">Select Date</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <h2 className="my-5 font-bold">Select Time Slot</h2>
          <div className="grid grid-cols-3 gap-3">
            {timeSlot.map((item, index) => (
              <Button
                key={index}
                disabled={isSlotBooked(item.time)}
                variant="outline"
                className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white ${
                  selectedTime === item.time && "bg-primary text-white"
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
                  disabled={!(selectedTime && date)}
                  onClick={saveBooking}
                  className={`rounded-lg px-6 py-3 font-semibold text-white ${
                    !(selectedTime && date)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;