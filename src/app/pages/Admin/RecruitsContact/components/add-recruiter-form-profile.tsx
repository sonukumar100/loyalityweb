import React, { forwardRef } from 'react';
import { Input } from 'app/components/ui/input';
import { Label } from 'app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'app/components/ui/select';
import { useAdminSlice } from 'app/pages/Admin/slice';
import { Pencil, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { imageUrl, settingConfig } from 'utils/settingConfig';
import { useLeadSlice } from 'app/pages/User/AddContacts/slice';
import { useSelector } from 'react-redux';
import { selectAdminEdit } from '../recruitsSlice/selectors';
import { formatToUSD } from 'utils/formatAmount';
import RecruitStatus from './recruit-status';

export function AddRecruiterFormProfile() {
  const form = useFormContext();
  const [profileImage, setProfileImage] = useState(null);
  const editSelector = useSelector(selectAdminEdit);
  useEffect(() => {
    if (editSelector?.avatar) {
      setProfileImage(editSelector?.avatar);
    }
  }, [editSelector]);
  const { useUploadFileMutation } = useAdminSlice();
  ///////////// file upload ////////////////
  const [
    fileUpload,
    {
      isLoading: isfileUpload,
      isSuccess: isfileUploadSuccess,
      data: fileData,
      error: fileUploadError,
    },
  ] = useUploadFileMutation();
  const handleFileUpload = event => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      fileUpload(formData);
    }
  };
  useEffect(() => {
    if (fileData) {
      setProfileImage(fileData?.data?.image[0]);
      form.setValue('avatar', fileData?.data?.image[0]);
    }
  }, [fileData?.data?.image[0]]);
  //////// CAMPAGIAN LIST ////////////
  const { useCampaiganListQuery, useGetStatesQuery } = useLeadSlice();

  const [
    states,
    {
      isLoading: statesLoading,
      isSuccess: statesSuccess,
      data: statesData,
      error: statesError,
    },
  ] = useGetStatesQuery();

  const statesList = statesData?.data;

  useEffect(() => {
    states({});
  }, [form.watch('state')]);
  const [
    campaignList,
    {
      isLoading: iscampaignList,
      isSuccess: iscampaignListSuccess,
      data: iscampaignListData,
      error: iscampaignListError,
    },
  ] = useCampaiganListQuery();
  useEffect(() => {
    campaignList('');
  }, []);
  const campaignListData = iscampaignListData?.data?.documents;
  const selectedClientStatus = form.watch('clientStatuses');

  const selectedOption = settingConfig.clientStatus.find(
    item => item.key === selectedClientStatus,
  );

  // Determine the display text based on whether an option is selected
  const displayText = selectedOption ? selectedOption.value : 'Select'; // Default placeholder text

  return (
    <>
      <div className="rounded-24 bg-white py-10 px-10">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center">
            <Label title="Click to upload" htmlFor="button2">
              <div className="w-max relative">
                {profileImage ? (
                  <div className=" absolute cursor-pointer w-[2.5rem] h-[2.5rem] bottom-[0rem] right-[0rem] bg-blue text-white rounded-full">
                    <label title="Click to upload" htmlFor="button2">
                      <div className="flex items-center justify-center relative">
                        <Pencil width={10}></Pencil>
                      </div>
                    </label>
                    <Input
                      id="file"
                      type="file"
                      className="absolute left-0 top-0 w-full z-90 opacity-0"
                      onChange={e => {
                        handleFileUpload(e);
                      }}
                    />
                  </div>
                ) : null}
                {!profileImage ? (
                  <div className="relative">
                    <label title="Click to upload" htmlFor="button2">
                      <div className="w-max relative">
                        <figcaption className="flex justify-center items-center bg-[#D9D9D9] border w-[6rem] h-[6rem] rounded-full text-center">
                          <Upload />
                        </figcaption>
                      </div>
                    </label>
                    <Input
                      id="file"
                      type="file"
                      className="absolute left-0 top-0 w-full z-90 opacity-0"
                      onChange={e => {
                        handleFileUpload(e);
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <figcaption className="flex items-center ml-3 cursor-pointer">
                      <img
                        src={
                          profileImage
                            ? imageUrl + profileImage
                            : '/images/avtar.svg'
                        }
                        className="border w-[6rem] h-[6rem] rounded-full object-cover"
                      />
                    </figcaption>
                  </>
                )}
              </div>
            </Label>
            <div className="ml-4">
              <h1 className="text-black font-medium font-poppins text-xs">
                {form.watch('name')}
              </h1>
              <p className="flex mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <rect x="6" y="7" width="8" height="7" fill="white" />
                  <path
                    d="M17.6453 8.03281C17.3508 7.725 17.0461 7.40781 16.9312 7.12891C16.825 6.87344 16.8187 6.45 16.8125 6.03984C16.8008 5.27734 16.7883 4.41328 16.1875 3.8125C15.5867 3.21172 14.7227 3.19922 13.9602 3.1875C13.55 3.18125 13.1266 3.175 12.8711 3.06875C12.593 2.95391 12.275 2.64922 11.9672 2.35469C11.4281 1.83672 10.8156 1.25 10 1.25C9.18437 1.25 8.57266 1.83672 8.03281 2.35469C7.725 2.64922 7.40781 2.95391 7.12891 3.06875C6.875 3.175 6.45 3.18125 6.03984 3.1875C5.27734 3.19922 4.41328 3.21172 3.8125 3.8125C3.21172 4.41328 3.20312 5.27734 3.1875 6.03984C3.18125 6.45 3.175 6.87344 3.06875 7.12891C2.95391 7.40703 2.64922 7.725 2.35469 8.03281C1.83672 8.57188 1.25 9.18437 1.25 10C1.25 10.8156 1.83672 11.4273 2.35469 11.9672C2.64922 12.275 2.95391 12.5922 3.06875 12.8711C3.175 13.1266 3.18125 13.55 3.1875 13.9602C3.19922 14.7227 3.21172 15.5867 3.8125 16.1875C4.41328 16.7883 5.27734 16.8008 6.03984 16.8125C6.45 16.8187 6.87344 16.825 7.12891 16.9312C7.40703 17.0461 7.725 17.3508 8.03281 17.6453C8.57188 18.1633 9.18437 18.75 10 18.75C10.8156 18.75 11.4273 18.1633 11.9672 17.6453C12.275 17.3508 12.5922 17.0461 12.8711 16.9312C13.1266 16.825 13.55 16.8187 13.9602 16.8125C14.7227 16.8008 15.5867 16.7883 16.1875 16.1875C16.7883 15.5867 16.8008 14.7227 16.8125 13.9602C16.8187 13.55 16.825 13.1266 16.9312 12.8711C17.0461 12.593 17.3508 12.275 17.6453 11.9672C18.1633 11.4281 18.75 10.8156 18.75 10C18.75 9.18437 18.1633 8.57266 17.6453 8.03281ZM13.5672 8.56719L9.19219 12.9422C9.13414 13.0003 9.06521 13.0464 8.98934 13.0779C8.91346 13.1093 8.83213 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51066 13.0779C8.43479 13.0464 8.36586 13.0003 8.30781 12.9422L6.43281 11.0672C6.31554 10.9499 6.24965 10.7909 6.24965 10.625C6.24965 10.4591 6.31554 10.3001 6.43281 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04085 9.99965 7.19991 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7503 8.04288 13.7503 8.125C13.7503 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z"
                    fill="#12B76A"
                  />
                </svg>{' '}
                <span className="text-[rgb(18,183,106)] text-12 font-poppins font-normal ml-2">
                  {settingConfig.units.find(f => f.key == form.watch('units'))
                    ?.value || '_'}
                </span>
              </p>
            </div>
          </div>
          <div className="flex">
            <img src="/images/callBtn2.svg" className="mr-4 cursor-pointer" />
            <img src="/images/callBtn.svg" className="cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-between items-center full px-2 mt-12">
          <div className="relative max-w-[14rem]">
            <div className="pr-2 before:content-[''] before:absolute before:top-[.6rem] before:w-[.1rem] before:-right-[.5rem] before:h-[3rem] before:bg-[#EAECF0]">
              <h6 className="font-poppins text-base text-secondary">
                Current Company
              </h6>
              <h2 className="text-primary text-base font-poppins font-medium mt-4">
                {form.watch('currentCompany') || '_'}
              </h2>
            </div>
          </div>
          <div className="relative max-w-[10rem]">
            <div className="pr-2 before:content-[''] before:absolute before:top-[.6rem] before:w-[.1rem] before:-right-[.5rem] before:h-[3rem] before:bg-[#EAECF0]">
              <h6 className="font-poppins text-base text-secondary">State</h6>
              <h2 className="text-primary text-base font-poppins font-medium mt-4">
                {statesList?.filter(d => d._id === form.watch('state'))?.[0]
                  ?.name || '_'}
              </h2>
            </div>
          </div>
          <div className="relative max-w-[5rem]">
            <div className="pr-2 before:content-[''] before:absolute before:top-[.6rem] before:w-[.1rem] before:-right-[.5rem] before:h-[3rem] before:bg-[#EAECF0]">
              <h6 className="font-poppins text-base text-secondary">Units</h6>
              <h2 className="text-primary text-base font-poppins font-medium mt-4">
                {campaignListData?.find(f => f._id == form.watch('units'))
                  ?.title || '_'}
              </h2>
            </div>
          </div>
          <div className="relative max-w-[15rem]">
            <div className="before:content-[''] before:absolute before:top-[.6rem] before:w-[.1rem] before:-right-[.5rem] before:h-[3rem] before:bg-[#EAECF0]">
              <h6 className="font-poppins text-base text-secondary">
                Predicted Income
              </h6>
              <h2 className="text-primary text-base font-poppins font-medium mt-4">
                {form.watch('predictedIncome')
                  ? formatToUSD(form.watch('predictedIncome'))
                  : '_'}
              </h2>
            </div>
          </div>
        </div>

        <div className="px-2 my-[40px]">
          <RecruitStatus />
        </div>

        <div className="mt-12">
          <div className="w-full">
            {' '}
            <Label className="py-2">Campaign</Label>
            <Select
              onValueChange={val => form.setValue('campaign', val)}
              value={form.watch('campaign')?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Campaign</SelectLabel>
                  {campaignListData?.map(item => (
                    <SelectItem key={item._id} value={`${item._id}`}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
