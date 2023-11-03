const apartadoModel = require("../models/apartado.model");
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Controlador para obtener una lista de apartados
const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;

        const [results] = await db.query('SELECT * FROM apartado WHERE deleted = 0 LIMIT ? OFFSET ?', [parseInt(limit), parseInt(skip)]);

        let response = {
            message: "Se obtuvieron los apartados correctamente",
            data: results,
        };

        if (page && limit) {
            const [countResult] = await db.query('SELECT COUNT(*) as total FROM apartado WHERE deleted = 0');
            const totalApartados = countResult[0].total;
            const totalPages = Math.ceil(totalApartados / parseInt(limit));
            const currentPage = parseInt(page);

            response = {
                ...response,
                total: totalApartados,
                totalPages,
                currentPage,
            };
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener los apartados",
            error: error.message,
        });
    }
};

const create = async (req, res) => {
    try {
        const fechaActual = new Date();
        const vigencia = new Date(fechaActual);
        vigencia.setDate(vigencia.getDate() + 3);

        const insertQuery = 'INSERT INTO apartado (fecha, clienteID, vigencia, created_at, deleted) VALUES (?, ?, ?, ?, ?)';
        const values = [fechaActual, req.body.clienteId, vigencia, fechaActual, false];

        const [result] = await db.execute(insertQuery, values);

        if (result.affectedRows === 1) {
            return res.status(201).json({
                message: "Apartado creado exitosamente!",
            });
        } else {
            return res.status(500).json({
                message: "Falló al crear el apartado. No se pudo insertar el registro.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Falló al crear el apartado.",
            error: error.message,
        });
    }
};



// Controlador para realizar un borrado lógico de un apartado
const deleteLogico = async (req, res) => {
    try {
        const apartadoId = req.params.id;
        const [apartadoEliminado] = await db.execute(
            'UPDATE apartado SET deleted = 1, deleted_at = NOW() WHERE apartado_id = ?',
            [apartadoId]
        );

        if (apartadoEliminado.affectedRows === 0) {
            return res.status(404).json({
                message: "Apartado no encontrado",
            });
        }

        return res.status(200).json({
            message: "Apartado eliminado exitosamente",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al eliminar el apartado",
            error: error.message,
        });
    }
};

// Controlador para realizar una actualización parcial de un apartado
const updateParcial = async (req, res) => {
    try {
        const apartadoId = req.params.id;
        const datosActualizar = {
            ...req.body,
            updated_at: new Date().toISOString(),
        };

        const [apartadoActualizado] = await db.execute(
            'UPDATE apartado SET ? WHERE apartado_id = ?',
            [datosActualizar, apartadoId]
        );

        if (apartadoActualizado.affectedRows === 0) {
            return res.status(404).json({
                message: "Apartado no encontrado",
            });
        }

        return res.status(200).json({
            message: "Apartado actualizado exitosamente",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al editar el apartado",
            error: error.message,
        });
    }
};

module.exports = {
    index,
    create,
    deleteLogico,
    updateParcial
};
