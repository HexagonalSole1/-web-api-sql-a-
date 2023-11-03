const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);
const mysql = require('mysql2');
require('dotenv').config(); // Load your environment variables if needed

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos MySQL:', err);
    console.log(host)
  } else {
    console.log('Conexión a la base de datos MySQL establecida');
  }
});

const usuarios = [
    { nombre: "Usuario1", apellido: "Apellido1", email: "usuario1@gmail.com", password: bcrypt.hashSync('contrasena1', saltosBcrypt), rol: "Rol1" },
    { nombre: "Usuario2", apellido: "Apellido2", email: "usuario2@gmail.com", password: bcrypt.hashSync('contrasena2', saltosBcrypt), rol: "Rol2" },
    { nombre: "Usuario3", apellido: "Apellido3", email: "usuario3@gmail.com", password: bcrypt.hashSync('contrasena3', saltosBcrypt), rol: "Rol3" },
    { nombre: "Usuario4", apellido: "Apellido4", email: "usuario4@gmail.com", password: bcrypt.hashSync('contrasena4', saltosBcrypt), rol: "Rol4" },
    { nombre: "Usuario5", apellido: "Apellido5", email: "usuario5@gmail.com", password: bcrypt.hashSync('contrasena5', saltosBcrypt), rol: "Rol5" },
    { nombre: "Usuario6", apellido: "Apellido6", email: "usuario6@gmail.com", password: bcrypt.hashSync('contrasena6', saltosBcrypt), rol: "Rol6" },
    { nombre: "Usuario7", apellido: "Apellido7", email: "usuario7@gmail.com", password: bcrypt.hashSync('contrasena7', saltosBcrypt), rol: "Rol7" },
    { nombre: "Usuario8", apellido: "Apellido8", email: "usuario8@gmail.com", password: bcrypt.hashSync('contrasena8', saltosBcrypt), rol: "Rol8" },
    { nombre: "Usuario9", apellido: "Apellido9", email: "usuario9@gmail.com", password: bcrypt.hashSync('contrasena9', saltosBcrypt), rol: "Rol9" },
    { nombre: "Usuario10", apellido: "Apellido10", email: "usuario10@gmail.com", password: bcrypt.hashSync('contrasena10', saltosBcrypt), rol: "Rol10" }
];


const insertQuery = 'INSERT INTO usuario (nombre, apellido, email, password, rol) VALUES ?';

const values = usuarios.map((usuario) => [
    usuario.nombre,
    usuario.apellido,
    usuario.email,
    usuario.password,
    usuario.rol,
]);

db.query(insertQuery, [values], (err, result) => {
    if (err) {
        console.error('Error al insertar usuarios en la base de datos MySQL:', err);
    } else {
        console.log('Usuarios insertados en la base de datos MySQL');
    }

    db.end(); 
});
