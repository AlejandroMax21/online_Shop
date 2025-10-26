const { randomUUID } = require("node:crypto");

let users = [
  {
    userID: randomUUID(),
    name: "Alejandro",
    password: "12345",
    email: "aljoyaba@ittepic",
    rol:"admin",
    addres:"conocido",
  },
];

function findAll() {
  return users;
}

function findById(id) {
  return users.find((u) => u.userID === id) || null;
}

function addUser(data) {
  const user = {
    userID: randomUUID(),
    name: data.name,
    password: data.password,
    email: data.email,
    rol:data.rol,
    addres:data.addres
  };
  users.push(user);
  return user;
}

function updateUser(id, data) {
  const index = users.findIndex((u) => u.userID === id);
  if (index === -1) return null;
  users[index] = {
    ...users[index],
    name: typeof data.name === "undefined" ? users[index].name : data.name,
    password: typeof data.password === "undefined" ? users[index].password : data.password,
    email: typeof data.email === "undefined" ? users[index].email : data.email,
    rol: typeof data.rol === "undefined" ? users[index].rol : data.rol,
    addres: typeof data.addres === "undefined" ? users[index].addres : data.addres,
  };
  return users[index];
}

function deleteUser(id) {
  const index = users.findIndex((u) => u.userID === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}

module.exports = {
  findAll,
  findById,
  addUser,
  updateUser,
  deleteUser,
};
