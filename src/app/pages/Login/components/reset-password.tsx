import React, { useEffect, useState } from 'react';
import { Button } from 'app/components/ui/button';
import { useForm } from 'react-hook-form';
import { useLoginSlice } from '../slice';
import { useNavigate } from 'react-router-dom';
import { Icons } from 'app/components/ui/icons';
import { useToast } from 'app/components/ui/use-toast';
import { Toaster } from 'app/components/ui/toaster';
const ResetPassword: React.FC = () => {
    const email = localStorage.getItem('email')
    console.log("email", email)
    const { toast } = useToast();
    const form = useForm();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        formState: { errors },
    } = form;
    const { useResetPassWordApiMutation } = useLoginSlice();
    const [
        resetPassword,
        {
            isLoading: isResetPassword,
            isSuccess: isResetPasswordSuccess,
            data,
            error: sendResetPasswordError,
        },
    ] = useResetPassWordApiMutation();

    const onSubmit = (data: any) => {
        console.log(data);
        let payload = {
            ...data
        }
        payload.email = email;
        resetPassword(payload);
    };
    useEffect(() => {
        if (isResetPasswordSuccess) {
            toast({
                description: `Password changes successfully`,
            })
            setTimeout(() => {
                navigate('/login')
            }, 1000)
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
                                    Reset Password
                                </h1>
                            </div>
                        </div>
                        <div className="mt-10">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label
                                    htmlFor="password"
                                    className="text-base font-medium font-poppins"
                                >
                                    Password
                                </label>
                                <input
                                    className="h-[50px] border w-full rounded-10 p-6 mt-4"
                                    id="password"
                                    placeholder="Password"
                                    // minLength={8}
                                    // maxLength={8}
                                    type="password"
                                    autoCapitalize="none"
                                    autoComplete="password"
                                    autoCorrect="off"
                                    // disabled={isSendingOTP}
                                    {...form.register('password', {
                                        required: true,
                                        // pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                    })}
                                />
                                {errors.password && <span className='text-red-600'>Password is required</span>}
                                <div>
                                    <Button variant="blueBtn" disabled={isResetPassword}
                                        type='submit' className="w-full mt-10">

                                        {isResetPassword && (
                                            <Icons.Spinner className="mr-4 h-4 w-4 animate-spin" />
                                        )} Reset Password
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

export default ResetPassword;