const Product = require("../models/product.model");
// const admin = require("../config");
// db = admin.firestore();
const collection = db.collection("products");


async function findAll(req, res) {
  try {
    const snapshot = await collection.get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error: error.message });
  }
}

async function findById(req, res) {
  try {
    const data = await Product.findById(req.params.id); 
    
    if (!data.exists) return res.status(404).json({ message: "Producto no encontrado" });
    
    res.status(200).json({ id: data.id, ...data.data() }); 

  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error: error.message });
  }
}

async function addProduct(req, res) {
  try {
    if (!req.body.title)
      return res.status(400).json({ message: "El título es obligatorio" });

    req.body.completed = false;

    const newProduct = await Product.addProduct(req.body);

    // const newProduct = Product.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el producto", error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const alreadyProduct = await Product.findById(req.params.id);
    if (!alreadyProduct.exists) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    const updated = await Product.updateProduct(req.params.id, req.body);

    return updated ? res.status(200).json(updated) : res.status(404).json({ message: "Producto no encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
  }
  // const updated = Product.updateProduct(req.params.id, req.body);
  // return updated ? res.status(200).json(updated) : res.status(404).json({ message: "Producto no encontrada" });
}

async function deleteProduct(req, res) {
  try {
    const alreadyProduct = await Product.findById(req.params.id);
    if (!alreadyProduct.exists) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    const deleted = await Product.deleteProduct(req.params.id);
    return deleted ? res.status(204).send() : res.status(404).json({ message: "Producto no encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
  }
  const deleted = Product.deleteProduct(req.params.id);
  return deleted ? res.status(204).send() : res.status(404).json({ message: "Producto no encontrada" });
}

module.exports = {
  findAll,
  findById,
  addProduct,
  updateProduct,
  deleteProduct,
};
