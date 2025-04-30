import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'app/components/ui/select';
import { ShippedConfirmDialog } from './shipped-dialog';

interface StatusSelectProps {
    value: string | undefined;
    id: number;
}

export function StatusSelect({ value, id }: StatusSelectProps) {
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || '1');

    const handleChange = (newValue: string) => {
        if (newValue == '2') {
            setOpenAlert(true);
        }
        setSelectedValue(newValue);
    };

    const handleConfirm = () => {
        setOpenAlert(false);
        // 🚀 You can call API to confirm status change
    };

    const handleCancel = () => {
        setOpenAlert(false);
        setSelectedValue('1');
    };

    return (
        <>
            <Select value={selectedValue} onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Under Process</SelectItem>
                    <SelectItem value="2">Shipped</SelectItem>
                    <SelectItem value="3">Transfer</SelectItem>
                </SelectContent>
            </Select>

            <ShippedConfirmDialog
                open={openAlert}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                selectedValue={selectedValue}
                id={id}
                onOpenChange={setOpenAlert}
            />
        </>
    );
}
