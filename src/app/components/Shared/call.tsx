import { useGlobalSlice } from 'app/slice';
import { selectUser } from 'app/slice/selectors';
import React, { act, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Call, Device } from '@twilio/voice-sdk';
import { Button } from 'app/components/ui/button';
import DurationCall from './duration-call';
import { formatPhoneNumbers } from 'utils/formatePhoneNumber';
import { imageUrl } from 'utils/settingConfig';

interface Props {
  leadData: any;
  callTriggered: boolean;
  onDisconnect?: () => void;
  onHold?: () => void;
  onMute?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

export function Calls({
  leadData,
  callTriggered,
  onDisconnect,
  onHold,
  onMute,
  onAccept,
  onReject,
}: Props) {
  console.log('Calls 10', leadData);
  const acceptLead = leadData;
  const [device, setDevice] = useState<Device>();
  const { actions: globalActions, useLazyTwilioVoiceTokenQuery } =
    useGlobalSlice();
  const [activeCall, setActiveCall] = useState<Device | null>(null);
  const [callStatus, setCall] = useState<Call | null>(null);
  const [callDetail, setCallDetail] = useState({
    isMute: false,
    isHold: false,
    status: 'idle',
  });

  const user = useSelector(selectUser);
  const [
    getTwilioVoiceToken,
    {
      isLoading: isTwilioVoiceTokenLoading,
      isSuccess: isTwilioVoiceTokenSuccess,
      data: isTwilioVoiceTokenData,
      error: isTwilioVoiceTokenError,
    },
  ] = useLazyTwilioVoiceTokenQuery({});
  const isTwilioVoiceToken = isTwilioVoiceTokenSuccess;
  // React.useEffect(() => {
  //   if (user) {
  //     getTwilioVoiceToken('');
  //   }
  // }, [user]);

  const handleCall = phone => {
    if (isTwilioVoiceTokenSuccess && phone) {
      const token = isTwilioVoiceTokenData.data;
      const initDevice = new Device(token, {
        codecPreferences: [Call.Codec.PCMU, Call.Codec.Opus],
        disableAudioContextSounds: true,
        // fakeLocalDTMF: true,
        // enableRingingState: true,
      });
      setDevice(initDevice);
      globalActions.setTwilio({ device, token });

      const isCallStatus = (async () => {
        const call = await initDevice?.connect({
          params: {
            To: `+91${acceptLead?.phone}`,
          },
        });
        setCall(isCallStatus);
        if (!call) {
          // Handle the case where the call is not successfully connected
          // Show an error message to the user
          setCallDetail({ ...callDetail, status: 'failed' });
          // alert('Call failed')
          // Redirect to voicemail after a delay
          // setTimeout(() => {
          //   window.location.href = '/path-to-your-voicemail-twiml';
          // }, 3000); // 3-second delay before redirecting
          return;
        }

        setActiveCall(call);
        call?.on('disconnect', () => {
          onDisconnect && onDisconnect();
          setCallDetail({ ...callDetail, status: 'disconnect' });
        });
        call?.on('cancel', () => {
          onDisconnect && onDisconnect();
          setCallDetail({ ...callDetail, status: 'idle' });
        });
        call?.on('reject', () => {
          onDisconnect && onDisconnect();
          setCallDetail({ ...callDetail, status: 'reject' });
        });
        call?.on('accept', () => {
          onAccept && onAccept();
          setCallDetail({ ...callDetail, status: 'accept' });
        });
        call?.on('ringing', () =>
          setCallDetail({ ...callDetail, status: 'ringing' }),
        );
        call?.on('failed', () => {
          console.log('Call failed');
          setCallDetail({ ...callDetail, status: 'failed' });
        });
        // call?.on('mute', isMute =>
        //   setCallDetail({ ...callDetail, isMute, status: 'mute' }),
        // );
        // call?.on('hold', isHold =>
        //   setCallDetail({ ...callDetail, isHold, status: 'hold' }),
        // );
      })();
    }
  };

  const cancelCall = () => {
    console.log('disconnect', activeCall);
    onDisconnect && onDisconnect();
    if (activeCall) {
      activeCall.disconnect();
    }
  };
  const muteCall = () => {
    onMute && onMute();
    if (activeCall?.isMuted() === false) {
      activeCall?.mute(true);
      setCallDetail({ ...callDetail, isMute: true, status: 'hold' });
    } else {
      setCallDetail({ ...callDetail, isMute: false, status: 'accept' });
      activeCall?.mute(false);
    }
  };
  const holdCall = () => {
    onHold && onHold();
    if (activeCall?.isHold === false) {
      activeCall?.hold(true);
      setCallDetail({ ...callDetail, isHold: true, status: 'hold' });
    } else {
      activeCall?.hold(false);
      setCallDetail({ ...callDetail, isHold: false, status: 'accept' });
    }
  };

  useEffect(() => {
    if (callTriggered) {
      getTwilioVoiceToken('');
    }
  }, [callTriggered]);

  useEffect(() => {
    // alert('handleCall')
    if (isTwilioVoiceTokenSuccess && callTriggered) {
      handleCall(acceptLead?.phone);
    }
  }, [isTwilioVoiceTokenSuccess, callTriggered]);

  useEffect(() => {
    if (activeCall?.status()) {
      console.log('Calls 10 inner', activeCall?.status());
    }
  }, [activeCall?.status()]);
  console.log('Calls status', activeCall?.status(), callTriggered);

  return (
    <>
      {callTriggered && (
        <div>
          <div className="rounded-40 z-[99] p-12 backdrop-blur-[1.25rem] bg-[#0000000a] w-[33.1rem] fixed left-12 bottom-12">
            <div className=" flex justify-center">
              {' '}
              <img
                className="aspect-square w-[5.4rem] h-[5.4rem] rounded-full"
                alt="Avatar"
                src={
                  leadData?.avatar
                    ? imageUrl + leadData?.avatar
                    : '/images/avtar.svg'
                }
              />
            </div>
            <div className="text-center text-base mt-5  font-poppins font-normal text-[#7C7E80]">
              {' '}
              {(callDetail.status === 'accept' || callDetail.isMute) && (
                <DurationCall />
              )}
              {callDetail.status === 'ringing' && 'Ringing...'}
              {callDetail.status === 'disconnect' && 'Disconnected'}
            </div>
            <div className="text-center text-[2.2rem] mt-5  font-poppins font-semibold text-black  leading-0">
              {acceptLead?.fullName}
            </div>
            <div className="text-center text-base mt-5  font-poppins font-normal text-[#7C7E80]">
              {' '}
              {formatPhoneNumbers(leadData?.phone)}
            </div>
            {/* {callDetail.status === 'accept' && ( */}
            <div className="mt-16 flex justify-center">
              <div
                onClick={muteCall}
                className="micBtn border rounded-full w-fit p-[1.2rem] cursor-pointer"
              >
                <img
                  src={
                    callDetail.isMute
                      ? '/images/mic-off.svg'
                      : '/images/mic.svg'
                  }
                  alt="mic"
                />
              </div>
              &nbsp;&nbsp;
              {/* <div
            onClick={holdCall}
            className="micBtn border rounded-full w-fit p-[1.2rem] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <img
                src={
                  callDetail.isMute ? '/images/mic-off.svg' : '/images/mic.svg'
                }
                alt="mic"
              />
            </svg>
          </div> */}
            </div>
            {/* )} */}

            <div className="mt-8 flex justify-center">
              <Button
                onClick={cancelCall}
                variant="redBtn"
                type="button"
                className="w-[6rem] h-[6rem] flex rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="30"
                  viewBox="0 0 29 30"
                  fill="none"
                >
                  <g clip-path="url(#clip0_153_4231)">
                    <path
                      d="M6.16046 18.1374C5.51041 17.2903 5.19092 16.2356 5.26168 15.1702C5.33243 14.1048 5.78859 13.1016 6.54495 12.3479C10.9312 7.96166 18.0686 7.96166 22.4549 12.3479C23.2112 13.1016 23.6674 14.1048 23.7381 15.1702C23.8089 16.2356 23.4894 17.2903 22.8393 18.1374C22.6732 18.3498 22.4428 18.5027 22.1825 18.5734C21.9222 18.6441 21.6461 18.6287 21.3953 18.5296L17.6239 17.0916L17.6172 17.085C17.4253 17.0091 17.2551 16.8869 17.1218 16.7291C16.9886 16.5714 16.8965 16.3832 16.8538 16.1812C16.8488 16.1564 16.8455 16.1321 16.8427 16.1072L16.6295 13.5937C15.3749 13.1666 13.6238 13.1744 12.357 13.6113L12.1565 16.1C12.1544 16.1243 12.1509 16.1485 12.146 16.1724C12.1053 16.3762 12.0144 16.5666 11.8816 16.7264C11.7488 16.8862 11.5782 17.0104 11.3853 17.0878L11.3748 17.0916L7.60616 18.5279C7.35533 18.6277 7.07894 18.6435 6.81835 18.5731C6.55776 18.5027 6.32696 18.3498 6.16046 18.1374Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_153_4231">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(28.6421 15) rotate(135)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
