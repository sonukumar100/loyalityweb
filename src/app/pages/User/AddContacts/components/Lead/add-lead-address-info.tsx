import { useEffect } from 'react';
import { Input } from 'app/components/ui/input';
import { useFormContext } from 'react-hook-form';
import {
  formatWhileKeypress,
} from 'utils/formatePhoneNumber';
import Autocomplete from 'react-google-autocomplete';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { selectAdminEdit } from '../../slice/selectors';
import { SingleSearchWithAPI } from 'app/components/Shared/single-search-with-api';
import { useLeadSlice } from '../../slice';

// const libraries: Libraries = ['places'];

export function LeadAddressInfo() {
  const editSelector = useSelector(selectAdminEdit);
  console.log(editSelector);
  const { useGetStatesQuery } = useLeadSlice();

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
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
  const form = useFormContext();
  const currentAddress = form.watch('currentAddress', '');
  useEffect(() => {
    if (currentAddress) {
      form.setValue('currentAddress', currentAddress);
    }
  }, [currentAddress, form.setValue]);
  const handlePlaceSelected = place => {
    const formattedAddress = place.formatted_address;
    form.setValue('currentAddress', formattedAddress);
  };

  const logEvent = event => {
    form.setValue('currentAddress', event.target.value);
  };

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
              id="fullName"
              value={form.watch('fullName')}
              {...form.register('fullName', {
                required: false,
              })}
              placeholder="Enter Full Name"
            />
            <p className="text-red-600">
              {form.formState.errors.fullName?.type === 'required' &&
                'Required'}
            </p>
          </div>
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Phone
            </label>
            <Input
              type="text"
              className={`flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default ${form.formState.errors.phone ? 'border-red-500' : ''
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
              {typeof form?.formState?.errors?.phone?.message === 'string' &&
                form.formState.errors.phone.message}
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
              placeholder="Enter Email"
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
              Current Address
            </label>
            <div className="relative">
              <Autocomplete
                className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                apiKey={googleMapsApiKey}
                value={currentAddress}
                {...form.register('currentAddress', {
                  required: false,
                })}
                options={{
                  types: ['(regions)'],
                  componentRestrictions: { country: 'us' },
                }}
                onValueChange={e => {
                  logEvent(e); // Log the event
                }}
                onPlaceSelected={place => {
                  handlePlaceSelected(place);
                }}
                onChange={logEvent} // Log change event
                onFocus={logEvent} // Log focus event
                onBlur={logEvent} // Log blur event
                onKeyDown={logEvent} // Log keydown event
              />
            </div>
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
