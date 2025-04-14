// src/components/Call.js
import React, { useState } from 'react';
// import { makeCall, initializeTwilio } from '../services/twilioService';
import { makeCall, initializeTwilio } from './twilioService';
const Call = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleCall = () => {
        makeCall(phoneNumber);
    };

    React.useEffect(() => {
        initializeTwilio();
    }, []);

    return (
        <div>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
            />
            <button onClick={handleCall}>Call</button>
        </div>
    );
};

export default Call;
