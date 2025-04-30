'use client';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from 'app/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import { Calendar } from 'app/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from 'app/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from 'utils/twm';
import { useState } from 'react';
import { useRedeemSlice } from './slice';

interface ShippedConfirmDialogProps {
    open: boolean;
    onConfirm: (data: { shipped_date: Date | undefined; remark: string }) => void;
    onCancel: () => void;
    selectedValue: string;
    onOpenChange: (open: boolean) => void;
    id: number;
}

interface FormData {
    shipped_date: Date | undefined;
    selectedValue: string;
    remark: string;
}

export function ShippedConfirmDialog({
    open,
    onConfirm,
    onCancel,
    onOpenChange,
    selectedValue,
    id,
}: ShippedConfirmDialogProps) {
    const { register, handleSubmit, watch, setValue } = useForm<FormData>({
        defaultValues: {
            shipped_date: new Date(),
            remark: '',
        },
    });
    const { useUpdateRedeemStatusRequestMutation } = useRedeemSlice();
    const [updateRedeemStatusRequest, { isLoading }] =
        useUpdateRedeemStatusRequestMutation();

    const shipped_date = watch('shipped_date');

    // Ensure currentDate is the same day, no time part.
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Strip time part
    console.log('selectedValue:', selectedValue);
    console.log('id:', id);
    const handleFormSubmit = (data: FormData) => {
        console.log('Form submitted with data:', data);
        onConfirm(data);
        updateRedeemStatusRequest({
            id: id,
            shipped_date: new Date(data.shipped_date),
            shipped_status: selectedValue,
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent
                style={{ width: '700px', padding: '24px' }}
                className="p-6"
            >
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Transfer</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to mark this as <b>Transfer</b>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {/* Shipped Date Picker */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Shipped Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !shipped_date && 'text-muted-foreground',
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {shipped_date
                                        ? format(shipped_date, 'dd MMM yyyy')
                                        : 'Select date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0 rounded-lg shadow-lg"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={shipped_date}
                                    onSelect={date => setValue('shipped_date', date)}
                                    initialFocus
                                    disabled={date => date < currentDate} // Disable past dates
                                    className="rounded-lg"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Remark Field */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Remark</label>
                        <Input
                            {...register('remark')}
                            placeholder="Enter remark..."
                            className="h-12" // Ensures all input fields are the same height
                        />
                    </div>

                    <AlertDialogFooter className="pt-4">
                        <AlertDialogCancel type="button" onClick={onCancel}>
                            Cancel
                        </AlertDialogCancel>
                        <Button type="submit" className="h-12">
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
