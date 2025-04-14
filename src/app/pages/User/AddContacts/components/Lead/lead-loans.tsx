import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'app/components/ui/input';
import ReactPaginate from 'react-paginate';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'app/components/ui/accordion';
import { Button } from 'app/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form';
import { useLeadSlice } from '../../slice';
import { selectAdminEdit } from '../../slice/selectors';
import { useSelector } from 'react-redux';
import { removeEmptyKeys } from 'app/components/Shared/removeEmptyKeys';
import { AddNewLoan } from './add-new-loan';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'app/components/ui/select';
import { settingConfig } from 'utils/settingConfig';
import { toast } from 'app/components/ui/use-toast';
import { Icons } from 'app/components/ui/icons';
import Autocomplete from 'react-google-autocomplete';
import {
  cleanAmount,
  formatCurrencyValue,
  handleChanges,
  numberWithCommasAndCents,
} from 'utils/numberFormaters';
interface Loan {
  _id: string;
  id: string;
  address: string;
  loanType: string;
  amortizationType: string;
  apr: string;
  propertyType: string;
  propertyUse: string;
  loanAmount: number;
  creditScore: number;
  annualIncome: number;
  isVaEligible: boolean;
  homeValue: number;
  aprRequested: String;
  loanTag: any;
}
export function Loans(props) {
  const { data, activeTab } = props;
  console.log('data', props);
  const ref = useRef<HTMLDivElement | null>(null);
  const editSelector = useSelector(selectAdminEdit);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [showAddLoanButton, setShowAddLoanButton] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeAccordionItemId, setActiveAccordionItemId] = useState(null);
  const [loanAmount, setLoanAmount] = useState('');
  const [homeValue, sethomeValue] = useState('');
  const [creditScore, setcreditScore] = useState('');
  const [annualIncome, setannualIncome] = useState('');
  const [loanPercentage, setLoanPercentage] = useState('');
  const [aprRequested, setAprRequested] = useState('');
  console.log('editSelector', editSelector);
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { useUpdateLoanMutation, useLoanListQuery } = useLeadSlice();
  const [
    updateLoan,
    {
      isLoading: isUpdateLoan,
      isSuccess: isUpdateLoanSuccess,
      data: isUpdateLoanData,
      error: isUpdateLoanError,
    },
  ] = useUpdateLoanMutation();
  //// set Loan data ////
  useEffect(() => {
    console.log('data?.documents', data?.data?.documents);
    if (data?.data?.documents) {
      setLoans(data?.data?.documents);
    }
  }, [data?.data?.documents]);
  useEffect(() => { }, []);
  /// add new loan /////
  const handleAddLoan = () => {
    setShowAddLoanButton(true);
    setActiveAccordionItemId(null);
    setActiveItem('');
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' }); // Adjust behavior as needed
    }
  };

  ///// update loan ////
  const onSubmit = data => {
    // Find the active loan
    const activeLoan = loans.find(item => `item-${item._id}` === activeItem);
    // Initialize formData with the necessary fields
    console.log('formData', data);
    const formData = settingConfig.fields.reduce(
      (acc, field) => {
        acc[field] = data[`${field}${activeLoan?._id}`];
        return acc;
      },
      {
        aprRequested: '',
        loanId: activeAccordionItemId,
        loanAmount: '',
        loanPercentage: '',
        creditScore: '',
        homeValue: '',
        address: '',
        propertyType: '',
        propertyUse: '',
      },
    );
    // Clean the specified fields in formData
    console.log('loanAmount', loanAmount);
    formData.loanAmount = cleanAmount(loanAmount);
    if (aprRequested) {
      formData.aprRequested = parseFloat(aprRequested);
    }
    if (homeValue) {
      formData.homeValue = cleanAmount(homeValue);
    }
    formData.loanPercentage = loanPercentage;
    formData.creditScore = data.creditScore;
    formData.address = data.address;
    formData.propertyType = data.propertyType;
    formData.amortizationType = data.amortizationType;
    formData.propertyUse = data.propertyUse;
    const convertedData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = settingConfig.fieldsToCheck.includes(key)
        ? parseFloat(formData[key])
        : formData[key];
      return acc;
    }, {});
    // Remove empty keys from the converted data
    const cleanedPayload = removeEmptyKeys(convertedData);
    cleanedPayload.isVaEligible = form.watch('isVaEligible') === '1';
    if (form.watch('isVaEligible') === '2') {
      cleanedPayload.isVaEligible = false;
    }
    if (annualIncome) {
      cleanedPayload.annualIncome = parseInt(cleanAmount(annualIncome));
    }
    cleanedPayload.isInInquiry = activeTab !== 'Loans';
    settingConfig.fieldsToCheck.forEach(field => {
      if (isNaN(cleanedPayload[field])) {
        delete cleanedPayload[field];
      }
    });
    console.log('Submitted data:', cleanedPayload);
    updateLoan(cleanedPayload);
  };
  // const handleAccordionChange = itemId => {
  //   setShowAddLoanButton(false);
  //   if (itemId?.isVaEligible == true) {
  //     form.setValue('isVaEligible', '1');
  //   } else if (itemId?.isVaEligible == false) {
  //     form.setValue('isVaEligible', '2');
  //   }
  //   form.setValue('amortizationType', itemId?.amortizationType);
  //   form.setValue('address', itemId?.address);
  //   form.setValue('propertyType', itemId?.propertyType);
  //   form.setValue('propertyUse', itemId?.propertyUse);
  //   setLoanPercentage(
  //     itemId?.loanPercentage == 0 ? '' : `${itemId?.loanPercentage}%`,
  //   );
  //   setAprRequested(
  //     itemId?.aprRequested == 0 ? '' : `${itemId?.aprRequested}%`,
  //   );
  //   console.log('typeof,', itemId?.annualIncome);
  //   a(
  //     itemId?.annualIncome == 0 || itemId?.annualIncome == null
  //       ? ''
  //       : numberWithCommasAndCents(itemId?.annualIncome),
  //   );
  //   console.log('annualIncome', itemId);
  //   form.setValue('creditScore', itemId?.creditScore);
  //   sethomeValue(numberWithCommasAndCents(itemId?.homeValue));
  //   setLoanAmount(
  //     itemId?.loanAmount == 0 || itemId?.homeValue == null
  //       ? ''
  //       : numberWithCommasAndCents(itemId?.loanAmount),
  //   );
  //   setActiveAccordionItemId(
  //     itemId?._id === activeAccordionItemId ? null : itemId?._id,
  //   );
  // };

  const addNewLoans = () => {
    console.log('call add new loan ');
    setShowAddLoanButton(false);
  };
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
    leadId: editSelector?._id,
    // pageSize: 5
  };
  const handlePageClick = page => {
    payload.page = page;
    if (editSelector?._id) {
      loanList(payload);
    }
  };
  useEffect(() => {
    if (isLoanListSuccess) {
      setLoans(isLoanListData?.data?.documents);
    }
  }, [isLoanListSuccess, payload]);
  useEffect(() => {
    if (isUpdateLoanSuccess) {
      toast({
        description: 'Loan updated successfully',
      });
    }
  }, [isUpdateLoanSuccess]);
  const handleChange = (e, value) => {
    const { id, value: inputValue } = e.target;
    let formattedValue = inputValue;

    if (id === 'loanPercentage' || id === 'aprRequested') {
      formattedValue = inputValue.replace('%', '');
      if (formattedValue) {
        if (!isNaN(formattedValue)) {
          formattedValue = `${formattedValue}%`;
        }
      }
      if (id === 'loanPercentage') {
        setLoanPercentage(formattedValue);
      } else {
        setAprRequested(formattedValue);
      }
    } else {
      formattedValue = handleChanges(e);
      if (value === 1) {
        sethomeValue(formattedValue);
      } else if (value === 2) {
        setLoanAmount(formattedValue);
      } else if (value === 3) {
        setcreditScore(formattedValue);
      } else if (value === 4) {
        setannualIncome(formattedValue);
      }
    }
  };
  const handleBlur = (e, value) => {
    if (e?.target?.value?.length > 1) {
      const formattedValue = formatCurrencyValue(e.target.value);
      if (value === 1) {
        sethomeValue(formattedValue);
      } else if (value === 2) {
        setLoanAmount(formattedValue);
      } else if (value === 3) {
        setcreditScore(formattedValue);
      } else if (value === 4) {
        setannualIncome(formattedValue);
      }
    }
  };

  const logEvent = event => {
    console.log(`Event fired: ${event.type}`);
    form.setValue('address', event.target.value);
  };

  const handlePlaceSelected = place => {
    const formattedAddress = place.formatted_address;
    form.setValue('address', formattedAddress);
    const addressComponents = place.address_components;
    const stateComponent = addressComponents.find(component =>
      component.types.includes('administrative_area_level_1'),
    );
  };

  const handleBlurPercentages = field => {
    let value;
    if (field === 'loanPercentage') {
      value = parseFloat(loanPercentage);
      if (!isNaN(value)) {
        setLoanPercentage(`${value.toFixed(2)}%`);
      } else {
        setLoanPercentage('');
      }
    } else if (field === 'aprRequested') {
      value = parseFloat(aprRequested);
      if (!isNaN(value)) {
        setAprRequested(`${value.toFixed(2)}%`);
      } else {
        setAprRequested('');
      }
    }
  };

  const handleFocusPercentages = field => {
    if (field === 'loanPercentage') {
      setLoanPercentage(loanPercentage.replace('%', ''));
    } else if (field === 'aprRequested') {
      setAprRequested(aprRequested.replace('%', ''));
    }
  };
  const handleAccordionChange = itemId => {
    setShowAddLoanButton(false);
    if (itemId?.isVaEligible == true) {
      form.setValue('isVaEligible', '1');
    } else if (itemId?.isVaEligible == false) {
      form.setValue('isVaEligible', '2');
    }
    form.setValue('amortizationType', itemId?.amortizationType);
    form.setValue('address', itemId?.address);
    form.setValue('propertyType', itemId?.propertyType);
    form.setValue('propertyUse', itemId?.propertyUse);

    const formatPercentage = value => {
      return `${parseFloat(value).toFixed(2)}%`;
    };
    console.log(
      'aprRequested',
      itemId?.aprRequested,
      'loanPercentage',
      itemId?.loanPercentage,
    );

    setAprRequested(
      itemId?.aprRequested === null || 0
        ? ''
        : formatPercentage(itemId?.aprRequested),
    );
    setLoanPercentage(
      itemId?.loanPercentage === null || 0
        ? ''
        : formatPercentage(itemId?.loanPercentage),
    );

    setannualIncome(
      itemId?.annualIncome == 0 || itemId?.annualIncome == null
        ? ''
        : numberWithCommasAndCents(itemId?.annualIncome),
    );
    console.log('annualIncome', itemId);
    form.setValue('creditScore', itemId?.creditScore);
    sethomeValue(
      itemId?.homeValue == 0 || itemId?.homeValue === null
        ? ''
        : numberWithCommasAndCents(itemId?.homeValue),
    );
    setLoanAmount(
      itemId?.loanAmount == 0 || itemId?.homeValue == null
        ? ''
        : numberWithCommasAndCents(itemId?.loanAmount),
    );
    setActiveAccordionItemId(
      itemId?._id === activeAccordionItemId ? null : itemId?._id,
    );
  };

  const handleChangePercentages = (e, field) => {
    let value = e.target.value;
    if (value === '') {
      if (field === 'loanPercentage') setLoanPercentage(value);
      if (field === 'aprRequested') setAprRequested(value);
      return;
    }

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
      if (field === 'loanPercentage') setLoanPercentage(value);
      if (field === 'aprRequested') setAprRequested(value);
    }
  };

  return (
    <>
      <div id="scrollTarget" ref={ref}>
        {showAddLoanButton ? (
          <AddNewLoan activeTab={activeTab} addNewLoans={addNewLoans} />
        ) : null}
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full py-1"
        value={activeItem?.toString()}
        onValueChange={setActiveItem}
      >
        {loans?.map((item, i) => (
          <div className="border px-6 mt-6 rounded-[1.2rem]">
            <AccordionItem key={item._id} value={`item-${item._id}`}>
              <AccordionTrigger onClick={() => handleAccordionChange(item)}>
                {/* Accordion trigger content */}
                <div className="text-black text-xs font-poppins font-medium">
                  #{item?.id}
                  <span className="text-[#344054] text-[1.2rem] font-medium bg-[#F2F4F7] px-4 py-1 rounded-[1.6rem] ml-4">
                    {' '}
                    {settingConfig.getSetting('loanTag', item?.loanTag) || '_'}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {activeAccordionItemId === item._id && (
                    <>
                      <div className="mt-10">
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Address
                            </label>

                            <Autocomplete
                              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                              apiKey={'AIzaSyDTrXqDUJIkpfWPy4AVxZa4ErAEaflkkzs'}
                              value={form.watch('address')}
                              {...form.register('address', {
                                required: false,
                                // pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                              })}
                              options={{
                                types: ['(regions)'],
                                componentRestrictions: { country: 'us' },
                              }}
                              onValueChange={e => {
                                // handleValueChange(e);
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
                            {errors[`address${item._id}`] && (
                              <p>This field is required.</p>
                            )}
                          </div>
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Loan Type
                            </label>
                            <Input
                              id={`loanType${item?._id}`}
                              type="text"
                              defaultValue={item.loanType}
                              {...register(`loanType${item?._id}`, {
                                required: false,
                              })}
                              className="flex h-[4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                              placeholder="Loan Type"
                            />
                          </div>
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Amortization Type
                            </label>
                            <Select
                              value={form.watch(`amortizationType`)?.toString()}
                              {...form.register(`amortizationType`, {
                                required: false,
                              })}
                              onValueChange={value => {
                                form.setValue('amortizationType', value);
                              }}
                            >
                              <SelectTrigger className="w-[100%]">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {settingConfig?.amortizationType?.map(
                                    item => (
                                      <SelectItem
                                        key={item.key}
                                        value={`${item.key}`}
                                      >
                                        {item.value}
                                      </SelectItem>
                                    ),
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Loan Percentage
                            </label>
                            <Input
                              id="loanPercentage"
                              type="text"
                              value={loanPercentage}
                              {...register('loanPercentage', {
                                required: false,
                              })}
                              onChange={e =>
                                handleChangePercentages(e, 'loanPercentage')
                              }
                              onBlur={() =>
                                handleBlurPercentages('loanPercentage')
                              }
                              onFocus={() =>
                                handleFocusPercentages('loanPercentage')
                              }
                              className="flex h-[4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                              placeholder="Loan Percentage"
                            />
                          </div>{' '}
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              APR Requested
                            </label>
                            <Input
                              id="loanPercentage"
                              type="text"
                              value={aprRequested}
                              {...register('aprRequested', {
                                required: false,
                              })}
                              onChange={e =>
                                handleChangePercentages(e, 'aprRequested')
                              }
                              onBlur={() =>
                                handleBlurPercentages('aprRequested')
                              }
                              onFocus={() =>
                                handleFocusPercentages('aprRequested')
                              }
                              className="flex h-[4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                              placeholder="Loan Percentage"
                            />
                          </div>
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Property Type
                            </label>
                            <Select
                              value={form.watch(`propertyType`)?.toString()}
                              {...form.register(`propertyType`, {
                                required: false,
                              })}
                              onValueChange={value => {
                                form.setValue('propertyType', value);
                              }}
                            >
                              <SelectTrigger className="w-[100%]">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {settingConfig?.propertyType?.map(item => (
                                    <SelectItem
                                      key={item.key}
                                      value={`${item.key}`}
                                    >
                                      {item.value}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Property Use
                            </label>
                            <Select
                              value={form.watch(`propertyUse`)?.toString()}
                              {...form.register(`propertyUse`, {
                                required: false,
                              })}
                              onValueChange={value => {
                                form.setValue('propertyUse', value);
                              }}
                            >
                              <SelectTrigger className="w-[100%]">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {settingConfig?.propertyUse?.map(item => (
                                    <SelectItem
                                      key={item.key}
                                      value={`${item.key}`}
                                    >
                                      {item.value}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Home Value
                            </label>
                            <Input
                              id={`homeValue${item?._id}`}
                              type="text"
                              value={homeValue}
                              {...register(`homeValue${item?._id}`, {
                                required: false,
                              })}
                              onChange={e => handleChange(e, 1)}
                              onBlur={e => handleBlur(e, 1)}
                              onFocus={e => {
                                if (homeValue?.endsWith('.00')) {
                                  sethomeValue(homeValue?.slice(0, -3));
                                }
                              }}
                              className="flex h-[4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                              placeholder="Home Value"
                            />
                          </div>
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Loan Amount
                            </label>
                            <Input
                              id={`loanAmount${item?._id}`}
                              value={loanAmount}
                              type="text" // Keep type as text for custom validation
                              {...register(`loanAmount${item?._id}`, {
                                required: false,
                              })}
                              onChange={e => handleChange(e, 2)}
                              onBlur={e => handleBlur(e, 2)}
                              onFocus={e => {
                                if (loanAmount?.endsWith('.00')) {
                                  setLoanAmount(loanAmount?.slice(0, -3));
                                }
                              }}
                              className="flex h-[4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                              placeholder="Loan Amount"
                            />
                            {form.formState.errors.loanAmount &&
                              form.formState.errors.loanAmount.type ===
                              'validate' && (
                                <p className="text-red-500">
                                  Please enter a valid non-negative number.
                                </p>
                              )}
                          </div>
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Credit Score
                            </label>
                            <Input
                              id={`creditScore${item?._id}`}
                              type="text"
                              value={form.watch('creditScore')}
                              {...register(`creditScore`, {
                                required: false,
                              })}
                              className="flex h-[4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                              placeholder="Credit Score"
                            />
                          </div>
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Annual Income
                            </label>
                            <Input
                              id={`annualIncome${item?._id}`}
                              type="text"
                              value={annualIncome}
                              {...register(`annualIncome${item?._id}`, {
                                required: false,
                              })}
                              onChange={e => handleChange(e, 4)}
                              onBlur={e => handleBlur(e, 4)}
                              onFocus={e => {
                                if (annualIncome?.endsWith('.00')) {
                                  a(annualIncome?.slice(0, -3));
                                }
                              }}
                              className="flex h-[4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                              placeholder="Annual Income"
                            />
                          </div>
                          <div>
                            <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              VA Eligible
                            </label>
                            <Select
                              value={form.watch(`isVaEligible`)?.toString()}
                              {...form.register(`isVaEligible`, {
                                required: false,
                              })}
                              onValueChange={value => {
                                form.setValue('isVaEligible', value);
                              }}
                            >
                              <SelectTrigger className="w-[100%]">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {settingConfig?.isVaEligible?.map(item => (
                                    <SelectItem
                                      key={item.key}
                                      value={`${item.key}`}
                                    >
                                      {item.value}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8">
                        <Button
                          variant="blackBtn"
                          type="submit"
                          disabled={isUpdateLoan}
                          className="px-12 h-[4.4rem] rounded-full mb-8"
                        >
                          {isUpdateLoan && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Save
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
        {loans?.length > 0 && data?.data?.totalPages > 1 ? (
          <div className="flex mt-8">
            <ReactPaginate
              className="flex items-center space-x-2"
              breakLabel="..."
              nextLabel="next >"
              onPageChange={event => {
                handlePageClick(event.selected + 1);
              }}
              pageRangeDisplayed={1}
              pageCount={data?.data?.totalPages}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              pageClassName="inline-block"
              pageLinkClassName="px-4 py-2  border-gray-300 rounded hover:bg-gray-200"
              previousClassName="text-gray-400"
              previousLinkClassName="px-4 py-2  border-gray-300 rounded hover:bg-gray-200"
              nextClassName="text-gray-400"
              nextLinkClassName="px-4 py-2  border-gray-300 rounded hover:bg-gray-200"
              activeClassName="bg-gray-200"
              disabledClassName="text-gray-400 rounded"
            />
          </div>
        ) : (
          <div className="text-center mt-4">
            {' '}
            <span>{loans?.length == 0 ? 'No Result' : null}</span>
          </div>
        )}
      </Accordion>
      {!showAddLoanButton && (
        <div className="mt-24">
          <Button
            onClick={e => {
              handleAddLoan(); // Your custom logic
            }}
            variant="blueBtn"
            type="button"
            disabled={!editSelector}
            className="px-6 h-[4.7rem] w-full  rounded-full"
          >
            {activeTab == 'Loans' ? 'Add Loan' : 'Add Inquiry'}
          </Button>
        </div>
      )}
    </>
  );
}
