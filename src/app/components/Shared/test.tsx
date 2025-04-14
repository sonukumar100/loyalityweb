import React, { useEffect, useState } from 'react';
import { Device } from '@twilio/voice-sdk';

const TwilioVoice = () => {
    const [device, setDevice] = useState(null);
    const [connection, setConnection] = useState(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const initializeTwilio = async () => {
            // Replace with your token fetching logic
            const response = await fetch('/token');
            const data = await response.json();
            const token = data.token;

            const newDevice = new Device(token, {
                codecPreferences: ['opus', 'pcmu'],
                fakeLocalDTMF: true,
                enableRingingState: true,
            });

            newDevice.on('ready', () => {
                console.log('Twilio Device Ready');
            });

            newDevice.on('error', (error) => {
                console.error('Twilio Device Error:', error);
            });

            newDevice.on('connect', (conn) => {
                console.log('Connected to call');
                setConnection(conn);
                setIsMuted(false);
            });

            newDevice.on('disconnect', () => {
                console.log('Disconnected from call');
                setConnection(null);
                setIsMuted(false);
            });

            setDevice(newDevice);
        };

        initializeTwilio();

        return () => {
            if (device) {
                device.destroy();
            }
        };
    }, []);

    const handleCall = () => {
        if (device) {
            const connection = device.connect();
            setConnection(connection);
        }
    };

    const handleHangup = () => {
        if (connection) {
            connection.disconnect();
        }
    };

    const handleMute = () => {
        if (connection) {
            connection.mute(true);
            setIsMuted(true);
        }
    };

    const handleUnmute = () => {
        if (connection) {
            connection.mute(false);
            setIsMuted(false);
        }
    };

    return (
        <div>
            <h1>Twilio Voice Call</h1>
            <button onClick={handleCall} disabled={!!connection}>Call</button>
            <button onClick={handleHangup} disabled={!connection}>Hang Up</button>
            <button onClick={handleMute} disabled={!connection || isMuted}>Mute</button>
            <button onClick={handleUnmute} disabled={!connection || !isMuted}>Unmute</button>
        </div>
    );
};

export default TwilioVoice;
