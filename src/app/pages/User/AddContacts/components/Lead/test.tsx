import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from 'app/components/ui/card';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from 'app/components/ui/tabs';

import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import { Label } from 'app/components/ui/label';
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from 'app/components/ui/select';
import { ChevronLeft, Upload } from 'lucide-react';
import { LeadAddressInfo } from './lead-address-info';
import { AddLeadFormThree } from './add-lead-form-three';
import { AddLeadFormProfile } from './add-lead-form-profile';
import { useFormContext } from 'react-hook-form';
import { Tab } from './tab';
export function Test() {
    const form = useFormContext();
    const handleFormSubmit = (data: any) => {
        console.log("data", data)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="flex items-center bg-white rounded-20 p-6 border-2 cursor-pointer border-white  hover:border-blue">
                    <img
                        src="/images/Frame1.svg"
                        alt=""
                        className="h-[4.4rem] w-[4.4rem] flex-none rounded-full"
                    />
                    <div className="ml-4 flex-auto">
                        <div className="font-medium text-md leading-0 font-poppins">
                            Lead
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
            </SheetTrigger>

        </Sheet>
    )

}
