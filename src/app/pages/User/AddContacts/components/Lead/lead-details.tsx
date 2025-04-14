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

export function LeadDetailsDialog() {
    return (
        <>
        </>
        // <Sheet>
        //     <SheetTrigger asChild>
        //         <div className="flex items-center bg-white rounded-20 p-6 border-2 cursor-pointer border-white  hover:border-blue">
        //             <img
        //                 src="/images/Frame1.svg"
        //                 alt=""
        //                 className="h-[4.4rem] w-[4.4rem] flex-none rounded-full"
        //             />
        //             <div className="ml-4 flex-auto">
        //                 <div className="font-medium text-md leading-0 font-poppins">
        //                     Lead
        //                 </div>
        //             </div>
        //             <div className="cursor-pointer">
        //                 <svg
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     width="24"
        //                     height="24"
        //                     viewBox="0 0 24 24"
        //                     fill="none"
        //                 >
        //                     <path
        //                         d="M4 12H20M20 12L14 6M20 12L14 18"
        //                         stroke="#101828"
        //                         stroke-width="2"
        //                         stroke-linecap="round"
        //                         stroke-linejoin="round"
        //                     />
        //                 </svg>
        //             </div>
        //         </div>
        //     </SheetTrigger>

        //     <SheetContent className="bg-[#ffffff82] backdrop-blur-[4rem]">
        //         <SheetHeader>
        //             <SheetTitle>
        //                 <SheetClose asChild>
        //                     <div className="flex items-center mb-8 mt-4  cursor-pointer">
        //                         <div>
        //                             {' '}
        //                             <span>
        //                                 <figcaption className="flex justify-center items-center bg-white  border w-20 h-20 rounded-full text-center">
        //                                     <ChevronLeft />
        //                                 </figcaption>
        //                             </span>{' '}
        //                         </div>
        //                         <div className="text-md font-poppins text-[#101828] ml-6 font-medium leading-0">
        //                             {' '}
        //                             Back to Leads
        //                         </div>
        //                     </div>
        //                 </SheetClose>
        //             </SheetTitle>
        //         </SheetHeader>
        //         <AddLeadFormProfile />
        //         <div className="mt-12">
        //             <Tabs defaultValue="account">
        //                 <TabsList className="flex justify-start space-x-3 ">
        //                     <TabsTrigger value="account">
        //                         {' '}
        //                         <img src="/images/star.svg" />
        //                     </TabsTrigger>
        //                     <TabsTrigger value="Communication">
        //                         {' '}
        //                         <img src="/images/tab3.svg" />
        //                     </TabsTrigger>
        //                     <TabsTrigger value="Tasks">
        //                         {' '}
        //                         <img src="/images/tab4.svg" />
        //                     </TabsTrigger>
        //                     <TabsTrigger value="Loans">
        //                         <img src="/images/tab5.svg" />
        //                     </TabsTrigger>
        //                     <TabsTrigger value="Loan-Inquiry">
        //                         {' '}
        //                         <img src="/images/tab2.svg" />
        //                     </TabsTrigger>
        //                     <TabsTrigger value="Activity">
        //                         {' '}
        //                         <img src="/images/tab6.svg" />
        //                     </TabsTrigger>
        //                     <TabsTrigger value="Note">
        //                         {' '}
        //                         <img src="/images/tab7.svg" />
        //                     </TabsTrigger>
        //                 </TabsList>
        //                 <TabsContent value="account">
        //                     <LeadAddressInfo />
        //                     <AddLeadFormThree />
        //                 </TabsContent>
        //                 <TabsContent value="Communication">
        //                     <Card>
        //                         <CardHeader>
        //                             <CardTitle>Communication</CardTitle>
        //                         </CardHeader>
        //                         <CardContent className="space-y-2"></CardContent>
        //                     </Card>
        //                 </TabsContent>
        //                 <TabsContent value="Tasks">
        //                     <Card>
        //                         <CardHeader>
        //                             <CardTitle>Tasks</CardTitle>
        //                         </CardHeader>
        //                         <CardContent className="space-y-2"></CardContent>
        //                     </Card>
        //                 </TabsContent>
        //                 <TabsContent value="Loans">
        //                     <Card>
        //                         <CardHeader>
        //                             <CardTitle>Loans</CardTitle>
        //                         </CardHeader>
        //                         <CardContent className="space-y-2"></CardContent>
        //                     </Card>
        //                 </TabsContent>
        //                 <TabsContent value="Loan-Inquiry">
        //                     <Card>
        //                         <CardHeader>
        //                             <CardTitle>Loan Inquiry Tab</CardTitle>
        //                         </CardHeader>
        //                         <CardContent className="space-y-2"></CardContent>
        //                     </Card>
        //                 </TabsContent>
        //                 <TabsContent value="Activity">
        //                     <Card>
        //                         <CardHeader>
        //                             <CardTitle>Activity</CardTitle>
        //                         </CardHeader>
        //                         <CardContent className="space-y-2"></CardContent>
        //                     </Card>
        //                 </TabsContent>
        //                 <TabsContent value="Note">
        //                     <Card>
        //                         <CardHeader>
        //                             <CardTitle>Note</CardTitle>
        //                         </CardHeader>
        //                         <CardContent className="space-y-2"></CardContent>
        //                     </Card>
        //                 </TabsContent>
        //             </Tabs>
        //         </div>
        //     </SheetContent>
        // </Sheet>
    );
}
