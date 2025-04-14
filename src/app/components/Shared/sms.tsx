import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { Input } from 'app/components/ui/input';
import {
    Message,
    Conversation,
    Participant,
    Client,
    ConnectionState,
    Paginator,
} from '@twilio/conversations';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from 'app/components/ui/tabs';
import {
    ChatLog,
    ChatMessage,
    ChatMessageMeta,
    ChatMessageMetaItem,
    ChatBubble,
    Separator,
    Badge,
    Box,
} from '@twilio-paste/core';
import { Button } from 'app/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalSlice } from 'app/slice';
import {
    getConversationsBySid,
    getMessages,
    removeMessages,
} from 'utils/twilioApi';
import { selectChat, selectUser } from 'app/slice/selectors';
import { getFirstMessagePerDate, getMessageTime } from 'utils/timestampUtils';
import { useForm } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScrollArea } from 'app/components/ui/scroll-area';
import { TwilioMessage } from 'app/slice/types';
import { getSdkMessageObject } from 'utils/conversations-objects';
import { Textarea } from '../ui/textarea';

export function Sms(props) {
    const dispatch = useDispatch();
    const { actions: globalActions } = useGlobalSlice();
    const [connectionState, setConnectionState] = useState<ConnectionState>();
    const [client, setClient] = useState<Client>();
    const { register, handleSubmit, reset } = useForm();
    const [firstMessagePerDay, setFirstMessagePerDay] = useState<string[]>([]);
    const [paginator, setPaginator] = useState<Paginator<Message> | null>(null);
    const [loading, setLoading] = useState(false);
    const [height, setHeight] = useState(0);

    // sidRef.current = sid;
    const { useLazyChatTwilioTokenQuery } = useGlobalSlice();
    const [
        chatTwilioToken,
        {
            isLoading: isChatTwilioToken,
            isSuccess: isChatTwilioTokenSuccess,
            data: isChatTwilioTokenData,
            error: isChatTwilioTokenError,
        },
    ] = useLazyChatTwilioTokenQuery();
    useEffect(() => {
        chatTwilioToken({ adminId: '66853c66c7820f5164c734c4' });
    }, []);
    useEffect(() => {
        if (isChatTwilioTokenData) {
            dispatch(
                globalActions.setTwilioChat({
                    token: isChatTwilioTokenData?.data,
                }),
            );
        }
    }, [isChatTwilioTokenData]);
    const loadMessage = async client => {
        console.log('SID', props?.sid, client);
        console.log('SID', props?.sid, client);
        try {
            const conversation = await getConversationsBySid(props?.sid, client);
            const paginator = await getMessages(conversation);
            console.log('paginator ===>', paginator);
            setHasMore(paginator.hasPrevPage);
            setPaginator(paginator);
            const messages = paginator.items;
            dispatch(
                globalActions.pushTwilioChat({
                    messages,
                }),
            );
        } catch (e) {
            console.log('Conversation not found', e);
        }
    };
    const token = isChatTwilioTokenData?.data;
    useEffect(() => {
        if (props?.sid && client) {
            loadMessage(client);
        }
    }, [props?.sid, client]);
    // useEffect(() => {
    //     if (token) {
    //         const client = new Client(token);
    //         client?.on('initialized', () => setClient(client));
    //     }
    // }, [isChatTwilioTokenData?.data]);

    const sendMessage = async (message: string) => {
        const conversation = await getConversationsBySid(props?.sid, client);
        const messageSent = await conversation.sendMessage(message);
        loadMessage(client);
        console.log('messageSent', messageSent);
        try {
            const res = await conversation.advanceLastReadMessageIndex(
                messageSent ?? 0,
            );
            console.log('res', res);
        } catch (e) {
            // unexpectedErrorNotification(e.message, addNotifications);
            throw e;
        }
        // const paginator = await getMessages(conversation);
        // const messages = paginator.items;
        // console.log('Message sent', messages);
        // dispatch(
        //     globalActions.pushTwilioChat({
        //         messages,
        //     }),
        // );
    };

    const messages = useSelector(selectChat);
    const user = useSelector(selectUser);
    console.log('chat message', messages);
    const today = new Date().toDateString();
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages?.chat) {
            setFirstMessagePerDay(getFirstMessagePerDate(messages?.chat));
        }
    }, [messages?.chat]);

    const onSubmit = data => {
        if (props?.sid && client) {
            sendMessage(data?.message);
            reset();
        } else {
            alert('something went wrong');
        }
    };
    const [hasMore, setHasMore] = useState(messages?.chat?.length === 10);
    useLayoutEffect(() => {
        const currentHeight = listRef.current?.clientHeight;
        console.log('currentHeight', currentHeight);
        if (currentHeight && currentHeight > height && loading) {
            // for preventing immediate downloading of the next messages page
            setTimeout(() => {
                setHeight(currentHeight ?? 0);
                setLoading(true);
            }, 2000);
        }
    }, [listRef.current?.clientHeight]);

    const fetchMore = async () => {
        console.log('call fetch more', paginator);
        if (!paginator) {
            return;
        }
        const result = await paginator?.prevPage();
        console.log('result', result);
        if (!result) {
            return;
        }
        const moreMessages = result.items;
        console.log('moreMessage', moreMessages);

        setLoading(true);
        setPaginator(result);
        setHasMore(result.hasPrevPage);
        // upsertMessage(convo.sid, moreMessages);
    };

    const [clientIteration, setClientIteration] = useState(0);
    useEffect(() => {
        // const token = isChatTwilioTokenData?.data
        if (token) {
            const client = new Client(token);
            setClient(client);
            client.on('messageAdded', async (message: Message) => {
                console.log('client message add', client);
                setClient(client);
                loadMessage(client);
                console.log('message', message);

                // await upsertMessage(message, upsertMessages, updateUnreadMessages);
                // if (message.author === localStorage.getItem("username")) {
                //     clearAttachments(message.conversation.sid, "-1");
                // }
            });

            // client.on("messageUpdated", async ({ message }) => {
            //     await handlePromiseRejection(
            //         async () =>
            //             upsertMessage(message, upsertMessages, updateUnreadMessages),
            //         addNotifications
            //     );
            // });

            client.on('messageRemoved', async message => {
                console.log('message removed', message);
            });
            if (client) {
                client.on('tokenExpired', () => {
                    console.log('Token expired');
                    // const client = new Client(token);
                    // setClient(client);
                    // if (username && password) {
                    //     const token = await getToken(username, password);
                    //     login(token);
                    // chatTwilioToken({ adminId: '66853c66c7820f5164c734c4' });

                    setClientIteration(x => x + 1);
                    // }
                });
            }
            if (client) {
                client.on('connectionStateChanged', state => {
                    setConnectionState(state);
                });
            }
            // updateLoadingState(false);
            return () => {
                client?.removeAllListeners();
            };
        }
    }, [clientIteration, token]);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (bottomRef.current && messages?.chat) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages?.chat]);
    const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        console.log('Scroll Event:', event);
        const target = event.currentTarget; // Access the scrollable element
        console.log('Scroll Top:', target.scrollTop);
        console.log('Scroll Height:', target.scrollHeight);
        console.log('Client Height:', target.clientHeight);
        // Example of checking if the user has scrolled to the bottom
        if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
            console.log('User has scrolled to the bottom');
        }
        if (target.scrollTop === 0) {
            // fetchMore()
        }
    };

    // useEffect(() => {
    //     const scrollArea = scrollAreaRef.current;
    //     if (scrollArea) {
    //         scrollArea.addEventListener('scroll', handleScroll);
    //     }
    //     return () => {
    //         if (scrollArea) {
    //             scrollArea.removeEventListener('scroll', handleScroll);
    //         }
    //     };
    // }, []);
    const removeMessage = sid => {
        removeMessages(sid);
    };
    /// update message ///
    const updateMessage = async (message: TwilioMessage) => {
        const sdkMessage = getSdkMessageObject(message.sid);
        console.log('sdkMessage', sdkMessage);
        // const message = await sdkMessage.updateAttributes({
        //     body: 'Hello, World!',
        // });
        // console.log('message updated', message);
    };
    const [content, setContent] = useState('');
    const [lineCount, setLineCount] = useState(0);
    let maxLineCount = 10; // Maximum number of lines
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // Function to update the line count based on content
    const updateLineCount = () => {
        if (textareaRef.current) {
            // Get the computed line height
            const lineHeight = parseInt(window.getComputedStyle(textareaRef.current).lineHeight, 10);

            // Calculate the number of lines based on scrollHeight and lineHeight
            const newLineCount = Math.max(1, Math.floor(textareaRef.current.scrollHeight / lineHeight));
            setLineCount(Math.min(newLineCount, maxLineCount)); // Apply the maximum line count
        }
    };

    useEffect(() => {
        updateLineCount();
    }, [content]);

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handlePaste = (event) => {
        // Ensure the textarea updates line count after pasting
        setTimeout(() => {
            updateLineCount();
        }, 0); // Set timeout to allow paste operation to complete
    };

    const handleCut = () => {
        // Ensure the textarea updates line count after cutting
        setTimeout(() => {
            maxLineCount = 0
            updateLineCount();

        }, 0); // Set timeout to allow cut operation to complete
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent the default new line behavior
            handleSubmit(onSubmit)(); // Call the submit handler
        }
    };



    return (
        <>
            <TabsContent value="Communication">
                <div className=" rounded-24 bg-white py-10 px-10 ">
                    <div className="mt-1">
                        <Tabs defaultValue="account" className="w-[13rem] mx-auto">
                            <TabsList className="grid w-full grid-cols-2 border rounded-default overflow-hidden">
                                <TabsTrigger
                                    value="account"
                                    className="text-base border-r border-r-[#D0D5DD] font-medium px-6 py-4 bg-[#F9FAFB] overflow-hidden"
                                >
                                    SMS
                                </TabsTrigger>
                                <TabsTrigger
                                    className="text-base border-r border-r-[#D0D5DD] font-medium px-6 py-4  overflow-hidden"
                                    value="password"
                                >
                                    Email
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="account"></TabsContent>
                            <TabsContent value="password"></TabsContent>
                        </Tabs>
                    </div>

                    <div className="mt-8 bg-[#F9FAFB] w-full p-8 rounded-24">
                        <Box
                            id="scrollable"
                            style={{
                                height: '400px',
                                overflow: 'auto',
                                display: 'flex',
                                flexDirection: 'column-reverse',
                            }}
                        >
                            <InfiniteScroll
                                dataLength={messages?.chat?.length ?? 0}
                                next={fetchMore}
                                hasMore={!loading && hasMore}
                                loader={<h4>Loading...</h4>}
                                scrollableTarget="scrollable"
                                inverse={true}
                                scrollThreshold="20px"
                            >
                                {/* <ScrollArea
                            className="h-[300px] w-[45rem]" > */}
                                {/* <div
                                // ref={scrollAreaRef}
                                // className="h-[300px] w-[45rem] overflow-auto"
                                // onScroll={handleScroll} // Add onScroll event here
                                > */}
                                <div ref={listRef}>
                                    {messages?.chat?.map((message, index) => {
                                        const currentDateCreated = message.dateCreated ?? null;
                                        return (
                                            <div key={message.sid}>
                                                {currentDateCreated &&
                                                    firstMessagePerDay.includes(message.sid) && (
                                                        <>
                                                            {index > 0 ? (
                                                                <Separator
                                                                    orientation="horizontal"
                                                                    verticalSpacing="space50"
                                                                />
                                                            ) : null}
                                                            <Box
                                                                display="flex"
                                                                flexWrap="wrap"
                                                                justifyContent="center"
                                                                alignItems="center"
                                                            >
                                                                <Badge as="span" variant="neutral">
                                                                    <div
                                                                        className="flex items-center rounded-lg px-4 py-4 text-xs font-semibold leading-none max-w-max bg-blue-100 outline-none relative text-blue-700 shadow-outline-blue"
                                                                        style={{ fontSize: '10px' }}
                                                                    >
                                                                        {currentDateCreated.toDateString() === today
                                                                            ? 'Today'
                                                                            : currentDateCreated.toDateString()}
                                                                    </div>
                                                                </Badge>
                                                            </Box>
                                                        </>
                                                    )}
                                                <ChatMessage
                                                    variant={
                                                        '66853c66c7820f5164c734c4' === message?.author
                                                            ? 'outbound'
                                                            : 'inbound'
                                                    }
                                                    key={`${message.sid}.message`}
                                                >
                                                    {/* <ChatBubble> */}
                                                    {'66853c66c7820f5164c734c4' !== message?.author ? (
                                                        <div className="flex w-max max-w-[100%] flex-col gap-2 text-base font-normal font-poppins bg-primary text-primary-foreground rounded-[2rem] px-6 py-3">
                                                            Hey, I'm having trouble with my account.
                                                        </div>
                                                    ) : (
                                                        <div className="mb-6">
                                                            <div className="text-base m-0 ml-auto text-[#344054] leading-[2.2rem] font-medium font-poppins  bg-white border border-[#D0D5DD]  w-fit rounded-[1rem] overflow-hidden px-4 py-3 mb-2  mt-6">
                                                                {message.body}
                                                            </div>
                                                            <div className="text-right text-[1rem]">
                                                                {getMessageTime(message, false)}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* </ChatBubble> */}
                                                </ChatMessage>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div ref={bottomRef} />
                                {/* </div> */}
                                {/* </ScrollArea> */}
                            </InfiniteScroll>
                        </Box>

                        <div className="">
                            <div className="flex items-center  mt-4">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex w-full items-center "
                                >
                                    {/* <Textarea
                                        ref={textareaRef}
                                        {...register(`message`, {
                                            required: true,
                                        })}
                                        className="resize-none flex w-full rounded-[.8rem] h-[4.4rem]"
                                        value={content}
                                        onChange={handleChange}
                                        onPaste={handlePaste}
                                        onCut={handleCut}
                                        onKeyDown={handleKeyDown} // Add the keydown handler

                                        rows={lineCount}
                                        cols={lineCount}


                                    ></Textarea> */}
                                    <Input
                                        className="flex w-full rounded-[.8rem] h-[4.4rem]"
                                        id="message"

                                        placeholder=" Enter Text Message Here"
                                        {...register('message', { required: true })}
                                    />

                                    <Button
                                        variant="blueBtn"
                                        className="w-[5rem] h-[4.4rem] ml-4 rounded-full bg-[#101828]"
                                        type="submit"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M8.74928 11.2501L17.4993 2.50014M8.85559 11.5235L11.0457 17.1552C11.2386 17.6513 11.3351 17.8994 11.4741 17.9718C11.5946 18.0346 11.7381 18.0347 11.8587 17.972C11.9978 17.8998 12.0946 17.6518 12.2881 17.1559L17.78 3.08281C17.9547 2.63516 18.0421 2.41133 17.9943 2.26831C17.9528 2.1441 17.8553 2.04663 17.7311 2.00514C17.5881 1.95736 17.3643 2.0447 16.9166 2.21939L2.84349 7.71134C2.34759 7.90486 2.09965 8.00163 2.02739 8.14071C1.96475 8.26129 1.96483 8.40483 2.02761 8.52533C2.10004 8.66433 2.3481 8.7608 2.84422 8.95373L8.47589 11.1438C8.5766 11.183 8.62695 11.2026 8.66935 11.2328C8.70693 11.2596 8.7398 11.2925 8.7666 11.3301C8.79685 11.3725 8.81643 11.4228 8.85559 11.5235Z"
                                                stroke="white"
                                                stroke-width="1.66667"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <Button type="submit" className="sr-only">
                                            Send
                                        </Button>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </>
    );
}