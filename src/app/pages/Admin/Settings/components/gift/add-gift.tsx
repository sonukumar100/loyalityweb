import React, { memo, useEffect, useState } from 'react';
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
import { selectAdminEdit } from 'app/pages/Admin/slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'app/components/ui/use-toast';
import { Input } from 'app/components/ui/input';
import { Button } from 'app/components/ui/button';
import { Label } from 'app/components/ui/label';
import { settingConfig } from 'utils/settingConfig';

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
      points: 0,
      giftType: '',
      image: null,
    },
  });
  const { useAddGiftGalleryMutation } = useAdminSlice();
  const [addGiftGallery, { data, error, isSuccess, isLoading }] =
    useAddGiftGalleryMutation();

  const onSubmit = async data => {
    try {
      const formData = new FormData();

      formData.append('giftTitle', data.giftTitle);
      formData.append('points', data.points.toString());
      formData.append('giftType', data.giftType);
      if (data.image) {
        formData.append('giftImage', data.image); // binary file
      }
      addGiftGallery(formData);
      toast({ title: 'Gift added successfully!', variant: 'success' });
      reset();
      setImagePreview(null);
      setOpen(false); // close the drawer
    } catch (error) {
      console.error('Submit Error:', error);
      toast({ title: 'Submission failed!', variant: 'destructive' });
    }
  };

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
        className="w-[350px]"
        onInteractOutside={e => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>
            <SheetClose asChild>
              <div
                onClick={() => {
                  setOpen(false);
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
        <div className=" mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Points Entry
          </h2>

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
                    value > 0 || 'Points must be greater than 0',
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    onChange={e => field.onChange(parseInt(e.target.value))}
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
                    {settingConfig.giftType.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.key}
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
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
            >
              Add Gift
            </Button>
          </form>
        </div>
        {/* </span> */}
      </SheetContent>
    </Sheet>
  );
}
