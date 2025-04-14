import React, { memo, useEffect } from 'react';
import { LazyLoadImage as Image } from 'react-lazy-load-image-component';
import { LoginForm } from './components/login-form';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/slice/selectors';
import { useNavigate } from 'react-router-dom';
import NotificationsSocket from 'utils/notificationsSocket';

interface Props { }

export const Login = memo((props: Props) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user?.role == 'Admin' || user?.role == 'admin') {
        navigate('/admin/settings');
      } else {
        navigate('/user/dasboard');
      }
    }
  }, [user, navigate]);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="bg-bgColor">
        <div className="container relative hidden h-[100vh] flex-col items-center pt-5 md:flex md:flex-col ">
          <div className="flex flex-col items-center justify-start mt-10">
            <div className="pb-10 mb-10">
              <h1 className="mx-auto">
                <Image
                  src="/images/logo.svg"
                  width={100}
                  height={25}
                  alt="Authentication"
                />
              </h1>
            </div>
            <div className="mx-auto flex w-full mt-10 flex-col sm:w-[350px] md:w-[400px]">
              <div className="flex flex-col text-center">
                <div className="mt-10">
                  <h1 className="md:text-[60px] text-black font-juana font-medium ">
                    Welcome
                  </h1>
                  <h5 className="text-[14px] text-gray-500 font-semibold">
                    Please Sign In
                  </h5>
                </div>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
