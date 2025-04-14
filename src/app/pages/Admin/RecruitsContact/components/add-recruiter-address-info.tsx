import React from 'react';
import { Input } from 'app/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { formatWhileKeypress } from 'utils/formatePhoneNumber';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { useRecruitSlice } from '../recruitsSlice';
import { SingleSearchWithAPI } from 'app/components/Shared/single-search-with-api';
import { useSelector } from 'react-redux';
import { selectAdminEdit } from '../recruitsSlice/selectors';

export function AddRecruitersAddress() {
  const form = useFormContext();
  const editSelector = useSelector(selectAdminEdit);

  const { useGetStatesQuery } = useRecruitSlice();

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

  return (
    <>
      <div className=" rounded-24 bg-white py-10 px-10 rounded-tl">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Name
            </label>
            <Input
              type="text"
              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
              id="name"
              value={form.watch('name')}
              {...form.register('name', {
                required: false,
              })}
              placeholder="Enter Full Name"
            />
            <p className="text-red-600">
              {form.formState.errors.name?.type === 'required' && 'Required'}
            </p>
          </div>
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Phone
            </label>
            <Input
              type="text"
              className={`flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default ${
                form.formState.errors.phone ? 'border-red-500' : ''
              }`}
              id="phone"
              value={form.watch('phone')}
              {...form.register('phone', {
                required: 'Phone number is required.',
                validate: value =>
                  value.replace(/\D/g, '').length >= 10 || 'Invalid Phone',
              })}
              onKeyUp={formatWhileKeypress}
              placeholder="000-000-000"
            />
            <p className="text-red-600">
              {form.formState?.errors?.phone &&
                form.formState.errors.phone?.message}
            </p>
          </div>

          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <Input
              type="text"
              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
              id="email"
              value={form.watch('email')}
              {...form.register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              })}
              placeholder="Enter Email Address"
            />
            <p className="text-red-600">
              {form.formState.errors.email?.type === 'required' &&
                'Email is Required'}
              {form.formState.errors.email?.type === 'pattern' &&
                ' Invalid email address'}
            </p>
          </div>
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              NMLS#
            </label>
            <Input
              type="text"
              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
              id="currentAddress"
              value={form.watch('currentAddress')}
              {...form.register('currentAddress', {
                required: false,
              })}
              placeholder="Enter NMLS"
            />
          </div>
          <div>
            <SingleSearchWithAPI
              data={
                statesList?.map(d => ({
                  _id: d?._id,
                  name: d?.name,
                })) || []
              }
              selected={editSelector?.state?.[0]?._id}
              title="State"
              onSearch={event => {
                states({ search: event });
              }}
              onSelect={value => form.setValue('state', value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
