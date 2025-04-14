import { useGlobalSlice } from 'app/slice';
import { selectCalling } from 'app/slice/selectors';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calls } from './call';

interface Props {}

export const CallContainer = memo((props: Props) => {
  const dispatch = useDispatch();
  const calling = useSelector(selectCalling);
  const { actions: globalActions } = useGlobalSlice();

  const handleCallDisconnect = () => {
    dispatch(
      globalActions.setCalling({
        status: 'idle',
        contact: {
          phone: '',
          fullName: '',
          avatar: '',
        },
      }),
    );
  };

  const handleAcceptCall = () => {
    dispatch(
      globalActions.setCalling({
        status: 'in-progress',
        contact: {
          phone: calling.contact.phone,
          fullName: calling.contact.fullName,
          avatar: calling.contact.avatar,
        },
      }),
    );
  };
  return (
    <Calls
      leadData={calling.contact}
      callTriggered={['dialing', 'in-progress'].includes(calling.status)}
      onDisconnect={handleCallDisconnect}
      onAccept={handleAcceptCall}
      onReject={handleCallDisconnect}
    />
  );
});
