const express = require("express");
const cors = require("cors");
require("./firebase"); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Aqui são as rotas que serão importadas
const usersRoutes = require("./users.routes");
const spacesRoutes = require("./spaces.routes");
const reservationsRoutes = require("./reservations.routes");

app.use("/api/users", usersRoutes);
app.use("/api/spaces", spacesRoutes);
app.use("/api/reservations", reservationsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

});
