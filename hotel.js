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

class Cliente {
  constructor(id, nome, dataNascimento, cpf, email, senha) {
    this._id = id; // ID único (só get)
    this._nome = nome;
    this._dataNascimento = dataNascimento;
    this._cpf = cpf;
    this._email = email;
    this._senha = senha;
  }

  // Apenas get para ID
  get id() {
    return this._id;
  }

  // Getters e Setters para os outros atributos
  get nome() {
    return this._nome;
  }

  set nome(novoNome) {
    this._nome = novoNome;
  }

  get dataNascimento() {
    return this._dataNascimento;
  }

  set dataNascimento(novaDataNascimento) {
    this._dataNascimento = novaDataNascimento;
  }

  get cpf() {
    return this._cpf;
  }

  set cpf(novoCpf) {
    this._cpf = novoCpf;
  }

  get email() {
    return this._email;
  }

  set email(novoEmail) {
    this._email = novoEmail;
  }

  get senha() {
    return this._senha;
  }

  set senha(novaSenha) {
    this._senha = novaSenha;
  }
}


class Quartos {
  constructor(id, nome, descricao, quantidadeCamas, precoPorNoite, quantidadeDisponivel) {
    this._id = id;
    this._nome = nome;
    this._descricao = descricao;
    this._quantidadeCamas = quantidadeCamas;
    this._precoPorNoite = precoPorNoite;
    this._quantidadeDisponivel = quantidadeDisponivel;
  }

  // Métodos get
  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }

  get descricao() {
    return this._descricao;
  }

  get quantidadeCamas() {
    return this._quantidadeCamas;
  }

  get precoPorNoite() {
    return this._precoPorNoite;
  }

  get quantidadeDisponivel() {
    return this._quantidadeDisponivel;
  }

  // Métodos set
  set nome(novoNome) {
    this._nome = novoNome;
  }

  set descricao(novaDescricao) {
    this._descricao = novaDescricao;
  }

  set quantidadeCamas(novaQuantidade) {
    this._quantidadeCamas = novaQuantidade;
  }

  set precoPorNoite(novoPreco) {
    this._precoPorNoite = novoPreco;
  }

  set quantidadeDisponivel(novaQuantidade) {
    this._quantidadeDisponivel = novaQuantidade;
  }
}

class Sistema {
  constructor() {
    this.clientes = [];
    this.funcionarios = [];
    this.reservas = [];
    this.quartos = [];
    this.usuarioLogado = null; // pode ser Cliente ou Funcionário
  }

  fazerLogin(tipoUsuario, email, senha) {
    let lista;
    
    if (tipoUsuario == "cliente") {
      lista = this.clientes;
    } else {
      lista = this.funcionarios;
    }
  
    // procura usuário pelo email e senha
    const usuario = lista.find(
      (u) => u.email === email && u.senha === senha
    );
  
    if (usuario) {
      this.usuarioLogado = usuario;
      console.log(`Login realizado com sucesso! Bem-vindo(a), ${usuario.nome}`);
      return true;
    } else {
      console.log("Email ou senha incorretos.");
      return false;
    }
  }  

  fazerCadastro(tipoUsuario, nome, email, senha) {
    let lista;

    if (tipoUsuario === "cliente") {
      lista = this.clientes;
    } else {
      lista = this.funcionarios;
    }

    // verifica se já existe usuário com o mesmo email
    const existente = lista.find((u) => u.email === email);

    if (existente) {
      console.log("Já existe um usuário com esse email.");
      return false;
    }

    // cria novo usuário
    const novoUsuario = { nome, email, senha };
    lista.push(novoUsuario);

    console.log(`Cadastro realizado com sucesso! Bem-vindo(a), ${nome}`);
    return true;
  }

}


const sistema = new Sistema();

sistema.fazerCadastro("cliente", "João", "joao@email.com", "1234");
sistema.fazerCadastro("funcionario", "Maria", "maria@email.com", "abcd");

sistema.fazerLogin("cliente", "joao@email.com", "1234"); 
sistema.fazerLogin("funcionario", "maria@email.com", "abcd"); 
