import { Icons } from 'app/components/ui/icons';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'app/components/ui/tabs';
import { useGlobalSlice } from 'app/slice';
import { selectUser } from 'app/slice/selectors';
import { use } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface Notification {
  _id: string;
  title: string;
  createdAt: string;
  isRead: boolean;
  notificationType: number;
}
const Notifications = ({ notificationsData, isLoading },) => {
  const user = useSelector(selectUser);
  const [generalNotifications, setGeneralNotifications] = useState<
    Notification[]
  >([]);
  const [companyNotifications, setCompanyNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('general');
  const handleTabChange = value => {
    setActiveTab(value);
  };
  const { useGetNotificationsQuery, useUpdateNotificationMutation } =
    useGlobalSlice();
  const [
    updateNotification,
    {
      isLoading: updateNotificationLoading,
      isSuccess: updateNotificationSuccess,
      data: updateNotificationData,
      error: updateNotificationError,
    },
  ] = useUpdateNotificationMutation();

  function timeAgo(dateString: any) {
    const date = new Date(dateString);
    const now = new Date();
    let diff
    if (isNaN(date.getTime())) {
      console.error("Invalid date string:", dateString);
    } else {
      diff = now.getTime() - date.getTime();
      console.log("Difference in milliseconds:", diff);
    }

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
      return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
    }
  }

  const updateNotificationById = notificationId => {
    const body = {
      notificationId: notificationId,
      isNotified: true,
      isRead: true,
    };
    updateNotification(body);
  };
  useEffect(() => {
    if (notificationsData) {
      setGeneralNotifications(notificationsData?.data?.documents);
    }
  }, [notificationsData]);

  return (
    <React.Fragment>
      <div className="bg-white w-[31.4rem] rounded-[1.6rem] border-none h-[43.9rem]">
        {/* notifications navbar */}
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-[1.2rem] font-medium text-[#01050C]">
            Notifications
          </p>
          <p className="text-[1.2rem] text-[#01050C] font-normal cursor-pointer">
            Mark All as Read
          </p>
        </div>
        <div className="mt-5">
          <Tabs
            className="px-0"
            defaultValue="general"
            onValueChange={handleTabChange}
          >
            <TabsList className="flex items-center justify-start px-0 border-b border-b-[#F3F3F3] pl-8">
              <TabsTrigger value="general" className="px-0">
                <div
                  className={
                    activeTab === 'general'
                      ? ' pb-2 min-w-[12rem] active-notification flex items-center justify-start space-x-6'
                      : ' min-w-[12rem] pb-2 text-gray-400 flex items-center justify-start space-x-6'
                  }
                >
                  <p className="text-[1.2rem] text-[#00F] font-poppins">
                    General
                  </p>
                  <p
                    className={`p-2 min-h-[30px] min-w-[30px] rounded-full ${activeTab === 'general'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-200 text-gray-500'
                      }`}
                  >
                    {generalNotifications?.length}
                  </p>
                </div>
              </TabsTrigger>
              <TabsTrigger value="company">
                <div
                  className={
                    activeTab === 'company'
                      ? 'min-w-[12rem] pb-2 px-0 text-gray-400 active-notification flex items-center justify-start space-x-6'
                      : 'min-w-[12rem] pb-2 px-0 text-gray-400 flex items-center justify-start space-x-6'
                  }
                >
                  <p className="text-[1.2rem] text-[#7C7E80] font-poppins">
                    Company
                  </p>
                  <p
                    className={`min-h-[1.9rem] min-w-[1.9rem] leading-[1.9rem] rounded-full ${activeTab === 'company'
                      ? 'bg-blue-100 text-blue-700 text-[1.2rem]'
                      : 'bg-gray-200 text-gray-400'
                      }`}
                  >
                    0
                  </p>
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div
                id="notifications"
                className="h-[320px] overflow-y-scroll py-2"
              >
                {generalNotifications.length === 0 ? (
                  <div className="h-[259px] w-full flex flex-col space-y-4 items-center justify-center">
                    {isLoading && (
                      <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <rect width="48" height="48" rx="6" fill="#0000FF" />
                      <path
                        d="M21.354 33C22.0591 33.6224 22.9853 34 23.9998 34C25.0142 34 25.9405 33.6224 26.6456 33M29.9998 20C29.9998 18.4087 29.3676 16.8826 28.2424 15.7574C27.1172 14.6321 25.5911 14 23.9998 14C22.4085 14 20.8824 14.6321 19.7571 15.7574C18.6319 16.8826 17.9998 18.4087 17.9998 20C17.9998 23.0902 17.2202 25.206 16.3494 26.6054C15.6149 27.7859 15.2476 28.3761 15.2611 28.5408C15.276 28.7231 15.3146 28.7926 15.4616 28.9016C15.5942 29 16.1924 29 17.3886 29H30.6109C31.8072 29 32.4053 29 32.538 28.9016C32.6849 28.7926 32.7235 28.7231 32.7384 28.5408C32.7519 28.3761 32.3846 27.7859 31.6501 26.6054C30.7793 25.206 29.9998 23.0902 29.9998 20Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p className="text-[#01050C] font-medium text-[1.5rem]">
                      No Notifications Yet
                    </p>
                    <p className="text-gray-600 font-semibold-text-xs text-center w-[70%]">
                      When you get notifications, they will show up here for you
                    </p>
                  </div>
                ) : (
                  generalNotifications?.map(eachNotification => (
                    <div
                      onClick={() =>
                        updateNotificationById(eachNotification?._id)
                      }
                      className="py-[1rem] px-[2rem] hover:bg-[#EDF0F5] cursor-pointer border-b border-b-[#F3F3F3]"
                      key={eachNotification?._id}
                    >
                      <div className="flex items-center ">
                        <div className="mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M7 0.5C5.71442 0.5 4.45772 0.881218 3.3888 1.59545C2.31988 2.30968 1.48676 3.32484 0.994786 4.51256C0.502816 5.70028 0.374095 7.00721 0.624899 8.26809C0.875703 9.52896 1.49477 10.6872 2.40381 11.5962C3.31285 12.5052 4.47104 13.1243 5.73192 13.3751C6.99279 13.6259 8.29973 13.4972 9.48744 13.0052C10.6752 12.5132 11.6903 11.6801 12.4046 10.6112C13.1188 9.54229 13.5 8.28558 13.5 7C13.4982 5.27665 12.8128 3.62441 11.5942 2.40582C10.3756 1.18722 8.72335 0.50182 7 0.5ZM6.75 3.5C6.89834 3.5 7.04334 3.54399 7.16668 3.6264C7.29002 3.70881 7.38615 3.82594 7.44291 3.96299C7.49968 4.10003 7.51453 4.25083 7.48559 4.39632C7.45665 4.5418 7.38522 4.67544 7.28033 4.78033C7.17544 4.88522 7.04181 4.95665 6.89632 4.98559C6.75083 5.01453 6.60003 4.99968 6.46299 4.94291C6.32595 4.88614 6.20881 4.79001 6.1264 4.66668C6.04399 4.54334 6 4.39834 6 4.25C6 4.05109 6.07902 3.86032 6.21967 3.71967C6.36032 3.57902 6.55109 3.5 6.75 3.5ZM7.5 10.5C7.23479 10.5 6.98043 10.3946 6.7929 10.2071C6.60536 10.0196 6.5 9.76522 6.5 9.5V7C6.36739 7 6.24022 6.94732 6.14645 6.85355C6.05268 6.75979 6 6.63261 6 6.5C6 6.36739 6.05268 6.24021 6.14645 6.14645C6.24022 6.05268 6.36739 6 6.5 6C6.76522 6 7.01957 6.10536 7.20711 6.29289C7.39465 6.48043 7.5 6.73478 7.5 7V9.5C7.63261 9.5 7.75979 9.55268 7.85356 9.64645C7.94732 9.74021 8 9.86739 8 10C8 10.1326 7.94732 10.2598 7.85356 10.3536C7.75979 10.4473 7.63261 10.5 7.5 10.5Z"
                              fill="#3957FA"
                            />
                          </svg>
                        </div>
                        <p className="text-[#7C7E80] text-[1.2rem] font-poppins font-normal">
                          {eachNotification?.notificationType === 4 &&
                            'Reminder'}
                        </p>
                        <p className="text-[#7C7E80] text-[1.2rem] space-x-2 font-poppins font-normal">
                          ·
                        </p>
                        <p className="text-[#7C7E80] text-[1.2rem] font-poppins font-normal">
                          {timeAgo(eachNotification?.createdAt)}
                        </p>
                      </div>
                      <div className="text-[#01050C] font-poppins text-[1.2rem] font-normal mt-2">
                        {eachNotification?.title}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="company">
              {companyNotifications?.length === 0 ? (
                <div className="h-[259px] w-full flex flex-col space-y-4 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <rect width="48" height="48" rx="6" fill="#0000FF" />
                    <path
                      d="M21.354 33C22.0591 33.6224 22.9853 34 23.9998 34C25.0142 34 25.9405 33.6224 26.6456 33M29.9998 20C29.9998 18.4087 29.3676 16.8826 28.2424 15.7574C27.1172 14.6321 25.5911 14 23.9998 14C22.4085 14 20.8824 14.6321 19.7571 15.7574C18.6319 16.8826 17.9998 18.4087 17.9998 20C17.9998 23.0902 17.2202 25.206 16.3494 26.6054C15.6149 27.7859 15.2476 28.3761 15.2611 28.5408C15.276 28.7231 15.3146 28.7926 15.4616 28.9016C15.5942 29 16.1924 29 17.3886 29H30.6109C31.8072 29 32.4053 29 32.538 28.9016C32.6849 28.7926 32.7235 28.7231 32.7384 28.5408C32.7519 28.3761 32.3846 27.7859 31.6501 26.6054C30.7793 25.206 29.9998 23.0902 29.9998 20Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="text-[#01050C] font-medium text-[1.5rem]">
                    No Notifications Yet
                  </p>
                  <p className=" text-center w-[70%]  text-[#01050C] font-normal text-[1.2rem] font-poppins">
                    When you get notifications, they will show up here for you
                  </p>
                </div>
              ) : null}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notifications;
