import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import { Textarea } from 'app/components/ui/textarea';
import { TabsContent } from 'app/components/ui/tabs';
import { useBuilderSlice } from '../buildersSlice';
import { useForm } from 'react-hook-form';
import { selectAdminEdit } from '../buildersSlice/selectors';
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

export function BuildersNote() {
  const form = useForm();
  const editSelector = useSelector(selectAdminEdit);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  const { useNoteListQuery, useAddNotesQuery } = useBuilderSlice();
  const [
    addNotes,
    {
      isLoading: isAddNotes,
      isSuccess: isAddNotesSuccess,
      data: isAddNotesData,
      error: isAddNotesError,
    },
  ] = useAddNotesQuery();

  const [
    noteList,
    {
      isLoading: isNoteList,
      isSuccess: isNoteListSuccess,
      data: isNoteListData,
      error: isNoteListError,
    },
  ] = useNoteListQuery();

  const [page, setPage] = useState();
  const [notes, setNotes] = useState([]);

  const onSubmit = data => {
    if (editSelector) {
      const body = {
        leadId: editSelector._id,
        leadEmail: editSelector.email,
        note: data.note,
        type: 'Builder',
      };
      addNotes(body);
    }
    console.log(data);
  };

  useEffect(() => {
    if (editSelector?._id) {
      const payload = {
        builderId: editSelector._id,
        page: 1,
        pageSize: 5,
      };
      noteList(payload);
    }
  }, [editSelector?._id]);

  useEffect(() => {
    if (isNoteListSuccess) {
      setNotes(isNoteListData?.data?.documents);
    }
  }, [isNoteListSuccess, isNoteListData]);

  useEffect(() => {
    if (isAddNotesSuccess) {
      form.reset();
      // setNotes([]);
      // setPage(1); // Reset to the first page to reload the data
    }
  }, [isAddNotesSuccess]);

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
