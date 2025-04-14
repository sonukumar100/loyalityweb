import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ClientStatuses() {
  const form = useFormContext();
  const clientStatuses = form.watch('clientStatuses');
  const isStatusActive = status => clientStatuses >= status;
  const isPreviousStatus = status => clientStatuses === status + 1;

  console.log("clientStatuses,", clientStatuses);

  return (
    <React.Fragment>
      <div className="bg-[#EAECF0] w-full rounded-[6rem] mb-32 pr-14">
        <div className="track-progessbar w-full rounded-[6rem] h-[2.4rem]">
          <div className="relative mt-[5rem]">
            <ul className="list-none flex justify-between">
              {['New', 'Responded', 'Nurturing', 'Working', 'Past Client'].map((status, index) => {
                const statusValue = index + 1; // Because the status is 1-based index
                console.log("isStatusActive(statusValue - 1),", isStatusActive(statusValue - 1));

                return (
                  <li
                    key={status}
                    onClick={() => form.setValue('clientStatuses', statusValue)}
                    className={`${isStatusActive(statusValue) ? 'active' : ''} `}
                  >
                    <div className={isPreviousStatus(statusValue - 1) ? 'track-progessbar' : 'bar'}></div>
                    <div className="gray-circle"></div>
                    <div className="q">
                      <img
                        src="/images/check.svg"
                        className="absolute left-[1rem] top-[1rem]"
                        width={16}
                      />
                    </div>
                    <span className="absolute bottom-[-5.5rem] text-[1.2rem] text-center left-[-.8rem] inline-block text-[#667085] w-max">
                      {status}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
