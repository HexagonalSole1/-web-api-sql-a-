const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('tiendacalzado', 'root', 'HexagonalSole89', {
    host: 'localhost',
    dialect: 'mysql',
  });
  
const Calzado = sequelize.define('Calzado', {
    precio: {
        type: DataTypes.FLOAT, // Usa FLOAT para representar números decimales
        allowNull: false,
    },
    talla: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inventario: {
        type: DataTypes.INTEGER, // Usa INTEGER para números enteros
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true, // Cambia a allowNull: true si no es requerido
        defaultValue: null,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true, // Cambia a allowNull: true si no es requerido
        defaultValue: null,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true, // Cambia a allowNull: true si no es requerido
        defaultValue: null,
    },
}, {
    timestamps: false, // Si no quieres usar las marcas de tiempo de Sequelize
    tableName: 'calzado', // Define el nombre de la tabla
});

module.exports = Calzado;
