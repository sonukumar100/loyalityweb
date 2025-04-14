import React, { useEffect } from "react";
import { Form } from 'app/components/ui/form';
import { useForm } from 'react-hook-form';
import { ManageLead } from "./manage-lead";
import { useSelector } from "react-redux";
import { selectAdminEdit } from "../../slice/selectors";

export function Wrap() {
    const form = useForm({});
    const editSelector = useSelector(selectAdminEdit);
    console.log("wrap")
    useEffect(() => {
        // const { } = editSelector
        form.reset(editSelector)
        // if (editSelector) {
        //     setOpen(true);
        // }
        // console.log('open', open);
    }, [editSelector]);
    return (
        <Form {...form}>
            <ManageLead />
        </Form>


    )
}