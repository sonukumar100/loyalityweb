// src/app/components/ui/ChatModal.tsx
import { useEffect, useRef, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'app/components/ui/sheet';
import { Button } from 'app/components/ui/button';
import { io, Socket } from 'socket.io-client';

interface ChatModalProps {
  setModalOpen: (open: boolean) => void;
  isOpen: boolean;
  userId: number | null;
  userName: string;
}

interface Message {
  message: string;
  send_by: number;
  created_at?: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  setModalOpen,
  isOpen,
  userId,
  userName,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const newSocket = io('http://localhost:8001', {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to socket:', newSocket.id);
      newSocket.emit('joinRoom', { userId: userId });
    });

    newSocket.on('previousMessages', (msgs: Message[]) => {
      setMessages(msgs);
    });

    newSocket.on('receiveMessage', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    setSocket(newSocket);

    // Fix: explicitly return void
    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    const adminId = 1;
    if (socket && newMessage.trim() !== '') {
      socket.emit('sendMessage', {
        senderId: adminId,
        receiverId: userId,
        message: newMessage,
        sendBy: 2,
        created_at: new Date().toISOString(),
      });
      setNewMessage('');
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={setModalOpen}>
      <SheetContent className="w-[450px] p-6">
        <SheetHeader>
          <SheetTitle>{userName}</SheetTitle>
        </SheetHeader>

        {/* Chat Section */}
        <div className="relative border border-gray-400 rounded-2xl bg-gray-50 mt-6 overflow-hidden mb-6 h-[600px]">
          {/* Message List */}
          <div className="p-16 pr-4 overflow-y-auto h-full pb-16">
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
                    <div className="text-[10px] text-gray-500 mt-1">{time}</div>
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
            <Button className="bg-transparent" onClick={handleSendMessage}>
              <img src="/images/send-message.svg" alt="send-message" />
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
