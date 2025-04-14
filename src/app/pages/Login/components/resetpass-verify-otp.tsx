import { Button } from 'app/components/ui/button';
import { Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from 'app/components/ui/input-otp';
import { useLoginSlice } from '../slice';
import { useToast } from 'app/components/ui/use-toast';
import { Toaster } from 'app/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import { Icons } from 'app/components/ui/icons';

const ResetPassVerifyOtp: React.FC = () => {
    const email = localStorage.getItem('email');
    const [seconds, setSeconds] = useState(0);
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
    const {
        useResetVerifyOtpMutation,
        useResetPassOtpCallMutation,
        useResetPasswordMutation,
    } = useLoginSlice();

    const [
        resetVerifyOtp,
        {
            isLoading: isResetVerifyOtp,
            isSuccess: isResetVerifyOtpSuccess,
            data,
            error: ResetVerifyOtpError,
        },
    ] = useResetVerifyOtpMutation();
    ////// CALL RESEET APDDD OTP ////
    const [
        resetCallOtp,
        {
            isLoading: isResetCallOtp,
            isSuccess: isResetCallOtpSuccess,
            data: otpCallData,
            error: ResetCallOtpError,
        },
    ] = useResetPassOtpCallMutation();
    ///// SEND RESET OTP  ////
    const [
        sendResetOtp,
        {
            isLoading: issendResetOtp,
            isSuccess: issendResetOtpSuccess,
            data: sendResetOtpOtpData,
            error: sendsendResetOtpError,
        },
    ] = useResetPasswordMutation();
    const onSubmit = (data: any) => {
        let payload = {
            ...data,
        };
        payload.email = email;
        resetVerifyOtp(payload);
        console.log(payload);
        // Handle form submission here
    };
    /// error handling verify otp ///
    useEffect(() => {
        if (ResetVerifyOtpError) {
            console.log(ResetVerifyOtpError);
            toast({
                description: `${ResetVerifyOtpError?.[0]}`,
            });
            console.log(ResetVerifyOtpError);
        }
        if (isResetVerifyOtpSuccess) {
            navigate('/reset-password');
        }
    }, [ResetVerifyOtpError, isResetVerifyOtpSuccess]);

    const sendOtpCall = () => {
        resetCallOtp({ email: email });
    };
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevCount => prevCount - 1);
        }, 1000);
        if (seconds == 0) {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [seconds]);

    return (
        <>
            <div className="bg-bgColor">
                <div className="container relative hidden h-[100vh] flex-col items-center pt-5 md:flex md:flex-col ">
                    <div className="flex flex-col items-center justify-start mt-32">
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

                        <div className="text-center">
                            <h1 className=" text-md text-primary">
                                All set! Keep your information safe
                            </h1>
                            <p className="text-secondary mt-4">
                                Enter the code we sent, check your email.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid my-10">
                                <InputOTP
                                    maxLength={4}
                                    onChange={value => form.setValue('resetPasswordOtp', value)}
                                >
                                    {[0, 1, 2, 3].map(index => (
                                        <InputOTPGroup key={index}>
                                            <InputOTPSlot
                                                className="h-[8rem] w-[8rem] text-48"
                                                index={index}
                                            />
                                        </InputOTPGroup>
                                    ))}
                                </InputOTP>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                variant="blueBtn"
                                disabled={isResetVerifyOtp}
                            >
                                {isResetVerifyOtp && (
                                    <Icons.Spinner className="mr-4 h-4 w-4 animate-spin" />
                                )}
                                Verify
                            </Button>
                        </form>
                        <div className="text-center text-base mt-8">
                            <div className="text-secondary ">
                                Didn’t get your code?{' '}
                                <a
                                    onClick={() =>
                                        sendResetOtp({
                                            email: email,
                                        })
                                    }
                                    className="text-blue font-medium ml-1 cursor-pointer"
                                >
                                    Send a new code
                                </a>
                            </div>
                        </div>
                        {seconds ? (
                            <div className="flex justify-center border cursor-pointer rounded-32  py-2 px-8 text-base items-center mx-auto w-fit mt-16">
                                <span className="mr-3">
                                    <Phone width={16} />
                                </span>{' '}
                                Call me with a code instead after {seconds} sec
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    sendOtpCall();
                                    setSeconds(30);
                                }}
                                className="flex justify-center border cursor-pointer rounded-32 py-2 px-8 text-base items-center mx-auto w-fit mt-16"
                            >
                                <span className="mr-3">
                                    {' '}
                                    <Phone width={16} />
                                </span>
                                Call me with a code instead
                            </div>
                        )}

                        <Toaster />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassVerifyOtp;
