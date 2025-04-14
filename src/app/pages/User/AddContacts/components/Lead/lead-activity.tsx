import React from 'react';
import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from 'app/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from 'app/components/ui/card';

export function Leadactivity() {
    return (
        <>
            <TabsContent value="Activity">
                <div className=" rounded-24 bg-white py-10 px-10">
                    <div className="mt-8">
                        <div className="text-[#101828] text-xs font-medium font-poppins">
                            Thursday, March 21 2024
                        </div>
                        <div className="bg-[#F9FAFB] p-6 rounded-[1.2rem] mt-6">
                            <div className="grid sm:grid-cols-12">
                                <div className="col-span-5">
                                    <div className="flex items-center">
                                        <div className="bg-[#E6E6FF] p-6 rounded-full w-fit">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="21"
                                                viewBox="0 0 20 21"
                                                fill="none"
                                            >
                                                <path
                                                    d="M17.5 7.16667V3M17.5 3H13.3333M17.5 3L12.5 8M8.52253 12.0526C7.52121 11.0512 6.73055 9.91904 6.15056 8.71102C6.10067 8.60712 6.07572 8.55516 6.05656 8.48942C5.98846 8.25579 6.03737 7.96891 6.17905 7.77105C6.21892 7.71537 6.26655 7.66774 6.36181 7.57248C6.65315 7.28115 6.79881 7.13548 6.89405 6.98899C7.25322 6.43659 7.25321 5.72443 6.89405 5.17203C6.79881 5.02554 6.65315 4.87988 6.36181 4.58854L6.19942 4.42615C5.75655 3.98328 5.53511 3.76184 5.2973 3.64156C4.82433 3.40233 4.26577 3.40233 3.79281 3.64156C3.55499 3.76184 3.33355 3.98328 2.89069 4.42615L2.75932 4.55751C2.31797 4.99886 2.09729 5.21954 1.92875 5.51956C1.74174 5.85249 1.60727 6.36956 1.60841 6.75141C1.60943 7.09554 1.67618 7.33072 1.80969 7.80109C2.52716 10.3289 3.88089 12.7142 5.87088 14.7042C7.86086 16.6942 10.2462 18.0479 12.774 18.7654C13.2444 18.8989 13.4795 18.9657 13.8237 18.9667C14.2055 18.9678 14.7226 18.8333 15.0555 18.6463C15.3555 18.4778 15.5762 18.2571 16.0176 17.8158L16.1489 17.6844C16.5918 17.2415 16.8132 17.0201 16.9335 16.7823C17.1728 16.3093 17.1728 15.7508 16.9335 15.2778C16.8132 15.04 16.5918 14.8185 16.1489 14.3757L15.9865 14.2133C15.6952 13.9219 15.5495 13.7763 15.4031 13.681C14.8506 13.3219 14.1385 13.3219 13.5861 13.681C13.4396 13.7763 13.2939 13.9219 13.0026 14.2133C12.9073 14.3085 12.8597 14.3562 12.804 14.396C12.6062 14.5377 12.3193 14.5866 12.0857 14.5185C12.0199 14.4994 11.968 14.4744 11.8641 14.4245C10.656 13.8445 9.52384 13.0539 8.52253 12.0526Z"
                                                    stroke="#0000FF"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className=" text-[#667085] text-base font-poppins ml-12">
                                            Activity
                                            <span className="block text-[#101828] text-base font-medium mt-4 font-poppins">
                                                Call
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-7">
                                    <div className="flex justify-between">
                                        <div className="">
                                            <p className="text-[#667085] font-normal font-poppins text-base">
                                                Completed by
                                            </p>
                                            <h2 className="flex items-center mt-4">
                                                <div>
                                                    <img
                                                        src="/images/avtar.svg"
                                                        className="rounded-full w-[2.4rem] h-[2.4rem]"
                                                    />
                                                </div>
                                                <span className="text-[#101828]  font-poppins font-medium text-base ml-4">
                                                    Blake Bianchi
                                                </span>
                                            </h2>
                                        </div>
                                        <div className="">
                                            <p className="text-[#667085] font-normal font-poppins text-base">
                                                Completed on
                                            </p>
                                            <h2 className="flex items-center mt-6">
                                                <span className="text-[#101828]  font-poppins font-medium text-base">
                                                    21/03/2024 9:00 AM
                                                </span>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="text-[#101828] text-xs font-medium font-poppins">
                            Friday, March 22 2024
                        </div>
                        <div className="bg-[#F9FAFB] p-6 rounded-[1.2rem] mt-6">
                            <div className="grid sm:grid-cols-12">
                                <div className="col-span-5">
                                    <div className="flex items-center">
                                        <div className="bg-[#E6E6FF] p-6 rounded-full w-fit">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="21"
                                                viewBox="0 0 20 21"
                                                fill="none"
                                            >
                                                <path
                                                    d="M10.0003 6.33366H6.25033C5.69779 6.33366 5.16789 6.11417 4.77719 5.72346C4.38649 5.33276 4.16699 4.80286 4.16699 4.25033C4.16699 3.69779 4.38649 3.16789 4.77719 2.77719C5.16789 2.38649 5.69779 2.16699 6.25033 2.16699C9.16699 2.16699 10.0003 6.33366 10.0003 6.33366ZM10.0003 6.33366H13.7503C14.3029 6.33366 14.8328 6.11417 15.2235 5.72346C15.6142 5.33276 15.8337 4.80286 15.8337 4.25033C15.8337 3.69779 15.6142 3.16789 15.2235 2.77719C14.8328 2.38649 14.3029 2.16699 13.7503 2.16699C10.8337 2.16699 10.0003 6.33366 10.0003 6.33366ZM10.0003 6.33366L10.0003 18.8337M1.66699 12.167H18.3337M1.66699 9.00033L1.66699 16.167C1.66699 17.1004 1.66699 17.5671 1.84865 17.9236C2.00844 18.2372 2.2634 18.4922 2.57701 18.652C2.93353 18.8337 3.40024 18.8337 4.33366 18.8337L15.667 18.8337C16.6004 18.8337 17.0671 18.8337 17.4236 18.652C17.7372 18.4922 17.9922 18.2372 18.152 17.9236C18.3337 17.5671 18.3337 17.1004 18.3337 16.167V9.00033C18.3337 8.06691 18.3337 7.6002 18.152 7.24368C17.9922 6.93007 17.7372 6.67511 17.4236 6.51532C17.0671 6.33366 16.6004 6.33366 15.667 6.33366L4.33366 6.33366C3.40024 6.33366 2.93353 6.33366 2.57701 6.51531C2.2634 6.6751 2.00844 6.93007 1.84865 7.24367C1.66699 7.60019 1.66699 8.0669 1.66699 9.00033Z"
                                                    stroke="#0000FF"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className=" text-[#667085] text-base font-poppins ml-4">
                                            Activity
                                            <span className="block text-[#101828] text-base font-medium mt-4 font-poppins">
                                                Campaign Started
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-7">
                                    <div className="flex justify-between">
                                        <div className="">
                                            <p className="text-[#667085] font-normal font-poppins text-base">
                                                Completed by
                                            </p>
                                            <h2 className="flex items-center mt-4">
                                                <div>
                                                    <img
                                                        src="/images/avtar.svg"
                                                        className="rounded-full w-[2.4rem] h-[2.4rem]"
                                                    />
                                                </div>
                                                <span className="text-[#101828]  font-poppins font-medium text-base ml-4">
                                                    Blake Bianchi
                                                </span>
                                            </h2>
                                        </div>
                                        <div className="">
                                            <p className="text-[#667085] font-normal font-poppins text-base">
                                                Completed on
                                            </p>
                                            <h2 className="flex items-center mt-6">
                                                <span className="text-[#101828]  font-poppins font-medium text-base">
                                                    21/03/2024 9:00 AM
                                                </span>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="text-[#101828] text-xs font-medium font-poppins">
                            Saturday, March 23 2024
                        </div>
                        <div className="bg-[#F9FAFB] p-6 rounded-[1.2rem] mt-6">
                            <div className="grid sm:grid-cols-12">
                                <div className="col-span-5">
                                    <div className="flex items-center">
                                        <div className="bg-[#E6E6FF] p-6 rounded-full w-fit">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="21"
                                                viewBox="0 0 20 21"
                                                fill="none"
                                            >
                                                <path
                                                    d="M9.40253 3.3778C9.59461 2.98869 9.69064 2.79413 9.82102 2.73197C9.93445 2.67789 10.0662 2.67789 10.1797 2.73197C10.31 2.79413 10.4061 2.98869 10.5981 3.3778L12.4204 7.06944C12.4771 7.18432 12.5054 7.24176 12.5469 7.28635C12.5836 7.32584 12.6276 7.35783 12.6764 7.38056C12.7316 7.40623 12.795 7.41549 12.9218 7.43402L16.9978 8.0298C17.427 8.09253 17.6417 8.1239 17.741 8.22874C17.8274 8.31995 17.868 8.44529 17.8516 8.56985C17.8327 8.71302 17.6773 8.86436 17.3666 9.16702L14.4182 12.0387C14.3263 12.1282 14.2803 12.173 14.2507 12.2263C14.2244 12.2734 14.2076 12.3252 14.2011 12.3788C14.1937 12.4393 14.2046 12.5025 14.2263 12.629L14.922 16.6851C14.9953 17.1129 15.032 17.3269 14.9631 17.4538C14.9031 17.5642 14.7965 17.6417 14.6729 17.6646C14.5308 17.6909 14.3388 17.5899 13.9546 17.3879L10.3106 15.4716C10.1971 15.4119 10.1403 15.382 10.0805 15.3703C10.0276 15.3599 9.97311 15.3599 9.92015 15.3703C9.86034 15.382 9.80358 15.4119 9.69004 15.4716L6.0461 17.3879C5.66192 17.5899 5.46984 17.6909 5.3278 17.6646C5.20423 17.6417 5.09759 17.5642 5.03761 17.4538C4.96866 17.3269 5.00535 17.1129 5.07872 16.6851L5.7744 12.629C5.79609 12.5025 5.80693 12.4393 5.79959 12.3788C5.7931 12.3252 5.77625 12.2734 5.75 12.2263C5.72034 12.173 5.67439 12.1282 5.58248 12.0387L2.63413 9.16702C2.32338 8.86436 2.168 8.71302 2.1491 8.56985C2.13265 8.44529 2.17329 8.31995 2.2597 8.22874C2.35902 8.1239 2.57363 8.09253 3.00286 8.0298L7.07892 7.43402C7.20568 7.41549 7.26906 7.40623 7.32426 7.38056C7.37313 7.35783 7.41713 7.32584 7.45381 7.28635C7.49525 7.24176 7.5236 7.18432 7.5803 7.06944L9.40253 3.3778Z"
                                                    stroke="#0000FF"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className=" text-[#667085] text-base font-poppins ml-4">
                                            Activity
                                            <span className="block text-[#101828] text-base font-medium mt-4 font-poppins">
                                                Rate Alret Sent
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-7">
                                    <div className="flex justify-between">
                                        <div className="">
                                            <p className="text-[#667085] font-normal font-poppins text-base">
                                                Completed by
                                            </p>
                                            <h2 className="flex items-center mt-4">
                                                <div>
                                                    <img
                                                        src="/images/avtar.svg"
                                                        className="rounded-full w-[2.4rem] h-[2.4rem]"
                                                    />
                                                </div>
                                                <span className="text-[#101828]  font-poppins font-medium text-base ml-4">
                                                    Blake Bianchi
                                                </span>
                                            </h2>
                                        </div>
                                        <div className="">
                                            <p className="text-[#667085] font-normal font-poppins text-base">
                                                Completed on
                                            </p>
                                            <h2 className="flex items-center mt-6">
                                                <span className="text-[#101828]  font-poppins font-medium text-base">
                                                    21/03/2024 9:00 AM
                                                </span>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16">
                        <Button
                            variant="blueBtn"
                            type="button"
                            className="px-6 h-[4.7rem] w-full  rounded-full"
                        >
                            Log Activity
                        </Button>
                    </div>
                </div>
            </TabsContent>
        </>
    );
}
