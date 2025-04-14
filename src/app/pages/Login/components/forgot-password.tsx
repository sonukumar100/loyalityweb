import { Button } from 'app/components/ui/button';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginSlice } from '../slice';
import { useNavigate } from 'react-router-dom';
import { Icons } from 'app/components/ui/icons';
import { Input } from 'app/components/ui/input';
import { useToast } from 'app/components/ui/use-toast';
import { Toaster } from 'app/components/ui/toaster';

const ForgotPassword: React.FC = () => {
    const form = useForm();
    const { toast } = useToast();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        formState: { errors },
    } = form;
    const { useResetPasswordMutation } = useLoginSlice();
    const [
        resetPassword,
        {
            isLoading: isResetPassword,
            isSuccess: isResetPasswordSuccess,
            data,
            error: sendResetPasswordError,
        },
    ] = useResetPasswordMutation();

    const onSubmit = (data: any) => {
        console.log(data);
        resetPassword(data);
    };
    useEffect(() => {
        if (isResetPasswordSuccess) {
            localStorage.setItem('email', getValues('email'));
            navigate('/resetpass-verify-otp')
        }
        if (sendResetPasswordError) {
            toast({
                description: `${sendResetPasswordError?.[0]}`,
            })
        }
    }, [isResetPasswordSuccess, sendResetPasswordError]);

    return (
        <div className="bg-bgColor">

            <div className="container relative hidden h-[100vh] flex-col items-center pt-5 md:flex md:flex-col ">
                <div className="flex flex-col items-center justify-start mt-10">
                    <div className="pb-10 mb-10">
                        <h1 className="mx-auto">
                            <img
                                src="/images/logo.svg"
                                width="100"
                                height="25"
                                alt="Authentication"
                            />
                        </h1>
                    </div>

                    <div className="mx-auto flex w-full mt-10 flex-col sm:w-[350px] md:w-[400px]">
                        <div className="flex flex-col text-center">
                            <div className="mt-10">
                                <h1 className="md:text-[4rem] text-black font-normal ">
                                    Forgot Password
                                </h1>
                            </div>
                        </div>
                        {/* {(sendResetPasswordError || !form?.formState?.isValid) && (
                            <div className="text-red-600">
                                {sendResetPasswordError || form?.getFieldState('email')?.error}
                            </div>
                        )} */}
                        <div className="mt-10">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label
                                    htmlFor="email"
                                    className="text-base font-medium font-poppins"
                                >
                                    Email
                                </label>
                                <Input
                                    className="h-[50px] border w-full rounded-10 p-6 mt-4"
                                    id="email"
                                    placeholder="Email"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    // disabled={isSendingOTP}
                                    {...form.register('email', {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                    })}
                                />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                                <div>

                                    <Button disabled={isResetPassword} variant="blueBtn" className="w-full mt-10">
                                        {isResetPassword && (
                                            <Icons.Spinner className="mr-4 h-4 w-4 animate-spin" />
                                        )}
                                        Reset Password
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default ForgotPassword;
