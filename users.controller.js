const db = require("./firebase");

//Na parte do cadastro de usuários essa parte do código cria um novo usuário (Lembrar)
exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;

    const snapshot = await db.ref("users").orderByChild("email").equalTo(email).once("value");

    if (snapshot.exists()) {
      return res.status(400).json({ message: "Usuário já cadastrado." });
    }

    const newUserRef = db.ref("users").push();
    const newUser = {
      id: newUserRef.key,
      ...req.body
    };

    await newUserRef.set(newUser);

    res.status(201).json(newUser);

  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário.", error });
  }
};

//Parte de login caso queira reconectar
exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    const snapshot = await db.ref("users").orderByChild("email").equalTo(email).once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const user = Object.values(snapshot.val())[0];

    res.json({ message: "Login bem-sucedido!", user });

  } catch (error) {
    res.status(500).json({ message: "Erro no login.", error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const snapshot = await db.ref("users").once("value");
    const users = snapshot.val() ? Object.values(snapshot.val()) : [];
    res.json(users);

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários.", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userRef = db.ref(`users/${req.params.id}`);
    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) return res.status(404).json({ message: "Usuário não encontrado." });

    res.json(snapshot.val());

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário.", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userRef = db.ref(`users/${req.params.id}`);
    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) return res.status(404).json({ message: "Usuário não encontrado." });

    await userRef.update(req.body);

    res.json({ id: req.params.id, ...snapshot.val(), ...req.body });

  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário.", error });
  }
};

