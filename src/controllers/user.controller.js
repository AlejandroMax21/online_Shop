const User = require("../models/user.model");

function findAll(req, res) {
  const data = User.findAll();
  res.status(200).json(data);
}

function findById(req, res) {
  const user = User.findById(req.params.id);
  return user ? res.status(200).json(user) : res.status(404).json({ message: "Usuario no encontrada" });
}

function addUser(req, res) {
  if (!req.body.name || !req.body.marca || req.body.categoria) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }
  const newUser = User.addUser(req.body);
  res.status(201).json(newUser);
}

function updateUser(req, res) {
  const updated = User.updateUser(req.params.id, req.body);
  return updated ? res.status(200).json(updated) : res.status(404).json({ message: "Usuario no encontrada" });
}

function deleteUser(req, res) {
  const deleted = User.deleteUser(req.params.id);
  return deleted ? res.status(204).send() : res.status(404).json({ message: "Usuario no encontrada" });
}

module.exports = {
  findAll,
  findById,
  addUser,
  updateUser,
  deleteUser,
};
