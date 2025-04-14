import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'app/components/ui/card';
import { Button } from 'app/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'app/components/ui/tabs';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminEdit } from '../buildersSlice/selectors';
import { SheetClose } from 'app/components/ui/sheet';
import { AddLoanOfficer } from './add-loan-officer';
import { Sms } from 'app/components/Shared/sms';
import { AddBuildersAddress } from './add-builder-address-info';
import { AddBuilderFormProfile } from './add-builder-form-profile';
import { removeEmptyKeys } from 'app/components/Shared/removeEmptyKeys';
import { cleanPhoneNumber, formatPhoneNumber } from 'utils/formatePhoneNumber';
import { useBuilderSlice } from '../buildersSlice';
import { toast, useToast } from 'app/components/ui/use-toast';
import { Loans } from 'app/pages/User/AddContacts/components/Lead/lead-loans';
import { Icons } from 'app/components/ui/icons';
import { BuildersNote } from './builders-note';

export function BuildersTab() {
  const form = useFormContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { actions } = useBuilderSlice();
  const editSelector = useSelector(selectAdminEdit);
  // console.log(editSelector);

  const { useAddBuilderMutation, useUpdateBuilderMutation } = useBuilderSlice();

  const queryParams = new URLSearchParams(window.location.search);
  const label = queryParams.get('label') || '';
  const handleChange = val => {
    queryParams.set('label', val);
    navigate(`?${queryParams.toString()}`, { replace: true });
  };
  ///// EDIT BUILDER /////////
  useEffect(() => {
    form.reset(editSelector);
    form.setValue('state', editSelector?.state?.[0]?._id);
    form.setValue('campaign', editSelector?.campaign?.[0]?._id);
    form.setValue('phone', formatPhoneNumber(editSelector?.phone));
    if (editSelector) {
      setOpen(true);
    }
  }, [editSelector]);
  console.log(editSelector);

  const [
    addBuilder,
    {
      isLoading: isAddBuilder,
      isSuccess: isAddBuilderSuccess,
      data: isAddBuilderData,
      error: isAddBuilderError,
    },
  ] = useAddBuilderMutation();

  const [
    updateBuilder,
    {
      isLoading: isUpdateBuilder,
      isSuccess: isUpdateBuilderSuccess,
      data: isUpdateBuilderData,
      error: isUpdateBuilderError,
    },
  ] = useUpdateBuilderMutation();

  const handleFormSubmit = (data: any) => {
    let cleanedPayload = removeEmptyKeys(data);
    console.log(data);
    let payload = {
      ...cleanedPayload,
    };
    if (payload?.assignedLoanOfficer?.length === 0) {
      delete payload.assignedLoanOfficer;
    }
    if (payload?.phone === editSelector?.phone) {
      delete payload?.phone;
    }
    if (Array.isArray(payload?.assignedLoanOfficer)) {
      payload.assignedLoanOfficer = payload?.assignedLoanOfficer?.[0]?._id;
    }
    if (editSelector) {
      updateBuilder(payload);
    } else {
      addBuilder(payload);
    }
  };
  /// ALL API RESPONSE THAT COMPONENT////
  useEffect(() => {
    if (isAddBuilderSuccess) {
      toast({
        description: 'Builder added successfully',
      });
      navigate('/admin/contacts/builders');
      setOpen(true);
      console.log(' isAddBuilderData', isAddBuilderData);
      dispatch(actions.setEditBuilder({ data: isAddBuilderData?.data }));

      // handleChange('true')
    } else if (isAddBuilderError) {
      toast({
        description: `${isAddBuilderError?.[0]}`,
        variant: 'destructive',
      });
    } else if (isUpdateBuilderSuccess) {
      navigate('/admin/contacts/builders');
      // handleChange("true");
      setOpen(true);
      toast({
        description: `Builder updated Successfully`,
      });
      // handleChange('true')
    } else if (isUpdateBuilderError) {
      toast({
        description: `${isUpdateBuilderError?.[0]}`,
        variant: 'destructive',
      });
    }
  }, [
    isAddBuilderSuccess,
    isAddBuilderError,
    isUpdateBuilderSuccess,
    isUpdateBuilderError,
  ]);

  const closeEdit = () => {
    form.reset({
      campaign: '',
      name: '',
      phone: '',
      email: '',
      builderCompany: '',
      favouriteHobby: '',
      birthday: '',
      assignedLoanOfficer: '',
      assignedBuilder: '',
    });
    // setProfileImage(null);
    dispatch(actions.setEditBuilder({ data: null }));
    // setEditSelector(null);
    setOpen(true);
  };
  const [activeTab, setActiveTab] = useState('account');

  const handleTabChange = value => {
    setActiveTab(value);
    console.log('Active tab:', value); // You can perform other actions based on the active tab value
  };
  return (
    <div className="mt-12">
      <AddBuilderFormProfile />
      <Tabs defaultValue="account" onValueChange={handleTabChange}>
        <TabsList className="flex justify-start space-x-3 mt-5 tabs-images">
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
            <AddBuildersAddress />
            <AddLoanOfficer />
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
                type="submit"
              >
                {isAddBuilder ||
                  (isUpdateBuilder && (
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                  ))}
                {editSelector ? 'Update' : 'Save'}
              </Button>
            </div>
          </form>
        </TabsContent>
        <Sms sid={editSelector?.conversationSid} />
        <TabsContent value="Loan-Inquiry">
          <Card>
            <CardHeader>
              <CardTitle>Loan Inquiry Tab</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
          </Card>
        </TabsContent>
        <BuildersNote />
      </Tabs>
    </div>
  );
}
