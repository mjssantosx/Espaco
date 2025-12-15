const db = require("./firebase");

const espacos = {
  coworking: {
    id: "coworking",
    nome: "Coworking",
    capacidade: 20,
    descricao: "Espaço compartilhado para trabalho colaborativo"
  },
  sala: {
    id: "sala",
    nome: "Sala de Reunião",
    capacidade: 10,
    descricao: "Sala equipada para reuniões e apresentações"
  },
  laboratorio: {
    id: "laboratorio",
    nome: "Laboratório",
    capacidade: 15,
    descricao: "Laboratório equipado para práticas e experimentos"
  },
  administracao: {
    id: "administracao",
    nome: "Administração",
    capacidade: 5,
    descricao: "Espaço administrativo"
  }
};

async function popularEspacos() {
  try {
    await db.ref("spaces").set(espacos);
    console.log("Espaços cadastrados com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao cadastrar espaços:", error);
    process.exit(1);
  }
}

popularEspacos();