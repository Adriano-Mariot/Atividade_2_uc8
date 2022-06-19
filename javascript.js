// ------Para executar digite >>> node javascript.js <<< no seu terminal e sigas as instruções que aparecem na linha de comando.
// Nesse exercicío eu usei somente funções de console do NODES. 
// ----- Atenção -----
// Para esse exemplo eu usei listas dentro do codigo para simular os eventos dos bancos de dados, mesmo sabendo que essa não é uma boa pratica!
// Mas uma vez que o conteúdo de banco de dados e SQL ainda não foram abordados nao vi outra alternativa.

const input=require('prompt-sync')(); // função para entrada de dados
function dataAtual() {
    const d = new Date();
    let dia = d.getDate();
    let mes = d.getMonth() + 1;
    let anos = d.getFullYear();
    let minhaData = dia + "/" + mes + "/" + anos;
    return minhaData;
};
console.log("\n ...........Savinis Eventos............."+dataAtual()+"\n");

//Lista de usuario - Simula tabela do banco de dados
const listaUser = [
    {idade_cad: 38,tipo_cad:"Organizacao",nome_cad: "User0",cpf_cad:"00000000000",email_cad: "user0@user0"},
    {idade_cad: 60,tipo_cad:"Palestrante",nome_cad: "Pale1",cpf_cad:"11122233344",email_cad: "pale1@pale1"},
    {idade_cad: 29,tipo_cad:"Participante",nome_cad: "User1",cpf_cad:"11111111111",email_cad: "user1@user1"},
    {idade_cad: 29,tipo_cad:"Participante",nome_cad: "User2",cpf_cad:"22222222222",email_cad: "user2@user2"},
    {idade_cad: 30,tipo_cad:"Participante",nome_cad: "User3",cpf_cad:"33333333333",email_cad: "user3@user3"},
    {idade_cad: 26,tipo_cad:"Participante",nome_cad: "User4",cpf_cad:"44444444444",email_cad: "user4@user4"},
    {idade_cad: 41,tipo_cad:"Participante",nome_cad: "User5",cpf_cad:"55555555555",email_cad: "user5@user5"},
    {idade_cad: 43,tipo_cad:"Participante",nome_cad: "User6",cpf_cad:"66666666666",email_cad: "user6@user6"},
    {idade_cad: 45,tipo_cad:"Participante",nome_cad: "User7",cpf_cad:"77777777777",email_cad: "user7@user7"},
    {idade_cad: 33,tipo_cad:"Participante",nome_cad: "User8",cpf_cad:"88888888888",email_cad: "user8@user8"},
    {idade_cad: 21,tipo_cad:"Participante",nome_cad: "User9",cpf_cad:"99999999999",email_cad: "user9@user9"},
];

//Lista de eventos - Simula tabela do banco de dados
const listaEventos=[
    {nome_evento:"Evento 1", Palestrante:"Pale1",Data_Evento:"10/08/2022",Inscritos:100},
    {nome_evento:"Evento 2", Palestrante:"Pale1",Data_Evento:"10/07/2022",Inscritos:90},
    {nome_evento:"Evento 3", Palestrante:"Pale1",Data_Evento:"10/09/2022",Inscritos:40},
    {nome_evento:"Evento 4", Palestrante:"Pale1",Data_Evento:"10/10/2022",Inscritos:20},
]

JanelaEntrada(); //Função de entrada

criarEvento();   //Função Cadastro de eventos

let perCadastro5 = input ("Deseja se inscrever em algum de nossos Eventos ? s/n : ");
if (perCadastro5=="s"){
    inscEvento(); //Função para se cadastrar em um eventos
}else {
    listaPart(); //Função Lista os Participantes do evento
};

listaPart(); //Função Lista os Participantes do evento

//Janela de entrada------------------------------------
function JanelaEntrada() {
    let perCadastro1 = input(" Voce já possui Cadastro ? s/n : "); //Pergunta se o Usuario ja tem cadastro

    if ( perCadastro1 == "s") { //caso tenha cadastro roda Função Janelalogin
        console.log(" Possui cadastro !");
        Janelalogin(); 
    } else if ( perCadastro1 == "n") { //caso não tenha casdastro pergunta se deseja realizar nova cadastro
        let perCadastro2 = input(" Não tem cadastro! Deseja fazer um novo Cadastro? s/n : ");
        if (perCadastro2 == "s") { //caso deseje fazer novo cadastro roda userFunc para cria o cadastro
            console.log("\n Fazer cadastro----------------------------");
            listaUser.push(userFunc()); //envia cadastro para a Lista de Usuarios >> listUser
            console.log(" Cadastro Realizado com sucesso ! \n");
            listEventosDisponiveis()
        } else if ( perCadastro2 == "n") {
            console.log(" Fim da Aplicação. \n");;//caso não deseje fazer novo cadastro finaliza
            process.exit();
        };
    };
    return;
};

//Janela de login caso ja tenha cadasto------------------------------------
function Janelalogin(){
    console.log("\n Nota : Como a comunicação com o banco de dados nao exite use um CPF da lista de usuarios.");
    let userCpf=input(" Entre com seu CPF (Sem pontos ou ifen): ")
    if(userCpf.length!=11){
        console.log("Numero de Cpf incorreto");
        return Janelalogin();
    }
    listEventosDisponiveis();
    return;
};

//Janela de login caso ja tenha cadasto------------------------------------
function criarEvento() {
    let perCadastro3 = input("Deseja casdastra um novo evento ? s/n : ");
    if (perCadastro3 == "s") {
        console.log("\n Fazer cadastro de Evento ---------------------");
        listaEventos.push(eventoFunc());
        console.log("Evento cadastrado com Sucesso!");
        listEventosDisponiveis();
        
    } else if (perCadastro3 == "n") {
        
    };
};

//Funções que vão criar o cadastro do usuario-----------------------------

//Pergunta idade do usuário
function idadeCadastro(){
    let userIdade=input( " Qual sua idade ? ");
    if (userIdade<18){ // se o usuario não tem mais de 18 anos encerra cadastro e finaliza a aplicação
        console.log(" Sentimos muito mais o nosso Cadastro é exclusivo para maiores de 18 anos.");
        console.log(" Fim da Aplicação. \n");
        process.exit();
    };
    return userIdade;
};

//defini se o usuário é PARTICIPANTE/PALESTRANTE/ORGANIZAÇÃO
function TipoDeCadastro() {
    console.log("\n Para definir o tipo de Cadastro use as opções abaixo: \n");
    console.log(" Participante - PAR ");
    console.log(" Organização - ORG ");
    console.log(" Palestrante - PAL \n");
    let tipoCadastro = input(" Tipo de Cadastro PAR/ORG/PAL: ");
    switch(tipoCadastro){
        case "par":
            console.log(" Participante----------------------------\n");
            tipoCadastro="Participante";
        break;
        case "org":
            console.log(" Organização----------------------------\n");
            tipoCadastro="Organização";
        break;
        case "pal":
            console.log(" Palestrante----------------------------\n");
            tipoCadastro="PaLestrante";
        break;
        default:
            console.log(" Opição não valida--------\n");
            return TipoDeCadastro();
    };
    return tipoCadastro;
};

//Pergunta nome do usuario
function NomeCadastro(){
    let nome=input(" Entre com seu nome completo : "); 
    if (nome.length<5){
        console.log("Nome do Cadastro precisa ter no minimo 5 carcatéris ");
        return NomeCadastro();
    };
    return nome;
};

//Pergunta CPF do usuario
function CpfCadastro(){
    let userCpf=input(" Entre com seu CPF (Sem pontos ou ifen): ");
    if(userCpf.length!=11){
        console.log(" Numero de Cpf incorreto ");
        return CpfCadastro();
    };
    return userCpf;
};

//Pergunta Email do Usuario
function EmailCadastro(){

    let emailUser=input( " Entre com seu E-mail : ");
    if (emailUser.length<5){
        console.log(" E-mail invalido ");
        return EmailCadastro();
    };
    return emailUser;
};

//Cria o objeto Usuario e salva as informações na tabela >>> ListaUser
function userFunc(){
let arrayUsuario={idade_cad:idadeCadastro(),tipo_cad:TipoDeCadastro(),nome_cad:NomeCadastro(),cpf_cad:CpfCadastro(),email_cad:EmailCadastro()};
console.log("\n Informações do usuario ------------------------");
console.log(" Nome: "+arrayUsuario.nome_cad+" ||CPF: "+arrayUsuario.cpf_cad+"||Idade: "+arrayUsuario.idade_cad+"||Cadastro: "+arrayUsuario.tipo_cad+"||E-mail: "+arrayUsuario.email_cad);
return arrayUsuario;
};

//Funções que vão criar o cadastro de Eventos-----------------------------

//Pergunta nome do Evento
function nomeEvento(){
    let nome_evento=input(" Entre com o nome do evento : "); 
    if (nome_evento.length<5){
        console.log("Nome do Cadastro precisa ter no minimo 5 carcatéris ");
        return nomeEvento();
    };
    return nome_evento;
};

//Pergunta nome do Palestrante
function nomePalestrante(){
    let nome_Palestrante=input(" Entre com o nome do Palestrante : "); 
    if (nome_Palestrante.length<5){
        console.log("Nome do Cadastro precisa ter no minimo 5 carcatéris ");
        return nomePalestrante();
    };
    return nome_Palestrante;
};

// Função para Verificar a data
function comparaData(){
      let hoje= new Date();
      let diaEvento= new Date();
      let diaDoEvento=input(" Entre somente o Dia do Evento : ");
      let mesDoEvento=input(" Entre somente o Mês do Evento : ");
      let anoDoEvento=input(" Entre somente o Ano do Evento : ");    
      
      diaEvento.setFullYear(anoDoEvento,(mesDoEvento-1),diaDoEvento);

      if (diaEvento<hoje){
        console.log("Data Invalida!");
        console.log("Entre com a data correta!");
        return comparaData();  
      }
      return diaEvento=(diaDoEvento+"/"+mesDoEvento+"/"+anoDoEvento);
};

//Cria o objeto arrayEvento salva as informações na tabela >>> ListaEventos
function eventoFunc(){
    let arrayEvento={nome_evento:nomeEvento(),Palestrante:nomePalestrante(),Data_Evento:comparaData(),Inscritos:00,};
    return arrayEvento;
    };


//Cria o Tabela de Eventos para o prompt 
function listEventosDisponiveis(){
    console.log("\n Lista de eventos disponiveis ! \n");
    console.log("-------------------------------------------------------------------");
    console.log("Nome do evento || Paslestrante || Data do Evento || Nº de Inscritos");
    let i=0;
    while (i<listaEventos.length){
        console.log(listaEventos[i].nome_evento+"-------------"+listaEventos[i].Palestrante+"----------"+listaEventos[i].Data_Evento+"------------"+listaEventos[i].Inscritos);
        i++
    }
};

// Função para se inscrever no evento
function inscEvento(){
    let escolhaEvento = input (" Indique o numero do evento : ");
    if (listaEventos[escolhaEvento-1].Inscritos==100){
        console.log(" O numero máximo de participantes já foi atingido ! ");
        return inscEvento();
    }else {
        console.log(" Cadastro no enveto realizado !");
    }
    return;
};

// Função para se Listar participantes
function listaPart() {
    let perCadastro4 = input("Ver lista de Participante por evento ? s/n : ")

    if (perCadastro4 == "s") {
        let escolhaEvento = input(" Indique o numero do evento : ");
        console.log("Evento     || Palestrante  || Participante");

        for (let number = 0; number <= listaEventos[escolhaEvento - 1].Inscritos; number++) {
            console.log("Evento" + escolhaEvento, "      Palestrante 1     ", "User" + number);
        }
    } else {
        console.log(" Fim da Aplicação. \n");
        process.exit();
    }
    console.log("------------------------------------------");
    console.log(" Fim da Aplicação. \n");
}