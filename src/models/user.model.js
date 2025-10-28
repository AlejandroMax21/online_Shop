const { randomUUID } = require("node:crypto");
const admin = require("../config");
const db = admin.firestore();
const collection = db.collection("users");


async function findAll() {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({ userID: doc.id, ...doc.data() }));
}

async function findById(id) {
  const docSnapshot = await collection.doc(id).get();
  return docSnapshot;
}

async function findByEmail(email) {
  const snapshot = await collection.where('email', '==', email).limit(1).get();

  if (snapshot.empty) {
    return null;
  }
  return snapshot.docs[0];
}

async function addUser(data) {
  // Verificar si el email ya existe antes de crear
  const existingUser = await findByEmail(data.email);
  if (existingUser) {
    return null;
  }

  const newUser = {
    email: data.email,
    password: data.password, 
    name: data.name || "Nuevo Usuario", 
    rol: data.rol || "user",
    address: data.address || "",
  };

  const docRef = await collection.add(newUser);
  
  return { userID: docRef.id, ...newUser };
}

async function updateUser(id, data) {
  const updateData = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.password !== undefined) updateData.password = data.password;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.rol !== undefined) updateData.rol = data.rol;
  if (data.addres !== undefined) updateData.addres = data.addres;

  if (Object.keys(updateData).length === 0) return await findById(id);

  await collection.doc(id).update(updateData);

  const updatedDoc = await collection.doc(id).get();
  if (!updatedDoc.exists) return null;
  return { userID: updatedDoc.id, ...updatedDoc.data() };
}

async function deleteUser(id) {
  try {
    await collection.doc(id).delete();
    return true;

  } catch (error) {
    return false;
  }
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  addUser,
  updateUser,
  deleteUser,
};
