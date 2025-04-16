import React from 'react';
import { Button } from '../ui/button';
import { Calls } from './call';
import { useGlobalSlice } from 'app/slice';
import { Toaster } from 'app/components/ui/toaster';
import { useToast } from 'app/components/ui/use-toast';
import { useLeadSlice } from 'app/pages/User/AddContacts/slice';
import { useDispatch, useSelector } from 'react-redux';
import { formatPhoneNumbers } from 'utils/formatePhoneNumber';
import { imageUrl } from 'utils/settingConfig';
import { selectNewNotifications, selectUser } from 'app/slice/selectors';
import NotificationsSocket from 'utils/notificationsSocket';

export function LeadAcceptReject() {
  const { useAccepetRejectLeadMutation } = useGlobalSlice();
  const { actions } = useLeadSlice();
  const { actions: globalActions, useLazyPollingQuery } = useGlobalSlice();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [callTriggered, setCallTriggered] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [leadData, setLeadData] = React.useState();

  const user = useSelector(selectUser);

  const [
    getPolling,
    {
      isLoading: isPollingLoading,
      isSuccess: isPollingSuccess,
      data: isPollingData,
      error: isPollingError,
    },
  ] = useLazyPollingQuery({ pollingInterval: 5000 });

  React.useEffect(() => {
    if (user) {
      // getPolling('');
    }
  }, [user]);

  const accept = value => {
    debugger;
    let payload = {
      leadId: isPollingData?.data?._id,
      type: value,
    };
    acceptRejectLead(payload);
  };

  const resetCallTrigger = () => {
    setCallTriggered(false);
  };
  const [
    acceptRejectLead,
    {
      isLoading: isAcceptLeadLoading,
      isSuccess: isAcceptLeadSuccess,
      data: isAcceptLeadData,
      error: isAcceptLeadError,
    },
  ] = useAccepetRejectLeadMutation({});
  React.useEffect(() => {
    if (isAcceptLeadData?.data?.clientStatuses) {
      // debugger;
      dispatch(actions.setEdit({ data: isAcceptLeadData?.data }));
      setCallTriggered(true);
      dispatch(
        globalActions.setCalling({
          status: 'dialing',
          contact: {
            phone: isAcceptLeadData?.data?.phone,
            fullName: isAcceptLeadData?.data?.fullName,
            avatar: isAcceptLeadData?.data?.avatar,
          },
        }),
      );

      setOpen(false);
      setLeadData(isAcceptLeadData?.data);
    }
  }, [isAcceptLeadSuccess]);

  React.useEffect(() => {
    // if (isPollingData?.data?.isNewLead) {
    //   setOpen(true);
    // } else {
    //   setOpen(false);
    // }
  }, [isPollingData]);
  React.useEffect(() => {
    if (isAcceptLeadError) {
      toast({
        description: `${isAcceptLeadError?.[0]}`,
      });
    }
  }, [isAcceptLeadError]);
  /// new Lead notification////
  // NotificationsSocket('66853c66c7820f5164c734c4');

  const isNewNotifications = useSelector(selectNewNotifications)
  React.useEffect(() => {
    // dispatch(
    //   globalActions.setNewNotifications({
    //     isNewLead: true,
    //   }),
    // );
  }, [isNewNotifications?.isNewLead]);
  return (
    <>
      {/* <Calls
                leadData={leadData}
                callTriggered={callTriggered}
                resetCallTrigger={resetCallTrigger}
            /> */}
      {open ? (
        <div className="rounded-40 z-[99] p-12 backdrop-blur-[1.25rem] bg-[#0000000a] w-[33.1rem] fixed left-12 bottom-12">
          <div className=" flex justify-center">
            {' '}
            <img
              className="aspect-square w-[5.4rem] h-[5.4rem] rounded-full"
              alt="Avatar"
              src={
                isPollingData?.data?.avatar
                  ? imageUrl + isPollingData?.data?.avatar
                  : '/images/avtar.svg'
              }
            />
          </div>

          <div className="text-center text-[2.2rem] mt-5  font-poppins font-semibold text-black  leading-0">
            {isPollingData?.data?.fullName}
          </div>
          <div className="text-center text-base mt-5  font-poppins font-normal text-[#7C7E80]">
            {' '}
            {formatPhoneNumbers(isPollingData?.data?.phone)}
          </div>

          <div className="mt-16">
            <Button
              onClick={() => accept('reject')}
              variant="redBtn"
              type="button"
              className="px-8 rounded-full"
            >
              <span className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M16.067 15.6827C16.1251 15.7407 16.1712 15.8097 16.2026 15.8855C16.234 15.9614 16.2502 16.0427 16.2502 16.1249C16.2502 16.207 16.234 16.2883 16.2026 16.3642C16.1712 16.44 16.1251 16.509 16.067 16.567C16.009 16.6251 15.94 16.6712 15.8642 16.7026C15.7883 16.734 15.707 16.7502 15.6249 16.7502C15.5427 16.7502 15.4614 16.734 15.3855 16.7026C15.3097 16.6712 15.2407 16.6251 15.1827 16.567L9.99986 11.3835L4.81705 16.567C4.69977 16.6843 4.54071 16.7502 4.37486 16.7502C4.20901 16.7502 4.04995 16.6843 3.93267 16.567C3.8154 16.4498 3.74951 16.2907 3.74951 16.1249C3.74951 15.959 3.8154 15.7999 3.93267 15.6827L9.11626 10.4999L3.93267 5.31705C3.8154 5.19977 3.74951 5.04071 3.74951 4.87486C3.74951 4.70901 3.8154 4.54995 3.93267 4.43267C4.04995 4.3154 4.20901 4.24951 4.37486 4.24951C4.54071 4.24951 4.69977 4.3154 4.81705 4.43267L9.99986 9.61626L15.1827 4.43267C15.2999 4.3154 15.459 4.24951 15.6249 4.24951C15.7907 4.24951 15.9498 4.3154 16.067 4.43267C16.1843 4.54995 16.2502 4.70901 16.2502 4.87486C16.2502 5.04071 16.1843 5.19977 16.067 5.31705L10.8835 10.4999L16.067 15.6827Z"
                    fill="white"
                  />
                </svg>
              </span>
              Decline{' '}
            </Button>
            <Button
              onClick={() => accept('accept')}
              variant="greenBtn"
              type="button"
              className="px-8 rounded-full ml-4"
            >
              <span className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M18.1156 14.178C17.9763 15.2366 17.4564 16.2083 16.6531 16.9116C15.8497 17.6149 14.8177 18.0018 13.75 17.9998C7.54688 17.9998 2.50001 12.953 2.50001 6.74984C2.49809 5.6821 2.88492 4.65017 3.58824 3.84679C4.29155 3.04341 5.26326 2.52352 6.32188 2.38422C6.58958 2.35153 6.86067 2.4063 7.09468 2.54034C7.3287 2.67438 7.51309 2.88052 7.62032 3.12797L9.27032 6.81156V6.82094C9.35242 7.01035 9.38633 7.21715 9.36901 7.42287C9.3517 7.62859 9.2837 7.82681 9.1711 7.99984C9.15704 8.02094 9.14219 8.04047 9.12657 8.06L7.50001 9.98812C8.08516 11.1772 9.32891 12.41 10.5336 12.9967L12.4352 11.3787C12.4538 11.3631 12.4734 11.3484 12.4938 11.335C12.6666 11.2197 12.8655 11.1493 13.0725 11.1302C13.2794 11.1111 13.4878 11.1439 13.6789 11.2256L13.6891 11.2303L17.3695 12.8795C17.6174 12.9864 17.8241 13.1706 17.9585 13.4047C18.093 13.6387 18.1481 13.91 18.1156 14.178Z"
                    fill="white"
                  />
                </svg>
              </span>
              Accept{' '}
            </Button>
          </div>
        </div>
      ) : null}
      <Toaster />
    </>
  );
}
