const db = require("./firebase");

//Agenda de espaços disponíveis
exports.getSpaces = async (req, res) => {
  try {
    const snapshot = await db.ref("spaces").once("value");
    const spaces = snapshot.val() ? Object.values(snapshot.val()) : [];
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar espaços.", error });
  }
};

//Aqui busca cada espaço pelo ID
exports.getSpaceById = async (req, res) => {
  try {
    const ref = db.ref(`spaces/${req.params.id}`);
    const snapshot = await ref.once("value");
    if (!snapshot.exists()) {
    return res.status(404).json({ message: "Espaço não encontrado." });
    }
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar espaço.", error });
  }

};

