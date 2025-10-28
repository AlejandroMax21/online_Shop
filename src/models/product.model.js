const { randomUUID } = require("node:crypto");
const admin = require("../config");
const db = admin.firestore();
const collection = db.collection("products");

async function findAll() {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({ productID: doc.id, ...doc.data() }));
}

async function findById(id) {
  return await collection.doc(id).get();
}

async function addProduct(data) {
  const newProduct = {
    name: data.name,
    brand: data.brand,
    stock: data.stock || 0,
    price: data.price || 0,
    category: data.category || "General",
    url_img: data.url_img || "",
    id_invoice: data.id_invoice || "none",
  };
  
  const docRef = await collection.add(newProduct);
  
  return { productID: docRef.id, ...newProduct };
}

async function updateProduct(id, data) {
  const updateData = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.brand !== undefined) updateData.brand = data.brand;
  if (data.stock !== undefined) updateData.stock = data.stock;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.category !== undefined) updateData.category = data.category;
  if (data.url_img !== undefined) updateData.url_img = data.url_img;
  if (data.id_invoice !== undefined) updateData.id_invoice = data.id_invoice;

  if (Object.keys(updateData).length === 0) {
      const doc = await findById(id);
      return doc.exists ? { productID: doc.id, ...doc.data() } : null;
  }
  
  await collection.doc(id).update(updateData);
  
  const updatedDoc = await collection.doc(id).get();
  if (!updatedDoc.exists) return null;
  return { productID: updatedDoc.id, ...updatedDoc.data() };
}

async function deleteProduct(id) {
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
  addProduct,
  updateProduct,
  deleteProduct,
};
