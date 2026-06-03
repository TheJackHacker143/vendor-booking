const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vendor = sequelize.define('Vendor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.ENUM('Catering', 'Photography', 'Decoration', 'Music', 'Venue', 'Other'), allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true });

module.exports = Vendor;
