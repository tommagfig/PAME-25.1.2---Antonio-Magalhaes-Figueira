const prompt = require("prompt-sync")({sigint: true});

class Reserva {
    constructor(id, idCliente, status, checkIn, checkOut) {
      this._id = id;
      this._idCliente = idCliente;
      this._status = status;
      this._checkIn = checkIn;
      this._checkOut = checkOut;
    }
  
    // GETTERS (ler valores)
    get id() {
      return this._id;
    }
  
    get idCliente() {
      return this._idCliente;
    }
  
    get status() {
      return this._status;
    }
  
    get checkIn() {
      return this._checkIn;
    }
  
    get checkOut() {
      return this._checkOut;
    }
  
    // SETTERS (alterar valores permitidos)
    set status(novoStatus) {
      this._status = novoStatus;
    }
  
    set checkIn(novaData) {
      this._checkIn = novaData;
    }
  
    set checkOut(novaData) {
      this._checkOut = novaData;
    }
}


class Funcionario {
    constructor(id, nomeUsuario, cpf, email, senha) {
      this._id = id;
      this._nomeUsuario = nomeUsuario;
      this._cpf = cpf;
      this._email = email;
      this._senha = senha;
    }
  
    // apenas get para id
    get id() {
      return this._id;
    }
  
    // get e set para nomeUsuario
    get nomeUsuario() {
      return this._nomeUsuario;
    }
    set nomeUsuario(novoNome) {
      this._nomeUsuario = novoNome;
    }
  
    // get e set para cpf
    get cpf() {
      return this._cpf;
    }
    set cpf(novoCpf) {
      this._cpf = novoCpf;
    }
  
    // get e set para email
    get email() {
      return this._email;
    }
    set email(novoEmail) {
      this._email = novoEmail;
    }
  
    // get e set para senha
    get senha() {
      return this._senha;
    }
    set senha(novaSenha) {
      this._senha = novaSenha;
    }
  }


const email = prompt("email: ")
const senha = prompt("senha: ")
const funcionario = new Funcionario(111, "tommagfig", 13261974796, email, senha);

console.log(funcionario.nomeUsuario);
console.log(funcionario.email);
console.log(funcionario.senha);

funcionario.email = "tom@hotmail.com";
console.log(funcionario.email);