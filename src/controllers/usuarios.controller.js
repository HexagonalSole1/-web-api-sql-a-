const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Obtener todos los usuarios
const index = (req, res) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const query = `SELECT * FROM usuario WHERE deleted = 0 LIMIT ?, ?`;
    const values = [offset, parseInt(limit)];

    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Ocurrió un error al obtener los usuarios",
          error: err.message,
        });
      }

      const response = {
        message: "Se obtuvieron los usuarios correctamente",
        data: results,
      };

      if (page && limit) {
        const totalQuery = 'SELECT COUNT(*) AS total FROM usuario WHERE deleted = 0';
        db.query(totalQuery, (totalErr, totalResults) => {
          if (totalErr) {
            return res.status(500).json({
              message: "Ocurrió un error al obtener el total de usuarios",
              error: totalErr.message,
            });
          }

          const totalUsuarios = totalResults[0].total;
          const totalPages = Math.ceil(totalUsuarios / parseInt(limit));
          const currentPage = parseInt(page);

          response.total = totalUsuarios;
          response.totalPages = totalPages;
          response.currentPage = currentPage;

          return res.status(200).json(response);
        });
      } else {
        return res.status(200).json(response);
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrió un error al obtener los usuarios",
      error: error.message,
    });
  }
};

// Obtener un usuario por ID
const getById = (req, res) => {
  const usuarioId = req.params.id;
  const query = 'SELECT * FROM usuario WHERE clienteId = ? AND deleted = 0';
  const values = [usuarioId];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Ocurrió un error al obtener el usuario",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      message: "Usuario obtenido exitosamente",
      usuario: results[0],
    });
  });
};

// Actualizar un usuario parcialmente
const updateParcial = (req, res) => {
  const usuarioId = req.params.id;
  const data = { ...req.body, updated_at: new Date() };

  const query = 'UPDATE usuario SET ? WHERE clienteID = ? AND deleted = 0';
  const values = [data, usuarioId];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Ocurrió un error al editar el usuario",
        error: err.message,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
    });
  });
};

// Crear un usuario
const create = (req, res) => {
  const usuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, saltRounds),
    rol: req.body.rol,
    created_at: new Date(),
    deleted:false,
  };

  const query = 'INSERT INTO usuario SET ?';

  db.query(query, usuario, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Falló al crear el usuario",
        error: err.message,
      });
    }

    return res.status(201).json({
      message: "Usuario creado exitosamente",
    });
  });
};

// Eliminar un usuario lógicamente
const deleteLogico = (req, res) => {
  const usuarioId = req.params.id;
  const query = 'UPDATE usuario SET deleted = 1, deleted_at = ? WHERE clienteID = ? AND deleted = 0';
  const values = [new Date(), usuarioId];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Ocurrió un error al eliminar el usuario",
        error: err.message,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      message: "Usuario eliminado exitosamente",
    });
  });
};

module.exports = {
  index,
  getById,
  create,
  delete: deleteLogico,
  updateParcial,
};
