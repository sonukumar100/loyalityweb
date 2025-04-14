import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'app/components/ui/accordion';
import { Checkbox } from 'app/components/ui/checkbox';
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

const LeadFilter = () => {
  const [activeLoanOfficerItem, setActiveLoanOfficerItem] = useState<
    string | null
  >(null);
  const [activeAgentItem, setActiveAgentItem] = useState<string | null>(null);
  const [activeBuilderItem, setActiveBuilderItem] = useState<string | null>(
    null,
  );
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
            Lead Status
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
            value={activeAgentItem?.toString()}
            onValueChange={setActiveAgentItem}
          >
            <AccordionItem value="agent">
              <AccordionTrigger>
                <h5 className="text-[16px] font-semibold">Agent</h5>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[14px]">
                  Agent Accordion Item content value
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            className="w-full py-1"
            value={activeBuilderItem?.toString()}
            onValueChange={setActiveBuilderItem}
          >
            <AccordionItem value="builder">
              <AccordionTrigger>
                <h5 className="text-[16px] font-semibold">Builder</h5>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[14px]">
                  Builder Accordion Item content value
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LeadFilter;
