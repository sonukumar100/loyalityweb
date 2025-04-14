import { Button } from 'app/components/ui/button';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'app/components/ui/sheet';
import { selectAdminEdit } from '../buildersSlice/selectors';

import { ChevronLeft } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'app/components/ui/use-toast';
import { BuildersTab } from './builder-tab';
import { useBuilderSlice } from '../buildersSlice';

export function ManageBuilders() {
  const form = useFormContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const editSelector = useSelector(selectAdminEdit);
  const queryParams = new URLSearchParams(window.location.search);
  const label = queryParams.get('label') || '';
  const handleChange = val => {
    queryParams.set('label', val);
    navigate(`?${queryParams.toString()}`, { replace: true });
  };
  const { actions } = useBuilderSlice();

  React.useEffect(() => {
    form.reset(editSelector);
    form.setValue('name', editSelector?.name);
    form.setValue('builderCompany', editSelector?.builderCompany);
    form.setValue('campaign', editSelector?.campaign);
    form.setValue('birthday', editSelector?.birthday);
    if (editSelector) {
      setOpen(true);
    }
    console.log('editSelector', editSelector);
  }, [editSelector]);

  const closeEdit = () => {
    form.reset({
      name: '',
      phone: '',
      email: '',
      builderCompany: '',
      favoriteHobby: '',
      assignedLoanOfficer: '',
      assignedAgent: '',
      assignedBuilder: '',
    });
    dispatch(actions.setEditBuilder({ data: null }));
    setOpen(true);
  };
  return (
    <>
      {true && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <div className="flex items-center bg-white rounded-20 p-6 border-2 cursor-pointer border-white  hover:border-blue">
              <img
                src="/images/Frame2.svg"
                alt=""
                className="h-[4.4rem] w-[4.4rem] flex-none rounded-full"
              />
              <div className="ml-4 flex-auto">
                <div className="font-medium text-md leading-0 font-poppins">
                  Builder
                </div>
              </div>
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 12H20M20 12L14 6M20 12L14 18"
                    stroke="#101828"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </SheetTrigger>
          <SheetContent
            onInteractOutside={e => e.preventDefault()}
            className="bg-[#ffffff82] backdrop-blur-[4rem]"
          >
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild>
                  <div
                    onClick={() => {
                      handleChange('true');
                      closeEdit();
                    }}
                    className="flex items-center mb-8 mt-4  cursor-pointer"
                  >
                    <div>
                      {' '}
                      <span>
                        <figcaption className="flex justify-center items-center bg-white  border w-20 h-20 rounded-full text-center">
                          <ChevronLeft />
                        </figcaption>
                      </span>{' '}
                    </div>
                    <div className="text-md font-poppins text-[#101828] ml-6 font-medium leading-0">
                      {' '}
                      Back
                    </div>
                  </div>
                </SheetClose>
              </SheetTitle>
            </SheetHeader>
            <BuildersTab />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
