import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Coupon } from './types/coupon-types';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from 'app/components/ui/alert-dialog';
import { Button } from 'app/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'app/components/ui/select';
import { useRedeemSlice } from './slice';
import { toast } from 'app/components/ui/use-toast';

interface StatusUpdateModalProps {
    coupon: Coupon;
    open: boolean;
    openModal: (coupon: Coupon) => void;
    setModalOpen: (open: boolean) => void;
}

interface FormValues {
    status: string;
    reason?: string;
}

const StatusUpdateModal = ({
    coupon,
    open,
    openModal,
    setModalOpen,
}: StatusUpdateModalProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            status: coupon?.redeem_req_status || '0',
        },
    });

    const [status, setStatus] = useState(coupon?.redeem_req_status || '0');
    const { useUpdateRedeemRequestMutation } = useRedeemSlice();
    const [updateRedeemRequest, { data }] = useUpdateRedeemRequestMutation();

    const handleClose = () => setModalOpen(false);

    const handleFormSubmit = (formData: FormValues) => {
        updateRedeemRequest({
            id: coupon?.id,
            newStatus: formData.status,
            reason: formData.reason,
        });
    };

    useEffect(() => {
        if (data) {
            handleClose();
            toast({
                title: 'Success',
                description: 'Redeem request updated successfully',
                variant: 'sucsess', // corrected typo from 'sucsess'
            });
        }
    }, [data]);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        setValue('status', newStatus);
    };

    return (
        <AlertDialog open={open} onOpenChange={() => openModal(coupon)}>
            <AlertDialogContent className="max-w-2xl p-6">
                {' '}
                {/* Increased Modal Width */}
                <AlertDialogHeader>
                    <AlertDialogTitle>Update Status for Coupon</AlertDialogTitle>
                    <AlertDialogDescription>
                        You can approve or reject this coupon request.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 font-semibold text-sm">Status</label>
                            <Select value={status} onValueChange={handleStatusChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Pending</SelectItem>
                                    <SelectItem value="1">Approved</SelectItem>
                                    <SelectItem value="2">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {status === '2' && (
                            <div>
                                <label className="block mb-1 font-semibold text-sm">
                                    Reason for Rejection
                                </label>
                                <Select {...register('reason')}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fraud">Fraud</SelectItem>
                                        <SelectItem value="expired">Expired</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className="rounded-md p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold">
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            type="submit"
                            className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 p-4"
                        >
                            Save
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default StatusUpdateModal;
