import Commands from './Commands';

export default socket => {
  socket.on(Commands.joinRoom, params => {
    console.log(params.error);
  });
};
