// src/app/components/ui/UserVerifyModal.tsx
import { useEffect, useRef, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'app/components/ui/sheet';
import { useForm } from 'react-hook-form';
import { useUserSlice } from './slice';
import { Button } from 'app/components/ui/button';
import { toast } from 'app/components/ui/use-toast';
import { io, Socket } from 'socket.io-client';

interface UserVerifyModalProps {
  setModalOpen: (open: boolean) => void;
  isOpen: boolean;
  userId: number | null;
  is_verified: string | undefined;
}

interface Message {
  message: string;
  sendBy: number;
  created_at?: string;
}

export const UserVerifyModal: React.FC<UserVerifyModalProps> = ({
  setModalOpen,
  isOpen,
  userId,
  is_verified,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit } = useForm();
  const statusValue =
    is_verified === 'verified'
      ? '2'
      : is_verified === 'rejected'
      ? '3'
      : is_verified === 'suspect'
      ? '4'
      : '1';
  const [status, setStatus] = useState(statusValue);
  const { useVerifyUserMutation } = useUserSlice();
  const [verifyUser, { data }] = useVerifyUserMutation();

  useEffect(() => {
    const receiverId = 42;
    const newSocket = io('http://localhost:8001', {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to socket:', newSocket.id);
      newSocket.emit('joinRoom', { userId: receiverId });
    });

    newSocket.on('previousMessages', (msgs: Message[]) => {
      setMessages(msgs);
    });

    newSocket.on('receiveMessage', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    const adminId = 1;
    const receiverId = 42;
    if (socket && newMessage.trim() !== '') {
      socket.emit('sendMessage', {
        senderId: adminId,
        receiverId,
        message: newMessage,
        sendBy: 2,
        created_at: new Date().toISOString(),
      });
      setNewMessage('');
    }
  };

  const onFormSubmit = () => {
    const userId = 42;
    const payload = {
      is_verified: status,
      id: userId,
    };
    verifyUser(payload);
  };

  useEffect(() => {
    if (data) {
      setModalOpen(false);
      toast({
        title: 'Success',
        description: 'Status updated successfully.',
        variant: 'success',
      });
    }
  }, [data]);

  return (
    <Sheet open={isOpen} onOpenChange={setModalOpen}>
      <SheetContent className="w-full max-w-2xl p-6">
        <SheetHeader>
          <SheetTitle>Update User Status</SheetTitle>
        </SheetHeader>

        {/* Chat Section */}
        <div className="relative border rounded bg-gray-50 overflow-hidden mb-6 h-[600px]">
          {/* Message List */}
          <div className="p-9 pr-4 overflow-y-auto h-full pb-16">
            {messages.map((msg, idx) => {
              const isAdmin = msg.send_by === 2;
              const time = msg.created_at
                ? new Date(msg.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '';
              return (
                <div
                  key={idx}
                  className={`mb-2 flex ${
                    isAdmin ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-lg  relative ${
                      isAdmin
                        ? 'bg-blue-200 text-right'
                        : 'bg-gray-300 text-left'
                    }`}
                  >
                    <div>{msg.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{time}</div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input and Send Button */}
          <div className="absolute bottom-0 left-0 right-0 bg-white p-2 z-50 flex gap-2 border-t">
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2 text-sm"
              placeholder="Type a message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              type="button"
              onClick={handleSendMessage}
              className="shrink-0"
            >
              Send
            </Button>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onFormSubmit)}>Update Status</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
