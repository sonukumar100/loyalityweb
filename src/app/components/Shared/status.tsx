import React from 'react';
import { Switch } from 'app/components/ui/switch';
import { useNavigate } from 'react-router-dom';

export function Status({ statusData, onCheckedChange }) {
    const [status, id] = statusData;
    return (
        <div className="">
            <div className="flex items-center space-x-2">
                <Switch
                    id="airplane-mode"
                    className="bg-blue"
                    checked={status == 1}
                    onCheckedChange={onCheckedChange}
                />
            </div>
        </div>
    );
}
