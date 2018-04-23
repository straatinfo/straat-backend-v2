
const Message = require('./message');


module.exports = function (io) {
  io.on('connection', function (socket) {
    Message(io, socket);
  });
};
