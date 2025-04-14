import React, { useEffect, useRef, useState } from 'react';

import { Input } from 'app/components/ui/input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'app/components/ui/select';
import { useFormContext } from 'react-hook-form';
import { settingConfig } from 'utils/settingConfig';
import { useAdminSlice } from 'app/pages/Admin/slice';
import { SingleSearchWithAPI } from 'app/components/Shared/single-search-with-api';
import { useSelector } from 'react-redux';
import { selectAdminEdit } from '../recruitsSlice/selectors';
import DatePicker from 'react-datepicker';

export function AddLoanOfficer() {
  const form = useFormContext();
  const [date, setDate] = useState('');
  const { useAdminUserListQuery } = useAdminSlice();
  //// LOAN OFFICER LIST ///
  const [
    admin,
    {
      isLoading: isTeamList,
      isSuccess: isTeamListData,
      data: loadOfficerData,
      error: isTeamListDataError,
    },
  ] = useAdminUserListQuery();
  const loadOfficer = loadOfficerData?.data;
  console.log('isTeamListData', isTeamListData);
  //// search loan office ////
  const handleSearchChange = event => {
    admin({ role: 'loan_officer', status: 1, search: event, pageSize: 100 });
  };
  const handleChange = e => {
    const input = e.target.value;
    // Validate and format the input
    const formattedDate = formatDate(input);
    setDate(formattedDate);
  };
  const formatDate = input => {
    // Remove non-numeric characters
    const cleanedInput = input.replace(/\D/g, '');
    // Format YYYY-MM-DD
    let formatted = cleanedInput;
    if (cleanedInput.length > 4) {
      formatted = `${cleanedInput.slice(0, 4)}-${cleanedInput.slice(4)}`;
    }
    if (cleanedInput.length > 6) {
      formatted = `${cleanedInput.slice(0, 4)}-${cleanedInput.slice(
        4,
        6,
      )}-${cleanedInput.slice(6, 8)}`;
    }
    return formatted;
  };

  const [formattedAnnualVolume, setFormattedAnnualVolume] = useState('');
  const [formattedPredictedIncome, setFormattedPredictedIncome] = useState('');

  const editSelector = useSelector(selectAdminEdit);
  useEffect(() => {
    if (editSelector) {
      setDate(editSelector?.birthday);
    }
  }, [editSelector]);
  const autocompleteInput = useRef(null);

  const initAutocomplete = () => {
    // Create autocomplete object
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInput.current,
      { types: ['geocode'] },
    );

    // Listen for place change event
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      console.log(place); // Handle the selected place object
    });
  };

  // Load Google Maps script asynchronously
  const loadGoogleMapsScript = () => {
    const script = document.createElement('script');
    // AIzaSyDTrXqDUJIkpfWPy4AVxZa4ErAEaflkkzs
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDTrXqDUJIkpfWPy4AVxZa4ErAEaflkkzs`;
    script.onload = initAutocomplete;
    document.head.appendChild(script);
  };

  // Call loadGoogleMapsScript when component mounts
  React.useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (editSelector) {
      // setDate(editSelector?.dob);
      if (editSelector?.birthday) {
        const parsedDate = new Date(editSelector?.birthday);
        if (!isNaN(parsedDate.getTime())) {
          setDate(parsedDate); // Set valid date
        } else {
          setDate(null); // Reset date state
        }
      } else {
        setDate(null); // Reset date state if apiDate is null or undefined
      }
    }
  }, [editSelector]);

  const handleDateChange = date => {
    form.setValue('birthday', date);
    setDate(date);
  };

  const formatCurrency = (value, addZeroCents = false) => {
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) return '';

    const options = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: addZeroCents ? 2 : 0,
      maximumFractionDigits: 2,
    };

    return new Intl.NumberFormat('en-US', options).format(numberValue);
  };

  useEffect(() => {
    if (editSelector) {
      const annualVolume = editSelector.annualVolume || '';
      const predictedIncome = editSelector.predictedIncome || '';

      setFormattedAnnualVolume(formatCurrency(annualVolume, true));
      setFormattedPredictedIncome(formatCurrency(predictedIncome, true));

      form.setValue('annualVolume', annualVolume);
      form.setValue('predictedIncome', predictedIncome);
    }
  }, [editSelector]);

  const handleCurrencyChange = (event, field) => {
    const value = event.target.value;
    const cleanedValue = value.replace(/[^\d.]/g, '');
    const formattedValue = formatCurrency(cleanedValue, false);

    if (field === 'annualVolume') {
      setFormattedAnnualVolume(formattedValue);
    } else {
      setFormattedPredictedIncome(formattedValue);
    }

    form.setValue(field, cleanedValue);
  };

  const handleCurrencyBlur = field => {
    const value = form.getValues(field);
    const formattedValue = formatCurrency(value, true);

    if (field === 'annualVolume') {
      setFormattedAnnualVolume(formattedValue);
    } else {
      setFormattedPredictedIncome(formattedValue);
    }
  };

  return (
    <>
      <div className=" rounded-24 bg-white py-10 px-10 mt-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Annual Volume
            </label>
            <div className="flex items-center">
              <Input
                type="text"
                className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                id="annualVolume"
                value={formattedAnnualVolume}
                onChange={e => handleCurrencyChange(e, 'annualVolume')}
                onBlur={() => handleCurrencyBlur('annualVolume')}
                placeholder="Enter Annual Volume"
              />
            </div>
          </div>
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Predicted Income
            </label>
            <div className="flex items-center">
              <Input
                type="text"
                className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                id="predictedIncome"
                value={formattedPredictedIncome}
                onChange={e => handleCurrencyChange(e, 'predictedIncome')}
                onBlur={() => handleCurrencyBlur('predictedIncome')}
                placeholder="Enter Predicted Income"
              />
            </div>
          </div>
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Favourite Hobby
            </label>
            <Input
              type="text"
              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
              id="favouriteHobby"
              value={form.watch('favouriteHobby')}
              {...form.register('favouriteHobby', {
                required: false,
              })}
              placeholder="Enter Favourite Hobby"
            />
          </div>
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Birthday
            </label>
            {/* <Input type="text" id="autocomplete" placeholder="Enter your address" /> */}

            <DatePicker
              id="start_date"
              className="flex h-[4.4rem] w-full border border-input bg-background pl-6  py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
              selected={date} // Set selected date from state
              onChange={handleDateChange} // Handle date change
              dateFormat="MM/dd/yyyy" // Date format as mm/dd/yyyy
              placeholderText="MM/DD/YYYY" // Placeholder text
              showYearDropdown // Show year dropdown
              dropdownMode="select" // Use select dropdown for year selection
              showMonthDropdown // Show month dropdown
              minDate={new Date(1806, 0, 1)} // Minimum selectable date
              maxDate={new Date()} // Maximum selectable date (today's date)

              // {...register('dob', { required: false })} // Register input with react-hook-form
            />
          </div>

          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Current Company
            </label>
            {/* <Input type="text" id="autocomplete" placeholder="Enter your address" /> */}

            <Input
              type="text"
              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
              id="cc"
              value={form.watch('currentCompany')}
              {...form.register('currentCompany', {
                required: false,
              })}
              placeholder="Enter Company Name"
            />
          </div>

          <div>
            <SingleSearchWithAPI
              data={
                loadOfficer?.documents.map(d => {
                  return {
                    _id: d?._id,
                    name: d?.fullName,
                  };
                }) || []
              }
              selected={editSelector?.assignedLoanOfficer?.[0]?._id}
              title="Assigned Recruiter"
              onSearch={handleSearchChange}
              onSelect={value => form.setValue('assignedLoanOfficer', value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
