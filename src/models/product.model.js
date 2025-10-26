const { randomUUID } = require("node:crypto");

let products = [
  {
    productID: randomUUID(),
    name: "Creatina",
    marca: "Meta nutrition",
    stock: 5,
    precio: 325.50,
    categoria:"Suplementos",
    url_img:"www.CMetaN.com",
    id_factura:"desconocido",
  },
];

function findAll() {
  return products;
}

function findById(id) {
  return products.find((p) => p.productID === id) || null;
}

function addProduct(data) {
  const product = {
    productID: randomUUID(),
    name: data.name,
    marca: data.marca,
    stock: data.stock,
    precio: data.precio,
    categoria:data.categoria,
    url_img:data.url_img,
    id_factura:data.id_factura
  };
  products.push(product);
  return product;
}

function updateProduct(id, data) {
  const index = products.findIndex((p) => p.productID === id);
  if (index === -1) return null;
  products[index] = {
    ...products[index],
    name: typeof data.name === "undefined" ? products[index].name : data.name,
    marca: typeof data.marca === "undefined" ? products[index].marca : data.marca,
    stock: typeof data.stock === "undefined" ? products[index].stock : data.stock,
    precio: typeof data.precio === "undefined" ? products[index].precio : data.precio,
    categoria: typeof data.categoria === "undefined" ? products[index].categoria : data.categoria,
    url_img: typeof data.url_img === "undefined" ? products[index].url_img : data.url_img,
    id_factura: typeof data.id_factura === "undefined" ? products[index].id_factura : data.id_factura,
  };
  return products[index];
}

function deleteProduct(id) {
  const index = products.findIndex((p) => p.productID === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

module.exports = {
  findAll,
  findById,
  addProduct,
  updateProduct,
  deleteProduct,
};
