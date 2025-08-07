/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Typography,
  Divider,
  Popover,
  CircularProgress,
  Avatar,
  TextareaAutosize,
  Tooltip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import Draggable from 'react-draggable';
import ErrorIcon from '@mui/icons-material/Error';
import { useParams } from 'react-router-dom';
import Token from '../Common/Token';
import { toast } from 'react-toastify';

import ChatBotSkeleton from './ChatBotSkeleton';
import { DefaultChat } from './content/DefaultChat';
import { useSeenMessageByAgentMutation } from '../../redux/slices/chat/chatApiSlice';
import { useSeenMessageByAgentHotelMutation } from '../../redux/slices/hotel/hotelApiSlice';

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const daysAgo = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  const isThisYear = date.getFullYear() === now.getFullYear();

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  if (isToday) {
    return time;
  }

  if (isYesterday) {
    return `Yesterday at ${time}`;
  }

  if (daysAgo < 7) {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    return `${weekday} at ${time}`;
  }

  if (isThisYear) {
    return (
      date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
      }) + ` at ${time}`
    );
  }

  return (
    date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ` at ${time}`
  );
}

function formatStatus(status) {
  return status
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ChatBot({
  fData,
  statusConstants,
  data,
  mesError,
  mesRefetch,
  mesIsLoading,
  startConversation,
  startLoad,
  createMessageByAgent,
  createIsError,
  createLoad,
  bookingRef,
  hotel,
  hotelName,
  checkIn,
  checkOut,
  roomAllocation,
  result,
  //   title,
  open,
  setOpen,
}) {
  const { id } = useParams();
  const agentId = Token();
  const [seenMessageByAgent] = useSeenMessageByAgentMutation();
  const [seenMessageByAgentHotel] = useSeenMessageByAgentHotelMutation();
  const chatId = data?.chatId;
  const chatThreadCreatedAt = data?.chatThreadCreatedAt;
  const readableStatusArray = statusConstants;
  const noThread = data?.status === 'not found';

  const [showAllReasons, setShowAllReasons] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [emojiAnchor, setEmojiAnchor] = useState(null);
  const [errorCountdown, setErrorCountdown] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [bookingRefWarning, setBookingRefWarning] = useState(false);

  const visibleReasons = showAllReasons
    ? readableStatusArray
    : readableStatusArray.slice(0, 10);

  useEffect(() => {
    const param = `chatId=${chatId}&agentId=${agentId}`;

    if (data?.isAnyUnseen === true && open) {
      if (data?.service === 'FLIGHT') {
        seenMessageByAgent(param);
      } else if (data?.service === 'HOTEL') {
        seenMessageByAgentHotel(param);
      }
    }
  }, [
    data,
    open,
    chatId,
    agentId,
    seenMessageByAgent,
    seenMessageByAgentHotel,
  ]);

  useEffect(() => {
    if (noThread) return;

    const interval = setInterval(() => {
      mesRefetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [mesError, mesRefetch]);

  useEffect(() => {
    if (data) {
      const initialGreeting = {
        content:
          'We appreciate your patience. Kindly summarize your concern, and one of our support specialists will assist you shortly 😊',
        agentRef: null,
        messageCreatedAt: chatThreadCreatedAt,
        status: 'sent',
      };
      setMessages([
        initialGreeting,
        ...(data.messages || []).map((msg) => ({ ...msg, status: 'sent' })),
      ]);
    }
  }, [data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (errorCountdown !== null && errorCountdown > 0) {
      const timer = setTimeout(() => {
        setErrorCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [errorCountdown]);

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
          setShowAllReasons(false);
          setSelectedReason('');

          const initialGreeting = {
            content:
              'We appreciate your patience. Kindly summarize your concern, and one of our support specialists will assist you shortly 😊',
            agentRef: null,
            messageCreatedAt: new Date().toISOString(),
            status: 'sent',
          };

          setMessages([initialGreeting]);
          mesRefetch();
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
        msgStatus: 'ADMIN_UNSEEN',
      };

      setMessages((prev) => [...prev, newMessage]);
      setInput('');

      try {
        const param = `threadId=${chatId}&senderId=${agentId}&content=${encodeURIComponent(
          input
        )}`;
        const response = await createMessageByAgent(param);

        if (response?.error) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg === newMessage ? { ...msg, status: 'error' } : msg
            )
          );
          setErrorCountdown(10);

          // ✅ Only remove if it is error and createIsError is true
          if (createIsError) {
            setTimeout(() => {
              setMessages((prev) => prev.filter((msg) => msg !== newMessage));
              setErrorCountdown(null);
            }, 10000);
          }
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg === newMessage ? { ...msg, status: 'sent' } : msg
            )
          );
          const refreshed = await mesRefetch().unwrap();
          if (refreshed?.messages?.length > 0) {
            const initialGreeting = {
              content:
                'We appreciate your patience. Kindly summarize your concern, and one of our support specialists will assist you shortly 😊',
              agentRef: null,
              messageCreatedAt: refreshed.chatThreadCreatedAt,
              status: 'sent',
            };
            const updatedMessages = [
              initialGreeting,
              ...refreshed.messages.map((msg) => ({ ...msg, status: 'sent' })),
            ];
            setMessages(updatedMessages);
          }
        }
      } catch (err) {
        toast.error(err.message || 'Submission failed');

        setMessages((prev) =>
          prev.map((msg) =>
            msg === newMessage ? { ...msg, status: 'error' } : msg
          )
        );
        setErrorCountdown(10);

        if (createIsError) {
          setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg !== newMessage));
            setErrorCountdown(null);
          }, 10000);
        }
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

  useEffect(() => {
    const prefixes = ['TFHB', 'TFBR', 'TFSR', 'TFG'];
    const formattedInput = (input || '').trim().toUpperCase();

    // Check if input contains any of the prefixes
    const hasInvalidPrefix = prefixes.some((prefix) =>
      formattedInput.includes(prefix)
    );

    setBookingRefWarning(hasInvalidPrefix);
  }, [input]);

  if (!open) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 250,
          right: 25,
          display: 'none',
        }}
      >
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

  if (mesIsLoading)
    return (
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <ChatBotSkeleton />
      </Box>
    );

  return (
    <Box
      sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
      }}
    >
      <Draggable handle=".chat-header">
        <Paper
          elevation={6}
          sx={{
            width: 350,
            height: '50vh',
            position: 'fixed',
            bottom: 80,
            right: 24,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            zIndex: 1000000,
          }}
        >
          <Box
            className="chat-header"
            sx={{
              cursor: 'move',
              bgcolor: 'var(--primary)',
              color: '#fff',
              p: 2,
              py: 0.8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              display={'flex'}
              sx={{ alignItems: 'center', gap: 1 }}
            >
              <div>
                {' '}
                {bookingRef || fData?.bookingRef} {` `}
              </div>
              <div
                style={{
                  fontWeight: 300,
                  fontSize: 9,
                  backgroundColor: 'white',
                  color: 'var(--primary)',
                  padding: 2,
                }}
              >
                Chat only for this ID
              </div>
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
                <DefaultChat
                  hotel={hotel}
                  hotelName={hotelName}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  roomAllocation={roomAllocation}
                  result={result}
                  visibleReasons={visibleReasons}
                  selectedReason={selectedReason}
                  setSelectedReason={setSelectedReason}
                  formatStatus={formatStatus}
                  readableStatusArray={readableStatusArray}
                  setShowAllReasons={setShowAllReasons}
                  showAllReasons={showAllReasons}
                />
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
                      fontWeight: 500,
                      border: '1px solid #ffe0b2',
                      textTransform: 'capitalize',
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
                      msgStatus,
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
                            maxWidth: '80%',
                            fontSize: 13,
                            borderBottomLeftRadius: !agentRef ? 0 : 8,
                            borderBottomRightRadius: agentRef ? 0 : 8,
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
                              <Typography
                                variant="caption"
                                sx={{ fontSize: 10 }}
                              >
                                Not sent
                              </Typography>
                            </>
                          )}
                        {!agentRef && (
                          <Typography
                            sx={{ width: 36, height: 20 }}
                            noWrap
                            fontSize="0.6rem"
                          >
                            {' '}
                          </Typography>
                        )}

                        {!createLoad && (
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: 10,
                              display: 'flex',
                              alignItems: 'center',
                              flexWrap: 'wrap', // in case text wraps in small view
                            }}
                          >
                            {!agentRef
                              ? adminFirstName && adminLastName
                                ? `${adminFirstName} ${adminLastName},`
                                : 'Support,'
                              : ''}{' '}
                            {errorCountdown !== null &&
                            createIsError &&
                            status === 'error' ? (
                              ''
                            ) : (
                              <>
                                {timeAgo(new Date(messageCreatedAt))}
                                {agentRef && (
                                  <Tooltip
                                    title={`${
                                      msgStatus === 'ADMIN_UNSEEN'
                                        ? 'Delivered'
                                        : 'Read'
                                    }`}
                                    arrow
                                    placement="left"
                                  >
                                    <Box
                                      component="span"
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        lineHeight: 0, // keeps svg tight
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        style={{ paddingBottom: '4px' }}
                                      >
                                        <path
                                          d="M7 13l3 3 7-7"
                                          stroke={
                                            msgStatus === 'ADMIN_UNSEEN'
                                              ? '#c4c4c4'
                                              : '#2660f0'
                                          }
                                          strokeWidth="2"
                                        />
                                        <path
                                          d="M11 13l3 4 7-7"
                                          stroke={
                                            msgStatus === 'ADMIN_UNSEEN'
                                              ? '#c4c4c4'
                                              : '#2660f0'
                                          }
                                          strokeWidth="2"
                                        />
                                      </svg>
                                    </Box>
                                  </Tooltip>
                                )}
                              </>
                            )}
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

          {bookingRefWarning && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 0.5, fontSize: 12 }}
            >
              This is not match this Booking Reference ID.
            </Typography>
          )}
          <Box
            className="chat-header"
            sx={{
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#fafafa',
              gap: 1,
            }}
          >
            <IconButton
              disabled={noThread}
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
            {/* <TextField
              inputRef={inputRef}
              fullWidth
              placeholder={noThread ? 'Select or write...' : 'Type a message...'}
              variant="standard"
              InputProps={{ disableUnderline: true }}
              value={noThread ? formatStatus(selectedReason) : input}
              onChange={(e) => (noThread ? setSelectedReason(e.target.value) : setInput(e.target.value))}
              onKeyDown={noThread ? undefined : handleKeyDown}
              sx={{
                bgcolor: 'white',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                border: '1px solid #ccc',
                '& .MuiInputBase-input': { fontSize: 14 },
              }}
            /> */}

            <TextareaAutosize
              ref={inputRef}
              minRows={1}
              maxRows={1}
              placeholder={
                noThread ? 'Select or write...' : 'Type a message...'
              }
              value={noThread ? formatStatus(selectedReason) : input}
              onChange={(e) =>
                noThread
                  ? setSelectedReason(e.target.value)
                  : setInput(e.target.value)
              }
              onKeyDown={noThread ? undefined : handleKeyDown}
              disabled={noThread ? true : false}
              style={{
                width: '100%',
                fontSize: 14,
                padding: '8px 10px',
                borderRadius: 6,
                border: '1px solid #ccc',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                backgroundColor: 'white',
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
    </Box>
  );
}
