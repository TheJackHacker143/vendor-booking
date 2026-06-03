const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vendor = require('./Vendor');

const Inquiry = sequelize.define('Inquiry', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  eventName: { type: DataTypes.STRING, allowNull: false },
  customerName: { type: DataTypes.STRING, allowNull: false },
  eventDate: { type: DataTypes.DATEONLY, allowNull: false },
  vendorId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Vendor, key: 'id' } },
  budget: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' },
}, { timestamps: true });

Inquiry.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' });
Vendor.hasMany(Inquiry, { foreignKey: 'vendorId', as: 'inquiries' });

module.exports = Inquiry;
