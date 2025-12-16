const express = require("express");
const router = express.Router();
const {
getSpaces,
getSpaceById
} = require("./spaces.controller");

router.get("/", getSpaces);

router.get("/:id", getSpaceById);


module.exports = router;

