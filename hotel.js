const prompt = require("prompt-sync")({sigint: true});

class Reserva {
    constructor(id, idCliente, status, checkIn, checkOut) {
      this._id = id;
      this._idCliente = idCliente;
      this._status = status;
      this._checkIn = checkIn;
      this._checkOut = checkOut;
    }
  
    // getters
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
  
    // setters
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
  
    // só get para id
    get id() {
      return this._id;
    }
  
    // get e set pro nome
    get nome() {
      return this._nome;
    }
    set nome(novoNome) {
      this._nome = novoNome;
    }
  
    // get e set pro cpf
    get cpf() {
      return this._cpf;
    }
    set cpf(novoCpf) {
      this._cpf = novoCpf;
    }
  
    // get e set pro email
    get email() {
      return this._email;
    }
    set email(novoEmail) {
      this._email = novoEmail;
    }
  
    // get e set pra senha
    get senha() {
      return this._senha;
    }
    set senha(novaSenha) {
      this._senha = novaSenha;
    }
  }

class Cliente {
  constructor(id, nome, dataNascimento, cpf, email, senha) {
    this._id = id;
    this._nome = nome;
    this._dataNascimento = dataNascimento;
    this._cpf = cpf;
    this._email = email;
    this._senha = senha;

    this.reservas = [];
  }

  // get para id
  get id() {
    return this._id;
  }

  // gets e sets
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

  // gets
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

  // sets
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
    this.usuarioLogado = null;

    // contadores para gerar IDs
    this._proximoIdCliente = 1;
    this._proximoIdFuncionario = 1;
    this._proximoIdQuarto = 1;
    this._contadorReservas = 1;
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

      // cria um objeto com ID gerado
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

  //deslogar
  sairDoPrograma() {
    if (this.usuarioLogado) {
      console.log(`Usuário ${this.usuarioLogado.nome} saiu do sistema.`);
      this.usuarioLogado = null;
      return true;
    } else {
      console.log("Nenhum usuário está logado no momento."); //se não tem ninguém logado
      return false;
    }
  }
  
  verMeusDadosFuncionario() {
    if (this.usuarioLogado instanceof Funcionario) { //confere se é funcionário
      console.log("=== Meus Dados (Funcionário) ===");
      console.log(`ID: ${this.usuarioLogado.id}`);
      console.log(`Nome: ${this.usuarioLogado.nome}`);
      console.log(`Email: ${this.usuarioLogado.email}`);
      console.log(`CPF: ${this.usuarioLogado.cpf}`);
    } else {
      console.log("Apenas funcionários podem acessar essa função.");
    }
  }

  verListaReservas() {
    if (!this.usuarioLogado || !(this.usuarioLogado instanceof Funcionario)) {
      console.log("Apenas funcionários logados podem acessar a lista de reservas.");
      return;
    }

    if (this.reservas.length === 0) { //vê se tem alguma reserva
      console.log("Não há reservas cadastradas.");
      return;
    }

    console.log("\n=== Lista de Reservas ===");
    this.reservas.forEach((reserva, index) => {
      console.log(`\nReserva ${index + 1}`);
      console.log(`ID: ${reserva.id}`);
      console.log(`Cliente: ${reserva.idCliente.nome}`);
      console.log(`Status: ${reserva.status}`);
      console.log(`Check-in: ${reserva.checkIn}`);
      console.log(`Check-out: ${reserva.checkOut}`);
    });
  }

  verListaQuartos() {
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
    if (!this.usuarioLogado || !(this.usuarioLogado instanceof Funcionario)) {
      console.log("Apenas funcionários logados podem mudar o status de uma reserva.");
      return false;
    }
    
    const permitidos = ["pendente", "adiada", "realizada", "cancelada"];  
    const statusNormalizado = String(novoStatus || "").toLowerCase();
  
    if (!permitidos.includes(statusNormalizado)) { // valida status
      console.log(`Status inválido. Use um destes: ${permitidos.join(", ")}.`);
      return false;
    }
  
    const idNum = Number(idReserva);
    const reserva = this.reservas.find(r => Number(r.id) === idNum); // localiza a reserva
  
    if (!reserva) {
      console.log(`Reserva com ID ${idReserva} não encontrada.`);
      return false;
    }
  
    const anterior = reserva.status;
    reserva.status = statusNormalizado; // atualiza o status
  
    console.log(`Status da reserva ${reserva.id} alterado de "${anterior}" para "${reserva.status}".`);
    return true;
  }
  
  adicionarQuarto(dados) {
    if (!this.usuarioLogado || !(this.usuarioLogado instanceof Funcionario)) {
      console.log("Apenas funcionários logados podem adicionar quartos.");
      return false;
    }
  
    const { nome, descricao, quantidadeCamas, precoPorNoite, quantidadeDisponivel } = dados || {};
  
    if (!nome || !descricao || !quantidadeCamas || !precoPorNoite || !quantidadeDisponivel) {
      console.log("Dados de quarto incompletos. Informe nome, descrição, quantidade de camas, preço por noite e quantidade disponível.");
      return false;
    }
  
    const novo = new Quartos(this._proximoIdQuarto++, nome, descricao, quantidadeCamas, precoPorNoite, quantidadeDisponivel);
      this.quartos.push(novo);
      console.log(`Quarto cadastrado com sucesso! ID: ${novo.id}`);
      return true;
  }

  verMeusDadosCliente() {
    if (this.usuarioLogado instanceof Cliente) {
      console.log("=== Meus Dados (Cliente) ===");
      console.log(`ID: ${this.usuarioLogado.id}`);
      console.log(`Nome: ${this.usuarioLogado.nome}`);
      console.log(`Data de Nascimento: ${this.usuarioLogado.dataNascimento}`);
      console.log(`Email: ${this.usuarioLogado.email}`);
      console.log(`CPF: ${this.usuarioLogado.cpf}`);
    } else {
      console.log("Apenas clientes podem acessar essa função.");
    }
  }

  criarReserva(idQuarto) {
    if (!(this.usuarioLogado instanceof Cliente)) {
      console.log("Somente clientes podem criar reservas.");
      return false; 
    }
  
    const quarto = this.quartos.find(q => q.id === idQuarto);
  
    if (!quarto) {
      console.log("Quarto não encontrado.");
      return false;
    }
  
    if (quarto.quantidadeDisponivel === 0) {
      console.log("Quarto indisponível para reserva.");
      return false;
    }
  
    
    const idReserva = this._contadorReservas++; // gera ID único da reserva
  
    const reserva = new Reserva(
      idReserva,          
      this.usuarioLogado, 
      "realizada",        
      "indefinido",        
      "indefinido"        
    );
    
    console.log(`Reserva realizada com sucesso! ID: ${idReserva}`);
    this.reservas.push(reserva); // adiciona ao histórico de reservas do sistema
  
    if (!this.usuarioLogado.reservas) {
      this.usuarioLogado.reservas = [];
    }
  
    this.usuarioLogado.reservas.push(reserva); //adiciona ao histórico do cliente
  
    quarto._quantidadeDisponivel--; // atualiza disponibilidade do quarto
  
    return reserva;
  }  

  cancelarReserva(idReserva) {
    if (!(this.usuarioLogado instanceof Cliente)) {
      console.log("Somente clientes podem cancelar reservas.");
      return false;
    }
  
    const idNum = Number(idReserva);
  
    
    const reserva = this.usuarioLogado.reservas.find(r => r.id === idNum); // procura a reserva no histórico do cliente
  
    if (!reserva) {
      console.log(`Reserva com ID ${idReserva} não encontrada no seu histórico.`);
      return false;
    }
  
    // só pode cancelar se não estiver já cancelada
    if (reserva.status === "cancelada") {
      console.log(`A reserva ${idReserva} já está cancelada.`);
      return false;
    }
  
    
    reserva.status = "cancelada"; // atualiza status
  
    
    if (reserva.quarto) {
      reserva.quarto.quantidadeDisponivel++; // atualiza disponibilidade do quarto
    }
  
    console.log(`Reserva ${idReserva} cancelada com sucesso.`);
    return true;
  }

  verMinhasReservas() {
    if (!(this.usuarioLogado instanceof Cliente)) {
      console.log("Somente clientes podem visualizar suas reservas.");
      return false;
    }

    if (!this.usuarioLogado.reservas || this.usuarioLogado.reservas.length === 0) {
      console.log("Você não possui reservas cadastradas.");
      return false;
    }

    console.log("\n=== Minhas Reservas ===");
    this.usuarioLogado.reservas.forEach((reserva, index) => {
      console.log(`\nReserva ${index + 1}`);
      console.log(`ID: ${reserva.id}`);
      console.log(`Status: ${reserva.status}`);
      console.log(`Check-in: ${reserva.checkIn}`);
      console.log(`Check-out: ${reserva.checkOut}`);
    });

    return true;
  }

  menu() {
    // Loop do menu inicial: permite voltar aqui ao "sair da conta"
    let executando = true;

    while (executando) {
      console.log("\n=== Bem-vindo ao Hotel F-Luxo ===\n");

      // pergunta se é cliente ou funcionário
      let tipo = prompt("Digite 1 se você é cliente ou 2 se você é funcionário: ");
      if (tipo === "1") {
        tipo = "cliente";
      } else if (tipo === "2") {
        tipo = "funcionario";
      } else {
        console.log("Opção inválida. Encerrando...");
        return; // fecha o sistema
      }

      console.log(""); // estética
      // pergunta se quer se cadastrar ou fazer login
      let acao = prompt("Digite 1 para Cadastro ou 2 para Login: ");
      console.log(""); // estética

      if (acao === "1") {
        // cadastro
        let sucesso = false;
        if (tipo === "cliente") {
          const nome = prompt("Nome: ");
          const dataNascimento = prompt("Data de nascimento (dd/mm/aaaa): ");
          const cpf = prompt("CPF: ");
          const email = prompt("Email: ");
          const senha = prompt("Senha: ");
          console.log(""); // estética
          sucesso = this.fazerCadastro("cliente", { nome, dataNascimento, cpf, email, senha });
        } else {
          const nome = prompt("Nome: ");
          const cpf = prompt("CPF: ");
          const email = prompt("Email: ");
          const senha = prompt("Senha: ");
          console.log(""); // estética
          sucesso = this.fazerCadastro("funcionario", { nome, cpf, email, senha });
        }

        // se cadastro deu certo, pede login
        if (sucesso) {
          console.log("\nAgora faça login:\n");
          const email = prompt("Email: ");
          const senha = prompt("Senha: ");
          if (this.fazerLogin(tipo, email, senha)) {
            const resultado = (tipo === "cliente") ? this.menuCliente() : this.menuFuncionario();
            if (resultado === "logout") {
              // volta para o início do while -> escolher cliente/funcionário de novo
              continue;
            } else if (resultado === "exit") {
              // encerra o sistema
              executando = false;
            }
          }
          console.log("") //estética
        }

      } else if (acao === "2") {
        // login direto
        const email = prompt("Email: ");
        const senha = prompt("Senha: ");
        if (this.fazerLogin(tipo, email, senha)) {
          const resultado = (tipo === "cliente") ? this.menuCliente() : this.menuFuncionario();
          if (resultado === "logout") {
            continue; // volta ao menu inicial
          } else if (resultado === "exit") {
            executando = false; // encerra sistema
          }
        }

      } else {
        console.log("Opção inválida. Encerrando...");
        return; // fecha o sistema
      }
    }
  }

  // menu do cliente
  menuCliente() {
    while (true) {
      console.log("\n=== Menu do Cliente ===\n");
      console.log("1. Ver Meus Dados");
      console.log("2. Ver Lista de Quartos");
      console.log("3. Fazer Reserva");
      console.log("4. Cancelar Reserva");
      console.log("5. Ver Minhas Reservas");
      console.log("0. Sair");
      const opcao = prompt("\nEscolha uma opção: ");
      console.log(""); // estética

      switch (opcao) {
        case "1":
          this.verMeusDadosCliente();
          break;
        case "2":
          this.verListaQuartos();
          break;
        case "3":
          {
            console.log(""); // estética
            const idQuarto = parseInt(prompt("Digite o ID do quarto que deseja reservar: "));
            this.criarReserva(idQuarto);
          }
          break;
        case "4":
          {
            console.log(""); // estética
            const idCancelar = parseInt(prompt("Digite o ID da reserva que deseja cancelar: "));
            this.cancelarReserva(idCancelar);
          }
          break;
        case "5":
          this.verMinhasReservas();
          break;
        case "0":
          console.log("\nDeseja:");
          console.log("1. Sair da conta (voltar ao menu inicial)");
          console.log("2. Sair do sistema\n");
          const saidaCli = prompt("Escolha: ");
          console.log(""); // estética
          if (saidaCli === "1") {
            this.sairDoPrograma();  // desloga
            return "logout";        // volta ao menu inicial
          } else if (saidaCli === "2") {
            this.sairDoPrograma();  // desloga
            return "exit";          // encerra o programa
          } else {
            console.log("Opção inválida.");
          }
          break;
        default:
          console.log("Opção inválida.");
      }
    }
  }

  // menu do funcionário
  menuFuncionario() {
    while (true) {
      console.log("\n=== Menu do Funcionário ===\n");
      console.log("1. Ver Meus Dados");
      console.log("2. Ver Lista de Reservas");
      console.log("3. Ver Lista de Quartos");
      console.log("4. Ver Lista de Clientes");
      console.log("5. Mudar Status de Reserva");
      console.log("6. Adicionar Quarto");
      console.log("0. Sair\n");
      const opcao = prompt("Escolha uma opção: ");
      console.log(""); // estética

      switch (opcao) {
        case "1":
          this.verMeusDadosFuncionario();
          break;
        case "2":
          this.verListaReservas();
          break;
        case "3":
          this.verListaQuartos();
          break;
        case "4":
          this.verListaClientes();
          break;
        case "5":
          {
            const idReserva = parseInt(prompt("Digite o ID da reserva: "));
            const novoStatus = prompt("Digite o novo status (pendente, adiada, realizada, cancelada): ");
            this.mudarStatusReserva(idReserva, novoStatus);
          }
          break;
        case "6":
          {
            const nome = prompt("Nome do quarto: ");
            const descricao = prompt("Descrição: ");
            const quantidadeCamas = parseInt(prompt("Quantidade de camas: "));
            const precoPorNoite = prompt("Preço por noite: ");
            const quantidadeDisponivel = parseInt(prompt("Quantidade disponível: "));
            this.adicionarQuarto({ nome, descricao, quantidadeCamas, precoPorNoite, quantidadeDisponivel });
          }
          break;
        case "0":
          console.log("\nDeseja:");
          console.log("1. Sair da conta (voltar ao menu inicial)");
          console.log("2. Sair do sistema\n");
          const saidaFunc = prompt("Escolha: ");
          console.log("") // estética
          if (saidaFunc === "1") {
            this.sairDoPrograma();  // desloga
            return "logout";        // volta ao menu inicial
          } else if (saidaFunc === "2") {
            this.sairDoPrograma();  // desloga
            return "exit";          // encerra o programa
          } else {
            console.log("Opção inválida.");
          }
          break;
        default:
          console.log("Opção inválida.");
      }
    }
  }    
}

const sistema = new Sistema()

sistema.menu()