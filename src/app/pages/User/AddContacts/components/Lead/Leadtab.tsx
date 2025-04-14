import { Button } from 'app/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'app/components/ui/tabs';
import { LeadAddressInfo } from './add-lead-address-info';
import { AddLeadAssignAgent } from './add-lead-assign-aggent';
import { Sms } from '../../../../../components/Shared/sms';
import { Leadtask } from './lead-task';
import { Loans } from './lead-loans';
import { ManageLead } from './manage-lead';
import { AddLeadFormProfile } from './add-lead-form-profile';
import { useFormContext } from 'react-hook-form';
import { useLeadSlice } from '../../slice';
import { useEffect, useState } from 'react';
import { cleanPhoneNumber, formatPhoneNumber } from 'utils/formatePhoneNumber';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from 'app/components/ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminEdit } from '../../slice/selectors';
import { useToast } from 'app/components/ui/use-toast';
import {
  SheetClose,
} from 'app/components/ui/sheet';
import { removeEmptyKeys } from 'app/components/Shared/removeEmptyKeys';
import { Leadnote } from './lead-note';
import { Leadactivity } from './lead-activity';
export function LeadTab() {
  const form = useFormContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { useAddLeadMutation, useUpdateLeadMutation, useLoanListQuery } =
    useLeadSlice();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { actions } = useLeadSlice();
  ///// EDIT LEAD /////////
  const [activeTab, setActiveTab] = useState('account');
  const editSelector = useSelector(selectAdminEdit);
  console.log('editSelector lead', editSelector);
  const queryParams = new URLSearchParams(window.location.search);
  const label = queryParams.get('label') || '';
  const handleChange = val => {
    queryParams.set('label', val);
    navigate(`?${queryParams.toString()}`, { replace: true });
  };
  useEffect(() => {
    console.log('editSelector lead', editSelector);
    form.reset(editSelector);
    form.setValue('state', editSelector?.state?.[0]?._id);
    form.setValue('phone', formatPhoneNumber(editSelector?.phone));
    form.setValue('clientStatuses', editSelector?.clientStatuses);
    form.setValue('campaign', editSelector?.campaign?.[0]?._id);
    form.setValue('leadSource', editSelector?.leadSource);
    form.setValue('currentAddress', editSelector?.currentAddress);
    form.setValue('assignedAgent', editSelector?.assignedAgent?.[0]?._id);
    form.setValue('assignedBuilder', editSelector?.assignedBuilder?.[0]?._id);
    form.setValue(
      'assignedLoanOfficer',
      editSelector?.assignedLoanOfficer?.[0]?._id,
    );
    if (editSelector) {
      setOpen(true);
    }
  }, [editSelector]);
  /////// ADD LEAD ////////
  const [
    addLead,
    {
      isLoading: isAddLead,
      isSuccess: isAddLeadSuccess,
      data: isAddLeadData,
      error: isAddLeadError,
    },
  ] = useAddLeadMutation();
  /////// UPDATE LEAD ////////
  const [
    updateLead,
    {
      isLoading: isUpdateLead,
      isSuccess: isUpdateLeadSuccess,
      data: isUpdateLeadData,
      error: isUpdateLeadError,
    },
  ] = useUpdateLeadMutation();
  //// LOAN LIST //////
  const [
    loanList,
    {
      isLoading: isLoanList,
      isSuccess: isLoanListSuccess,
      data: isLoanListData,
      error: isLoanListError,
    },
  ] = useLoanListQuery();
  let payload = {
    page: 1,
    isInInquiry: false,
    leadId: editSelector?._id,
  };
  useEffect(() => {
    if (activeTab == 'Loans' && editSelector?._id) {
      loanList(payload);
    } else if (activeTab == 'Loan-Inquiry' && editSelector?._id) {
      payload.isInInquiry = true;
      loanList(payload);
    }
  }, [activeTab]);
  ///// ADD UPDATE LEAD/////
  const handleFormSubmit = (data: any) => {
    console.log('data', data);
    let cleanedPayload = removeEmptyKeys(data);
    let payload = {
      ...cleanedPayload,
    };
    if (payload?.phone) {
      payload.phone = cleanPhoneNumber(data.phone);
    }
    if (editSelector) {
      payload.leadId = data?._id;
      console.log(payload);
      updateLead(payload);
    } else {
      addLead(payload);
    }
  };
  /// ALL API RESPONSE THAT COMPONENT////
  useEffect(() => {
    if (isAddLeadSuccess) {
      toast({
        description: 'Lead added successfully',
      });
      navigate('/admin/contacts/leads');
      setOpen(true);
      const transformedData = {
        ...isAddLeadData?.data,
        campaign: [{ _id: isAddLeadData?.data?.campaign }],
        state: [{ _id: isAddLeadData?.data?.state }]
      };
      dispatch(actions.setEdit({ data: transformedData }));
    } else if (isAddLeadError) {
      toast({
        description: `${isAddLeadError?.[0]}`,
        variant: 'destructive',
      });
    } else if (isUpdateLeadSuccess) {
      navigate('/admin/contacts/leads');
      const transformedData = {
        ...isUpdateLeadData?.data,
        campaign: [{ _id: isUpdateLeadData?.data?.campaign }],
        state: [{ _id: isUpdateLeadData?.data?.state }]
      };
      console.log('transformedData', transformedData);
      dispatch(actions.setEdit({ data: transformedData }));
      setOpen(true);
      toast({
        description: `Lead updated Successfully`,
      });
      // handleChange('true')
    } else if (isUpdateLeadError) {
      toast({
        description: `${isUpdateLeadError?.[0]}`,
        variant: 'destructive',
      });
    }
  }, [
    isAddLeadSuccess,
    isAddLeadError,
    isUpdateLeadSuccess,
    isUpdateLeadError,
  ]);
  const closeEdit = () => {
    form.reset({
      campaign: '',
      clientStatuses: '',
      fullName: '',
      phone: '',
      email: '',
      currentAddress: '',
      state: 'IL',
      favoriteHobby: '',
      favoriteDrinkOrFood: '',
      kidsOrAnimal: '',
      dob: '',
      leadSource: '',
      assignedLoanOfficer: '',
      assignedAgent: '',
      assignedBuilder: '',
    });
    // setProfileImage(null);
    dispatch(actions.setEdit({ data: null }));
    // setEditSelector(null);
    setOpen(true);
  };

  const handleTabChange = value => {
    setActiveTab(value);
    console.log('Active tab:', value); // You can perform other actions based on the active tab value
  };
  return (
    <div className="mt-12">
      <AddLeadFormProfile />
      <Tabs defaultValue="account" onValueChange={handleTabChange}>
        <TabsList className="flex justify-start space-x-3 tabs-images mt-12">
          <TabsTrigger value="account">
            <div className="accountTab-first">
              <div
                className={`${activeTab == 'account' ? 'active' : ''
                  } bg-[#EAECF0] rounded-full p-[1.4rem]`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.99967 3.33301V16.6663M14.9997 4.99967L4.99967 14.9997M16.6663 9.99967H3.33301M14.9997 14.9997L4.99967 4.99967"
                    stroke="#667085"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="Communication">
            <div
              className={`${activeTab == 'Communication' ? 'active' : ''
                } bg-[#EAECF0] rounded-full p-[1.4rem]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M2.5 6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V11C17.5 12.4001 17.5 13.1002 17.2275 13.635C16.9878 14.1054 16.6054 14.4878 16.135 14.7275C15.6002 15 14.9001 15 13.5 15H8.06979C7.54975 15 7.28972 15 7.04101 15.051C6.82036 15.0963 6.60683 15.1712 6.40624 15.2737C6.18014 15.3892 5.9771 15.5517 5.57101 15.8765L3.58313 17.4668C3.23639 17.7442 3.06302 17.8829 2.91712 17.8831C2.79022 17.8832 2.67019 17.8255 2.59102 17.7263C2.5 17.6123 2.5 17.3903 2.5 16.9463V6.5Z"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </TabsTrigger>
          <TabsTrigger value="Tasks">
            <div
              className={`${activeTab == 'Tasks' ? 'active' : ''
                } bg-[#EAECF0] rounded-full p-[1.4rem]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_153_6249)">
                  <path
                    d="M5.00033 12.5003L6.66699 14.167L10.417 10.417M6.66699 6.66699V4.33366C6.66699 3.40024 6.66699 2.93353 6.84865 2.57701C7.00844 2.2634 7.2634 2.00844 7.57701 1.84865C7.93353 1.66699 8.40024 1.66699 9.33366 1.66699H15.667C16.6004 1.66699 17.0671 1.66699 17.4236 1.84865C17.7372 2.00844 17.9922 2.2634 18.152 2.57701C18.3337 2.93353 18.3337 3.40024 18.3337 4.33366V10.667C18.3337 11.6004 18.3337 12.0671 18.152 12.4236C17.9922 12.7372 17.7372 12.9922 17.4236 13.152C17.0671 13.3337 16.6004 13.3337 15.667 13.3337H13.3337M4.33366 18.3337H10.667C11.6004 18.3337 12.0671 18.3337 12.4236 18.152C12.7372 17.9922 12.9922 17.7372 13.152 17.4236C13.3337 17.0671 13.3337 16.6004 13.3337 15.667V9.33366C13.3337 8.40024 13.3337 7.93353 13.152 7.57701C12.9922 7.2634 12.7372 7.00844 12.4236 6.84865C12.0671 6.66699 11.6004 6.66699 10.667 6.66699H4.33366C3.40024 6.66699 2.93353 6.66699 2.57701 6.84865C2.2634 7.00844 2.00844 7.2634 1.84865 7.57701C1.66699 7.93353 1.66699 8.40024 1.66699 9.33366V15.667C1.66699 16.6004 1.66699 17.0671 1.84865 17.4236C2.00844 17.7372 2.2634 17.9922 2.57701 18.152C2.93353 18.3337 3.40024 18.3337 4.33366 18.3337Z"
                    stroke="#667085"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_153_6249">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </TabsTrigger>
          <TabsTrigger value="Loans">
            <div
              className={`${activeTab == 'Loans' ? 'active' : ''
                } bg-[#EAECF0] rounded-full p-[1.4rem]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5.00033 9.16634V12.4997M15.0003 7.49967V10.833M14.167 3.33301C16.2076 3.33301 17.3113 3.64531 17.8604 3.88754C17.9336 3.9198 17.9701 3.93593 18.0757 4.03665C18.1389 4.09702 18.2544 4.27417 18.2841 4.35641C18.3337 4.49362 18.3337 4.56862 18.3337 4.71863V13.6756C18.3337 14.4329 18.3337 14.8116 18.2201 15.0062C18.1046 15.2042 17.9932 15.2962 17.7769 15.3723C17.5644 15.4471 17.1353 15.3647 16.2771 15.1998C15.6765 15.0844 14.9641 14.9997 14.167 14.9997C11.667 14.9997 9.16699 16.6663 5.83366 16.6663C3.79307 16.6663 2.68938 16.354 2.14023 16.1118C2.06709 16.0795 2.03053 16.0634 1.92499 15.9627C1.86173 15.9023 1.74626 15.7252 1.71655 15.6429C1.66699 15.5057 1.66699 15.4307 1.66699 15.2807L1.66699 6.32372C1.66699 5.56641 1.66699 5.18776 1.78056 4.99313C1.89608 4.79514 2.00748 4.7031 2.22371 4.62702C2.43627 4.55222 2.86535 4.63466 3.72352 4.79955C4.32417 4.91496 5.03656 4.99967 5.83366 4.99967C8.33366 4.99967 10.8337 3.33301 14.167 3.33301ZM12.0837 9.99967C12.0837 11.1503 11.1509 12.083 10.0003 12.083C8.84973 12.083 7.91699 11.1503 7.91699 9.99967C7.91699 8.84908 8.84973 7.91634 10.0003 7.91634C11.1509 7.91634 12.0837 8.84908 12.0837 9.99967Z"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </TabsTrigger>
          <TabsTrigger value="Loan-Inquiry">
            <div className="">
              <div
                className={`${activeTab == 'Loan-Inquiry' ? 'active' : ''
                  } bg-[#EAECF0] rounded-full p-[1.4rem]`}
              >
                <img
                  className="h-8"
                  src="/images/loanEn.svg"
                  alt="Loan Inquiry"
                />
              </div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="Activity">
            <div
              className={`${activeTab == 'Activity' ? 'active' : ''
                } bg-[#EAECF0] rounded-full p-[1.4rem]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.3337 10H15.0003L12.5003 17.5L7.50033 2.5L5.00033 10H1.66699"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </TabsTrigger>
          <TabsTrigger value="Note">
            <div
              className={`${activeTab == 'Note' ? 'active' : ''
                } bg-[#EAECF0] rounded-full p-[1.4rem]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M14.9997 8.33326L11.6664 4.99993M2.08301 17.9166L4.90331 17.6032C5.24789 17.5649 5.42018 17.5458 5.58121 17.4937C5.72408 17.4474 5.86005 17.3821 5.98541 17.2994C6.12672 17.2062 6.2493 17.0836 6.49445 16.8385L17.4997 5.83326C18.4202 4.91279 18.4202 3.4204 17.4997 2.49993C16.5792 1.57945 15.0868 1.57945 14.1664 2.49992L3.16112 13.5052C2.91596 13.7503 2.79339 13.8729 2.70021 14.0142C2.61753 14.1396 2.55219 14.2755 2.50594 14.4184C2.4538 14.5794 2.43466 14.7517 2.39637 15.0963L2.08301 17.9166Z"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <LeadAddressInfo />
            <AddLeadAssignAgent />
            <div className="flex justify-end">
              <SheetClose asChild>
                <Button
                  onClick={() => {
                    setOpen(true);
                    closeEdit();
                    handleChange('true');
                  }}
                  variant="whiteBtn"
                  className="px-14 py-4 border-0 mt-8 rounded-[1rem] mr-4"
                  type="button"
                >
                  Close
                </Button>
              </SheetClose>
              <Button
                variant="blueBtn"
                className="px-14 border-0 mt-8 "
                disabled={isAddLead}
                type="submit"
              >
                {isAddLead ||
                  (isUpdateLead && (
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                  ))}
                {editSelector ? 'Update' : 'Save'}
              </Button>
            </div>
          </form>
        </TabsContent>
        <Leadtask activeTab={activeTab} />
        <Sms sid={editSelector?.conversationSid} />
        <TabsContent value="Loans">
          <div className=" rounded-24 bg-white py-10 px-10">
            <Loans data={isLoanListData} activeTab={activeTab} />
          </div>
        </TabsContent>
        <TabsContent value="Loan-Inquiry">
          <div className=" rounded-24 bg-white py-10 px-10">
            <Loans data={isLoanListData} activeTab={activeTab} />
          </div>
        </TabsContent>

        {/* <TabsContent value="Note">
                    
                </TabsContent> */}
        <Leadactivity />
        <Leadnote />
      </Tabs>
    </div>
  );
}
