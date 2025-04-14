import React, { memo, useEffect, useState } from 'react';
import { cn } from 'utils/twm';
import { Icons } from 'app/components/ui/icons';
import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import { Label } from 'app/components/ui/label';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useLoginSlice } from '../slice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGlobalSlice } from 'app/slice';
import { useDispatch } from 'react-redux';
import { Phone } from 'lucide-react';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from 'app/components/ui/input-otp';
import { toast } from 'app/components/ui/use-toast';
interface Props {
  className?: string;
}

export const LoginForm = memo((props: Props) => {
  const form = useForm();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const navigate = useNavigate();
  const { actions: globalActions } = useGlobalSlice();
  const dispatch = useDispatch();
  const { useSendOtpMutation, useVerifyOtpMutation, useOtpCallMutation } =
    useLoginSlice();
  const [
    sendOtp,
    {
      isLoading: isSendingOTP,
      isSuccess: isSendingOtpSuccess,
      data,
      error: sendOtpError,
    },
  ] = useSendOtpMutation();

  const [
    otpCall,
    {
      isLoading: isOtpCall,
      isSuccess: otpCallSuccess,
      data: otpCallData,
      error: isSendOtpError,
    },
  ] = useOtpCallMutation();

  const sendOtpCall = () => {
    otpCall({ email: form.getValues('email') });
  };

  useEffect(() => {
    if (isSendingOtpSuccess) {
      console.log('otp', data?.data);
      // alert(data?.data);
      setIsOtpVisible(true);
    }
    // if (data?.otpCallSuccess) {
    //   // alert(data?.otpCallSuccess);
    // }
  }, [data]);

  const [
    verifyOtp,
    {
      data: verifyOtpData,
      isLoading: isVerifyingOTP,
      isSuccess: isVerifyingOtpSuccess,
      error: verifyOtpError,
    },
  ] = useVerifyOtpMutation();

  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otpValidation, setOtpValidation] = useState({});

  useEffect(() => {
    if (isSendingOtpSuccess) {
      const email = form.getValues('email');
      if (email.indexOf('nootp.') !== -1) {
        setOtpValidation({
          required: true,
          maxLength: 10,
          minLength: 10,
        });
      } else {
        setOtpValidation({
          required: true,
          maxLength: 6,
          minLength: 6,
        });
      }
    }
  }, [isSendingOtpSuccess, form]);

  useEffect(() => {
    if (isVerifyingOtpSuccess) {
      dispatch(globalActions.setUser(verifyOtpData));
      console.log('verifyOtpData', verifyOtpData);
      if (verifyOtpData?.role == 'Admin' || verifyOtpData?.role == 'admin') {
        navigate('/admin/settings');
      } else {
        navigate('/user/dasboard');
      }
    }
  }, [isVerifyingOtpSuccess, navigate]);

  const handleSendingOtp = data => {
    if (form.formState.isValid) {
      sendOtp({
        email: form.getValues('email'),
        password: form.getValues('password'),
        rememberMe: form.getValues('rememberMe'),
      });
    }
  };

  const handleVerifyOtp = () => {
    if (form.formState.isValid) {
      verifyOtp({
        email: form.getValues('email'),
        mfaCode: form.getValues('mfaCode'),
      });
    }
  };

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  const handleChange = (index: number, value: string) => {
    setValue(`mfaCode[${index}]`, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const [seconds, setSeconds] = useState(0);

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
    <div className={cn('grid gap-6', props.className)} {...props}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className="grid gap-5 mt-10">
            {!isOtpVisible && (
              <>
                {(sendOtpError || !form.formState.isValid) && (
                  <div className="text-red-600">
                    {sendOtpError || form.formState.errors?.email?.message}
                  </div>
                )}
                <div className="">
                  <div className="grid">
                    {/* <Label className="font-medium pb-2" htmlFor="email">
                      Email
                    </Label> */}
                    <p className="text-red-600">
                      {form.formState.errors.email?.type === 'required' &&
                        'Required'}
                      {form.formState.errors.email?.type === 'pattern' &&
                        ' Invalid email address'}
                    </p>
                    <Input
                      className="h-[50px] rounded-input-1"
                      id="email"
                      placeholder="Email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isSendingOTP}
                      {...form.register('email', {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      })}
                    />
                  </div>
                  <div className="grid gap-2 ">
                    {/* <Label className="font-medium pb-2" htmlFor="password">
                      Password
                    </Label> */}
                    <Input
                      className="h-[50px] rounded-input-2"
                      id="password"
                      placeholder="Password"
                      type="password"
                      // maxLength={10}
                      minLength={6}
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isSendingOTP}
                      {...form.register('password', {
                        required: true,
                        // pattern:
                        //   /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      })}
                    />
                    <p className="text-red-600">
                      {form.formState.errors.password?.type === 'required' &&
                        'Required'}
                      {/* {form.formState.errors.email?.type === 'pattern' && ' Invalid email address'} */}
                    </p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex flex-row">
                    {/* <div className="flex flex-row">
                      <Input
                        id="rememberMe"
                        type="checkbox"
                        className="w-[1.6rem]"
                        {...form.register('rememberMe', {
                          // required: true,
                        })}
                      />
                      <Label
                        htmlFor="rememberMe"
                        className="my-auto mx-2 text-primary ml-4"
                      >
                        Remember for 30 days
                      </Label>
                    </div> */}

                    <div className="m-auto mr-0">
                      <Link
                        to={'/forgot-password'}
                        className="text-blue text-base font-medium"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
                <Button
                  variant="blueBtn"
                  type="submit"
                  disabled={isSendingOTP}
                  onClick={handleSendingOtp}
                >
                  {isSendingOTP && <Icons.Spinner />}
                  Continue
                </Button>
              </>
            )}

            {isOtpVisible && (
              <>
                {(verifyOtpError || !form.formState.isValid) && (
                  <div className="text-red-600">
                    {verifyOtpError || form.getFieldState('mfaCode').error}
                  </div>
                )}
                <div className="text-center">
                  <h1 className=" text-md text-primary">
                    All set! Keep your information safe
                  </h1>
                  <p className="text-secondary mt-4">
                    Enter the code we sent, check your email.
                  </p>
                </div>

                <div className="grid grid-cols-4 my-8">
                  <InputOTP
                    maxLength={4}
                    onChange={value => form.setValue('mfaCode', value)}
                  >
                    {[0, 1, 2, 3].map(index => (
                      <InputOTPGroup key={index}>
                        <InputOTPSlot
                          className="h-[9rem] w-[9rem] text-48"
                          index={index}
                        />
                      </InputOTPGroup>
                    ))}
                  </InputOTP>
                </div>
                <div className="w-full">
                  <Button
                    type="button"
                    className="w-full"
                    variant="blueBtn"
                    disabled={isVerifyingOTP}
                    onClick={handleVerifyOtp}
                  >
                    {isVerifyingOTP && (
                      <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Verify
                  </Button>
                </div>
                <div className="text-center text-base mt-8">
                  <div className="text-secondary ">
                    Didn’t get your code?{' '}
                    <a
                      onClick={() =>
                        sendOtp({
                          email: form.getValues('email'),
                          password: form.getValues('password'),
                        })
                      }
                      className="text-blue font-medium ml-1 cursor-pointer"
                    >
                      Send a new code
                    </a>
                  </div>
                </div>
                {seconds ? (
                  <span className="flex justify-center  cursor-pointer  py-2 px-8 text-base items-center mx-auto w-fit mt-16">
                    <Phone width={16} /> Call me with a code instead after{' '}
                    {seconds} sec
                  </span>
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
              </>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
});
