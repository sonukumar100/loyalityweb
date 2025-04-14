import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'app/components/ui/dropdown-menu';
import React, { useState, useRef, memo, useEffect } from 'react';
import { MainNav } from './main-nav';
// import { Link } from 'react-router-dom';
import { LogOut, Search } from 'lucide-react';
import { Button } from 'app/components/ui/button';
import { useAdminSlice } from 'app/pages/Admin/slice';
import { useSelector } from 'react-redux';
import { selectNewNotifications, selectUser } from 'app/slice/selectors';
import PasswordForm from './password';
import { Input } from 'app/components/ui/input';
import { useGlobalSlice } from 'app/slice';
import { useDispatch } from 'react-redux';
import { imageUrl } from 'utils/settingConfig';
import { Toaster } from 'app/components/ui/toaster';
import { useToast } from 'app/components/ui/use-toast';
import { Searchheader } from './search';
import { Timer } from './Timer';
import {
  Link,
  useLocation,
  useNavigate,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Logout } from './Logout';
import { AddContacts } from 'app/pages/User/AddContacts';
import { ActiveSvgImg } from './activeSvg';
import { formatPhoneNumber } from 'utils/formatePhoneNumber';
import Notifications from '../Notifications/notifications';
import { ScrollArea } from 'app/components/ui/scroll-area';
import NotificationsSocket from 'utils/notificationsSocket';
interface Props {
  className?: string;
}

export const Header = memo((props: Props) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const parentMethod = () => {
    setIsEditProfile(false);
    setOpen(true);
  };
  const user = useSelector(selectUser);
  const isNewNotifications = useSelector(selectNewNotifications)
  console.log("selectNewNotifications", isNewNotifications)
  const userId = user?._id;
  const [open, setOpen] = React.useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [image, uploadImage] = useState(false);
  const [isMediaFileUpload, setMediaFileUpload] = useState(false);
  // Ensure fileSize state is defined with a type number
  const [fileSize, setFileSize] = useState<number | undefined>(undefined);
  const handleStartRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support audio recording.');
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      setFileSize(audioBlob.size);
      // Don't clear audioChunksRef.current here
    };
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };
  const handleStopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      const setFileSize = new Blob(audioChunksRef.current, {
        type: 'audio/mp3',
      });
      // setFileSize(setFileSize)
    }
  };
  const { useUploadFileMutation, useUpdateProfileMutation } = useAdminSlice();
  const [
    fileUpload,
    {
      isLoading: isfileUpload,
      isSuccess: isfileUploadSuccess,
      data: fileData,
      error: fileUploadError,
    },
  ] = useUploadFileMutation();
  const voiceSend = () => {
    if (audioChunksRef.current.length === 0) {
      return;
    }
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
    // console.log('Audio chunks at send:', audioChunksRef.current);
    // console.log('Blob type:', audioBlob.type);
    // console.log('Blob size:', audioBlob.size);
    const formData = new FormData();
    formData.append('voicemail', audioBlob, 'voicemail.mp3');
    // Assuming fileUpload is a function that handles the form submission
    fileUpload(formData);
  };
  useEffect(() => {
    if (fileSize) {
      voiceSend();
      setMediaFileUpload(true);
    }
  }, [fileSize]);

  useEffect(() => {
    if (fileData) {
      setAudioUrl(imageUrl + fileData?.data?.voicemail?.[0]);
      // setOpen(true)
    }
  }, [fileData]);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const editProfile = () => {
    setIsEditProfile(prevState => !prevState);
  };

  const [
    updateProfile,
    {
      isLoading: isUpdateProfile,
      isSuccess: isUpdateProfileDate,
      data,
      error: isUpdateProfileError,
    },
  ] = useUpdateProfileMutation();

  const handleFileUpload = (event, value) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      fileUpload(formData);
      uploadImage(true);
    }
  };
  useEffect(() => {
    if (isfileUploadSuccess && image && fileData?.data) {
      updateProfile({ avatar: fileData?.data?.image?.[0] });
    } else if (isfileUploadSuccess && !image && fileData?.data) {
      updateProfile({ voiceMail: fileData?.data?.voicemail?.[0] });
    }
  }, [isfileUploadSuccess]);
  const { actions: globalActions } = useGlobalSlice();

  React.useEffect(() => {
    if (isUpdateProfileDate) {
      uploadImage(false);
      dispatch(globalActions.setUser(data?.data));
      toast({
        description: 'Profile updated successfully',
      });
      setOpen(true);
      setMediaFileUpload(false);
    }
  }, [isUpdateProfileDate]);
  const location = useLocation();
  const path = location.pathname;
  const settingsPart = path.split('/').pop(); // Extract the last part of the pathname
  /////  notification /////
  const { useGetNotificationsQuery } = useGlobalSlice();
  const [
    getNotifications,
    {
      isLoading: notificationsLoading,
      isSuccess: notificationsSuccess,
      data: notificationsData,
      error: notificationsError,
    },
  ] = useGetNotificationsQuery();
  useEffect(() => {
    if (userId) {
      getNotifications(userId);
    }
  }, [isNewNotifications?.isNotifications]);
  console.log('notificationsData', isNewNotifications?.isNotifications);
  useEffect(() => {
    // dispatch(
    //   globalActions.setNewNotifications({
    //     isNotifications: false,
    //   }),
    // );
  }, [notificationsData]);
  NotificationsSocket(userId);
  return (

    <header className="container animate-fade-in-down">
      <Toaster />
      <nav className="mt-10">
        <div
          className="flex justify-between items-center rounded-full px-8 py-4 shadow-lg backdrop-blur-md border border-white/30 transition-all duration-500 ease-in-out"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(220, 230, 245, 0.3) 100%)',
          }}
        >
          {/* Logo + Search */}
          <div className="flex items-center space-x-6">
            <a href="#">
              <img
                src="/images/new-logo.svg"
                alt="Logo"
                width={50}
                className="hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Search */}
            <div className="relative hidden md:block">
              <Input
                placeholder="Search..."
                type="text"
                className="w-14 md:w-56 lg:w-72 h-12 rounded-full bg-white/60 border border-[#C0C9D6] placeholder:text-gray-600 pl-12 pr-4 transition-all duration-500 focus:w-80 focus:pl-12 focus:bg-white"
              />
              <Search className="absolute top-3 left-4 text-gray-500 w-5 h-5" />
            </div>
          </div>

          {/* Navigation */}
          <ul className="hidden lg:flex space-x-3">
            {[
              { label: 'Dashboard', path: '/user/dasboard' },
              { label: 'Contacts', path: '#' },
              { label: 'offer', path: '/offer' },
              { label: 'Loan Center', path: '#' },
              { label: 'Payroll', path: '#' },
              { label: 'Master', path: '/admin/settings/digital-catalog' },
            ].map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <li key={label}>
                  <Link
                    to={path}
                    className={`px-5 py-2 text-sm font-semibold border rounded-full transition duration-300 ${isActive
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                      : 'text-gray-700 border-[#B7C1CF] bg-white/30 backdrop-blur-sm hover:bg-white hover:text-blue-600 hover:shadow'
                      }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}

          </ul>

          {/* Right section: Placeholder for profile, notifications */}
          <div className="flex items-center space-x-4">
            {/* Add buttons/icons if needed */}
          </div>
        </div>
      </nav>
    </header>



  );
});
