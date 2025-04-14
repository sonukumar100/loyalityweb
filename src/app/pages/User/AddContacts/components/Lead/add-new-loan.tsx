import { Input } from 'app/components/ui/input';
import { Label } from 'app/components/ui/label';
import { Switch } from 'app/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'app/components/ui/select';
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
import { useEffect, useState } from 'react';
import { removeEmptyKeys } from 'app/components/Shared/removeEmptyKeys';
import { toast } from 'app/components/ui/use-toast';
import { settingConfig } from 'utils/settingConfig';
import { Icons } from 'app/components/ui/icons';
import {
  cleanAmount,
  formatCurrencyValue,
  handleChanges,
} from 'utils/numberFormaters';
import Autocomplete from 'react-google-autocomplete';

export const AddNewLoan = props => {
  const { addNewLoans, activeTab } = props;
  const [activeItem, setActiveItem] = useState('item-1'); // Set initial active item to 'item-1'
  const handleAccordionChange = value => {
    setActiveItem(value === activeItem ? null : value);
  };
  const { useAddLoanMutation } = useLeadSlice();
  const editSelector = useSelector(selectAdminEdit);

  const form = useForm();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;
  const [
    addLoan,
    {
      isLoading: isAddLoan,
      isSuccess: isAddLoanSuccess,
      data: isAddLoanData,
      error: isAddLoanError,
    },
  ] = useAddLoanMutation();

  const [formattedLoanPercentage, setFormattedLoanPercentage] = useState('');
  const [formattedApr, setFormattedApr] = useState('');

  const onSubmit = data => {
    console.log(data);
    data.loanPercentage = parseFloat(loanPercentage);
    data.aprRequested = parseFloat(aprRequested);
    data.loanAmount = cleanAmount(loanAmount);
    data.annualIncome = cleanAmount(annualIncome);
    data.homeValue = cleanAmount(homeValue);
    let cleanedPayload = removeEmptyKeys(data);
    let length = Object.keys(cleanedPayload).length;

    // if (length == 0) {
    //   addNewLoans();
    //   return;
    // }

    const convertedData = Object.keys(cleanedPayload).reduce((acc, key) => {
      if (
        [
          'homeValue',
          'loanAmount',
          'creditScore',
          'loanPercentage',
          'annualIncome',
          'aprRequested',
        ].includes(key)
      ) {
        acc[key] = parseFloat(cleanedPayload[key]);
      } else {
        acc[key] = cleanedPayload[key];
      }
      return acc;
    }, {});

    if (convertedData?.isVaEligible == '1') {
      convertedData.isVaEligible = true;
    } else if (convertedData?.isVaEligible == '2') {
      convertedData.isVaEligible = false;
    }
    if (!convertedData?.loanPercentage) {
      delete convertedData.loanPercentage;
    }
    if (!convertedData?.aprRequested) {
      delete convertedData.aprRequested;
    }
    convertedData.leadId = editSelector?._id;
    console.log('data ', convertedData);
    if (activeTab == 'Loans') {
      convertedData.isInInquiry = false;
    } else {
      convertedData.isInInquiry = true;
    }
    console.log('convertedData', convertedData);
    addLoan(convertedData);
  };
  useEffect(() => {
    if (isAddLoanSuccess) {
      form.reset();
      setActiveItem('');
      toast({
        description: 'Loan added successfully',
      });

      addNewLoans();
      // setShowAddLoanButton(true)
    } else if (isAddLoanError) {
      toast({
        description: 'Please fill all the fields',
        variant: 'destructive',
      });
    }
  }, [isAddLoanSuccess, isAddLoanError]);
  const [loanAmount, setLoanAmount] = useState('$');
  const [homeValue, sethomeValue] = useState('$');
  const [creditScore, setcreditScore] = useState('$');
  const [annualIncome, setannualIncome] = useState('$');
  const [loanPercentage, setLoanPercentage] = useState('');
  const [aprRequested, setAprRequested] = useState('');
  const handleChange = (e, value) => {
    const { id, value: inputValue } = e.target;
    let formattedValue = inputValue;

    if (id === 'loanPercentage' || id === 'aprRequested') {
      formattedValue = inputValue.replace('%', '');
      if (formattedValue && !isNaN(formattedValue)) {
        formattedValue = `${formattedValue}%`;
      }
      if (id === 'loanPercentage') {
        setFormattedLoanPercentage(formattedValue);
      } else {
        setFormattedApr(formattedValue);
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
      <div className="border rounded-[1.2rem]">
        <Accordion
          type="single"
          value={activeItem}
          onValueChange={handleAccordionChange}
          collapsible
          className="w-full px-6 py-1 "
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="text-black text-xs font-poppins font-medium">
                {' '}
                {activeTab == 'Loans' ? 'Add Loan' : 'Add Inquiry'}
                {/* <span className="text-[#344054] text-[1.2rem] font-medium bg-[#F2F4F7] px-4 py-1 rounded-[1.6rem] ml-4">
                                    {' '}
                                    PREAPPROVED
                                </span> */}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {/* <div className="mt-6">
                                <div className="flex items-center space-x-2">
                                    <Label className="text-[#101828] text-xs font-poppins font-medium mr-2">
                                        Rate Tracker
                                    </Label>
                                    <Switch id="airplane-mode" className=" bg-black " />
                                </div>
                            </div> */}

              <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        </div>

                        <div>
                          <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Loan Type
                          </label>
                          <Input
                            id={`loanType`}
                            type="text"
                            {...register(`loanType`, { required: false })}
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
                                {settingConfig?.amortizationType?.map(item => (
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
                        </div>
                        <div>
                          <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            APR Requested
                          </label>
                          <Input
                            id="aprRequested"
                            type="text"
                            value={aprRequested}
                            {...register('aprRequested', {
                              required: false,
                            })}
                            onChange={e =>
                              handleChangePercentages(e, 'aprRequested')
                            }
                            onBlur={() => handleBlurPercentages('aprRequested')}
                            onFocus={() =>
                              handleFocusPercentages('aprRequested')
                            }
                            className="flex h-[4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                            placeholder="Enter APR"
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
                            id={`homeValue`}
                            type="text"
                            value={homeValue}
                            {...register(`homeValue`, { required: false })}
                            onChange={e => handleChange(e, 1)}
                            onBlur={e => handleBlur(e, 1)}
                            onFocus={e => {
                              if (homeValue.endsWith('.00')) {
                                sethomeValue(homeValue.slice(0, -3));
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
                            id={`loanAmount`}
                            value={loanAmount}
                            type="text" // Keep type as text for custom validation
                            {...register(`loanAmount`, {
                              required: false,
                            })}
                            onChange={e => handleChange(e, 2)}
                            onBlur={e => handleBlur(e, 2)}
                            onFocus={e => {
                              if (loanAmount.endsWith('.00')) {
                                setLoanAmount(loanAmount.slice(0, -3));
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
                            id={`creditScore`}
                            type="number"
                            value={form.watch('creditScore')}
                            {...register(`creditScore`, { required: false })}
                            className="flex h-[4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                            placeholder="Credit Score"
                          />
                        </div>
                        <div>
                          <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Annual Income
                          </label>
                          <Input
                            id={`annualIncome`}
                            type="text"
                            value={annualIncome}
                            {...register(`annualIncome`, { required: true })}
                            onChange={e => handleChange(e, 4)}
                            onBlur={e => handleBlur(e, 4)}
                            onFocus={e => {
                              if (annualIncome.endsWith('.00')) {
                                setannualIncome(annualIncome.slice(0, -3));
                              }
                            }}
                            className="flex h-[4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                            placeholder="Annual Income"
                          />
                          {!annualIncome && (
                            <p className="text-red-500">
                              Please enter a valid non-negative number.
                            </p>
                          )}
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
                        className="px-12 h-[4.4rem] rounded-[.8rem]"
                      >
                        {isAddLoan && (
                          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save
                      </Button>
                    </div>
                  </>
                </form>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
