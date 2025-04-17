'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from 'app/components/ui/select';
import { Input } from 'app/components/ui/input';
import { Textarea } from 'app/components/ui/textarea';
import { format } from 'date-fns';
import { Calendar } from 'app/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from 'app/components/ui/popover';
import { CalendarIcon, ChevronLeft, Plus } from 'lucide-react';

import { MultiSelect } from 'react-multi-select-component';
import { Label } from 'app/components/ui/label';
import { Button } from 'app/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from 'app/components/ui/sheet';
import { useCouponSlice } from './slice';
import { useAdminSlice } from '../Admin/slice';
import { settingConfig } from 'utils/settingConfig';
import { use } from 'i18next';
import { Icons } from 'app/components/ui/icons';
import { useSelector } from 'react-redux';
import { selectCouponEdit } from './slice/selectors';

type OptionType = {
    value: string;
    label: string;
};

type product_id = {
    id: string;
    name: string;
    quantity?: number;
    value?: number;
};

type FormData = {
    //   user_type: string;
    couponCount: string;
    product_id: string;
    remark: string;
};

export default function CouponForm() {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const [open, setOpen] = React.useState(false);
    const { useGenerateCoupon, useUpdateCoupon } = useCouponSlice();
    const { useGetPointsLazyQuery } = useAdminSlice();
    const editSelector = useSelector(selectCouponEdit);
    console.log('editSelector=====>', editSelector);
    const [generateCoupon, { data, isError, isLoading, isSuccess }] = useGenerateCoupon();
    const [updateCoupon] = useUpdateCoupon();

    const [getProduct, { data: products }] = useGetPointsLazyQuery();
    React.useEffect(() => {
        getProduct({});
    }, [getProduct]);
    const onSubmit = async (data) => {
        let payload = {
            ...data
        };
        if (editSelector) {
            payload = {
                ...data,
                id: editSelector.id,
            };
            // updateCoupon(editSelector.id)
        } else {
            generateCoupon(payload)
        }
    };
    useEffect(() => {
        if (editSelector) {
            console.log('editSelector', editSelector?.product_id);

            reset({
                couponCount: editSelector.couponCount,
                // product_id: editSelector.product_id,
                remark: editSelector.remark,
            });
            setValue("product_id", editSelector.product_id);


            setOpen(true);
        }
    }

        , [editSelector]);

    return (
        <Sheet aria-describedby={false} open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="font-poppins font-base font-normal rounded-full text-base absolute -bottom-0 right-[30px] flex items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
                    <span className="rounded-full  text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 p-[15px_15px]">
                        <Plus />
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent
                className="w-[850px] max-h-screen overflow-y-auto"
                onInteractOutside={e => e.preventDefault()}
            >
                <SheetHeader>
                    <SheetTitle>
                        <SheetClose asChild>
                            <div
                                onClick={() => setOpen(false)}
                                className="flex items-center mb-8 mt-4 cursor-pointer"
                            >
                                <figcaption className="flex justify-center items-center bg-white border w-16 h-16 rounded-full">
                                    <ChevronLeft />
                                </figcaption>
                                <span className="text-md font-poppins text-[#101828] ml-6 font-medium">
                                    Back
                                </span>
                            </div>
                        </SheetClose>
                    </SheetTitle>
                </SheetHeader>
                <div className="mt-4 bg-white rounded-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div>
                                <Input
                                    {...register('couponCount', {
                                        required: 'User type is required',
                                    })}
                                    placeholder="Karigar or Dealer"
                                />
                                {errors.couponCount && (
                                    <p className="text-red-500 text-[14px] mt-1">
                                        {errors.couponCount.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">
                                Gift Type
                            </Label>
                            <Controller
                                name="product_id"
                                control={control}
                                rules={{ required: 'Gift Type is required' }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.product_id ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select gift type</option>
                                        {products?.data?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.productName}
                                            </option>
                                        ))}
                                    </select>

                                )}
                            />
                            {errors.product_id && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.product_id.message}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div>
                                <Textarea
                                    {...register('remark', {
                                        required: 'remark is required',
                                    })}
                                    placeholder="remark"
                                    rows={3}
                                />
                                {errors.remark && (
                                    <p className="text-red-500 text-[14px] mt-1">
                                        {errors.remark.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* /// button make a loading/// */}
                        <Button
                            variant="destructive"
                            type="submit"
                            disabled={isLoading}
                            className="w-full text-white py-3 text-lg rounded-xl   text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
                        >
                            {isLoading && (
                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Generate
                        </Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
