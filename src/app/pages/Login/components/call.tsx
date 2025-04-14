import React, { useState } from 'react';
import axios from 'axios';

const MakeCall = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callSid, setCallSid] = useState('');
    const [error, setError] = useState('');

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:500/make-call', { to: phoneNumber })
            .then(response => {
                setCallSid(response.data.sid);
                setError('');
                alert('Call initiated. SID: ' + response.data.sid);
            })
            .catch(error => {
                setError('Error initiating call: ' + error.message);
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h2>Make a Call</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                />
                <button type="submit">Call</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {callSid && <p>Call SID: {callSid}</p>}
        </div>
    );
};

export default MakeCall;
