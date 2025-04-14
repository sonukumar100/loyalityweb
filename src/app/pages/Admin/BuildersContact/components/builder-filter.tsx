import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'app/components/ui/accordion';
import { Checkbox } from 'app/components/ui/checkbox';
import { Label } from 'app/components/ui/label';
import { RadioGroup, RadioGroupItem } from 'app/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'app/components/ui/select';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { settingConfig } from 'utils/settingConfig';

const BuilderFilter = () => {
  const [activeLoanOfficerItem, setActiveLoanOfficerItem] = useState<
    string | null
  >(null);
  const [activeAnnualVolumeItem, setActiveAnnualVolumeItem] = useState<
    string | null
  >(null);
  const [activeStateItem, setActiveStateItem] = useState<string | null>(null);
  const form = useForm();
  return (
    <React.Fragment>
      <div
        id="filterForm"
        className="p-4 w-[300px] h-[40rem] overflow-y-scroll"
      >
        <h4 className="text-gray-500 font-semibold text-lg mb-5">Filter</h4>
        <div className="mb-5">
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
        <div className="mb-5">
          <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Builder Status
          </label>
          <div className="flex items-center space-x-2 my-4">
            <Checkbox
              className="w-8 h-8 border border-[#d4d8df] rounded-[.6rem]"
              id="default"
            />
            <label
              htmlFor="default"
              className="text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Default All
            </label>
          </div>
          <div className="flex items-center space-x-2 my-4">
            <Checkbox
              className="w-8 h-8 border border-[#d4d8df] rounded-[.6rem]"
              id="new"
            />
            <label
              htmlFor="new"
              className="text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              New
            </label>
          </div>
          <div className="flex items-center space-x-2 my-4">
            <Checkbox
              className="w-8 h-8 border border-[#d4d8df] rounded-[.6rem]"
              id="nurturing"
            />
            <label
              htmlFor="nurturing"
              className="text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Nurturing
            </label>
          </div>
          <div className="flex items-center space-x-2 my-4">
            <Checkbox
              className="w-8 h-8 border border-[#d4d8df] rounded-[.6rem]"
              id="working"
            />
            <label
              htmlFor="working"
              className="text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Working
            </label>
          </div>
          <div className="flex items-center space-x-2 my-4">
            <Checkbox
              className="w-8 h-8 border border-[#d4d8df] rounded-[.6rem]"
              id="pastClient"
            />
            <label
              htmlFor="pastClient"
              className="text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Past Client
            </label>
          </div>
          <p className="text-[12px] cursor-pointer text-blue-500 font-semibold">
            View All
          </p>
          <Accordion
            type="single"
            collapsible
            className="w-full py-1"
            value={activeLoanOfficerItem?.toString()}
            onValueChange={setActiveLoanOfficerItem}
          >
            <AccordionItem value="loanOfficer">
              <AccordionTrigger>
                <h5 className="text-[16px] font-semibold">Loan Officer</h5>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[14px]">
                  Loan Officer Accordion Item content value
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            className="w-full py-1"
            value={activeAnnualVolumeItem?.toString()}
            onValueChange={setActiveAnnualVolumeItem}
          >
            <AccordionItem value="annualVolume">
              <AccordionTrigger>
                <h5 className="text-[16px] font-semibold">Annual Volume</h5>
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="">
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="0-12,000,000" id="below-12" />
                    <Label htmlFor="below-12">0 - 12,000,000</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="12,000,000-25,000,000" id="12-25" />
                    <Label htmlFor="12-25">12,000,000 - 25,000,000</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="25,000,000-50,000,000" id="25-50" />
                    <Label htmlFor="25-50">25,000,000 - 50,000,000</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem
                      value="50,000,000-100,000,000"
                      id="50-100"
                    />
                    <Label htmlFor="50-100">50,000,000 - 100,000,000</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="100,000,000+" id="above-100" />
                    <Label htmlFor="above-100">100,000,000</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            className="w-full py-1"
            value={activeStateItem?.toString()}
            onValueChange={setActiveStateItem}
          >
            <AccordionItem value="state">
              <AccordionTrigger>
                <h5 className="text-[16px] font-semibold">State</h5>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[14px]">
                  State Accordion Item content value
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuilderFilter;
