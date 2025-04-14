/**
 *
 * Dasboard
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Input } from 'app/components/ui/input';
import { Info, Pencil, Search } from 'lucide-react';
import { Button } from 'app/components/ui/button';
import { DropdownMenuSeparator } from 'app/components/ui/dropdown-menu';
import { Bell, Heart } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'app/components/ui/table';
import { Checkbox } from 'app/components/ui/checkbox';
import { ScrollArea } from 'app/components/ui/scroll-area';

const invoices = [
  {
    invoice: 'Analyse the macro-location',
    paymentStatus: '14 Jun 2024',
    paymentMethod: 'Deadline',
  },
  {
    invoice: 'Analyse the macro-location',
    paymentStatus: '14 Jun 2024',
    paymentMethod: 'Deadline',
  },
  {
    invoice: 'Analyse the macro-location',
    paymentStatus: '14 Jun 2024',
    paymentMethod: 'Deadline',
  },
  {
    invoice: 'Analyse the macro-location',
    paymentStatus: '14 Jun 2024',
    paymentMethod: 'Deadline',
  },
  {
    invoice: 'Analyse the macro-location',
    paymentStatus: '14 Jun 2024',
    paymentMethod: 'Deadline',
  },
  {
    invoice: 'Analyse the macro-location',
    paymentStatus: '14 Jun 2024',
    paymentMethod: 'Deadline',
  },
];
// import { AddLeadForms } from '../AddContact/components/Lead/add-lead';
interface Props { }

export const Dasboard = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div>
      {/* <AddLeadForms /> */}
      {t('')}
      <div className="mb-14">
        <div className="container">
          <div className="grid sm:grid-cols-12 gap-8 mt-12">
            <div className="col-span-4">
              {/* <div className="relative ">
                <div className="absolute  text-[#101828] text-xl font-normal font-poppins  top-[10rem] -left-[4rem]">
                  Welcome, Blake!{' '}
                  <span className="block text-base max-w-[23rem] text-[#667085] pt-2 leading-8">
                    You’ve closed $--,---,--- of your $--,---,--- Goal.
                  </span>
                  <div className="flex justify-center relative left-[4rem] cursor-pointer">
                    <img src="/images/arrow-1.svg" />
                  </div>
                </div>
                <div>
                  <img src="/images/chart1.svg" />
                </div>
              </div> */}

              <div className="bg-[url('../public/images/bg-loan.svg')] w-full h-[25rem] rounded-[2rem] bg-cover">
                <div className="flex">
                  <div className=" text-white p-8 text-base font-poppins  font-medium">
                    <div className="tracking-[-0.5px]">
                      Blake, check today’s best rates
                    </div>
                    <div className="text-[1.2rem] font-poppins font-normal mt-3 tracking-[-0.4px]">
                      Update jul8, 2024, 10:21 AM
                    </div>
                  </div>

                  <div className="flex items-center ml-auto pr-4">
                    <div className="bg-white mr-4 rounded-full p-3  cursor-pointer">
                      <Pencil className="w-8 h-8" />
                    </div>
                    <div className=" bg-white rounded-full p-3 cursor-pointer">
                      {' '}
                      <Info className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                <div className="px-8 flex w-[37rem] justify-between">
                  <div className="backdrop-blur-[.2rem] rounded-[1.2rem] bg-white p-[1.2rem] w-[9.4rem] ">
                    <div className="pt-2">
                      <img src="/images/image 19.svg" />
                    </div>
                    <div className="text-[#667085] font-normal text-[1.2rem] mt-4 font-poppins tracking-[-0.2px]">
                      10 Years
                    </div>
                    <div className="text-[#101828] font-poppins mt-2  font-medium text-md tracking-[-0.2px]">
                      6.750%
                    </div>
                  </div>
                  <div className="backdrop-blur-[.2rem] rounded-[1.2rem] bg-white p-[1.2rem] w-[9.4rem] ">
                    <div className="pt-2">
                      <img src="/images/image 19.svg" />
                    </div>
                    <div className="text-[#667085] font-normal text-[1.2rem] mt-4 font-poppins tracking-[-0.2px]">
                      20 Years
                    </div>
                    <div className="text-[#101828] font-poppins mt-2  font-medium text-md tracking-[-0.2px]">
                      7.250%
                    </div>
                  </div>
                  <div className="backdrop-blur-[.2rem] rounded-[1.2rem] bg-white p-[1.2rem] w-[9.4rem] ">
                    <div className="pt-2">
                      <img src="/images/image 19.svg" />
                    </div>
                    <div className="text-[#667085] font-normal text-[1.2rem] mt-4 font-poppins tracking-[-0.2px]">
                      30 Years
                    </div>
                    <div className="text-[#101828] font-poppins mt-2  font-medium text-md tracking-[-0.2px]">
                      7.375%
                    </div>
                  </div>
                </div>
                <div className="text-white flex items-center justify-between p-8">
                  <div className="text-base font-poppins  font-medium flex items-center tracking-[-0.4px]">
                    <span>
                      {' '}
                      <Bell className="w-7 mr-3" />
                    </span>{' '}
                    Rate Alert
                  </div>
                  <div className="text-base font-poppins  font-medium">0</div>
                </div>
              </div>

              <div className="bg-white rounded-20 mt-7">
                <div className="">
                  <div className="flex px-8 pt-8 items-center justify-between">
                    <div className="">
                      <h1 className="text-black text-md font-poppins  font-medium leading-none tracking-[-0.2px]">
                        Message
                      </h1>
                    </div>
                  </div>
                  <div className=" w-full px-8 mt-12">
                    <div className=" relative">
                      <Input
                        placeholder="Search"
                        className="rounded-[.8rem] border border-[#D0D5DD] bg-[#fff] w-full min-w-[30rem] h-[4rem] placeholder:text-[#667085] pl-14"
                      />
                      <div className="absolute top-[.8rem] left-5">
                        {' '}
                        <Search className="w-6" />
                      </div>
                    </div>
                  </div>
                  <ScrollArea className="h-[57.4rem] px-8 ">
                    <div className="pt-0 grid space-y-[3.8rem] mt-16">
                      <div className="flex items-center gap-4 ">
                        <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                          <img
                            className="aspect-square  w-[5.4rem] h-[5.4rem]"
                            alt="Avatar"
                            src="/images/rc.svg"
                          />
                        </span>
                        <div className="grid gap-1">
                          <p className="text-xs text-black font-poppins font-medium tracking-[-0.5px]">
                            Varina Samantha
                          </p>
                          <p className="text-[1.4rem] text-[#3A3B41] font-poppins font-normal line-clamp-1 tracking-[-0.4px]">
                            How are you?
                          </p>
                        </div>
                        <div className="ml-auto text-[1.2rem] font-normal  w-[4.4rem] h-[2.6rem] text-[#00F] leading-[2.4rem] text-end ">
                          11.06
                          <span
                            className="bg-[#00F] block w-[.6rem] h-[.6rem] rounded-full text-end "
                            style={{ margin: 'inherit' }}
                          ></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                          <img
                            className="aspect-square  w-[5.4rem] h-[5.4rem]"
                            alt="Avatar"
                            src="/images/rc2.svg"
                          />
                        </span>
                        <div className="grid gap-1">
                          <p className="text-xs text-black font-poppins font-medium tracking-[-0.5px]">
                            Rynold Verstapen
                          </p>
                          <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal line-clamp-1 tracking-[-0.4px]">
                            Okay, got it!
                          </p>
                        </div>
                        <div className="ml-auto text-[1.2rem] font-normal text-[#00F] w-[4.4rem] h-[2.6rem]  leading-[2.6rem] text-end ">
                          11.06
                          <span
                            className="bg-[#00F] block w-[.6rem] h-[.6rem] rounded-full text-end "
                            style={{ margin: 'inherit' }}
                          ></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 ">
                        <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                          <img
                            className="aspect-square  w-[5.4rem] h-[5.4rem]"
                            alt="Avatar"
                            src="/images/rc.svg"
                          />
                        </span>
                        <div className="grid gap-1">
                          <p className="text-xs text-black font-poppins font-medium tracking-[-0.5px]">
                            Varina Samantha
                          </p>
                          <p className="text-[1.4rem] text-[#3A3B41] font-poppins font-normal line-clamp-1 tracking-[-0.4px]">
                            How are you?
                          </p>
                        </div>
                        <div className="ml-auto text-[1.2rem] font-normal  w-[4.4rem] h-[2.6rem] text-[#00F] leading-[2.4rem] text-end ">
                          11.06
                          <span
                            className="bg-[#00F] block w-[.6rem] h-[.6rem] rounded-full text-end "
                            style={{ margin: 'inherit' }}
                          ></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                          <img
                            className="aspect-square  w-[5.4rem] h-[5.4rem]"
                            alt="Avatar"
                            src="/images/rc2.svg"
                          />
                        </span>
                        <div className="grid gap-1">
                          <p className="text-xs text-black font-poppins font-medium tracking-[-0.5px]">
                            Rynold Verstapen
                          </p>
                          <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal line-clamp-1 tracking-[-0.4px]">
                            Okay, got it!
                          </p>
                        </div>
                        <div className="ml-auto text-[1.2rem] font-normal text-[#00F] w-[4.4rem] h-[2.6rem]  leading-[2.6rem] text-end ">
                          11.06
                          <span
                            className="bg-[#00F] block w-[.6rem] h-[.6rem] rounded-full text-end "
                            style={{ margin: 'inherit' }}
                          ></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                          <img
                            className="aspect-square  w-[5.4rem] h-[5.4rem]"
                            alt="Avatar"
                            src="/images/rc.svg"
                          />
                        </span>
                        <div className="grid gap-1">
                          <p className="text-xs text-black font-poppins font-medium tracking-[-0.5px]">
                            Michael Moreno
                          </p>
                          <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal line-clamp-1 tracking-[-0.4px]">
                            OK, i follow you
                          </p>
                        </div>
                        <div className="ml-auto text-[1.2rem] font-normal text-[#00F] w-[4.4rem] h-[2.6rem]  leading-[2.6rem] text-end ">
                          11.06
                          <span
                            className="bg-[#00F] block w-[.6rem] h-[.6rem] rounded-full text-end "
                            style={{ margin: 'inherit' }}
                          ></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                          <img
                            className="aspect-square  w-[5.4rem] h-[5.4rem]"
                            alt="Avatar"
                            src="/images/rc2.svg"
                          />
                        </span>
                        <div className="grid gap-1">
                          <p className="text-xs text-black font-poppins font-medium tracking-[-0.5px]">
                            Rob Van Dam
                          </p>
                          <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal line-clamp-1 tracking-[-0.4px]">
                            I can’t wait, lets go to disscussion
                          </p>
                        </div>
                        <div className="ml-auto text-[1.2rem] font-normal text-[#00F]  w-[4.4rem] h-[2.6rem]  leading-[2.6rem] text-end ">
                          11.06
                          <span
                            className="bg-[#00F] block w-[.6rem] h-[.6rem] rounded-full text-end "
                            style={{ margin: 'inherit' }}
                          ></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                          <img
                            className="aspect-square  w-[5.4rem] h-[5.4rem]"
                            alt="Avatar"
                            src="/images/rc.svg"
                          />
                        </span>
                        <div className="grid gap-1">
                          <p className="text-xs text-black font-poppins font-medium tracking-[-0.5px]">
                            Michael Moreno
                          </p>
                          <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal line-clamp-1 tracking-[-0.4px]">
                            OK, i follow you
                          </p>
                        </div>
                        <div className="ml-auto text-[1.2rem] font-normal text-[#00F] w-[4.4rem] h-[2.6rem]  leading-[2.6rem] text-end ">
                          11.06
                          <span
                            className="bg-[#00F] block w-[.6rem] h-[.6rem] rounded-full text-end "
                            style={{ margin: 'inherit' }}
                          ></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                          <img
                            className="aspect-square  w-[5.4rem] h-[5.4rem]"
                            alt="Avatar"
                            src="/images/rc2.svg"
                          />
                        </span>
                        <div className="grid gap-1">
                          <p className="text-xs text-black font-poppins font-medium tracking-[-0.5px]">
                            Rob Van Dam
                          </p>
                          <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal line-clamp-1 tracking-[-0.4px]">
                            I can’t wait, lets go to disscussion
                          </p>
                        </div>
                        <div className="ml-auto text-[1.2rem] font-normal text-[#00F]  w-[4.4rem] h-[2.6rem]  leading-[2.6rem] text-end ">
                          11.06
                          <span
                            className="bg-[#00F] block w-[.6rem] h-[.6rem] rounded-full text-end "
                            style={{ margin: 'inherit' }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
            <div className=" col-span-4">
              {/* <div className="bg-[url('../public/images/bg.svg')] w-full h-[37.2rem] ">
                <div className="flex items-center justify-between max-w-[48rem]">
                  <div className="pt-10 pl-12">
                    <h1 className="text-black text-md font-poppins font-midium">
                      10 Bond shares
                    </h1>
                    <p className="text-[#00000080] mt-2 text-14">
                      March 4, 2024
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <div className=" border rounded-80 py-3 px-6 text-xs font-semibold">
                      4.73%
                    </div>
                    <div className=" cursor-pointer ml-4">
                      <img src="/images/arrow-1.svg" />
                    </div>
                  </div>
                </div>
                <div className="mt-14 ml-10">
                  {' '}
                  <img src="/images/chart-2.svg" />
                </div>
              </div> */}
              <div className="bg-white p-8 rounded-[2rem]">
                <div className="flex items-center">
                  <div className="">
                    <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                      <img
                        className="aspect-square  w-[4.8rem] h-[4.8rem]"
                        alt="Avatar"
                        src="/images/rc.svg"
                      />
                    </span>
                  </div>
                  <div className="relative w-full ml-5">
                    <Input
                      placeholder="What’s new?"
                      className="rounded-full border bg-[#fff] w-full  h-[4.1rem]"
                    />
                    <div className="absolute top-5 right-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_458_2172)">
                          <path
                            d="M5.33301 9.33325C5.33301 9.33325 6.33301 10.6666 7.99967 10.6666C9.66634 10.6666 10.6663 9.33325 10.6663 9.33325M9.99967 5.99992H10.0063M5.99967 5.99992H6.00634M14.6663 7.99992C14.6663 11.6818 11.6816 14.6666 7.99967 14.6666C4.31778 14.6666 1.33301 11.6818 1.33301 7.99992C1.33301 4.31802 4.31778 1.33325 7.99967 1.33325C11.6816 1.33325 14.6663 4.31802 14.6663 7.99992ZM10.333 5.99992C10.333 6.18401 10.1838 6.33325 9.99967 6.33325C9.81558 6.33325 9.66634 6.18401 9.66634 5.99992C9.66634 5.81582 9.81558 5.66659 9.99967 5.66659C10.1838 5.66659 10.333 5.81582 10.333 5.99992ZM6.33301 5.99992C6.33301 6.18401 6.18377 6.33325 5.99967 6.33325C5.81558 6.33325 5.66634 6.18401 5.66634 5.99992C5.66634 5.81582 5.81558 5.66659 5.99967 5.66659C6.18377 5.66659 6.33301 5.81582 6.33301 5.99992Z"
                            stroke="#98A2B3"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_458_2172">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] mt-6">
                <div className=" ">
                  <div className="flex gap-4 mt-8">
                    <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                      <img
                        className="aspect-square  w-[5.4rem] h-[5.4rem]"
                        alt="Avatar"
                        src="/images/rc2.svg"
                      />
                    </span>
                    <div className="grid gap-1">
                      <p className="text-xs text-black font-poppins font-medium tracking-[-0.5px]">
                        Blake Bianci
                        <span className="text-[#667085] text-base font-poppins font-normal">
                          ・ 2d
                        </span>
                      </p>
                      <p className="text-base text-[#667085] font-poppins font-normal  leading-0 tracking-[-0.4px]">
                        Loan Officer, PA
                      </p>
                    </div>
                  </div>
                  <div className=" space-y-6 mt-4">
                    <p className="text-14 text-[#3A3B41] font-poppins font-normal tracking-[-0.4px]">
                      Design Principles
                      <span className=" underline">
                        (https://principles.design)
                      </span>
                      , a wonderful collection with 195 pointers for design
                      principles and methods, searchable and tagged, from
                      hardware and infrastructure to language and organizations.
                    </p>

                    <div className="flex">
                      <p className="mr-4 flex items-center text-[1.4rem] text-[#00000080] font-poppins font-normal line-clamp-1">
                        <span className="mr-2">
                          {' '}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9.99462 4.77985C8.32849 2.832 5.55011 2.30804 3.46257 4.09168C1.37503 5.87532 1.08113 8.85748 2.72049 10.967C4.08351 12.7209 8.20847 16.4201 9.56041 17.6174C9.71166 17.7513 9.78729 17.8183 9.8755 17.8446C9.9525 17.8676 10.0367 17.8676 10.1137 17.8446C10.2019 17.8183 10.2776 17.7513 10.4288 17.6174C11.7808 16.4201 15.9057 12.7209 17.2687 10.967C18.9081 8.85748 18.6501 5.85656 16.5267 4.09168C14.4032 2.3268 11.6607 2.832 9.99462 4.77985Z"
                              fill="#F63D68"
                            />
                          </svg>
                        </span>{' '}
                        1,1 k
                      </p>
                      <p className="ml-6 flex items-center text-[1.4rem] tracking-[-0.5px] text-[#00000080] font-poppins font-normal line-clamp-1">
                        <span className="mr-2">
                          {' '}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                          >
                            <path
                              d="M9.99982 2.375C8.59706 2.37469 7.21811 2.73757 5.9972 3.4283C4.77629 4.11904 3.75501 5.1141 3.03277 6.31664C2.31052 7.51918 1.91192 8.88822 1.87575 10.2905C1.83958 11.6928 2.16709 13.0806 2.82638 14.3188L1.93966 16.9789C1.86621 17.1992 1.85556 17.4355 1.90888 17.6615C1.96221 17.8874 2.07741 18.0941 2.24158 18.2582C2.40575 18.4224 2.61239 18.5376 2.83836 18.5909C3.06432 18.6443 3.30067 18.6336 3.52091 18.5602L6.18107 17.6734C7.27073 18.253 8.47811 18.5767 9.71156 18.62C10.945 18.6633 12.1721 18.425 13.2997 17.9232C14.4273 17.4215 15.4258 16.6694 16.2194 15.7241C17.0129 14.7789 17.5807 13.6652 17.8796 12.4678C18.1785 11.2703 18.2007 10.0205 17.9445 8.81315C17.6882 7.60584 17.1603 6.47276 16.4008 5.49993C15.6413 4.52711 14.6701 3.74009 13.561 3.19864C12.4519 2.65718 11.234 2.37551 9.99982 2.375ZM9.99982 17.375C8.79121 17.3758 7.6038 17.0575 6.55763 16.4523C6.48104 16.4079 6.39587 16.3803 6.30779 16.3713C6.2197 16.3622 6.13071 16.372 6.0467 16.4L3.12482 17.375L4.09904 14.4531C4.12712 14.3692 4.13705 14.2802 4.12816 14.1921C4.11927 14.104 4.09177 14.0188 4.04748 13.9422C3.28964 12.632 2.98537 11.1083 3.18187 9.60747C3.37837 8.10667 4.06466 6.71267 5.13426 5.64171C6.20387 4.57076 7.597 3.88271 9.09755 3.68431C10.5981 3.48592 12.1222 3.78826 13.4334 4.54444C14.7445 5.30062 15.7695 6.46837 16.3493 7.86652C16.9291 9.26468 17.0313 10.8151 16.64 12.2773C16.2487 13.7394 15.3858 15.0316 14.1852 15.9533C12.9846 16.875 11.5134 17.3748 9.99982 17.375Z"
                              fill="#979BA4"
                            />
                          </svg>
                        </span>{' '}
                        23 Comments
                      </p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="flex items-center">
                      <div className="">
                        <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                          <img
                            className="aspect-square  w-[4.8rem] h-[4.8rem]"
                            alt="Avatar"
                            src="/images/rc2.svg"
                          />
                        </span>
                      </div>
                      <div className="relative w-full ml-5">
                        <Input
                          placeholder="What’s new?"
                          className="rounded-full border bg-[#fff] w-full  h-[4.1rem]"
                        />
                        <div className="absolute top-5 right-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_458_2172)">
                              <path
                                d="M5.33301 9.33325C5.33301 9.33325 6.33301 10.6666 7.99967 10.6666C9.66634 10.6666 10.6663 9.33325 10.6663 9.33325M9.99967 5.99992H10.0063M5.99967 5.99992H6.00634M14.6663 7.99992C14.6663 11.6818 11.6816 14.6666 7.99967 14.6666C4.31778 14.6666 1.33301 11.6818 1.33301 7.99992C1.33301 4.31802 4.31778 1.33325 7.99967 1.33325C11.6816 1.33325 14.6663 4.31802 14.6663 7.99992ZM10.333 5.99992C10.333 6.18401 10.1838 6.33325 9.99967 6.33325C9.81558 6.33325 9.66634 6.18401 9.66634 5.99992C9.66634 5.81582 9.81558 5.66659 9.99967 5.66659C10.1838 5.66659 10.333 5.81582 10.333 5.99992ZM6.33301 5.99992C6.33301 6.18401 6.18377 6.33325 5.99967 6.33325C5.81558 6.33325 5.66634 6.18401 5.66634 5.99992C5.66634 5.81582 5.81558 5.66659 5.99967 5.66659C6.18377 5.66659 6.33301 5.81582 6.33301 5.99992Z"
                                stroke="#98A2B3"
                                stroke-width="1.33333"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_458_2172">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <div className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                      <img
                        className="aspect-square  w-[5.4rem] h-[5.4rem]"
                        alt="Avatar"
                        src="/images/rc.svg"
                      />
                    </div>
                    <div className="bg-[#F2F4F7] flex p-5 rounded-[1.6rem] rounded-tl  w-full">
                      <div className="grid gap-1">
                        <p className="text-xs text-black font-poppins font-medium tracking-[-0.5px]">
                          Xaviera Puteri
                        </p>
                        <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal tracking-[-0.2px]">
                          Loan Supervisor, NY City
                        </p>
                        <p className="mt-2 tracking-[-0.4px]">
                          Wow that’s amazing work! good job 👍
                        </p>
                      </div>
                      <div className="ml-auto text-[#979BA4] text-[1.3rem]">
                        12h
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <div className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                      <img
                        className="aspect-square  w-[5.4rem] h-[5.4rem]"
                        alt="Avatar"
                        src="/images/rc2.svg"
                      />
                    </div>
                    <div className="bg-[#F2F4F7] flex p-5 rounded-[1.6rem] rounded-tl  w-full">
                      <div className="grid gap-1">
                        <p className="text-xs text-black font-poppins font-medium tracking-[-0.4px]">
                          Felicia Padang
                        </p>
                        <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal tracking-[-0.2px]">
                          Loan Officer, PA
                        </p>
                        <p className="mt-2 tracking-[-0.4px]">
                          Wow, what an inspiring journey through the design
                          sprint process! It's incredible to see how much can be
                          accomplished in just four days when a dedicated team
                          comes together.
                        </p>
                      </div>
                      <div className="ml-auto text-[#979BA4] text-[1.3rem]">
                        12h
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    {' '}
                    <DropdownMenuSeparator />
                  </div>
                  <div className="">
                    <div className="flex gap-4 mt-8">
                      <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                        <img
                          className="aspect-square  w-[5.4rem] h-[5.4rem]"
                          alt="Avatar"
                          src="/images/rc.svg"
                        />
                      </span>
                      <div className="grid gap-1">
                        <p className="text-xs text-black font-poppins font-medium">
                          Blake Bianci
                          <span className="text-[#667085] text-base font-poppins font-normal">
                            ・ 2d
                          </span>
                        </p>
                        <p className="text-base text-[#667085] font-poppins font-normal  leading-0">
                          Super Admin, Boise ID
                        </p>
                      </div>
                    </div>
                    <div className=" space-y-6 mt-4">
                      <p className="text-14 text-[#3A3B41] font-poppins font-normal tracking-[-0.4px]">
                        Porperty is like a second brain that helps me think of
                        what content our users will actually want to know about.
                        This is something that other tools have not been able to
                        do for me.
                      </p>

                      <div className="flex">
                        <p className="mr-4 flex items-center text-[1.4rem] text-[#00000080] font-poppins font-normal line-clamp-1">
                          <span className="mr-2">
                            {' '}
                            <Heart className="w-8 mr-2" />
                          </span>{' '}
                          1,1 k
                        </p>
                        <p className="ml-6 flex items-center text-[1.4rem] text-[#00000080] font-poppins font-normal line-clamp-1">
                          <span className="mr-2">
                            {' '}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                            >
                              <path
                                d="M9.99982 2.375C8.59706 2.37469 7.21811 2.73757 5.9972 3.4283C4.77629 4.11904 3.75501 5.1141 3.03277 6.31664C2.31052 7.51918 1.91192 8.88822 1.87575 10.2905C1.83958 11.6928 2.16709 13.0806 2.82638 14.3188L1.93966 16.9789C1.86621 17.1992 1.85556 17.4355 1.90888 17.6615C1.96221 17.8874 2.07741 18.0941 2.24158 18.2582C2.40575 18.4224 2.61239 18.5376 2.83836 18.5909C3.06432 18.6443 3.30067 18.6336 3.52091 18.5602L6.18107 17.6734C7.27073 18.253 8.47811 18.5767 9.71156 18.62C10.945 18.6633 12.1721 18.425 13.2997 17.9232C14.4273 17.4215 15.4258 16.6694 16.2194 15.7241C17.0129 14.7789 17.5807 13.6652 17.8796 12.4678C18.1785 11.2703 18.2007 10.0205 17.9445 8.81315C17.6882 7.60584 17.1603 6.47276 16.4008 5.49993C15.6413 4.52711 14.6701 3.74009 13.561 3.19864C12.4519 2.65718 11.234 2.37551 9.99982 2.375ZM9.99982 17.375C8.79121 17.3758 7.6038 17.0575 6.55763 16.4523C6.48104 16.4079 6.39587 16.3803 6.30779 16.3713C6.2197 16.3622 6.13071 16.372 6.0467 16.4L3.12482 17.375L4.09904 14.4531C4.12712 14.3692 4.13705 14.2802 4.12816 14.1921C4.11927 14.104 4.09177 14.0188 4.04748 13.9422C3.28964 12.632 2.98537 11.1083 3.18187 9.60747C3.37837 8.10667 4.06466 6.71267 5.13426 5.64171C6.20387 4.57076 7.597 3.88271 9.09755 3.68431C10.5981 3.48592 12.1222 3.78826 13.4334 4.54444C14.7445 5.30062 15.7695 6.46837 16.3493 7.86652C16.9291 9.26468 17.0313 10.8151 16.64 12.2773C16.2487 13.7394 15.3858 15.0316 14.1852 15.9533C12.9846 16.875 11.5134 17.3748 9.99982 17.375Z"
                                fill="#979BA4"
                              />
                            </svg>
                          </span>{' '}
                          23 Comments
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="bg-white p-8 rounded-[2rem]">
                <div className="flex items-center justify-between mb-10">
                  <div className="">
                    <div className="text-black text-[2rem] font-poppins font-medium">
                      Today’s Event
                    </div>
                    <p className="text-[#667085] mt-2 text-base ">
                      8 July 2024
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="px-[1.4rem] py-4 text-[#344054] text-base font-poppins font-medium"
                  >
                    Add
                  </Button>
                </div>
                <div className=" space-y-6">
                  <div className=" border border-[#EAECF0] rounded-[2rem] py-6 px-8">
                    <div className="flex justify-between items-center space-x-4">
                      <div className="mr-6">
                        <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
                          <p className="text-black text-xs font-poppins  font-medium tracking-[-0.5px]">
                            <span className="absolute "></span>Meeting Dev x
                            Product
                          </p>
                        </div>
                        <div className="mt-3 text-[#667085] text-base font-poppins tracking-[-0.4px]">
                          09:00 AM - 10:00 AM
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-3">
                          <div className="border-2 border-[#ffffff] rounded-full">
                            <img
                              src="/images/rc.svg"
                              alt=""
                              className="flex-none w-14 h-14 rounded-full object-cover  "
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <div className="border-2 border-[#ffffff] rounded-full">
                            <img
                              src="/images/rc2.svg"
                              alt=""
                              className="flex-none w-14 h-14 rounded-full object-cover "
                              loading="lazy"
                              decoding="async"
                            />
                          </div>

                          <div className="border-2 text-[1.2rem] text-[#475467] border-[#ffffff] bg-[#F2F4F7] text-center leading-[3.4rem] w-14 h-14 rounded-full object-cover">
                            +5
                          </div>
                        </div>
                        <div className="ml-4">
                          <Button variant="nowBtn" className="">
                            <span className="w-[.8rem] h-[.8rem] rounded-full bg-[#12B76A] mr-3 "></span>{' '}
                            Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" border border-[#EAECF0] rounded-[2rem] py-6 px-8">
                    <div className="flex justify-between items-center space-x-4">
                      <div className="mr-6">
                        <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
                          <p className="text-black text-xs font-poppins  font-medium tracking-[-0.5px]">
                            <span className="absolute "></span>Internal Meeting
                            Team
                          </p>
                        </div>
                        <div className="mt-3 text-[#667085] text-base font-poppins tracking-[-0.4px]">
                          12:00 - 12:30 PM
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-3">
                          <div className="border-2 border-[#ffffff] rounded-full">
                            <img
                              src="/images/rc.svg"
                              alt=""
                              className="flex-none w-14 h-14 rounded-full object-cover  "
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <div className="border-2 border-[#ffffff] rounded-full">
                            <img
                              src="/images/rc2.svg"
                              alt=""
                              className="flex-none w-14 h-14 rounded-full object-cover "
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <div className="border-2 border-[#ffffff] rounded-full">
                            <img
                              src="/images/rc.svg"
                              alt=""
                              className="flex-none w-14 h-14 rounded-full object-cover "
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" border border-[#EAECF0] rounded-[2rem] py-6 px-8">
                    <div className="flex justify-between items-center space-x-4">
                      <div className="mr-6">
                        <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
                          <p className="text-black text-xs font-poppins  font-medium tracking-[-0.5px]">
                            <span className="absolute "></span>Report Final SMD
                            V2
                          </p>
                        </div>
                        <div className="mt-3 text-[#667085] text-base font-poppins tracking-[-0.4px]">
                          13:00 - 13:15 PM
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" border border-[#EAECF0] rounded-[2rem] py-6 px-8">
                    <div className="flex justify-between items-center space-x-4">
                      <div className="mr-6">
                        <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
                          <p className="text-black text-xs font-poppins  font-medium tracking-[-0.5px]">
                            <span className="absolute "></span>Review Portofolio
                            Intern
                          </p>
                        </div>
                        <div className="mt-3 text-[#667085] text-base font-poppins tracking-[-0.4px]">
                          16:30 - 17:00 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] overflow-hidden mt-6">
                <Table className="rounded-[2rem]">
                  {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                  <TableHeader className="text-[#667085] text-[1.2rem] font-medium">
                    <TableRow>
                      <TableHead className=" flex items-center">
                        <div className="flex items-center ">
                          <Checkbox className="rounded-[.4rem] h-[2rem] w-[2rem] mr-6 border border-[#D0D5DD]" />
                        </div>
                        Task
                      </TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Alert</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map(invoice => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium text-base  leading-[2.2rem] flex items-center w-[18rem]">
                          <div className="flex items-center ">
                            <Checkbox className="rounded-[.4rem] h-[2rem] w-[2rem] mr-6 border border-[#D0D5DD]" />
                          </div>
                          {invoice.invoice}
                        </TableCell>
                        <TableCell className="text-[#667085]">
                          {invoice.paymentStatus}
                        </TableCell>
                        <TableCell>
                          {' '}
                          <Button variant="DdeadlineBtn">
                            {invoice.paymentMethod}
                          </Button>{' '}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-12">
        <div className="container">
          <div className="grid sm:grid-cols-12 gap-8">
            <div className="col-span-4">
              <div className="bg-white rounded-20 py-4 px-12">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="">
                      <h1 className="text-black text-md font-poppins font-normal leading-none">
                        Recent Conversations
                      </h1>
                    </div>
                    <div className=" cursor-pointer">
                      <img src="/images/arrow-1.svg" />
                    </div>
                  </div>
                  <div className="flex w-full justify-between mt-8">
                    <div>
                      <Input
                        placeholder="Search or new chat"
                        className="rounded-full border-0 bg-[#f5f5f575] w-full min-w-[32.4rem] h-[5.3rem]"
                      />
                    </div>
                    <div className="ml-3 cursor-pointer">
                      <img
                        src="/images/search-f.svg"
                        className="h-[5.4rem] w-[5.4rem]"
                      />
                    </div>
                  </div>

                  <div className="pt-0 grid gap-6 mt-10">
                    <div className="flex items-center gap-4">
                      <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                        <img
                          className="aspect-square  w-[5.4rem] h-[5.4rem]"
                          alt="Avatar"
                          src="/images/rc.svg"
                        />
                      </span>
                      <div className="grid gap-1">
                        <p className="text-xs text-black font-poppins font-medium">
                          Abigail Varina
                        </p>
                        <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal line-clamp-1">
                          For now I want to pay my house in installments at a
                          cost of $50 per month
                        </p>
                      </div>
                      <div className="ml-auto text-base font-normal bg-[#D8F1E7] w-[4.4rem] h-[2.6rem] text-center leading-[2.6rem] rounded-full">
                        1
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="flex items-center gap-4">
                      <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                        <img
                          className="aspect-square  w-[5.4rem] h-[5.4rem]"
                          alt="Avatar"
                          src="/images/rc2.svg"
                        />
                      </span>
                      <div className="grid gap-1">
                        <p className="text-xs text-black font-poppins font-medium">
                          Zahid Maufin Chen
                        </p>
                        <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal line-clamp-1">
                          For now I want to pay my house in installments at a
                          cost of $50 per month
                        </p>
                      </div>
                      <div className="ml-auto text-base font-normal bg-[#D8F1E7] w-[4.4rem] h-[2.6rem] text-center leading-[2.6rem] rounded-full">
                        1
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="flex items-center gap-4">
                      <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                        <img
                          className="aspect-square  w-[5.4rem] h-[5.4rem]"
                          alt="Avatar"
                          src="/images/rc.svg"
                        />
                      </span>
                      <div className="grid gap-1">
                        <p className="text-xs text-black font-poppins font-medium">
                          Marina Kraskova
                        </p>
                        <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal line-clamp-1">
                          For now I want to pay my house in installments at a
                          cost of $50 per month
                        </p>
                      </div>
                      <div className="ml-auto text-base font-normal bg-[#D8F1E7] w-[4.4rem] h-[2.6rem] text-center leading-[2.6rem] rounded-full">
                        1
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="flex items-center gap-4">
                      <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                        <img
                          className="aspect-square  w-[5.4rem] h-[5.4rem]"
                          alt="Avatar"
                          src="/images/rc2.svg"
                        />
                      </span>
                      <div className="grid gap-1">
                        <p className="text-xs text-black font-poppins font-medium">
                          Peth Van Debosch
                        </p>
                        <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal line-clamp-1">
                          For now I want to pay my house in installments at a
                          cost of $50 per month
                        </p>
                      </div>
                      <div className="ml-auto text-base font-normal bg-[#D8F1E7] w-[4.4rem] h-[2.6rem] text-center leading-[2.6rem] rounded-full">
                        1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-8">
              <div className="bg-white rounded-20  p-12">
                <div className="grid sm:grid-cols-12 gap-8">
                  <div className="col-span-7">
                    <div className="flex">
                      <Input
                        placeholder="Write a new thread post"
                        className=" w-full min-w-[32.4rem] h-[4.3rem] border-0  text-[1.7rem] text-[#979BA4] font-normal font-poppins "
                      />
                      <Button
                        variant="blueBtn"
                        type="button"
                        className=" py-2 px-16 ml-4 font-normal text-14 text-white"
                      >
                        Post
                      </Button>
                    </div>
                    <div className="mt-8">
                      {' '}
                      <DropdownMenuSeparator />
                    </div>
                    <div className="flex gap-4 mt-8">
                      <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                        <img
                          className="aspect-square  w-[5.4rem] h-[5.4rem]"
                          alt="Avatar"
                          src="/images/rc2.svg"
                        />
                      </span>
                      <div className="grid gap-1">
                        <p className="text-xs text-black font-poppins font-medium">
                          Zahid Maufin{' '}
                          <span className="text-[#8598FF] text-[1.3rem] font-poppins font-normal">
                            Loan Officer
                          </span>
                        </p>
                        <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal ">
                          Looking for an assistant.
                        </p>
                      </div>
                      <div className="ml-auto text-[#979BA4] text-[1.3rem]">
                        1 hours ago
                      </div>
                    </div>
                    <div className="ml-[6.4rem] space-y-6 mt-6">
                      <p className="text-14 text-[#3A3B41] font-poppins font-normal ">
                        Can be part-time, fully remote (anywhere), can be
                        junior, hourly-billed.
                      </p>
                      <p className="text-14 text-[#3A3B41] font-poppins font-normal ">
                        Work starts as small (work/private) admin, but ideally
                        levels up to projects & research work for the fund.
                      </p>
                      <p className="text-14 text-[#3A3B41] font-poppins font-normal ">
                        Not looking for agencies as in-between.
                      </p>
                      <div>
                        <Textarea className="rounded-[2rem] resize-none py-6 px-4 text-base h-[12rem] focus-visible:ring-0" />
                      </div>

                      <div className="flex">
                        <Button
                          variant="whiteBtn"
                          type="button"
                          className=" py-2 px-6  font-normal font-poppins text-[1.4rem]"
                        >
                          Add Response
                        </Button>
                        <p className="ml-6 flex items-center text-[1.4rem] text-[#00000080] font-poppins font-normal line-clamp-1">
                          <span className="mr-2">
                            {' '}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                            >
                              <path
                                d="M9.99982 2.375C8.59706 2.37469 7.21811 2.73757 5.9972 3.4283C4.77629 4.11904 3.75501 5.1141 3.03277 6.31664C2.31052 7.51918 1.91192 8.88822 1.87575 10.2905C1.83958 11.6928 2.16709 13.0806 2.82638 14.3188L1.93966 16.9789C1.86621 17.1992 1.85556 17.4355 1.90888 17.6615C1.96221 17.8874 2.07741 18.0941 2.24158 18.2582C2.40575 18.4224 2.61239 18.5376 2.83836 18.5909C3.06432 18.6443 3.30067 18.6336 3.52091 18.5602L6.18107 17.6734C7.27073 18.253 8.47811 18.5767 9.71156 18.62C10.945 18.6633 12.1721 18.425 13.2997 17.9232C14.4273 17.4215 15.4258 16.6694 16.2194 15.7241C17.0129 14.7789 17.5807 13.6652 17.8796 12.4678C18.1785 11.2703 18.2007 10.0205 17.9445 8.81315C17.6882 7.60584 17.1603 6.47276 16.4008 5.49993C15.6413 4.52711 14.6701 3.74009 13.561 3.19864C12.4519 2.65718 11.234 2.37551 9.99982 2.375ZM9.99982 17.375C8.79121 17.3758 7.6038 17.0575 6.55763 16.4523C6.48104 16.4079 6.39587 16.3803 6.30779 16.3713C6.2197 16.3622 6.13071 16.372 6.0467 16.4L3.12482 17.375L4.09904 14.4531C4.12712 14.3692 4.13705 14.2802 4.12816 14.1921C4.11927 14.104 4.09177 14.0188 4.04748 13.9422C3.28964 12.632 2.98537 11.1083 3.18187 9.60747C3.37837 8.10667 4.06466 6.71267 5.13426 5.64171C6.20387 4.57076 7.597 3.88271 9.09755 3.68431C10.5981 3.48592 12.1222 3.78826 13.4334 4.54444C14.7445 5.30062 15.7695 6.46837 16.3493 7.86652C16.9291 9.26468 17.0313 10.8151 16.64 12.2773C16.2487 13.7394 15.3858 15.0316 14.1852 15.9533C12.9846 16.875 11.5134 17.3748 9.99982 17.375Z"
                                fill="#979BA4"
                              />
                            </svg>
                          </span>{' '}
                          13 Comments
                        </p>
                      </div>
                    </div>
                    <div className="mt-8">
                      {' '}
                      <DropdownMenuSeparator />
                    </div>
                    <div className="flex gap-4 mt-8">
                      <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                        <img
                          className="aspect-square  w-[5.4rem] h-[5.4rem]"
                          alt="Avatar"
                          src="/images/rc.svg"
                        />
                      </span>
                      <div className="grid gap-1">
                        <p className="text-xs text-black font-poppins font-medium">
                          Abigail Varina{' '}
                          <span className="text-[#8598FF] text-[1.3rem] font-poppins font-normal">
                            Loan Officer
                          </span>
                        </p>
                        <p className="text-[1.3rem] text-[#3A3B41] font-poppins font-normal ">
                          Work starts as small (work/private) admin
                        </p>
                      </div>
                      <div className="ml-auto text-[#979BA4] text-[1.3rem]">
                        1 hours ago
                      </div>
                    </div>
                  </div>
                  <div className="col-span-5">
                    <div className="relative">
                      <Input
                        placeholder="Search or new chat"
                        className="rounded-full border-0 bg-[#f5f5f575] w-full min-w-[32.4rem] h-[5.3rem] pl-20"
                      />
                      <div className="absolute top-7 left-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M17.9419 17.0579L14.0302 13.1469C15.1639 11.7858 15.7293 10.0399 15.6086 8.27251C15.488 6.50512 14.6906 4.85229 13.3823 3.65785C12.074 2.46341 10.3557 1.81932 8.58462 1.85957C6.81357 1.89982 5.12622 2.62131 3.87358 3.87395C2.62094 5.12659 1.89945 6.81394 1.8592 8.58498C1.81895 10.356 2.46304 12.0744 3.65748 13.3827C4.85192 14.6909 6.50475 15.4883 8.27214 15.609C10.0395 15.7297 11.7854 15.1643 13.1466 14.0305L17.0575 17.9422C17.1156 18.0003 17.1845 18.0464 17.2604 18.0778C17.3363 18.1092 17.4176 18.1254 17.4997 18.1254C17.5818 18.1254 17.6631 18.1092 17.739 18.0778C17.8149 18.0464 17.8838 18.0003 17.9419 17.9422C17.9999 17.8842 18.046 17.8152 18.0774 17.7394C18.1089 17.6635 18.125 17.5822 18.125 17.5001C18.125 17.4179 18.1089 17.3366 18.0774 17.2607C18.046 17.1849 17.9999 17.1159 17.9419 17.0579ZM3.12469 8.75006C3.12469 7.63754 3.45459 6.55 4.07267 5.62497C4.69076 4.69995 5.56926 3.97898 6.5971 3.55323C7.62493 3.12749 8.75593 3.0161 9.84707 3.23314C10.9382 3.45018 11.9405 3.98591 12.7272 4.77258C13.5138 5.55925 14.0496 6.56153 14.2666 7.65267C14.4837 8.74382 14.3723 9.87482 13.9465 10.9027C13.5208 11.9305 12.7998 12.809 11.8748 13.4271C10.9497 14.0452 9.86221 14.3751 8.74969 14.3751C7.25836 14.3734 5.82858 13.7802 4.77404 12.7257C3.71951 11.6712 3.12634 10.2414 3.12469 8.75006Z"
                            fill="#92949F"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="p-12 bg-[#e5ebef2e] rounded-32 mt-6">
                      <h1 className="text-black text-xs font-poppins font-normal leading-none">
                        Trending
                      </h1>

                      <div>
                        <div className="text-black text-14 font-poppins font-normal leading-none mt-12">
                          Company Officer Party!
                        </div>
                        <div className="flex mt-4 gap-4">
                          <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                            <img
                              className="aspect-square  w-[2.8rem] h-[2.8rem]"
                              alt="Avatar"
                              src="/images/comment.svg"
                            />
                          </span>
                          <div className="grid gap-1">
                            <p className="text-[1.2rem] text-[#00000080] font-poppins font-normal ">
                              Zahid Moufin
                            </p>
                            <p className=" flex items-center text-[1rem] text-[#00000080] font-poppins font-normal line-clamp-1">
                              <span className="mr-2">
                                {' '}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                >
                                  <path
                                    d="M7.50035 1.40625C6.44828 1.40602 5.41407 1.67818 4.49839 2.19623C3.58271 2.71428 2.81675 3.46058 2.27506 4.36248C1.73338 5.26438 1.43442 6.29117 1.4073 7.34289C1.38017 8.39461 1.6258 9.43544 2.12028 10.3641L1.45524 12.3592C1.40015 12.5244 1.39215 12.7016 1.43215 12.8711C1.47214 13.0406 1.55855 13.1956 1.68167 13.3187C1.8048 13.4418 1.95978 13.5282 2.12926 13.5682C2.29873 13.6082 2.47599 13.6002 2.64117 13.5451L4.63629 12.8801C5.45354 13.3148 6.35907 13.5575 7.28416 13.59C8.20924 13.6225 9.12957 13.4437 9.97528 13.0674C10.821 12.6911 11.5698 12.127 12.165 11.4181C12.7602 10.7091 13.186 9.87392 13.4102 8.97582C13.6344 8.07772 13.651 7.14035 13.4588 6.23487C13.2667 5.32938 12.8707 4.47957 12.3011 3.74995C11.7314 3.02033 11.0031 2.43007 10.1712 2.02398C9.33941 1.61788 8.42601 1.40663 7.50035 1.40625ZM7.50035 12.6562C6.59389 12.6569 5.70334 12.4182 4.91871 11.9643C4.86126 11.9309 4.79739 11.9102 4.73133 11.9034C4.66527 11.8967 4.59852 11.904 4.53551 11.925L2.3441 12.6562L3.07477 10.4648C3.09583 10.4019 3.10327 10.3351 3.09661 10.2691C3.08994 10.203 3.06931 10.1391 3.0361 10.0816C2.46772 9.09897 2.23952 7.9562 2.38689 6.8306C2.53427 5.705 3.04898 4.6595 3.85119 3.85628C4.65339 3.05307 5.69824 2.53703 6.82365 2.38824C7.94906 2.23944 9.09212 2.4662 10.0755 3.03333C11.0589 3.60047 11.8276 4.47627 12.2625 5.52489C12.6973 6.57351 12.774 7.73633 12.4805 8.83294C12.187 9.92956 11.5399 10.8987 10.6394 11.59C9.73897 12.2813 8.63556 12.6561 7.50035 12.6562Z"
                                    fill="#979BA4"
                                  />
                                </svg>
                              </span>{' '}
                              13 Comments
                            </p>
                          </div>
                          <div className="ml-auto text-blue font-poppins font-medium cursor-pointer hover:text-[#8598ff]">
                            View
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-black text-14 font-poppins font-normal leading-none mt-12">
                          Company Officer Party!
                        </div>
                        <div className="flex mt-4 gap-4">
                          <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                            <img
                              className="aspect-square  w-[2.8rem] h-[2.8rem]"
                              alt="Avatar"
                              src="/images/comment.svg"
                            />
                          </span>
                          <div className="grid gap-1">
                            <p className="text-[1.2rem] text-[#00000080] font-poppins font-normal ">
                              Zahid Moufin
                            </p>
                            <p className=" flex items-center text-[1rem] text-[#00000080] font-poppins font-normal line-clamp-1">
                              <span className="mr-2">
                                {' '}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                >
                                  <path
                                    d="M7.50035 1.40625C6.44828 1.40602 5.41407 1.67818 4.49839 2.19623C3.58271 2.71428 2.81675 3.46058 2.27506 4.36248C1.73338 5.26438 1.43442 6.29117 1.4073 7.34289C1.38017 8.39461 1.6258 9.43544 2.12028 10.3641L1.45524 12.3592C1.40015 12.5244 1.39215 12.7016 1.43215 12.8711C1.47214 13.0406 1.55855 13.1956 1.68167 13.3187C1.8048 13.4418 1.95978 13.5282 2.12926 13.5682C2.29873 13.6082 2.47599 13.6002 2.64117 13.5451L4.63629 12.8801C5.45354 13.3148 6.35907 13.5575 7.28416 13.59C8.20924 13.6225 9.12957 13.4437 9.97528 13.0674C10.821 12.6911 11.5698 12.127 12.165 11.4181C12.7602 10.7091 13.186 9.87392 13.4102 8.97582C13.6344 8.07772 13.651 7.14035 13.4588 6.23487C13.2667 5.32938 12.8707 4.47957 12.3011 3.74995C11.7314 3.02033 11.0031 2.43007 10.1712 2.02398C9.33941 1.61788 8.42601 1.40663 7.50035 1.40625ZM7.50035 12.6562C6.59389 12.6569 5.70334 12.4182 4.91871 11.9643C4.86126 11.9309 4.79739 11.9102 4.73133 11.9034C4.66527 11.8967 4.59852 11.904 4.53551 11.925L2.3441 12.6562L3.07477 10.4648C3.09583 10.4019 3.10327 10.3351 3.09661 10.2691C3.08994 10.203 3.06931 10.1391 3.0361 10.0816C2.46772 9.09897 2.23952 7.9562 2.38689 6.8306C2.53427 5.705 3.04898 4.6595 3.85119 3.85628C4.65339 3.05307 5.69824 2.53703 6.82365 2.38824C7.94906 2.23944 9.09212 2.4662 10.0755 3.03333C11.0589 3.60047 11.8276 4.47627 12.2625 5.52489C12.6973 6.57351 12.774 7.73633 12.4805 8.83294C12.187 9.92956 11.5399 10.8987 10.6394 11.59C9.73897 12.2813 8.63556 12.6561 7.50035 12.6562Z"
                                    fill="#979BA4"
                                  />
                                </svg>
                              </span>{' '}
                              13 Comments
                            </p>
                          </div>
                          <div className="ml-auto text-blue font-poppins font-medium cursor-pointer hover:text-[#8598ff]">
                            View
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-black text-14 font-poppins font-normal leading-none mt-12">
                          Company Officer Party!
                        </div>
                        <div className="flex mt-4 gap-4">
                          <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                            <img
                              className="aspect-square  w-[2.8rem] h-[2.8rem]"
                              alt="Avatar"
                              src="/images/comment.svg"
                            />
                          </span>
                          <div className="grid gap-1">
                            <p className="text-[1.2rem] text-[#00000080] font-poppins font-normal ">
                              Zahid Moufin
                            </p>
                            <p className=" flex items-center text-[1rem] text-[#00000080] font-poppins font-normal line-clamp-1">
                              <span className="mr-2">
                                {' '}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                >
                                  <path
                                    d="M7.50035 1.40625C6.44828 1.40602 5.41407 1.67818 4.49839 2.19623C3.58271 2.71428 2.81675 3.46058 2.27506 4.36248C1.73338 5.26438 1.43442 6.29117 1.4073 7.34289C1.38017 8.39461 1.6258 9.43544 2.12028 10.3641L1.45524 12.3592C1.40015 12.5244 1.39215 12.7016 1.43215 12.8711C1.47214 13.0406 1.55855 13.1956 1.68167 13.3187C1.8048 13.4418 1.95978 13.5282 2.12926 13.5682C2.29873 13.6082 2.47599 13.6002 2.64117 13.5451L4.63629 12.8801C5.45354 13.3148 6.35907 13.5575 7.28416 13.59C8.20924 13.6225 9.12957 13.4437 9.97528 13.0674C10.821 12.6911 11.5698 12.127 12.165 11.4181C12.7602 10.7091 13.186 9.87392 13.4102 8.97582C13.6344 8.07772 13.651 7.14035 13.4588 6.23487C13.2667 5.32938 12.8707 4.47957 12.3011 3.74995C11.7314 3.02033 11.0031 2.43007 10.1712 2.02398C9.33941 1.61788 8.42601 1.40663 7.50035 1.40625ZM7.50035 12.6562C6.59389 12.6569 5.70334 12.4182 4.91871 11.9643C4.86126 11.9309 4.79739 11.9102 4.73133 11.9034C4.66527 11.8967 4.59852 11.904 4.53551 11.925L2.3441 12.6562L3.07477 10.4648C3.09583 10.4019 3.10327 10.3351 3.09661 10.2691C3.08994 10.203 3.06931 10.1391 3.0361 10.0816C2.46772 9.09897 2.23952 7.9562 2.38689 6.8306C2.53427 5.705 3.04898 4.6595 3.85119 3.85628C4.65339 3.05307 5.69824 2.53703 6.82365 2.38824C7.94906 2.23944 9.09212 2.4662 10.0755 3.03333C11.0589 3.60047 11.8276 4.47627 12.2625 5.52489C12.6973 6.57351 12.774 7.73633 12.4805 8.83294C12.187 9.92956 11.5399 10.8987 10.6394 11.59C9.73897 12.2813 8.63556 12.6561 7.50035 12.6562Z"
                                    fill="#979BA4"
                                  />
                                </svg>
                              </span>{' '}
                              13 Comments
                            </p>
                          </div>
                          <div className="ml-auto text-blue font-poppins font-medium cursor-pointer hover:text-[#8598ff]">
                            View
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-black text-14 font-poppins font-normal leading-none mt-12">
                          Company Officer Party!
                        </div>
                        <div className="flex mt-4 gap-4">
                          <span className="relative shrink-0 overflow-hidden rounded-full hidden  sm:flex">
                            <img
                              className="aspect-square  w-[2.8rem] h-[2.8rem]"
                              alt="Avatar"
                              src="/images/comment.svg"
                            />
                          </span>
                          <div className="grid gap-1">
                            <p className="text-[1.2rem] text-[#00000080] font-poppins font-normal ">
                              Zahid Moufin
                            </p>
                            <p className=" flex items-center text-[1rem] text-[#00000080] font-poppins font-normal line-clamp-1">
                              <span className="mr-2">
                                {' '}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                >
                                  <path
                                    d="M7.50035 1.40625C6.44828 1.40602 5.41407 1.67818 4.49839 2.19623C3.58271 2.71428 2.81675 3.46058 2.27506 4.36248C1.73338 5.26438 1.43442 6.29117 1.4073 7.34289C1.38017 8.39461 1.6258 9.43544 2.12028 10.3641L1.45524 12.3592C1.40015 12.5244 1.39215 12.7016 1.43215 12.8711C1.47214 13.0406 1.55855 13.1956 1.68167 13.3187C1.8048 13.4418 1.95978 13.5282 2.12926 13.5682C2.29873 13.6082 2.47599 13.6002 2.64117 13.5451L4.63629 12.8801C5.45354 13.3148 6.35907 13.5575 7.28416 13.59C8.20924 13.6225 9.12957 13.4437 9.97528 13.0674C10.821 12.6911 11.5698 12.127 12.165 11.4181C12.7602 10.7091 13.186 9.87392 13.4102 8.97582C13.6344 8.07772 13.651 7.14035 13.4588 6.23487C13.2667 5.32938 12.8707 4.47957 12.3011 3.74995C11.7314 3.02033 11.0031 2.43007 10.1712 2.02398C9.33941 1.61788 8.42601 1.40663 7.50035 1.40625ZM7.50035 12.6562C6.59389 12.6569 5.70334 12.4182 4.91871 11.9643C4.86126 11.9309 4.79739 11.9102 4.73133 11.9034C4.66527 11.8967 4.59852 11.904 4.53551 11.925L2.3441 12.6562L3.07477 10.4648C3.09583 10.4019 3.10327 10.3351 3.09661 10.2691C3.08994 10.203 3.06931 10.1391 3.0361 10.0816C2.46772 9.09897 2.23952 7.9562 2.38689 6.8306C2.53427 5.705 3.04898 4.6595 3.85119 3.85628C4.65339 3.05307 5.69824 2.53703 6.82365 2.38824C7.94906 2.23944 9.09212 2.4662 10.0755 3.03333C11.0589 3.60047 11.8276 4.47627 12.2625 5.52489C12.6973 6.57351 12.774 7.73633 12.4805 8.83294C12.187 9.92956 11.5399 10.8987 10.6394 11.59C9.73897 12.2813 8.63556 12.6561 7.50035 12.6562Z"
                                    fill="#979BA4"
                                  />
                                </svg>
                              </span>{' '}
                              13 Comments
                            </p>
                          </div>
                          <div className="ml-auto text-blue font-poppins font-medium cursor-pointer hover:text-[#8598ff]">
                            View
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Div>
  );
});

const Div = styled.div``;
