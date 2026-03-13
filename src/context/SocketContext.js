// src/context/SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import SocketService from '../api/socket';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const socket = SocketService.connect();

    socket.on('connect',      () => setIsConnected(true));
    socket.on('disconnect',   () => setIsConnected(false));
    socket.on('online_count', (count) => setOnlineCount(count));

    return () => {
      SocketService.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, onlineCount, socket: SocketService }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used inside SocketProvider');
  return context;
};
