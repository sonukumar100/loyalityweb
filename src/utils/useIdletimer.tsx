import { useEffect, useRef } from 'react';

export const useIdleTimer = (timeout, onTimeout) => {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(onTimeout, timeout);
  };

  useEffect(() => {
    const handleActivity = () => resetTimer();

    // List of events that will reset the timer
    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    events.forEach(event => window.addEventListener(event, handleActivity));

    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach(event =>
        window.removeEventListener(event, handleActivity),
      );
    };
  }, [timeout, onTimeout]);
  //   console.log('timer');
  return resetTimer;
};
