import React, { useState, useEffect } from 'react';

export const Timer = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Update every 10 milliseconds
      }, 10);
      // setIntervalId(id);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTime(0);
  };

  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };
  useEffect(() => {
    handleStart()
  }, [])
  return (

    <div className="timer">
      <div className="time-display">
        {formatTime(time)}
      </div>
      {/* <div className="controls">
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div> */}
    </div>

  );
};

