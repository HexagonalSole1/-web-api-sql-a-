const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const apartados = [
    {
        fecha: '2023-11-02 14:00:00',
        clienteId: '1',
        vigencia: '2023-11-05 14:00:00',
    },
    {
        fecha: '2023-11-03 10:30:00',
        clienteId: '2',
        vigencia: '2023-11-06 10:30:00',
    },
    {
        fecha: '2023-11-04 16:45:00',
        clienteId: '3',
        vigencia: '2023-11-07 16:45:00',
    },
    {
        fecha: '2023-11-05 12:15:00',
        clienteId: '4',
        vigencia: '2023-11-08 12:15:00',
    },
    {
        fecha: '2023-11-06 08:30:00',
        clienteId: '5',
        vigencia: '2023-11-09 08:30:00',
    },
    {
        fecha: '2023-11-07 17:20:00',
        clienteId: '6',
        vigencia: '2023-11-10 17:20:00',
    },
    {
        fecha: '2023-11-08 09:45:00',
        clienteId: '7',
        vigencia: '2023-11-11 09:45:00',
    },
    {
        fecha: '2023-11-09 15:30:00',
        clienteId: '8',
        vigencia: '2023-11-12 15:30:00',
    },
    {
        fecha: '2023-11-10 11:10:00',
        clienteId: '9',
        vigencia: '2023-11-13 11:10:00',
    },
    {
        fecha: '2023-11-11 14:45:00',
        clienteId: '10',
        vigencia: '2023-11-14 14:45:00',
    },
];

const insertApartados = () => {
    const insertQuery = 'INSERT INTO apartado (fecha, clienteId, vigencia) VALUES (?, ?, ?)';

    apartados.forEach((apartado) => {
        db.query(insertQuery, [apartado.fecha, apartado.clienteId, apartado.vigencia], (err, result) => {
            if (err) {
                console.error(err);
            }
        });
    });

    db.end(); // Cierra la conexión después de insertar los datos
};

insertApartados();
