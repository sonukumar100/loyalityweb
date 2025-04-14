import React, { memo, useEffect } from 'react';
import { Button } from 'app/components/ui/button';

import { Label } from 'app/components/ui/label';
import { ChevronDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'app/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'app/components/ui/popover';

import { Check, ChevronsUpDown, PlusCircle, Scroll } from 'lucide-react';
import { cn } from 'utils/twm';
import { useDebounce } from 'app/components/ui/multi-selector';
import { GenericNS } from 'types/Generic';
import { ScrollArea } from '../ui/scroll-area';

interface Props {
  title: string;
  data: any[];
  selected?: string;
  onSelect?: (value: string) => void;
  onSearch: (search: string) => void;
}

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export const SingleSearchWithAPI = memo((props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [search, setSearch] = React.useState('');
  const debounceSearch = useDebounce(search, 300);
  useEffect(() => {
    props.onSearch(debounceSearch);
  }, [debounceSearch]);

  useEffect(() => {
    if (props.selected) {
      setValue(props.selected);
    }
  }, [props.selected]);
  return (
    <div className="flex flex-col space-y-1.5 rounded-[2rem]">
      <Label htmlFor="email">{props.title}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="selectBtn"
            role="combobox"
            aria-expanded={open}
            className="rounded-default bg-white border   justify-between whitespace-normal text-left font-poppins font-normal  h-[4.4rem] pl-6 mt-4 text-base text-[#000]  "
          >
            {value
              ? props.data.find(item => item?._id === value)?.name
              : 'Select ' + props.title}
            <ChevronDown className="mr-6 h-8 w-8 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[50rem] rounded-[1.4rem]">
          <Command shouldFilter={false}>
            <CommandInput
              className="text-base font-poppins font-normal "
              placeholder={'Search ' + props.title}
              onInput={e => setSearch(e.target['value'])}
            />
            <CommandEmpty>No result found.</CommandEmpty>
            <ScrollArea className="h-[200px]">
              <CommandGroup>
                {props.data.map(item => (
                  <CommandItem
                    className="text-base font-poppins font-normal"
                    key={item?._id + genId()}
                    value={item?._id}
                    onSelect={currentValue => {
                      setValue(currentValue);
                      setOpen(false);
                      props.onSelect?.(currentValue);
                      // setSearch('');
                    }}
                  >
                    <Check
                      className={cn(
                        ' h-12 w-4',
                        value === item?.name ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {item?.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
});
