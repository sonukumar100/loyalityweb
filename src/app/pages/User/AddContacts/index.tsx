import React, { memo, useEffect } from 'react';
import { Form } from 'app/components/ui/form';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Button } from 'app/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'app/components/ui/sheet';

import { ChevronLeft } from 'lucide-react';
import { ManageLead } from './components/Lead/manage-lead';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminEdit } from './slice/selectors';
import { selectAdminEdit as agentEdit } from 'app/pages/Admin/AgentsContact/agentSlice/selectors';
import { selectAdminEdit as builderEdit } from 'app/pages/Admin/BuildersContact/buildersSlice/selectors';
import { selectAdminEdit as recruitEdit } from 'app/pages/Admin/RecruitsContact/recruitsSlice/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { LeadTab } from './components/Lead/Leadtab';
import { ManageAgents } from 'app/pages/Admin/AgentsContact/components/manage-agents';
import { ManageBuilders } from 'app/pages/Admin/BuildersContact/components/manage-builder';
import { ManageRecruiters } from 'app/pages/Admin/RecruitsContact/components/manage-recruiter';

interface Props {}

export const AddContacts = memo((props: Props) => {
  const location = useLocation(); // Using React Router's useLocation hook
  const form = useForm({});
  const [open, setOpen] = React.useState(false);
  const editSelector = useSelector(selectAdminEdit);
  const agentEditSelector = useSelector(agentEdit);
  const builderEditSelector = useSelector(builderEdit);
  const recruitEditSelector = useSelector(recruitEdit);
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const label = queryParams.get('label');
  }, [location.search]);
  useEffect(() => {
    if (
      editSelector ||
      agentEditSelector ||
      builderEditSelector ||
      recruitEditSelector
    ) {
      setOpen(true);
    }
  }, [
    editSelector,
    agentEditSelector,
    builderEditSelector,
    recruitEditSelector,
  ]);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const label = queryParams.get('label');
    if (label) {
      setOpen(false);
      queryParams.delete('label');
      navigate(`?${queryParams.toString()}`, { replace: true });
    }
  }, [location.search]);
  return (
    <>
      <Sheet aria-describedby={false} open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="blueBtn"
            type="button"
            className="font-poppins font-base font-normal rounded-full text-base py-5 px-8  hover:to-blue-700"
          >
            Add{' '}
            <span className="ml-2">
              {' '}
              <Plus className="w-7" />
            </span>
          </Button>
        </SheetTrigger>

        <SheetContent
          onInteractOutside={e => e.preventDefault()}
          className={`${
            editSelector ||
            agentEditSelector ||
            builderEditSelector ||
            recruitEditSelector
              ? 'invisible'
              : 'bg-[#ffffff82]'
          } backdrop-blur-[2.5rem]`}
        >
          <span
            className={
              editSelector ||
              agentEditSelector ||
              builderEditSelector ||
              recruitEditSelector
                ? 'invisible'
                : 'visible'
            }
          >
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild>
                  <div className="flex items-center mb-8 mt-4  cursor-pointer">
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
            <div className="grid py-4 px-10 mt-28">
              <div className="text-black font-medium text-30 font-poppins">
                Select the contact you need
              </div>
              <div className="mt-10">
                <div className="space-y-4">
                  <>
                    <Form {...form}>
                      <ManageLead />
                    </Form>
                  </>
                  <>
                    <Form {...form}>
                      <ManageAgents />
                    </Form>
                  </>
                  {/* <div className="flex items-center bg-white rounded-20 p-6 border-2 cursor-pointer border-white  hover:border-blue">
                    <img
                      src="/images/Frame2.svg"
                      alt=""
                      className="h-[4.4rem] w-[4.4rem] flex-none rounded-full"
                    />
                    <div className="ml-4 flex-auto">
                      <div className="font-medium text-md leading-0 font-poppins">
                        Agent
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
                  </div> */}
                  <>
                    <Form {...form}>
                      <ManageBuilders />
                    </Form>
                  </>
                  <>
                    <Form {...form}>
                      <ManageRecruiters />
                    </Form>
                  </>
                </div>
              </div>
            </div>
          </span>
        </SheetContent>
      </Sheet>
    </>
  );
});
