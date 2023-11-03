const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise'); // Usa 'mysql2/promise' en lugar de 'mysql2'
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = await mysql.createConnection({ // Usa 'await' para crear la conexión
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });

        // Buscar el usuario por correo electrónico
        const query = 'SELECT * FROM usuario WHERE email = ?';
        const [rows] = await db.execute(query, [email]); // Usa 'await' y 'execute' para consultas

        if (rows.length === 0) {
            return res.status(400).json({
                message: "Email o contraseña incorrectos",
            });
        }

        const usuarioEncontrado = rows[0];

        // Verificar la contraseña
        const passwordCorrecto = bcrypt.compareSync(password, usuarioEncontrado.password);

        if (!passwordCorrecto) {
            return res.status(400).json({
                message: "Email o contraseña incorrectos",
            });
        }

        // Generar un token JWT
        const payload = {
            usuario: {
                id: usuarioEncontrado.id,
            },
        };

        const token = jwt.sign(payload, 'mi-palabra-secreta', { expiresIn: '1h' });

        return res.status(200).json({
            message: "Acceso correcto",
            token,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al validar credenciales",
            error: error.message,
        });
    }
};

module.exports = {
    login
};
