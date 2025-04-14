import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'app/components/ui/input';
import { useAdminSlice } from 'app/pages/Admin/slice';
import { Button } from 'app/components/ui/button';
import { useDispatch } from 'react-redux';
import { useGlobalSlice } from 'app/slice';
import { Toaster } from 'app/components/ui/toaster';
import { useToast } from 'app/components/ui/use-toast';
import { Icons } from 'app/components/ui/icons';
import { Logout } from './Logout';

export function PasswordForm({ parentMethod }) {
    const { toast } = useToast();

    const dispatch = useDispatch();

    const {
        useUpdateProfileMutation,
    } = useAdminSlice();
    const [
        updateProfile,
        {
            isLoading: isUpdateProfile,
            isSuccess: isUpdateProfileDate,
            data,
            error: isUpdateProfileError,
        },
    ] = useUpdateProfileMutation();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data.password);
        updateProfile(data)
    };
    const { actions: globalActions } = useGlobalSlice();
    React.useEffect(() => {
        if (isUpdateProfileDate) {
            parentMethod()
            console.log("profile data ", data)
            toast({
                description: 'System password updated',
            });
            dispatch(globalActions.setUser(data?.data));
        }
    }, [isUpdateProfileDate])
    return (
        <div className='mt-4'>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Eneter password" type="password" {...register('password', { required: true })} />
                <Button
                    variant="whiteBtn"
                    type="submit"
                    disabled={isUpdateProfile}
                    className="font-poppins font-base font-normal rounded-80 text-base py-5 px-8 mt-8 bg-blue-[#0000ff] "
                >
                    {isUpdateProfile && (<Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />)}
                    Save
                </Button>
                <Logout />
            </form>
        </div>

    );
}

export default PasswordForm;
