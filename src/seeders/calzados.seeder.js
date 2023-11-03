const mysql = require('mysql2');
require('dotenv').config(); // Load your environment variables if needed

// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});


const calzados = [
  {
    "precio": 49.99,
    "talla": "40",
    "modelo": "Deportivos Negros",
    "genero": "H",
    "color": "D",
    "descripcion": "Zapatos deportivos negros para hombres",
    "tipo": "Deportivos",
    "inventario": 10
  },
  {
    "precio": 59.99,
    "talla": "38",
    "modelo": "Tacón Plateado",
    "genero": "D",
    "color": "Plateado",
    "descripcion": "Elegantes zapatos de tacón plateados para mujeres",
    "tipo": "Tacón",
    "inventario": 8
  },
  {
    "precio": 69.99,
    "talla": "42",
    "modelo": "Botas de Montaña Marrones",
    "genero": "D",
    "color": "Marrón",
    "descripcion": "Botas de montaña marrones para hombres",
    "tipo": "Botas",
    "inventario": 12
  },
  {
    "precio": 59.99,
    "talla": "37",
    "modelo": "Botines Negros",
    "genero": "D",
    "color": "Negro",
    "descripcion": "Botines negros para mujeres",
    "tipo": "Botines",
    "inventario": 6
  },
  {
    "precio": 34.99,
    "talla": "41",
    "modelo": "Zapatos Deportivos Blancos",
    "genero": "D",
    "color": "Blanco",
    "descripcion": "Zapatos deportivos blancos para hombres",
    "tipo": "Deportivos",
    "inventario": 14
  },
  {
    "precio": 44.99,
    "talla": "39",
    "modelo": "Zapatos de Fiesta Dorados",
    "genero": "D",
    "color": "Dorado",
    "descripcion": "Elegantes zapatos de fiesta dorados para mujeres",
    "tipo": "Fiesta",
    "inventario": 7
  },
  {
    "precio": 69.99,
    "talla": "43",
    "modelo": "Botas de Montaña Grises",
    "genero": "D",
    "color": "Gris",
    "descripcion": "Botas de montaña grises para hombres",
    "tipo": "Botas",
    "inventario": 9
  },
  {
    "precio": 59.99,
    "talla": "36",
    "modelo": "Zapatos de Tacón Negros",
    "genero": "D",
    "color": "Negro",
    "descripcion": "Elegantes zapatos de tacón negros para mujeres",
    "tipo": "Tacón",
    "inventario": 11
  },
  {
    "precio": 49.99,
    "talla": "40",
    "modelo": "Zapatos Casuales Rojos",
    "genero": "D",
    "color": "Rojo",
    "descripcion": "Zapatos casuales rojos para hombres",
    "tipo": "Casuales",
    "inventario": 5
  },
  {
    "precio": 54.99,
    "talla": "38",
    "modelo": "Zapatos Deportivos Rosados",
    "genero": "H",
    "color": "Rosa",
    "descripcion": "Zapatos deportivos rosados para mujeres",
    "tipo": "Deportivos",
    "inventario": 13
  }
]
;

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  const insertQuery = 'INSERT INTO calzado (precio, talla, modelo, genero, color, descripcion, tipo, inventario) VALUES ?';

  db.query(insertQuery, [calzados.map(Object.values)], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Calzados created successfully');
    }

    // Close the database connection
    db.end();
  });
});
