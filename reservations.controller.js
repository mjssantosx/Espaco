const db = require("./firebase");

//Esse comando será utlizado para verificar se tem conflito entre as reservas que serão feitas pelos usuários e as reservas que já existem no banco de dados
exports.createReservation = async (req, res) => {
  try {
    const { user, space, data, inicio, fim } = req.body;

    //Aqui é para validar os campos obrigatórios
    if (!user || !space || !data || !inicio || !fim) {
      return res.status(400).json({ 
        message: "Todos os campos são obrigatórios." 
      });
    }

    //Já esta parte valida se o horário de início é menor que o horário de fim
    if (inicio >= fim) {
      return res.status(400).json({ 
        message: "Horário de fim deve ser maior que o de início." 
      });
    }

    console.log("Buscando conflitos para:", { user, space, data, inicio, fim });

    //Procurar reservas existentes no banco de dados
    const snapshot = await db.ref("reservations").once("value");

    if (snapshot.exists()) {
      const todasReservas = Object.values(snapshot.val());
      
      console.log("Total de reservas no banco:", todasReservas.length);

      //Filtra apenas reservas do mesmo espaço e data
      const reservasFiltradas = todasReservas.filter(r => 
        r.space === space && r.data === data
      );

      console.log("Reservas no mesmo espaço e data:", reservasFiltradas);

      let conflito = false;
      let reservaConflitante = null;

      for (const r of reservasFiltradas) {  
        const naoConflita = (fim <= r.inicio) || (inicio >= r.fim);
        if (!naoConflita) {
          conflito = true;
          reservaConflitante = r;
          console.log("Conflito detectado com:", r);
          break;
        }
      }

      if (conflito) {
        return res.status(400).json({ 
          message: `Horário já reservado! Já existe uma reserva de ${reservaConflitante.inicio} às ${reservaConflitante.fim}.`,
          conflito: reservaConflitante
        });
      }
    }

    console.log("Nenhum conflito encontrado. Criando reserva...");

    //Caso não haja conflito, cria a nova reserva
    const newRef = db.ref("reservations").push();
    const reservation = {
      id: newRef.key,
      user,
      space,
      data,
      inicio,
      fim,
      createdAt: new Date().toISOString()
    };

    await newRef.set(reservation);

    console.log("Reserva criada com sucesso:", reservation);

    res.status(201).json({
      message: "Reserva criada com sucesso!",
      reservation
    });

  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ 
      message: "Erro ao criar reserva.", 
      error: error.message 
    });
  }
};

//Aqui será meio que um histórico de todas as reservas feitas pelos usuários
exports.getReservations = async (req, res) => {
  try {
    const snapshot = await db.ref("reservations").once("value");
    const reservations = snapshot.val() ? Object.values(snapshot.val()) : [];

    console.log("Total de reservas encontradas:", reservations.length);

    res.json(reservations);

  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    res.status(500).json({ 
      message: "Erro ao buscar reservas.", 
      error: error.message 
    });
  }

};
