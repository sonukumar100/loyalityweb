import React, { useState, useEffect } from 'react';

interface Props {
  startTime?: number;
}

const DurationCall: React.FC = ({ startTime }: Props) => {
  const [duration, setDuration] = useState<number>(startTime || 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prevDuration => prevDuration + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return <p>{formatDuration(duration)}</p>;
};

export default DurationCall;
