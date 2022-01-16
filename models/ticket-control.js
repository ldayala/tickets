const path = require("path");
const fs = require("fs");

class Ticke {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0; //ultimo ticken que estoy atendiendo
    this.hoy = new Date().getDate();
    this.tickes = []; //tickes pendientes
    this.ultimos4 = [];
    this.init();
  }
  get toJSON() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickes: this.tickes,
      ultimos4: this.ultimos4,
    };
  }

  init() {
    const { ultimo, hoy, tickes, ultimos4 } = require("../db/tickets.json");
    if (this.hoy === hoy) {
      this.ultimo = ultimo;
      this.tickes = tickes;
      this.ultimos4 = ultimos4;
    } else {
      this.guardarDB();
    }

  }
  guardarDB() {
    const pathDB = path.join(__dirname, "../db/tickets.json");
    fs.writeFileSync(pathDB, JSON.stringify(this.toJSON));
  }
  siguiente() {
    this.ultimo += 1;
    const ticke = new Ticke(this.ultimo, null);
    this.tickes.push(ticke);
    this.guardarDB();
    return ticke.numero;
  }
  atenderTickes(escritorio) {
    //no tenemos tickes
    if (this.tickes.length === 0) return null;

    const ticke = this.tickes.shift();
    ticke.escritorio = escritorio;

    if (this.ultimos4.length >= 4) {
      this.ultimos4.pop();
    }
    this.ultimos4.unshift(ticke)
    this.guardarDB()
      
    return ticke;
  }
}

module.exports = TicketControl;
