import socketIO from 'socket.io-client';
import RegisterHandlers from './RegisterHandlers';
import SendData from './SendData';

class SocketService {
  socket: any;
  constructor() {
    this.socket = null;
  }

  init = (path, callback: Function) => {
    this.socket = socketIO('ws://10.100.108:6789', {
      path,
      timeout: 10000,
      jsonp: false,
      transports: ['websocket'],
      autoConnect: true,
      agent: '-',
      pfx: '-',
      cert: '-',
      ca: '-',
      ciphers: '-',
    });

    this.socket.on('connect', () => {
      RegisterHandlers(this.socket);
      callback();
    });
  };

  makeSendData = cmd => {
    return new SendData(cmd);
  };

  send = sendData => {
    this.socket.emit(sendData.getCmd(), sendData.getParams());
  };

  register = (cmd, callback) => {
    this.socket.on(cmd, callback);
  };

  destroy = () => {
    if (this.socket) {
      this.socket.close();
      this.socket.disconnect();
      this.socket = null;
    }
  };
}

export default new SocketService();
