import React from "react";
import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { useFormContext } from 'react-hook-form';

export function LeadAddressInfo() {
    const form = useFormContext();
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
                            {...form.register('discountValu11', {
                                required: true,
                                // min: 1,
                            })}
                            placeholder="Abigail Varina"
                        />
                    </div>
                    <div>
                        <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                            id="fullName"
                            name="fullName"
                            placeholder="(000) 000-000"
                        />
                    </div>
                    <div>
                        <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email
                        </label>
                        <input
                            type="text"
                            className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                            id="fullName"
                            name="fullName"
                            placeholder="abigailvarina@gmail.com"
                        />
                    </div>
                    <div>
                        <label className="text-base text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Current Address
                        </label>
                        <input
                            type="text"
                            className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-[1rem] rounded-default"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter address"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}