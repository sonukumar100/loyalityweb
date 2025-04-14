import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import { Textarea } from 'app/components/ui/textarea';
import { TabsContent } from 'app/components/ui/tabs';
import { useLeadSlice } from '../../slice';
import { useForm } from 'react-hook-form';
import { selectAdminEdit } from '../../slice/selectors';
import { useSelector } from 'react-redux';
import { imageUrl } from 'utils/settingConfig';
import { dateForMateWithTime } from 'utils/dateformate';
import { Icons } from 'app/components/ui/icons';
import { BadgeInfo } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from 'app/components/ui/hover-card';

export function Leadnote() {
  const form = useForm();
  const editSelector = useSelector(selectAdminEdit);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  const { useAddNotesMutation, useNoteListQuery } = useLeadSlice();
  const [
    addNotes,
    {
      isLoading: isAddNotes,
      isSuccess: isAddNotesSuccess,
      data: isAddNotesData,
      error: isAddNotesError,
    },
  ] = useAddNotesMutation();

  const [
    notList,
    {
      isLoading: isNotList,
      isSuccess: isNotListSuccess,
      data: isNotListData,
      error: isNotListError,
    },
  ] = useNoteListQuery();
  let payload = {
    page: 1,
    leadId: editSelector?._id,
  };

  const [page, setPage] = useState();
  const [notes, setNotes] = useState([]);

  const onSubmit = data => {
    let payload = { ...data };
    payload.leadId = editSelector?._id;
    addNotes(payload);
  };

  useEffect(() => {
    if (editSelector?._id) {
      notList(payload);
    }
  }, [page]);

  useEffect(() => {
    if (isNotListSuccess) {
      setNotes(isNotListData?.data?.documents);
    }
  }, [isNotListSuccess, isNotListData]);

  useEffect(() => {
    if (isAddNotesSuccess) {
      form.reset();
      // setNotes([]);
      // setPage(1); // Reset to the first page to reload the data
    }
  }, [isAddNotesSuccess]);

  // const handleScroll = useCallback(() => {
  //     console.log('handleScroll');

  //     if (
  //         window.innerHeight + document.documentElement.scrollTop !==
  //         document.documentElement.offsetHeight
  //     )
  //         return;
  //     setPage(prevPage => prevPage + 1);
  // }, []);

  // useEffect(() => {
  //     console.log('test');
  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  // }, [handleScroll]);

  return (
    <>
      <TabsContent value="Note">
        <div className="rounded-24 bg-white py-10 px-10">
          {notes.map((item, index) => (
            <div key={index} className="mt-12">
              <div className="bg-[#F9FAFB] p-6 rounded-[1.2rem] mt-6">
                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <span className="relative shrink-0 overflow-hidden rounded-full hidden sm:flex">
                      <img
                        className="aspect-square w-[5.4rem] h-[5.4rem]"
                        alt="Avatar"
                        src={
                          item?.admin?.[0]?.avatar
                            ? imageUrl + item?.admin?.[0]?.avatar
                            : '/images/Avatar.svg'
                        }
                      />
                    </span>
                    <div className="grid gap-1 relative">
                      <p className="text-xs text-black font-poppins font-medium">
                        {item?.admin?.[0]?.fullName}
                      </p>

                      <HoverCard openDelay={200}>
                        <HoverCardTrigger asChild>
                          <p className="text-base cursor-pointer text-[#3A3B41] font-poppins font-normal line-clamp-1">
                            {item?.note}
                          </p>
                        </HoverCardTrigger>
                        {item?.note?.length > 39 ? (
                          <HoverCardContent className="w-[38rem] bg-[#ffffff82] backdrop-blur-[4rem] rounded-[1rem] ">
                            <p className="text-base text-[#3A3B41] font-poppins font-normal  leading-10 p-2">
                              {item?.note}
                            </p>
                          </HoverCardContent>
                        ) : null}
                      </HoverCard>

                      {/* <div className=" absolute right-8">
                                                <BadgeInfo />
                                            </div> */}
                    </div>
                    <div className="ml-auto text-base font-normal text-[#667085] w-[10.4rem] leading-[2.6rem] ">
                      {dateForMateWithTime(item?.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t w-full mt-10"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10">
              <label
                htmlFor="Notes"
                className="text-[#344054] text-base font-medium font-poppins"
              >
                Notes
              </label>
              <Textarea
                {...register(`note`, {
                  required: true,
                })}
                placeholder="Type your message here."
                className="focus-visible:ring-0 border mt-4 rounded-[.8rem] p-4 h-[15.3rem] resize-none text-[#000] placeholder:text-xs placeholder:text-[#667085] font-poppins font-normal"
              />
            </div>
            <div className="mt-16">
              <Button
                variant="blueBtn"
                type="submit"
                disabled={!editSelector || isAddNotes}
                className="px-6 h-[4.7rem] w-full rounded-full"
              >
                {isAddNotes && (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add note
              </Button>
            </div>
          </form>
        </div>
      </TabsContent>
    </>
  );
}
