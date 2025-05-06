'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'app/components/ui/select';
import { Input } from 'app/components/ui/input';
import { Textarea } from 'app/components/ui/textarea';
import { format } from 'date-fns';
import { Calendar } from 'app/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'app/components/ui/popover';
import { CalendarIcon, ChevronLeft, Plus } from 'lucide-react';

import { MultiSelect } from 'react-multi-select-component';
import { Label } from 'app/components/ui/label';
import { Button } from 'app/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'app/components/ui/sheet';
import { useOfferSlice } from './slice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // important for styling
import { useAdminSlice } from '../Admin/slice';
import { settingConfig } from 'utils/settingConfig';
import { Icons } from 'app/components/ui/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type OptionType = {
  value: string;
  label: string;
};

type GiftType = {
  id: string;
  name: string;
  quantity?: number;
  value?: number;
};

type FormData = {
  user_type: string;
  title: string;
  offer_code: string;
  description: string;
  terms_conditions: string;
  start_date: Date | undefined;
  end_date: Date | undefined;
  states: string;
  districts: string;
  gift: GiftType;
  offerImage: FileList;
};

export default function OfferForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const [open, setOpen] = React.useState(false);
  const { useAddOfferMutation } = useOfferSlice();
  const [state, setSelectedState] = React.useState<OptionType[]>([]);
  const [district, setSelectedDistrict] = React.useState<OptionType[]>([]);
  const [gift, setSelectedGift] = React.useState<OptionType[]>([]);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [value, setValue] = React.useState('');

  const { useGetGiftGalleryLazyQuery } = useAdminSlice();
  const [getGiftGallery, { data: giftData }] = useGetGiftGalleryLazyQuery();

  React.useEffect(() => {
    getGiftGallery({});
  }, [getGiftGallery]);
  const options =
    settingConfig?.stateList.map((state: any) => ({
      label: state.label,
      value: state?.id?.toString(),
    })) ?? [];
  const giftOptions =
    giftData?.data?.map(gift => ({
      ...gift,
      label: gift.giftTitle,
      value: gift.id.toString(),
    })) ?? [];
  const [stateWiseDistrict, setStateWiseDistrict] = React.useState<
    OptionType[]
  >([]);
  React.useEffect(() => {
    if (state) {
      const stateValues = state.map(state => parseInt(state.value));
      const stateWiseDistrict = getDistrictsByStateIds(stateValues);
      setStateWiseDistrict(stateWiseDistrict);
    }
  }, [state]);

  console.log('state', state);
  const getDistrictsByStateIds = (stateIds: number[]) => {
    // Filter the states that match the given stateIds
    const selectedStates = settingConfig?.stateList.filter(state =>
      stateIds.includes(state.id),
    );

    // Flatten and return the districts for all selected states
    return selectedStates
      ? selectedStates.flatMap(state => state.districts)
      : [];
  };

  // Example usage: Filter districts for Andhra Pradesh (ID: 2)

  const filteredDistricts = stateWiseDistrict.map((district: any) => ({
    label: district.label,
    value: district.id.toString(),
  }));
  const [addOffer, { isError, isLoading }] = useAddOfferMutation();
  const [content, setContent] = useState('test');

  const onSubmit = async (data: FormData) => {
    if (state.length === 0 || district.length === 0 || gift.length === 0) {
      alert('Please select States, Districts and Gifts');
      return;
    }

    const formData = new FormData();

    formData.append('user_type', data.user_type);
    formData.append('title', data.title);
    formData.append('offer_code', data.offer_code);
    formData.append('description', data.description);
    formData.append('terms_conditions', data.terms_conditions);
    formData.append('start_date', data.start_date?.toISOString() || '');
    formData.append('end_date', data.end_date?.toISOString() || '');
    formData.append('states', JSON.stringify(state));
    formData.append('districts', JSON.stringify(district));

    const giftMap =
      gift?.map(g => ({
        ...g,
        giftTitle: g.label,
        id: g.value.toString(),
      })) ?? [];
    formData.append('gifts', JSON.stringify(giftMap));

    const file = data.offerImage?.[0];
    if (file) {
      formData.append('offerImage', file);
    }

    addOffer(formData)
      .unwrap()
      .then(res => {
        console.log('Success:', res);
        setOpen(false);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Sheet aria-describedby={false} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="font-poppins font-base font-normal rounded-full text-base absolute -bottom-0 right-[30px] flex items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
          <span className="rounded-full  text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 p-[15px_15px]">
            <Plus />
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent
        className="w-[850px] max-h-screen overflow-y-auto"
        onInteractOutside={e => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>
            <SheetClose asChild>
              <div
                onClick={() => setOpen(false)}
                className="flex items-center mb-8 mt-4 cursor-pointer"
              >
                <figcaption className="flex justify-center items-center bg-white border w-16 h-16 rounded-full">
                  <ChevronLeft />
                </figcaption>
                <span className="text-md font-poppins text-[#101828] ml-6 font-medium">
                  Back
                </span>
              </div>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 bg-white rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  {...register('user_type', {
                    required: 'User type is required',
                  })}
                  placeholder="Karigar or Dealer"
                />
                {errors.user_type && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.user_type.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register('title', { required: 'Title is required' })}
                  placeholder="Summer Bonanza"
                />
                {errors.title && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  {...register('offer_code', {
                    required: 'Offer code is required',
                  })}
                  placeholder="SUMMER2025"
                />
                {errors.offer_code && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.offer_code.message}
                  </p>
                )}
                <Controller
                  control={control}
                  name="description"
                  rules={{ required: 'Description is required' }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <Label className="mb-1">Description</Label>
                      {/* <CKEditor
                        editor={ClassicEditor}
                        data={value}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          onChange(data);
                        }}
                        config={{
                          placeholder: 'Write description here...',
                        }}
                      /> */}
                    </div>
                  )}
                />
                {errors.description && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <MultiSelect
                  options={giftOptions}
                  value={gift}
                  onChange={setSelectedGift}
                  labelledBy="Select"
                  hasSelectAll={false}
                  overrideStrings={{ selectSomeItems: 'Choose gifts...' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <Controller
                control={control}
                name="start_date"
                rules={{ required: 'Start date is required' }}
                render={({ field }) => (
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          className={`w-full h-[50px] px-4 py-3 flex items-center justify-between border rounded-xl shadow-sm bg-white hover:bg-blue-50 transition-all ${!field.value ? 'text-gray-400' : 'text-gray-900'
                            }`}
                        >
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Select Start Date'}
                          <CalendarIcon className="ml-2 h-5 w-5 text-blue-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] bg-white rounded-2xl shadow-xl border p-4">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="rounded-lg"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.start_date && (
                      <p className="text-red-500 text-[14px] mt-1">
                        {errors.start_date.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* End Date */}
              <Controller
                control={control}
                name="end_date"
                rules={{ required: 'End date is required' }}
                render={({ field }) => (
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          className={`w-full h-[50px] px-4 py-3 flex items-center justify-between border rounded-xl shadow-sm bg-white hover:bg-blue-50 transition-all ${!field.value ? 'text-gray-400' : 'text-gray-900'
                            }`}
                        >
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Select End Date'}
                          <CalendarIcon className="ml-2 h-5 w-5 text-blue-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] bg-white rounded-2xl shadow-xl border p-4">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="rounded-lg"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.end_date && (
                      <p className="text-red-500 text-[14px] mt-1">
                        {errors.end_date.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1">Select States</Label>
                <MultiSelect
                  options={options}
                  value={state}
                  onChange={setSelectedState}
                  labelledBy="Select"
                  hasSelectAll={false}
                  overrideStrings={{ selectSomeItems: 'Choose states...' }}
                />
              </div>
              <div>
                <Label className="mb-1">Select District</Label>
                <MultiSelect
                  options={filteredDistricts}
                  value={district}
                  onChange={setSelectedDistrict}
                  labelledBy="Select"
                  hasSelectAll={false}
                  overrideStrings={{ selectSomeItems: 'Choose districts...' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* <ReactQuill theme="snow" value={value} onChange={setValue} />; */}
                <Textarea
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  placeholder="Description"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <Textarea
                  {...register('terms_conditions', {
                    required: 'Terms & Conditions are required',
                  })}
                  placeholder="Terms & Conditions"
                  rows={3}
                />
                {errors.terms_conditions && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.terms_conditions.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label className="block font-medium mb-1">
                Upload Offer Image
              </Label>
              <Input
                type="file"
                accept="image/*"
                {...register('offerImage', {
                  required: 'Offer image is required',
                  onChange: e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  },
                })}
              />
              {errors.offerImage && (
                <p className="text-[14px] text-red-500 mt-1">
                  {(errors.offerImage as any).message}
                </p>
              )}
            </div>

            {imagePreview && (
              <div className="mt-4">
                <p className="text-[14px] text-gray-600 mb-1">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Offer Preview"
                  className="w-full max-w-[300px] h-auto rounded-lg border"
                />
              </div>
            )}

            <Button
              variant="destructive"
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-3 text-lg rounded-xl   text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
            >
              {isLoading && (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
