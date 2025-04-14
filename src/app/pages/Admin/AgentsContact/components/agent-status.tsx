import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function AgentStatus() {
  const form = useFormContext();
  const agentStatus = form.watch('status');

  const isStatusActive = status => agentStatus >= status;

  return (
    <React.Fragment>
      {/* <div className="h-[15px] w-full rounded-full bg-[#EDF0F5] flex items-center justify-between">
        <div className="text-center mb-[-25px]">
          <button
            onClick={() => form.setValue('status', 1)}
            className={`${isStatusActive(1)
                ? 'bg-gradient-to-r from-blue-800 to-white h-[4rem] w-[4rem] rounded-full border-none font-extrabold flex justify-center items-center text-[2rem] text-white'
                : 'bg-[#e8e8e86e] backdrop-blur-[.5rem] h-[4rem] w-[4rem] rounded-full border-none'
              }`}
          >
            {isStatusActive(1) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M13.4704 4L6.13704 11.3333L2.80371 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </button>
          <div className="text-[1.2rem] font-poppins ml-[-40px] mr-[-45px] text-[#667085]">
            New
          </div>
        </div>
        <div
          className={`${isStatusActive(2)
              ? 'bg-[#00F] flex-1 w-full h-full rounded-full'
              : 'bg-[#EDF0F5] flex-1 w-full h-full'
            }`}
        ></div>
        <div className="text-center mb-[-25px] mx-0">
          <button
            onClick={() => form.setValue('status', 2)}
            className={`${isStatusActive(2)
                ? 'bg-gradient-to-r from-blue-800 to-white h-[4rem] w-[4rem] rounded-full border-none font-extrabold flex justify-center items-center text-[2rem] text-white'
                : ' bg-[#e8e8e86e] backdrop-blur-[.5rem] h-[4rem] w-[4rem] rounded-full border-none'
              }`}
          >
            {isStatusActive(2) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M13.4704 4L6.13704 11.3333L2.80371 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </button>
          <div className="text-[1.2rem] font-poppins ml-[-40px] mr-[-45px] text-[#667085]">
            Responded
          </div>
        </div>
        <div
          className={`${isStatusActive(3)
              ? 'bg-[#00F] flex-1 w-full h-full rounded-full'
              : 'bg-[#EDF0F5] flex-1 w-full h-full'
            }`}
        ></div>
        <div className="text-center mb-[-25px]">
          <button
            onClick={() => form.setValue('status', 3)}
            className={`${isStatusActive(3)
                ? 'bg-gradient-to-r from-blue-800 to-white h-[4rem] w-[4rem] rounded-full border-none font-extrabold flex justify-center items-center text-[2rem] text-white'
                : 'bg-[#e8e8e86e] backdrop-blur-[.5rem] h-[35px] w-[35px] rounded-full border-none'
              }`}
          >
            {isStatusActive(3) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M13.4704 4L6.13704 11.3333L2.80371 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </button>
          <div className="text-[1.2rem] font-poppins ml-[-40px] mr-[-45px] text-[#667085]">
            Nurturing
          </div>
        </div>
        <div
          className={`${isStatusActive(4)
              ? 'bg-[#00F] flex-1 w-full h-full rounded-full'
              : 'bg-[#EDF0F5] flex-1 w-full h-full'
            }`}
        ></div>
        <div className="text-center mb-[-25px]">
          <button
            onClick={() => form.setValue('status', 4)}
            className={`${isStatusActive(4)
                ? 'bg-gradient-to-r from-blue-800 to-white h-[4rem] w-[4rem] rounded-full border-none font-extrabold flex justify-center items-center text-[2rem] text-white'
                : 'bg-[#e8e8e86e] backdrop-blur-[.5rem] h-[35px] w-[35px] rounded-full border-none'
              }`}
          >
            {isStatusActive(4) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M13.4704 4L6.13704 11.3333L2.80371 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </button>
          <div className="text-[1.2rem] font-poppins ml-[-40px] mr-[-45px] text-[#667085]">
            Working
          </div>
        </div>
      </div> */}
      <div className="bg-[#EAECF0] w-full rounded-[6rem] mb-32 pr-14">
        <div className="track-progessbar w-full rounded-[6rem] h-[2.4rem]">
          <div className="relative mt-[5rem]">
            <ul className="list-none flex  justify-between">
              <li
                onClick={() => form.setValue('clientStatuses', 1)}
                className={isStatusActive(1) ? 'active' : ''}
              >
                <div className="bar"></div>
                <div className="gray-circle"></div>
                <div className="q cursor-pointer">
                  <img
                    src="/images/check.svg"
                    className=" absolute left-[1rem] top-[1rem]"
                    width={16}
                  />
                </div>
                <span className=" absolute bottom-[-5.5rem] text-[1.2rem] text-center left-[-.8rem] inline-block  text-[#667085] w-max">
                  New
                </span>
              </li>
              <li
                onClick={() => form.setValue('clientStatuses', 2)}
                className={isStatusActive(2) ? 'active' : ''}
              >
                <div className="bar"></div>
                <div className="gray-circle"></div>
                <div className="q cursor-pointer">
                  <img
                    src="/images/check.svg"
                    className=" absolute left-[1rem] top-[1rem]"
                    width={16}
                  />
                </div>
                <span className=" absolute bottom-[-5.5rem] text-[1.2rem] text-center left-[-.8rem] inline-block  text-[#667085] w-max">
                  Responded
                </span>
              </li>
              <li
                onClick={() => form.setValue('clientStatuses', 3)}
                className={isStatusActive(3) ? 'active' : ''}
              >
                <div className="bar"></div>
                <div className="gray-circle"></div>
                <div className="q cursor-pointer">
                  <img
                    src="/images/check.svg"
                    className=" absolute left-[1rem] top-[1rem]"
                    width={16}
                  />
                </div>
                <span className=" absolute bottom-[-5.5rem] text-[1.2rem] text-center left-[-.8rem] inline-block  text-[#667085] w-max">
                  Nurturing
                </span>
              </li>
              <li
                className={isStatusActive(4) ? 'active' : ''}
                onClick={() => form.setValue('clientStatuses', 4)}
              >
                <div className="bar"></div>
                <div className="gray-circle"></div>
                <div className="q cursor-pointer">
                  <img
                    src="/images/check.svg"
                    className=" absolute left-[1rem] top-[1rem]"
                    width={16}
                  />
                </div>
                <span className=" absolute bottom-[-5.5rem] text-[1.2rem] text-center left-[-.8rem] inline-block  text-[#667085] w-max">
                  Working
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
