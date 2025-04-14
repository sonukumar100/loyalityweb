import React from "react";
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
import { AddLeadFormProfile } from "./add-lead-form-profile";
import { Tab } from "./tab";
import { LeadAddressInfo } from "./lead-address-info";
import { AddLeadFormThree } from "./add-lead-form-three";
import { Button } from "app/components/ui/button";
import { useFormContext } from "react-hook-form";
export function LeadFormContext() {
    const form = useFormContext();
    const handleFormSubmit = (data: any) => {
        console.log("data", data)
    }
    return (
        <>
            <SheetContent className="bg-[#ffffff82] backdrop-blur-[4rem]">
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <AddLeadFormProfile />
                    <Tab />
                    <LeadAddressInfo />
                    <AddLeadFormThree />
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </form>
            </SheetContent>
        </>
    )
}