import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'app/components/ui/dropdown-menu';
import React, { useState, useRef, memo, useEffect } from 'react';
import { MainNav } from './main-nav';
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
  const user = useSelector(selectUser);
  const isNewNotifications = useSelector(selectNewNotifications);
  const userId = user?._id;

  const [open, setOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [image, uploadImage] = useState(false);
  const [isMediaFileUpload, setMediaFileUpload] = useState(false);
  const [fileSize, setFileSize] = useState<number | undefined>(undefined);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Your browser does not support audio recording.');
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => audioChunksRef.current.push(event.data);
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
      setAudioUrl(URL.createObjectURL(audioBlob));
      setFileSize(audioBlob.size);
    };
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const { useUploadFileMutation, useUpdateProfileMutation } = useAdminSlice();
  const [fileUpload, { isLoading: isfileUpload, isSuccess: isfileUploadSuccess, data: fileData }] = useUploadFileMutation();
  const [updateProfile, { isSuccess: isUpdateProfileDate, data }] = useUpdateProfileMutation();

  const voiceSend = () => {
    if (audioChunksRef.current.length === 0) return;
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
    const formData = new FormData();
    formData.append('voicemail', audioBlob, 'voicemail.mp3');
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
    }
  }, [fileData]);

  useEffect(() => {
    if (isfileUploadSuccess && image && fileData?.data) {
      updateProfile({ avatar: fileData?.data?.image?.[0] });
    } else if (isfileUploadSuccess && !image && fileData?.data) {
      updateProfile({ voiceMail: fileData?.data?.voicemail?.[0] });
    }
  }, [isfileUploadSuccess]);

  const { actions: globalActions } = useGlobalSlice();

  useEffect(() => {
    if (isUpdateProfileDate) {
      uploadImage(false);
      dispatch(globalActions.setUser(data?.data));
      toast({ description: 'Profile updated successfully' });
      setOpen(true);
      setMediaFileUpload(false);
    }
  }, [isUpdateProfileDate]);

  const location = useLocation();
  const settingsPart = location.pathname.split('/').pop();

  const { useGetNotificationsQuery } = useGlobalSlice();
  const [getNotifications, { data: notificationsData }] = useGetNotificationsQuery();

  useEffect(() => {
    if (userId) {
      getNotifications(userId);
    }
  }, [isNewNotifications?.isNotifications]);

  NotificationsSocket(userId);

  return (
    <header className="container animate-fade-in-down">
      <Toaster />
      <nav className="mt-10">
        <div className="flex justify-between items-center rounded-full px-8 py-4 shadow-xl backdrop-blur-md border border-white/30 transition-all duration-700 ease-in-out hover:scale-[1.02]" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(220, 230, 245, 0.3) 100%)' }}>
          <div className="flex items-center space-x-6">
            <Link to="#" className="text-black font-extrabold text-2xl rounded-lg bg-transparent">
              Loyalty
            </Link>
            <div className="relative hidden md:block">
              <Input
                placeholder="Search..."
                type="text"
                className="w-14 md:w-56 lg:w-72 h-12 rounded-full bg-white/60 border border-[#C0C9D6] placeholder:text-gray-600 pl-12 pr-4 transition-all duration-500 focus:w-80 focus:pl-12 focus:bg-white"
              />
              <Search className="absolute top-3 left-4 text-gray-500 w-5 h-5" />
            </div>
          </div>

          <ul className="hidden lg:flex space-x-3">
            {[
              { label: 'Dashboard', path: '/user/dasboard' },
              { label: 'Contacts', path: '#' },
              { label: 'Offer', path: '/offer' },
              { label: 'Coupon', path: '/coupon' },
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

          <div className="flex items-center space-x-4">
            {/* Right section (e.g. profile image, notifications) can be added here */}
          </div>
        </div>
      </nav>
    </header>
  );
});
