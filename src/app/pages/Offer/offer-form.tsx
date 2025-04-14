'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'app/components/ui/select';
import { Input } from 'app/components/ui/input';
import { Textarea } from 'app/components/ui/textarea';
import { format } from 'date-fns';
import { Calendar } from 'app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'app/components/ui/popover';
// import { cn } from 'app/lib/utils';
import { CalendarIcon } from 'lucide-react';

import { MultiSelect } from "react-multi-select-component";
import { Label } from 'app/components/ui/label';
import { Button } from 'app/components/ui/button';
import { ChevronLeft, Plus } from 'lucide-react';
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

type OptionType = {
    value: string;
    label: string;
};

type GiftType = {
    id: string;
    name: string;
    quantity?: number;
    value?: number;
};

type FormData = {
    user_type: string;
    title: string;
    offer_code: string;
    description: string;
    terms_conditions: string;
    start_date: Date | undefined;
    end_date: Date | undefined;
    states: string;
    districts: string;
    gifts: string;
};

const stateOptions = ['Delhi', 'Gujarat', 'Maharashtra'];
const districtOptions = ['Delhi', 'Ahmedabad', 'Pune'];
const giftOptions = ['Speaker', 'Gift Voucher'];

export default function OfferForm() {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>();
    const [open, setOpen] = React.useState(false);

    const onSubmit = (data: FormData) => {
        console.log('Payload:', data);
    };
    const options = [
        { label: "Delhi", value: "delhi" },
        { label: "Gujarat", value: "gujarat" },
        { label: "Maharashtra", value: "maharashtra" },
    ];
    const [selected, setSelected] = React.useState([]);


    return (
        <Sheet aria-describedby={false} open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="blueBtn"
                    className="font-poppins font-base font-normal rounded-full text-base py-5 px-8  hover:to-blue-700 absolute -bottom-[0px] right-[30px]"
                >
                    Add{' '}
                    <span className="ml-2">
                        {' '}
                        <Plus className="w-7" />
                    </span>
                </Button>
            </SheetTrigger>

            <SheetContent
                className="w-[700px]" onInteractOutside={e => e.preventDefault()}
            // className={`${editSelector ||
            //     agentEditSelector ||
            //     builderEditSelector ||
            //     recruitEditSelector
            //     ? 'invisible'
            //     : 'bg-[#ffffff82]'
            //     } backdrop-blur-[2.5rem]`}
            >
                {/* <span
                            className={
                                editSelector ||
                                    agentEditSelector ||
                                    builderEditSelector ||
                                    recruitEditSelector
                                    ? 'invisible'
                                    : 'visible'
                            }
                        > */}
                <SheetHeader>
                    <SheetTitle>
                        <SheetClose asChild>
                            <div onClick={() => { setOpen(false); }} className="flex items-center mb-8 mt-4  cursor-pointer">
                                <div>
                                    {' '}
                                    <span>
                                        <figcaption className="flex justify-center items-center bg-white  border w-20 h-20 rounded-full text-center">
                                            <ChevronLeft />
                                        </figcaption>
                                    </span>{' '}
                                </div>
                                <div className="text-md font-poppins text-[#101828] ml-6 font-medium leading-0" >
                                    {' '}
                                    Back
                                </div>
                            </div>
                        </SheetClose>
                    </SheetTitle>
                </SheetHeader>
                <div className=" mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
                    <h4 className="font-bold center text-gray-800">Create Offer</h4>

                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
                        {/* <h2 className="text-xl font-bold text-gray-800">Create Offer</h2> */}

                        {/* User Type & Title */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input {...register('user_type', { required: true })} placeholder="Karigar or Dealer" />
                            <Input {...register('title', { required: true })} placeholder="Summer Bonanza" />
                        </div>

                        {/* Offer Code & Gift */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input {...register('offer_code', { required: true })} placeholder="SUMMER2025" />
                            <Controller
                                control={control}
                                name="gifts"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose a gift" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {giftOptions.map((gift) => (
                                                <SelectItem key={gift} value={gift}>
                                                    {gift}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Start Date */}
                            <Controller
                                control={control}
                                name="start_date"
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                className={`flex items-center w-full px-4 py-2 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all duration-150 ${!field.value ? "text-gray-400" : "text-gray-900"
                                                    }`}
                                            >
                                                <span className="flex-1 text-left">
                                                    {field.value ? format(field.value, "PPP") : "Select Start Date"}
                                                </span>
                                                <CalendarIcon className="ml-2 h-5 w-5 text-gray-500" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 shadow-lg rounded-lg border bg-white">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                                className="rounded-md"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />

                            {/* End Date */}
                            <Controller
                                control={control}
                                name="end_date"
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                className={`flex items-center w-full px-4 py-2 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all duration-150 ${!field.value ? "text-gray-400" : "text-gray-900"
                                                    }`}
                                            >
                                                <span className="flex-1 text-left">
                                                    {field.value ? format(field.value, "PPP") : "Select End Date"}
                                                </span>
                                                <CalendarIcon className="ml-2 h-5 w-5 text-gray-500" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 shadow-lg rounded-lg border bg-white">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                                className="rounded-md"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                        </div>


                        {/* State & District */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* State Select */}
                            <div>
                                <Label className="block font-medium mb-1">Select State</Label>
                                <Controller
                                    control={control}
                                    name="states"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {stateOptions.map((state) => (
                                                    <SelectItem key={state} value={state}>
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            {/* District Select */}
                            <div>
                                <Label className="block font-medium mb-1">Select District</Label>
                                <Controller
                                    control={control}
                                    name="districts"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a district" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {districtOptions.map((district) => (
                                                    <SelectItem key={district} value={district}>
                                                        {district}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Description & Terms */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Textarea {...register('description')} placeholder="Description" rows={3} />
                            <Textarea {...register('terms_conditions')} placeholder="Terms & Conditions" rows={3} />
                        </div>

                        {/* MultiSelect (Full Width) */}
                        <div>
                            <Label className="block font-medium mb-1">Select States</Label>
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                                hasSelectAll={false}
                                overrideStrings={{ selectSomeItems: "Choose states..." }}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded-lg w-full"
                        >
                            Submit Offer
                        </Button>
                    </form>

                </div>
                {/* </span> */}
            </SheetContent>
        </Sheet>

    );
}
