// src/services/twilioService.js
import { Device } from '@twilio/voice-sdk';

let device;

export const initializeTwilio = async () => {
    const response = await fetch('http://localhost:5000/token'); // Adjust the URL if needed
    const data = await response.json();

    device = new Device(data.token);

    device.on('ready', () => {
        console.log('Twilio Device Ready');
    });

    device.on('error', (error) => {
        console.log('Twilio Device Error', error);
    });
};

export const makeCall = (phoneNumber) => {
    if (!device) {
        console.error('Twilio Device not initialized');
        return;
    }

    device.connect({ params: { To: phoneNumber } });
};
