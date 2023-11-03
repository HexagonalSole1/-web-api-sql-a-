const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tiendacalzado', 'root', 'HexagonalSole89', {
    host: 'localhost',
    dialect: 'mysql',
  });
  
const Apartado = sequelize.define('apartado', {
  fecha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clienteId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vigencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Usar DataTypes.NOW para la fecha actual
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'apartado',
  timestamps: false, // Si no quieres usar las marcas de tiempo de Sequelize
});

module.exports = Apartado;
 