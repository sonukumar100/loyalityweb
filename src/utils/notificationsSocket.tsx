import { useGlobalSlice } from 'app/slice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
// export const socket = io('http://localhost:8001', {
//     transports: ['websocket'],
//     upgrade: true,
//     autoConnect: false,
// });
const NotificationsSocket = (userId: string) => {
  const { actions: globalActions } = useGlobalSlice();
  const serverUrl = process.env.REACT_APP_API_URL || '';
  console.log('endPoint url ', serverUrl);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [startTimer, setStartTimer] = useState(true);

  useEffect(() => {
    if (!startTimer) return;

    // const intervalId = setInterval(() => {
    //     setCount(prevCount => prevCount + 1);
    //     dispatch(
    //         globalActions.setNewNotifications({
    //             isNotifications: true,
    //             isNewLead: false,
    //         }),
    //     );
    //     dispatch(
    //         globalActions.setNewNotifications({
    //             isNewLead: true,
    //             isNotifications: false,
    //         }),
    //     );
    // }, 5000);

    // return () => clearInterval(intervalId);
  }, [startTimer]); // Re-run the effect when `startTimer` changes

  useEffect(() => {
    // const socket = io(serverUrl, {
    //     transports: ['websocket'],
    //     upgrade: true,
    // });
    // socket.on('connect', () => {
    //     console.log('connected');
    // });
    // socket.on('new-notification', data => {
    //     dispatch(
    //         globalActions.setNewNotifications({
    //             isNotifications: true,
    //         }),
    //     );
    //     console.log('new-notification', data);
    // });
    // socket.on('new-lead', data => {
    //     console.log('new-lead', data);
    // });
    // socket.emit('join-notification-room', { userId });
    // return () => {
    //     socket.removeAllListeners();
    // };
  }, [serverUrl, userId]);
};

export default NotificationsSocket;
