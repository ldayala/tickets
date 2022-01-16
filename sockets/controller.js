const TicketControl = require("../models/ticket-control");

const Tickes = new TicketControl();

const socketController = (socket) => {
  socket.emit("ultimos-4", Tickes.ultimos4);

  socket.on("siguiente-ticket", (payload, callback) => {
    Tickes.siguiente();
    callback(Tickes.ultimo);
    socket.broadcast.emit("tickes-pendientes", Tickes.tickes);
  });

  socket.on("cargar-ultimo", (payload, callback) => {
    callback(Tickes.ultimo);
  });
  
  socket.on("atender-siguiente", (payload, callback) => {
    const tickes = Tickes.atenderTickes(payload);
    if (tickes === null) return callback(null);
    callback({
      tickes,
      pendientes: Tickes.tickes,
    });
    socket.broadcast.emit("tickes-pendientes", Tickes.tickes);
    socket.broadcast.emit("ultimos-4", Tickes.ultimos4);
  });

  socket.emit("tickes-pendientes", Tickes.tickes);
};

module.exports = {
  socketController,
};
