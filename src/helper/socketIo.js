import socketIOClient from 'socket.io-client';
// const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;

export const socket = socketIOClient('https://v-shoes-api.herokuapp.com');
