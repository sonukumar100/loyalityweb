// src/app/components/ui/UserVerifyModal.tsx
import { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from 'app/components/ui/alert-dialog';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from 'app/components/ui/select';
// import { User } from 'app/pages/your-page-path/types/user-types'; // Adjust the import according to your project structure
import { useForm } from 'react-hook-form';
import { useUserSlice } from './slice';
import { Icons } from 'app/components/ui/icons';
import { Button } from 'app/components/ui/button';
import { toast } from 'app/components/ui/use-toast';

interface UserVerifyModalProps {
    setModalOpen: (open: boolean) => void;
    isOpen: boolean;
    userId: number | null;
    is_verified: string | undefined;
}

export const UserVerifyModal: React.FC<UserVerifyModalProps> = ({
    setModalOpen,
    isOpen,
    userId,
    is_verified,
}) => {
    console.log('is_verified', is_verified);
    const { register, handleSubmit } = useForm();
    const statusValue =
        is_verified == 'verified'
            ? '2'
            : is_verified == 'rejected'
                ? '3'
                : is_verified == 'suspect'
                    ? '4'
                    : '1';
    const [status, setStatus] = useState(statusValue);
    const { useVerifyUserMutation } = useUserSlice();
    const [verifyUser, { data, isLoading }] = useVerifyUserMutation();
    const handleStatusChange = (value: string) => {
        setStatus(value);
    };
    const onFormSubmit = (data: any) => {
        let payload = {
            is_verified: status,
            id: userId,
        };
        verifyUser(payload);
    };
    useEffect(() => {
        if (data) {
            setModalOpen(false);
            toast({
                title: 'Success',
                description: 'Status updated successfully.',
                variant: 'sucsess',
            });
        }
    }, [data]);

    return (
        <AlertDialog open={isOpen} onOpenChange={() => setModalOpen(false)}>
            <AlertDialogContent className="max-w-2xl p-6">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update User Status</AlertDialogTitle>
                        {/* <AlertDialogDescription>
                            You can approve or reject this coupon request.
                        </AlertDialogDescription> */}
                    </AlertDialogHeader>

                    <div className="space-y-4 mt-16">
                        <div>
                            {/* <label className="block mb-1 font-semibold text-sm">Status</label> */}
                            <Select value={status} onValueChange={handleStatusChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Pending</SelectItem>
                                    <SelectItem value="2">Verified</SelectItem>
                                    <SelectItem value="3">Rejected</SelectItem>
                                    <SelectItem value="4">Suspect</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {status === '3' && (
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
                        <Button
                            type="button"
                            className="rounded-md p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="destructive"
                            type="submit"
                            disabled={isLoading}
                            className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 p-4"
                        >
                            {isLoading && (
                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Save
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};
