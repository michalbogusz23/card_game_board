import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3003')

socket.on('connect', () => console.log('connected to socket'));
const SocketContext = React.createContext();

export { socket, SocketContext };

