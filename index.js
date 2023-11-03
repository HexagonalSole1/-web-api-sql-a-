require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Conectar a la base de datos MySQL
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

app.use(cors());

app.use(express.json());


app.use('/usuarios', require('./src/routes/usuarios.route'));
app.use('/auth', require('./src/routes/auth.route'));
app.use('/calzados', require('./src/routes/calzados.route'));
app.use('/apartados', require('./src/routes/apartados.route'));


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`API escuchando en el puerto ${PORT}`);
});

process.on('SIGINT', () => {
  db.end(() => {
    console.log('Conexión a la base de datos cerrada.');
    process.exit(0);
  });
});
