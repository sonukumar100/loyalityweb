import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from 'app/components/ui/card';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from 'app/components/ui/tabs';

import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import { Label } from 'app/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from 'app/components/ui/sheet';
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
export function AddLeadFormThree() {
    const form = useFormContext();

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
                            id="fullName"
                            placeholder="Enter Hobby"
                            {...form.register('discountValue', {
                                required: true,
                                // min: 1,
                            })}
                        />
                    </div>
                    <div>
                        <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Favorite Drink / Food
                        </label>
                        <input
                            type="text"
                            className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter Favorite Drink / Food"
                        />
                    </div>
                    <div>
                        <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Kids / Animal
                        </label>
                        <input
                            type="text"
                            className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter Kids / Animal"
                        />
                    </div>
                    <div>
                        <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Birthday
                        </label>
                        <input
                            type="text"
                            className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter date of birth"
                        />
                    </div>
                    <div>
                        <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Lead Source
                        </label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Lead Source" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Self Sourced</SelectLabel>
                                    <SelectItem value="apple">Bankrate</SelectItem>
                                    <SelectItem value="banana">LendingTree</SelectItem>
                                    <SelectItem value="blueberry">
                                        Past Client Referral
                                    </SelectItem>
                                    <SelectItem value="grapes">
                                        Company Website
                                    </SelectItem>
                                    <SelectItem value="pineapple">CBH Homes</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Assigned Loan Officer
                        </label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Loan officer" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Self Sourced</SelectLabel>
                                    <SelectItem value="apple">Bankrate</SelectItem>
                                    <SelectItem value="banana">LendingTree</SelectItem>
                                    <SelectItem value="blueberry">
                                        Past Client Referral
                                    </SelectItem>
                                    <SelectItem value="grapes">
                                        Company Website
                                    </SelectItem>
                                    <SelectItem value="pineapple">CBH Homes</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Assigned Agent
                        </label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Agent" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Agent</SelectLabel>
                                    <SelectItem value="apple">Bankrate</SelectItem>
                                    <SelectItem value="banana">LendingTree</SelectItem>
                                    <SelectItem value="blueberry">
                                        Past Client Referral
                                    </SelectItem>
                                    <SelectItem value="grapes">
                                        Company Website
                                    </SelectItem>
                                    <SelectItem value="pineapple">CBH Homes</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Assigned Builder
                        </label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Builder" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Builder</SelectLabel>
                                    <SelectItem value="apple">Bankrate</SelectItem>
                                    <SelectItem value="banana">LendingTree</SelectItem>
                                    <SelectItem value="blueberry">
                                        Past Client Referral
                                    </SelectItem>
                                    <SelectItem value="grapes">
                                        Company Website
                                    </SelectItem>
                                    <SelectItem value="pineapple">CBH Homes</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </>
    )
}