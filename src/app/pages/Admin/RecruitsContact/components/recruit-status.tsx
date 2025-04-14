import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function RecruitStatus() {
  const form = useFormContext();
  const agentStatus = form.watch('status');

  const isStatusActive = status => agentStatus >= status;

  return (
    <React.Fragment>
      <div className="h-[15px] w-full rounded-full bg-gray-300 flex items-center justify-between">
        <div className="text-center mb-[-25px]">
          <button
            onClick={() => form.setValue('status', 1)}
            className={`${isStatusActive(1)
                ? 'bg-gradient-to-r from-blue-800 to-white h-[35px] w-[35px] rounded-full border-none font-extrabold flex justify-center items-center text-[2rem] text-white'
                : 'bg-gray-300 h-[35px] w-[35px] rounded-full border-none'
              }`}
          >
            {isStatusActive(1) && (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </button>
          <p className="text-[14px] ml-[-40px] mr-[-45px] font-semibold text-gray-500">
            New
          </p>
        </div>
        <div
          className={`${isStatusActive(2)
              ? 'bg-blue-700 flex-1 w-full h-full'
              : 'bg-gray-300 flex-1 w-full h-full'
            }`}
        ></div>
        <div className="text-center mb-[-25px] mx-0">
          <button
            onClick={() => form.setValue('status', 2)}
            className={`${isStatusActive(2)
                ? 'bg-gradient-to-r from-blue-800 to-white h-[35px] w-[35px] rounded-full border-none font-extrabold flex justify-center items-center text-[2rem] text-white'
                : 'bg-gray-300 h-[35px] w-[35px] rounded-full border-none'
              }`}
          >
            {isStatusActive(2) && (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </button>
          <p className="text-[14px] ml-[-40px] mr-[-45px] font-semibold text-gray-500">
            Responded
          </p>
        </div>
        <div
          className={`${isStatusActive(3)
              ? 'bg-blue-700 flex-1 w-full h-full'
              : 'bg-gray-300 flex-1 w-full h-full'
            }`}
        ></div>
        <div className="text-center mb-[-25px]">
          <button
            onClick={() => form.setValue('status', 3)}
            className={`${isStatusActive(3)
                ? 'bg-gradient-to-r from-blue-800 to-white h-[35px] w-[35px] rounded-full border-none font-extrabold flex justify-center items-center text-[2rem] text-white'
                : 'bg-gray-300 h-[35px] w-[35px] rounded-full border-none'
              }`}
          >
            {isStatusActive(3) && (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </button>
          <p className="text-[14px] ml-[-40px] mr-[-45px] font-semibold text-gray-500">
            Nurturing
          </p>
        </div>
        <div
          className={`${isStatusActive(4)
              ? 'bg-blue-700 flex-1 w-full h-full'
              : 'bg-gray-300 flex-1 w-full h-full'
            }`}
        ></div>
        <div className="text-center mb-[-25px]">
          <button
            onClick={() => form.setValue('status', 4)}
            className={`${isStatusActive(4)
                ? 'bg-gradient-to-r from-blue-800 to-white h-[35px] w-[35px] rounded-full border-none font-extrabold flex justify-center items-center text-[2rem] text-white'
                : 'bg-gray-300 h-[35px] w-[35px] rounded-full border-none'
              }`}
          >
            {isStatusActive(4) && (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </button>
          <p className="text-[14px] ml-[-40px] mr-[-45px] font-semibold text-gray-500">
            Working
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
