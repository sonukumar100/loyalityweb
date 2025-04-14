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
import { selectAdminEdit } from '../../slice/selectors';
// import { Calendar } from 'lucide-react';

import { CalendarIcon } from '@radix-ui/react-icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'app/components/ui/popover';
import { Calendar } from 'app/components/ui/calendar';

import { Button } from 'app/components/ui/button'; // Adjust path as necessary
import { format, set } from 'date-fns';
import { cn } from 'utils/twm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAgentSlice } from 'app/pages/Admin/AgentsContact/agentSlice';
import { Search } from 'lucide-react';
import { useBuilderSlice } from 'app/pages/Admin/BuildersContact/buildersSlice';
import { use } from 'i18next';
// import 'react-day-picker/dist/style.css';
interface Agent {
  _id: string;
  name: string;
  // other properties
}
export function AddLeadAssignAgent() {
  const form = useFormContext();
  const [date, setDate] = useState();
  const [payload, setPayload] = useState({
    page: 1,
    search: '',
    pageSize: 100,
  });
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

  ///// edit ////////
  const editSelector = useSelector(selectAdminEdit);
  useEffect(() => {
    if (editSelector) {
      // setDate(editSelector?.dob);
      if (editSelector?.dob) {
        const parsedDate = new Date(editSelector?.dob);
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
  const currentYear = new Date().getFullYear();
  const maxDate = new Date(currentYear, 9, 31);
  const years = [];
  for (let year = 1806; year <= currentYear; year++) {
    years.push(year);
  }
  // Function to handle date change
  const handleDateChange = date => {
    form.setValue('dob', date);
    setDate(date); // Update local state with selected date
  };
  const { useAgentListQuery } = useAgentSlice();
  const { useBuildersListQuery } = useBuilderSlice();
  const [
    agentList,
    {
      isLoading: isAgentList,
      isSuccess: isAgentListSuccess,
      data: isAgentListData,
      error: isAgentListError,
    },
  ] = useAgentListQuery();
  const [agentListData, setAgentListData] = useState<Agent[]>([]);
  console.log('editSelector agent', editSelector);
  useEffect(() => {
    if (isAgentListData?.data?.documents) {
      setAgentListData([...isAgentListData.data.documents, editSelector?.assignedAgent?.[0]]);
    }
  }, [isAgentListData]);

  const [
    buildersList,
    {
      isLoading: isBuilderList,
      isSuccess: isBuilderListSuccess,
      data: isBuilderListData,
      error: isBuilderListError,
    },
  ] = useBuildersListQuery();
  const builderData = isBuilderListData?.data?.documents;

  const handleSearchBuilder = event => {
    buildersList({ ...payload, search: event, pageSize: 100 });
  };
  const handleSearchAgent = event => {
    agentList({ ...payload, search: event, pageSize: 100 });
  };
  useEffect(() => {
    agentList(payload);
    buildersList(payload);
  }, []);
  console.log('isAgentListData', isAgentListData);
  return (
    <>
      <div className=" rounded-24 bg-white py-10 px-10 mt-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Favorite Hobby
            </label>
            <Input
              type="text"
              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
              id="favoriteHobby"
              value={form.watch('favoriteHobby')}
              placeholder="Enter Hobby"
              {...form.register('favoriteHobby', {
                required: false,
              })}
            />
          </div>
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Favorite Drink / Food
            </label>
            <Input
              type="text"
              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
              id="favoriteDrinkOrFood"
              value={form.watch('favoriteDrinkOrFood')}
              {...form.register('favoriteDrinkOrFood', {
                required: false,
              })}
              placeholder="Enter Favorite Drink / Food"
            />
          </div>
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Kids / Animal
            </label>
            <Input
              type="text"
              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
              id="kidsOrAnimal"
              value={form.watch('kidsOrAnimal')}
              {...form.register('kidsOrAnimal', {
                required: false,
              })}
              placeholder="Enter Kids / Animal"
            />
          </div>
          <div>
            <label className="text-base block text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Birthday
            </label>
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

            <div></div>
          </div>
          <div>
            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Lead Source
            </label>
            <Select
              // onValueChange={val => form.setValue('leadSource', val)}
              value={form.watch('leadSource')?.toString()}
              {...form.register('leadSource', { required: false })}
              onValueChange={val => {
                form.setValue('leadSource', val);
              }}
            >
              <SelectTrigger className="w-[100%] h-[4.4rem]">
                <SelectValue
                  placeholder={
                    settingConfig.leadSource.find(
                      f => f.key == form.watch('clientStatus'),
                    )?.value || 'Select'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {settingConfig.leadSource.map(item => (
                    <SelectItem key={Number(item.key)} value={`${item.key}`}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
              title="Loan officer"
              onSearch={handleSearchChange}
              onSelect={value => form.setValue('assignedLoanOfficer', value)}
            />
          </div>
          <div>
            <SingleSearchWithAPI
              data={
                agentListData?.map(d => {
                  return {
                    _id: d?._id,
                    name: d?.name ? d?.name : d?.email,
                  };
                }) || []
              }
              selected={editSelector?.assignedAgent?.[0]?._id}
              title="Assigned Agent"
              onSearch={handleSearchAgent}
              onSelect={value => form.setValue('assignedAgent', value)}
            />
          </div>
          <div>
            <SingleSearchWithAPI
              data={
                builderData?.map(d => {
                  return {
                    _id: d?._id,
                    name: d?.name ? d?.name : d?.email,
                  };
                }) || []
              }
              selected={editSelector?.assignedBuilder?.[0]?._id}
              title="Assigned Builder"
              onSearch={handleSearchBuilder}
              onSelect={value => form.setValue('assignedBuilder', value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
