import React, { useEffect, useState } from 'react';
import { Form } from 'app/components/ui/form';
import { Controller, useForm } from 'react-hook-form';
import { ChevronLeft, Plus } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'app/components/ui/sheet';
import { useAdminSlice } from 'app/pages/Admin/slice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'app/components/ui/use-toast';
import { Input } from 'app/components/ui/input';
import { Button } from 'app/components/ui/button';
import { Label } from 'app/components/ui/label';
import { settingConfig } from 'utils/settingConfig';
import { selectAdminEditGift } from 'app/pages/Admin/slice/selectors';
import { Icons } from 'app/components/ui/icons';

export default function GiftForm() {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      giftTitle: '',
      points: '',
      giftType: '',
      image: null,
      specifications: '',
    },
  });

  const { useAddGiftGalleryMutation, useUpdateGiftGalleryMutation } = useAdminSlice();
  // For adding gift
  const [addGiftGallery, {
    data: addedGiftData,
    isError: isAddError,
    isLoading: isAddingGift
  }] = useAddGiftGalleryMutation();

  // For updating gift
  const [updateGiftGallery, {
    data: updatedGiftData,
    isError: isUpdateError,
    isLoading: isUpdatingGift
  }] = useUpdateGiftGalleryMutation();
  const onSubmit = async data => {
    try {
      const formData = new FormData();
      formData.append('giftTitle', data.giftTitle);
      formData.append('points', data.points.toString());
      formData.append('giftType', data.giftType);
      formData.append('specifications', data.specifications);
      if (data.image) {
        formData.append('giftImage', data.image);
      }
      if (giftEditData) {
        formData.append('id', giftEditData.id);
        await updateGiftGallery(formData);
      }
      else {
        await addGiftGallery(formData);
      }
      reset();
      setImagePreview(null);
      setOpen(false);
    } catch (error) {
      console.error('Submit Error:', error);
      toast({ description: 'Something went wrong', variant: 'destructive' });
    }
  };
  useEffect(() => {
    if (isAddError) {
      toast({ description: 'Error adding gift', variant: 'destructive' });
    }
    if (isUpdateError) {
      toast({ description: 'Error updating gift', variant: 'destructive' });
    }
    if (addedGiftData) {
      toast({ description: 'Gift added successfully', variant: 'sucsess' });
    }
    if (updatedGiftData) {
      toast({ description: 'Gift updated successfully', variant: 'sucsess' });
    }
  }, [isAddError, isUpdateError, addedGiftData, updatedGiftData]);

  const handleImageChange = (e, onChange) => {
    const file = e.target.files[0];
    onChange(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const giftEditData = useSelector(selectAdminEditGift);
  const { actions: addTeamMember } = useAdminSlice();

  useEffect(() => {
    if (giftEditData) {
      reset({
        ...giftEditData,
      })
      setOpen(true);
    } else {
      reset({
        giftTitle: '',
        points: '',
        giftType: '',
        image: null,
        specifications: '',
      });
    }
  }, [giftEditData]);
  return (
    <Sheet aria-describedby={false} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => {
          dispatch(addTeamMember.setEditGift({ data: null }));
        }} className="font-poppins font-base font-normal rounded-full text-base absolute -bottom-0 right-[30px] flex items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
          <span className="rounded-full text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 p-[15px_15px]">
            <Plus />
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent
        className="w-[500px]"
        onInteractOutside={e => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>
            <SheetClose asChild>
              <div
                onClick={() => setOpen(false)}
                className="flex items-center mb-8 mt-4 cursor-pointer"
              >
                <div>
                  <figcaption className="flex justify-center items-center bg-white border w-20 h-20 rounded-full text-center">
                    <ChevronLeft />
                  </figcaption>
                </div>
                <div className="text-md font-poppins text-[#101828] ml-6 font-medium leading-0">
                  Back
                </div>
              </div>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div className="mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Gift Title */}
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Gift Title
              </Label>
              <Controller
                name="giftTitle"
                control={control}
                rules={{ required: 'Gift Title is required' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.giftTitle ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter gift title"
                  />
                )}
              />
              {errors.giftTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.giftTitle.message}
                </p>
              )}
            </div>

            {/* Points */}
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Points
              </Label>
              <Controller
                name="points"
                control={control}
                rules={{
                  required: 'Points are required',
                  validate: value =>
                    Number.isInteger(value) && value > 0
                      ? true
                      : 'Points must be a positive number greater than 0',
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    pattern="[1-9][0-9]*"
                    onChange={e => {
                      const val = e.target.value;
                      if (/^(?!0)\d*$/.test(val)) {
                        field.onChange(val === '' ? '' : parseInt(val));
                      }
                    }}
                    value={field.value ?? ''}
                    className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.points ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter points"
                  />
                )}
              />
              {errors.points && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.points.message}
                </p>
              )}
            </div>

            {/* Gift Type */}
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Gift Type
              </Label>
              <Controller
                name="giftType"
                control={control}
                rules={{ required: 'Gift Type is required' }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.giftType ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select gift type</option>
                    {settingConfig.giftType.map(type => (
                      <option key={type.key} value={type.key}>
                        {type.value}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.giftType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.giftType.message}
                </p>
              )}
            </div>

            {/* specifications */}
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                specifications
              </Label>
              <Controller
                name="specifications"
                control={control}
                rules={{
                  required: 'specifications are required',
                  minLength: {
                    value: 10,
                    message: 'Minimum 10 characters required',
                  },
                }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.specifications ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter specifications"
                  />
                )}
              />
              {errors.specifications && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.specifications.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Upload Image
              </Label>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageChange(e, onChange)}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                )}
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className=" object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              {(giftEditData && !imagePreview) && (
                <div className="mt-4">
                  <img
                    src={giftEditData?.url}
                    alt="Preview"
                    className=" object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              variant="destructive"
              type="submit"
              disabled={isAddingGift || isUpdatingGift}
              className="w-full text-white py-3 text-lg rounded-xl   text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
            >
              {(isAddingGift || isUpdatingGift) && (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              save
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
