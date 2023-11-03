const mysql = require('mysql2');
const calzadoModel = require('../models/calzado.model');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Obtener todos los calzados
const index = (req, res) => {
    try {
        const { page, limit } = req.query;
        const offset = (page - 1) * limit;

        const query = `SELECT * FROM calzado WHERE deleted = 0 LIMIT ?, ?`;
        const values = [offset, parseInt(limit)];

        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Ocurrió un error al obtener los calzados",
                    error: err.message,
                });
            }

            const response = {
                message: "Se obtuvieron los calzados correctamente",
                data: results,
            };

            if (page && limit) {
                const totalQuery = 'SELECT COUNT(*) AS total FROM calzado WHERE deleted = 0';
                db.query(totalQuery, (totalErr, totalResults) => {
                    if (totalErr) {
                        return res.status(500).json({
                            message: "Ocurrió un error al obtener el total de calzados",
                            error: totalErr.message,
                        });
                    }

                    const totalCalzados = totalResults[0].total;
                    const totalPages = Math.ceil(totalCalzados / parseInt(limit));
                    const currentPage = parseInt(page);

                    response.total = totalCalzados;
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
            message: "Ocurrió un error al obtener los calzados",
            error: error.message,
        });
    }
};

// Crear un calzado
const create = (req, res) => {
    const {
        precio,
        talla,
        modelo,
        genero,
        color,
        descripcion,
        tipo,
        inventario,
    } = req.body;

    const query = 'INSERT INTO calzado (precio, talla, modelo, genero, color, descripcion, tipo, inventario,created_at,deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)';

    const values = [precio, talla, modelo, genero, color, descripcion, tipo, inventario,new Date(),false];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Falló al crear el calzado",
                error: err.message,
            });
        }

        return res.status(201).json({
            message: "Calzado creado exitosamente",
        });
    });
};

// Actualizar un calzado parcialmente
const updateParcial = (req, res) => {
    const calzadoId = req.params.id;
    const data = { ...req.body, updated_at: new Date() };

    const query = 'UPDATE calzado SET ? WHERE productoID = ? AND deleted = 0';
    const values = [data, calzadoId];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Ocurrió un error al editar el calzado",
                error: err.message,
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "Calzado no encontrado",
            });
        }

        return res.status(200).json({
            message: "Calzado actualizado exitosamente",
        });
    });
};

// Eliminar un calzado lógicamente
const deleteLogico = (req, res) => {
    const calzadoId = req.params.id;
    const query = 'UPDATE calzado SET deleted = 1, deleted_at = ? WHERE productoID = ? AND deleted = 0';
    const values = [new Date(), calzadoId];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Ocurrió un error al eliminar el calzado",
                error: err.message,
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "Calzado no encontrado",
            });
        }

        return res.status(200).json({
            message: "Calzado eliminado exitosamente",
        });
    });
};

module.exports = {
    index,
    create,
    delete: deleteLogico,
    updateParcial,
};
