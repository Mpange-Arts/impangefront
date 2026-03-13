// src/api/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'https://mpangeserver.onrender.com';

let socket = null;

const SocketService = {
  // ── Connect (call once when user is authenticated) ────
  connect: () => {
    if (socket?.connected) return socket;

    const token = localStorage.getItem('accessToken');

    socket = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('🔌 Socket connected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Socket disconnected:', reason);
    });

    socket.on('connect_error', (err) => {
      console.warn('Socket error:', err.message);
    });

    return socket;
  },

  // ── Disconnect ─────────────────────────────────────────
  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  // ── Get socket instance ────────────────────────────────
  getSocket: () => socket,

  // ── Join a room ────────────────────────────────────────
  joinRoom: (roomId) => {
    socket?.emit('join_room', roomId);
  },

  // ── Leave a room ───────────────────────────────────────
  leaveRoom: (roomId) => {
    socket?.emit('leave_room', roomId);
  },

  // ── Send a message ─────────────────────────────────────
  sendMessage: (roomId, message) => {
    socket?.emit('send_message', { roomId, message });
  },

  // ── Listen to an event ────────────────────────────────
  on: (event, callback) => {
    socket?.on(event, callback);
  },

  // ── Remove a listener ─────────────────────────────────
  off: (event, callback) => {
    socket?.off(event, callback);
  },

  // ── Check connection status ────────────────────────────
  isConnected: () => socket?.connected ?? false,
};

export default SocketService;
