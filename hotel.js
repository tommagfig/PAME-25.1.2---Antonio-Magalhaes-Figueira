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
    constructor(id, nome, cpf, email, senha) {
      this._id = id;
      this._nome = nome;
      this._cpf = cpf;
      this._email = email;
      this._senha = senha;
    }
  
    // apenas get para id
    get id() {
      return this._id;
    }
  
    // get e set para nomeUsuario
    get nome() {
      return this._nome;
    }
    set nome(novoNome) {
      this._nome = novoNome;
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

// Supondo que as classes Cliente e Funcionario já estejam definidas/importadas
// class Cliente { constructor(id, nome, dataNascimento, cpf, email, senha) { ... } }
// class Funcionario { constructor(id, nomeUsuario, cpf, email, senha) { ... } }

class Sistema {
  constructor() {
    this.clientes = [];
    this.funcionarios = [];
    this.reservas = [];
    this.quartos = [];
    this.usuarioLogado = null;

    // contadores para gerar IDs
    this._proximoIdCliente = 1;
    this._proximoIdFuncionario = 1;
    this._proximoIdQuarto = 1;
  }

  fazerLogin(tipoUsuario, email, senha) {
    let lista;
    if (tipoUsuario === "cliente") {
      lista = this.clientes;
    } else {
      lista = this.funcionarios;
    }

    const usuario = lista.find((u) => u.email === email && u.senha === senha);

    if (usuario) {
      this.usuarioLogado = usuario;
      console.log(`Login realizado com sucesso! Bem-vindo(a), ${usuario.nome || usuario.nomeUsuario}`);
      return true;
    } else {
      console.log("Email ou senha incorretos.");
      return false;
    }
  }

  // >>> RECOMENDADO: passar os dados como objeto (fica claro o que cada tipo exige)
  // Cliente:  { nome, dataNascimento, cpf, email, senha }
  // Func.:    { nome, cpf, email, senha }
  fazerCadastro(tipoUsuario, dados) {
    let lista;

    if (tipoUsuario === "cliente") {
      lista = this.clientes;
      const { nome, dataNascimento, cpf, email, senha } = dados || {};

      // validações simples
      if (!nome || !dataNascimento || !cpf || !email || !senha) {
        console.log("Dados de cliente incompletos. Informe nome, dataNascimento, cpf, email e senha.");
        return false;
      }
      if (lista.some((c) => c.email === email)) {
        console.log("Já existe um cliente com esse email.");
        return false;
      }
      if (lista.some((c) => c.cpf === cpf)) {
        console.log("Já existe um cliente com esse CPF.");
        return false;
      }

      // cria instância com ID gerado
      const novo = new Cliente(this._proximoIdCliente++, nome, dataNascimento, cpf, email, senha);
      lista.push(novo);
      console.log(`Cliente cadastrado com sucesso! ID: ${novo.id}`);
      return true;

    } else if (tipoUsuario === "funcionario") {
      lista = this.funcionarios;
      const { nome, cpf, email, senha } = dados || {};

      if (!nome || !cpf || !email || !senha) {
        console.log("Dados de funcionário incompletos. Informe nome, cpf, email e senha.");
        return false;
      }
      if (lista.some((f) => f.email === email)) {
        console.log("Já existe um funcionário com esse email.");
        return false;
      }
      if (lista.some((f) => f.cpf === cpf)) {
        console.log("Já existe um funcionário com esse CPF.");
        return false;
      }

      const novo = new Funcionario(this._proximoIdFuncionario++, nome, cpf, email, senha);
      lista.push(novo);
      console.log(`Funcionário cadastrado com sucesso! ID: ${novo.id}`);
      return true;

    } else {
      console.log("Tipo de usuário inválido. Use 'cliente' ou 'funcionario'.");
      return false;
    }
  }

  sairDoPrograma() {
    if (this.usuarioLogado) {
      console.log(`Usuário ${this.usuarioLogado.nome} saiu do sistema.`);
      this.usuarioLogado = null;
      return true;
    } else {
      console.log("Nenhum usuário está logado no momento.");
      return false;
    }
  }
  
  verMeusDados() {
    if (this.usuarioLogado instanceof Funcionario) {
      console.log("=== Meus Dados (Funcionário) ===");
      console.log(`ID: ${this.usuarioLogado.id}`);
      console.log(`Nome: ${this.usuarioLogado.nome}`);
      console.log(`Email: ${this.usuarioLogado.email}`);
      console.log(`CPF: ${this.usuarioLogado.cpf}`);
    } else if (this.usuarioLogado instanceof Cliente) {
      console.log("Apenas funcionários podem acessar essa função.");
    } else {
      console.log("Nenhum usuário está logado.");
    }
  }

  verListaReservas() {
    if (!this.usuarioLogado || !(this.usuarioLogado instanceof Funcionario)) {
      console.log("Apenas funcionários logados podem acessar a lista de reservas.");
      return;
    }

    if (this.reservas.length === 0) {
      console.log("Não há reservas cadastradas.");
      return;
    }

    console.log("\n=== Lista de Reservas ===");
    this.reservas.forEach((reserva, index) => {
      console.log(`\nReserva ${index + 1}`);
      console.log(`ID: ${reserva.id}`);
      console.log(`Cliente: ${reserva.idCliente}`);
      console.log(`Status: ${reserva.status}`);
      console.log(`Check-in: ${reserva.checkIn}`);
      console.log(`Check-out: ${reserva.checkOut}`);
    });
  }

  verListaQuartos() {
    if (!this.usuarioLogado || !(this.usuarioLogado instanceof Funcionario)) {
      console.log("Apenas funcionários logados podem acessar a lista de quartos.");
      return;
    }
  
    if (this.quartos.length === 0) {
      console.log("Não há quartos cadastrados.");
      return;
    }
  
    console.log("\n=== Lista de Quartos ===");
    this.quartos.forEach((quarto, index) => {
      console.log(
        `${index + 1}. ID: ${quarto.id}, Nome: ${quarto.nome}, ` +
        `Descrição: ${quarto.descricao}, Camas: ${quarto.quantidadeCamas}, ` +
        `Preço por noite: R$${quarto.precoPorNoite}, ` +
        `Disponíveis: ${quarto.quantidadeDisponivel}`
      );
    });
  }  

  verListaClientes() {
    if (!this.usuarioLogado || !(this.usuarioLogado instanceof Funcionario)) {
      console.log("Apenas funcionários logados podem acessar a lista de clientes.");
      return;
    }
  
    if (this.clientes.length === 0) {
      console.log("Não há clientes cadastrados.");
      return;
    }
  
    console.log("\n=== Lista de Clientes ===");
    this.clientes.forEach((cliente, index) => {
      console.log(
        `${index + 1}. ID: ${cliente.id}, Nome: ${cliente.nome}, ` +
        `CPF: ${cliente.cpf}, Email: ${cliente.email}, ` +
        `Data de Nascimento: ${cliente.dataNascimento}`
      );
    });
  }
  
  mudarStatusReserva(idReserva, novoStatus) {
    // 1) só funcionário logado pode
    if (!this.usuarioLogado || !(this.usuarioLogado instanceof Funcionario)) {
      console.log("Apenas funcionários logados podem mudar o status de uma reserva.");
      return false;
    }
  
    // 2) valida status (case-insensitive)
    const permitidos = ["pendente", "adiada", "realizada", "cancelada"];
    const statusNormalizado = String(novoStatus || "").toLowerCase();
  
    if (!permitidos.includes(statusNormalizado)) {
      console.log(`Status inválido. Use um destes: ${permitidos.join(", ")}.`);
      return false;
    }
  
    // 3) localizar a reserva
    const idNum = Number(idReserva);
    const reserva = this.reservas.find(r => Number(r.id) === idNum);
  
    if (!reserva) {
      console.log(`Reserva com ID ${idReserva} não encontrada.`);
      return false;
    }
  
    // 4) atualizar
    const anterior = reserva.status;
    reserva.status = statusNormalizado;
  
    console.log(`Status da reserva ${reserva.id} alterado de "${anterior}" para "${reserva.status}".`);
    return true;
  }
  
  adicionarQuarto(dados) {
    // 1) Apenas funcionários logados podem
    if (!this.usuarioLogado || !(this.usuarioLogado instanceof Funcionario)) {
      console.log("Apenas funcionários logados podem adicionar quartos.");
      return false;
    }
  
    // 2) Validar dados
    const { nome, descricao, quantidadeCamas, precoPorNoite, quantidadeDisponivel } = dados || {};
  
    if (!nome || !descricao || !quantidadeCamas || !precoPorNoite || !quantidadeDisponivel) {
      console.log("Dados de quarto incompletos. Informe nome, descrição, quantidade de camas, preço por noite e quantidade disponível.");
      return false;
    }
  
    // 3) Gerar ID automático (ex.: próximo disponível baseado no length ou max id)
    const novo = new Quartos(this._proximoIdQuarto++, nome, descricao, quantidadeCamas, precoPorNoite, quantidadeDisponivel);
      this.quartos.push(novo);
      console.log(`Quarto cadastrado com sucesso! ID: ${novo.id}`);
      return true;
  }
}

// ================= TESTE: adicionarQuarto + verListaQuartos =================

console.log("\n=== TESTE: adicionarQuarto e verListaQuartos ===");

const sistema = new Sistema();

// 1) tentar adicionar quarto SEM login -> deve falhar
console.log("\n--- 1) Tentativa sem login (deve falhar) ---");
sistema.adicionarQuarto({
  nome: "Suíte Master",
  descricao: "Quarto amplo com vista para o mar",
  quantidadeCamas: 2,
  precoPorNoite: 450,
  quantidadeDisponivel: 5
});

// 2) cadastrar funcionário
console.log("\n--- 2) Cadastrando funcionário ---");
sistema.fazerCadastro("funcionario", {
  nome: "Carlos Pereira",
  cpf: "33333333333",
  email: "carlos@hotel.com",
  senha: "1234"
});

// 3) login como funcionário
console.log("\n--- 3) Logando como funcionário ---");
sistema.fazerLogin("funcionario", "carlos@hotel.com", "1234");

// 4) adicionar quartos (agora deve funcionar)
console.log("\n--- 4) Adicionando quartos (deve funcionar) ---");
sistema.adicionarQuarto({
  nome: "Suíte Master",
  descricao: "Quarto amplo com vista para o mar",
  quantidadeCamas: 2,
  precoPorNoite: 450,
  quantidadeDisponivel: 5
});

sistema.adicionarQuarto({
  nome: "Quarto Standard",
  descricao: "Quarto confortável com cama de casal",
  quantidadeCamas: 1,
  precoPorNoite: 200,
  quantidadeDisponivel: 10
});

// 5) listar quartos
console.log("\n--- 5) Listando quartos cadastrados ---");
sistema.verListaQuartos();

// 6) opcional: deslogar e tentar listar (para confirmar controle de acesso)
console.log("\n--- 6) Deslogar e tentar listar (deve bloquear) ---");
sistema.sairDoPrograma();
sistema.verListaQuartos();

console.log("\n=== FIM DO TESTE ===\n");
