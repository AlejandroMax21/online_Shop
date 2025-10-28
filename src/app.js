const express = require("express");
// require('dotenv').config();

const admin = require("./config");

const userRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 3000;

// Verificar la conexión con Firebase
admin.firestore().collection('test').get()
  .then(() => {
    console.log('Conexión con Firebase exitosa');
  })
  .catch(error => {
    console.error('Error conectando con Firebase:', error);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
