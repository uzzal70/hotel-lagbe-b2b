/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Divider,
  Popover,
  Button,
  CircularProgress,
  Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import Draggable from 'react-draggable';
import ErrorIcon from '@mui/icons-material/Error'; // উপরে import করে নাও
import { useParams } from 'react-router-dom';
import {
  useCreateMessageByAgentMutation,
  useGetChatDataQuery,
  useStartConversationMutation,
} from '../../redux/slices/chat/chatApiSlice';
import Token from '../Common/Token';
import { toast } from 'react-toastify';
import { statusConstants } from '../Utils/Flight/statusConstants';
import LiveChatSkeleton from './LiveChatSkeleton';

function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days <= 3) return `${days} day${days > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

function formatStatus(status) {
  return status
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function LiveChat({ fData }) {
  const { id } = useParams();
  const agentId = Token();
  const param = `threads/agentGetThreadsByBookingId/${id}`;
  const { data, error, refetch, isLoading } = useGetChatDataQuery(param, {
    refetchOnMountOrArgChange: true,
  });

  const [startConversation, { isLoading: startLoad }] =
    useStartConversationMutation();
  const [
    createMessageByAgent,
    { isLoading: createLoad, isError: createIsError },
  ] = useCreateMessageByAgentMutation();

  const bookingRef = fData?.bookingRef;
  const chatId = data?.chatId;
  const chatThreadCreatedAt = data?.chatThreadCreatedAt;
  const readableStatusArray = statusConstants;
  const noThread = error?.data?.statusCode === 404;

  const [showAllReasons, setShowAllReasons] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(true);
  const [emojiAnchor, setEmojiAnchor] = useState(null);
  const [errorCountdown, setErrorCountdown] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // ✅ Input ref

  const visibleReasons = showAllReasons
    ? readableStatusArray
    : readableStatusArray.slice(0, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000); // every 1 minute

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (data) {
      const initialGreeting = {
        content:
          'We appreciate your patience. Kindly summarize your concern, and one of our support specialists will assist you shortly 😊',
        agentRef: null,
        messageCreatedAt: chatThreadCreatedAt,
        status: 'sent',
      };

      const updatedMessages = [
        initialGreeting,
        ...(data.messages?.length > 0
          ? data.messages.map((msg) => ({ ...msg, status: 'sent' }))
          : []),
      ];

      setMessages(updatedMessages);
    }
  }, [data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    let timer;
    if (errorCountdown !== null && errorCountdown > 0) {
      timer = setTimeout(() => {
        setErrorCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [errorCountdown]);

  // ✅ Focus + update input when selectedReason changes
  useEffect(() => {
    if (selectedReason && noThread && inputRef.current) {
      inputRef.current.focus();

      setTimeout(() => {
        inputRef.current.setSelectionRange(
          selectedReason.length,
          selectedReason.length
        );
      }, 0);
    }
  }, [selectedReason]);

  const handleSend = async () => {
    if (noThread) {
      if (!selectedReason.trim()) return;
      try {
        const body = { bookingId: id, reason: selectedReason.trim(), agentId };
        const response = await startConversation(body);

        if (response?.error?.data?.message) {
          toast.error(response.error.data.message);
        } else {
          toast.success('Conversation started successfully!');
          setShowAllReasons('');
          setSelectedReason('');

          // ✅ Instantly show reason + greeting messages
          const reasonMessage = selectedReason
            ? {
                content: `Conversation started for: ${formatStatus(
                  selectedReason
                )}`,
                agentRef: null,
                messageCreatedAt: new Date().toISOString(),
                status: 'sent',
              }
            : null;

          const initialGreeting = {
            content:
              'We appreciate your patience. Kindly summarize your concern, and one of our support specialists will assist you shortly 😊',
            agentRef: null,
            messageCreatedAt: new Date().toISOString(),
            status: 'sent',
          };

          setMessages([
            ...(reasonMessage ? [reasonMessage] : []),
            initialGreeting,
          ]);

          // ✅ Fetch latest data including chatId and messages
          refetch();
        }
      } catch (err) {
        toast.error(err.message || 'Submission failed');
      }
    } else {
      if (!input.trim()) return;

      const newMessage = {
        threadId: chatId,
        senderId: agentId,
        content: input,
        agentRef: true,
        messageCreatedAt: new Date().toISOString(),
        status: 'sending',
      };

      // ✅ Optimistically add new message
      setMessages((prev) => [...prev, newMessage]);
      setInput('');

      try {
        const param = `threadId=${chatId}&senderId=${agentId}&content=${encodeURIComponent(
          input
        )}`;
        const response = await createMessageByAgent(param);

        if (response?.error) {
          // ❌ Handle failure
          setMessages((prev) =>
            prev.map((msg) =>
              msg === newMessage ? { ...msg, status: 'error' } : msg
            )
          );

          setErrorCountdown(10);
          setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg !== newMessage));
            setErrorCountdown(null);
          }, 10000);
        } else {
          // ✅ Mark message as sent
          setMessages((prev) =>
            prev.map((msg) =>
              msg === newMessage ? { ...msg, status: 'sent' } : msg
            )
          );

          // ✅ Refetch and manually update
          const refreshed = await refetch().unwrap();
          if (refreshed?.messages?.length > 0) {
            const reasonMessage = refreshed.reason
              ? {
                  content: `Conversation started for: ${formatStatus(
                    refreshed.reason
                  )}`,
                  agentRef: null,
                  messageCreatedAt: refreshed.chatThreadCreatedAt,
                  status: 'sent',
                }
              : null;

            const initialGreeting = {
              content:
                'We appreciate your patience. Kindly summarize your concern, and one of our support specialists will assist you shortly 😊',
              agentRef: null,
              messageCreatedAt: refreshed.chatThreadCreatedAt,
              status: 'sent',
            };

            const updatedMessages = [
              ...(reasonMessage ? [reasonMessage] : []),
              initialGreeting,
              ...refreshed.messages.map((msg) => ({ ...msg, status: 'sent' })),
            ];
            setMessages(updatedMessages);
          }
          setErrorCountdown(null);
        }
      } catch (err) {
        toast.error(err.message || 'Submission failed');

        setMessages((prev) =>
          prev.map((msg) =>
            msg === newMessage ? { ...msg, status: 'error' } : msg
          )
        );

        setErrorCountdown(10);
        setTimeout(() => {
          setMessages((prev) => prev.filter((msg) => msg !== newMessage));
          setErrorCountdown(null);
        }, 10000);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  if (!open) {
    return (
      <Box sx={{ position: 'fixed', bottom: 70, right: 25 }}>
        <IconButton
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          <ChatIcon />
        </IconButton>
      </Box>
    );
  }

  if (isLoading) {
    return <LiveChatSkeleton />;
  }

  // if (error) {
  //   return <div>Error loading chat data.</div>;
  // }
  return (
    <Draggable handle=".chat-header">
      <Paper
        elevation={6}
        sx={{
          width: 350,
          height: 520,
          position: 'fixed',
          bottom: 70,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          zIndex: 1000,
        }}
      >
        <Box
          className="chat-header"
          sx={{
            cursor: 'move',
            bgcolor: 'var(--primary)',
            color: '#fff',
            p: 2,
            py: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Live Chat{' '}
            <span style={{ fontWeight: 300, fontSize: 14 }}>
              ({bookingRef})
            </span>
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            size="small"
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            bgcolor: '#f1f1f1',
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '0px' },
          }}
        >
          {noThread ? (
            <>
              <Typography sx={{ mb: 1 }}>
                Select a reason to start one:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {visibleReasons.map((reason) => (
                  <Button
                    key={reason}
                    variant={
                      selectedReason.trim() === reason.trim()
                        ? 'contained'
                        : 'outlined'
                    }
                    size="small"
                    onClick={() =>
                      setSelectedReason((prev) =>
                        prev.trim() === reason.trim() ? '' : reason
                      )
                    }
                  >
                    {formatStatus(reason)}
                  </Button>
                ))}
                {readableStatusArray.length > 10 && (
                  <Button
                    size="small"
                    onClick={() => setShowAllReasons((prev) => !prev)}
                  >
                    {showAllReasons ? 'See Less' : 'See More'}
                  </Button>
                )}
              </Box>
            </>
          ) : (
            <>
              {data?.reason && (
                <Box
                  sx={{
                    bgcolor: '#fff8e1',
                    color: '#795548',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    mb: 2,
                    fontSize: 13,
                    // textAlign: "center",
                    fontWeight: 500,
                    border: '1px solid #ffe0b2',
                  }}
                >
                  Topic: {formatStatus(data.reason)}
                </Box>
              )}

              {messages.map(
                (
                  {
                    id,
                    content,
                    agentRef,
                    messageCreatedAt,
                    status,
                    adminFirstName,
                    adminLastName,
                  },
                  index
                ) => (
                  <Box
                    key={id || index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: agentRef ? 'flex-end' : 'flex-start',
                      px: 1,
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexDirection: agentRef ? 'row-reverse' : 'row',
                        gap: 1,
                      }}
                    >
                      {!agentRef && (
                        <Avatar
                          alt="User"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"
                          sx={{ width: 30, height: 30 }}
                        />
                      )}

                      <Box
                        sx={{
                          bgcolor:
                            createIsError && status === 'error'
                              ? '#ff5252'
                              : agentRef
                              ? '#1976d2'
                              : '#e0e0e0',
                          color:
                            createIsError && status === 'error'
                              ? '#fff'
                              : agentRef
                              ? '#fff'
                              : '#000',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          maxWidth: agentRef ? '80%' : '80%',
                          // wordBreak: 'break-word',
                          fontSize: 13,
                        }}
                      >
                        {content}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 0.5,
                        fontSize: 10,
                        color: '#888',
                        gap: 0.5,
                      }}
                    >
                      {createLoad && status === 'sending' && (
                        <>
                          <CircularProgress size={10} color="inherit" />
                          <Typography variant="caption" sx={{ fontSize: 10 }}>
                            Sending...
                          </Typography>
                        </>
                      )}

                      {createIsError &&
                        status === 'error' &&
                        errorCountdown !== null && (
                          <>
                            <ErrorIcon color="error" sx={{ fontSize: 12 }} />
                            <Typography variant="caption" sx={{ fontSize: 10 }}>
                              Not sent
                            </Typography>
                          </>
                        )}

                      {status === 'sent' && (
                        <Typography variant="caption" sx={{ fontSize: 10 }}>
                          {!agentRef &&
                            (adminFirstName && adminLastName
                              ? `${adminFirstName} ${adminLastName},`
                              : 'Admin,')}{' '}
                          {timeAgo(new Date(messageCreatedAt))}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </Box>

        <Divider />

        <Box
          sx={{
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fafafa',
            gap: 1,
          }}
        >
          <IconButton
            onClick={(e) => setEmojiAnchor(e.currentTarget)}
            size="small"
          >
            <EmojiEmotionsIcon />
          </IconButton>
          <Popover
            open={Boolean(emojiAnchor)}
            anchorEl={emojiAnchor}
            onClose={() => setEmojiAnchor(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              height={350}
              width={300}
            />
          </Popover>
          <TextField
            inputRef={inputRef}
            fullWidth
            placeholder={noThread ? 'Select or write...' : 'Type a message...'}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            value={noThread ? formatStatus(selectedReason) : input}
            onChange={(e) =>
              noThread
                ? setSelectedReason(e.target.value)
                : setInput(e.target.value)
            }
            onKeyDown={noThread ? undefined : handleKeyDown}
            sx={{
              bgcolor: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              border: '1px solid #ccc',
              '& .MuiInputBase-input': { fontSize: 14 },
            }}
          />

          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={
              noThread ? !selectedReason.trim() : !input.trim() || startLoad
            }
          >
            {startLoad ? <CircularProgress size="20px" /> : <SendIcon />}
          </IconButton>
        </Box>
      </Paper>
    </Draggable>
  );
}
