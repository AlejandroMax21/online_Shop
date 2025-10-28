const User = require("../models/user.model");
const admin = require("../config");
db = admin.firestore();
const collection = db.collection("users");

function findAll(req, res) {
  const snapshot = collection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //const data = User.findAll();
  //res.status(200).json(data);
}

async function findById(req, res) {
  try{
  const data = await User.findById(req.params.id);
  if (!data.exists) return res.status(404).json({ message: "Usuario no encontrado" });
  res.status(200).json(data);

}catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
  }
  // const user = User.findById(req.params.id);
  // return user ? res.status(200).json(user) : res.status(404).json({ message: "Usuario no encontrada" });
}

async function addUser(req, res) {
  try {
    if(req,body.title)return res.status(400).json({ message: "El título es obligatorio" });

    req.body.completed = false;
    const newUser = await User.addUser(req.body);
    res.status(201).json(newUser);

  }catch (error) {
    res.status(500).json({ message: "Error al agregar el usuario", error: error.message });
  }

  // if (!req.body.name || !req.body.marca || req.body.categoria) {
  //   return res.status(400).json({ message: "Los campos son obligatorios" });
  // }
  // const newUser = User.addUser(req.body);
  // res.status(201).json(newUser);
}

async function updateUser(req, res) {
  try {
    const alreadyUser = await User.findById(req.params.id);
    if (!alreadyUser.exists) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const updated = await User.updateUser(req.params.id, req.body);

    return updated ? res.status(200).json(updated) : res.status(404).json({ message: "Usuario no encontrada" });
    
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
  }
  
  // const updated = User.updateUser(req.params.id, req.body);
  // return updated ? res.status(200).json(updated) : res.status(404).json({ message: "Usuario no encontrada" });
}

async function deleteUser(req, res) {
  try {
    const alreadyUser = await User.findById(req.params.id);
    if (!alreadyUser.exists) return res.status(404).json({ message: "Usuario no encontrado" });
    const deleted = await User.deleteUser(req.params.id);
    return deleted ? res.status(204).send() : res.status(404).json({ message: "Usuario no encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
  }
  // const deleted = User.deleteUser(req.params.id);
  // return deleted ? res.status(204).send() : res.status(404).json({ message: "Usuario no encontrada" });
}

module.exports = {
  findAll,
  findById,
  addUser,
  updateUser,
  deleteUser,
};
