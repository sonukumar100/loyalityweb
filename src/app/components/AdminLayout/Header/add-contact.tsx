import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import { Label } from 'app/components/ui/label';
import { LeadDetailsDialog } from '../../../pages/User/AddContacts/components/Lead/lead-details';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'app/components/ui/sheet';
import { ChevronLeft } from 'lucide-react';

export function AddContactDialog() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="blueBtn"
          type="button"
          className="font-poppins font-base font-normal rounded-full text-base py-5 px-8  hover:to-blue-700"
        >
          Add Contact
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-[#ffffff80] backdrop-blur-[2.5rem]">
        <SheetHeader>
          <SheetTitle>
            <SheetClose asChild>
              <div className="flex items-center mb-8 mt-4  cursor-pointer">
                <div>
                  {' '}
                  <span>
                    <figcaption className="flex justify-center items-center bg-white  border w-20 h-20 rounded-full text-center">
                      <ChevronLeft />
                    </figcaption>
                  </span>{' '}
                </div>
                <div className="text-md font-poppins text-[#101828] ml-6 font-medium leading-0">
                  {' '}
                  Back
                </div>
              </div>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="grid py-4 px-10 mt-28">
          <div className="text-black font-medium text-30 font-poppins">
            Select the contact you need
          </div>

          <div className="mt-10">
            <div className="space-y-4">
              <LeadDetailsDialog />

              <div className="flex items-center bg-white rounded-20 p-6 border-2 cursor-pointer border-white  hover:border-blue">
                <img
                  src="/images/Frame2.svg"
                  alt=""
                  className="h-[4.4rem] w-[4.4rem] flex-none rounded-full"
                />
                <div className="ml-4 flex-auto">
                  <div className="font-medium text-md leading-0 font-poppins">
                    Agent
                  </div>
                </div>
                <div className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4 12H20M20 12L14 6M20 12L14 18"
                      stroke="#101828"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center bg-white rounded-20 p-6 border-2 cursor-pointer border-white  hover:border-blue">
                <img
                  src="/images/Frame3.svg"
                  alt=""
                  className="h-[4.4rem] w-[4.4rem] flex-none rounded-full"
                />
                <div className="ml-4 flex-auto">
                  <div className="font-medium text-md leading-0 font-poppins">
                    Builder
                  </div>
                </div>
                <div className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4 12H20M20 12L14 6M20 12L14 18"
                      stroke="#101828"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center bg-white rounded-20 p-6 border-2 cursor-pointer border-white  hover:border-blue">
                <img
                  src="/images/Frame4.svg"
                  alt=""
                  className="h-[4.4rem] w-[4.4rem] flex-none rounded-full"
                />
                <div className="ml-4 flex-auto">
                  <div className="font-medium text-md leading-0 font-poppins">
                    Recruiter
                  </div>
                </div>
                <div className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4 12H20M20 12L14 6M20 12L14 18"
                      stroke="#101828"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
