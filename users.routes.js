const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser
} = require("./users.controller");

router.post("/", createUser);

router.post("/login", loginUser);
//Get é pra listar
router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);


module.exports = router;
