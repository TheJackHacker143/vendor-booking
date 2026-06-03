const { Op } = require('sequelize');
const Vendor = require('../models/Vendor');

exports.getAll = async (req, res) => {
  try {
    const { search, category } = req.query;
    const where = {};
    if (search) where.name = { [Op.like]: `%${search}%` };
    if (category) where.category = category;
    const vendors = await Vendor.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, phone, category, address } = req.body;
    if (!name || !email || !phone || !category || !address)
      return res.status(400).json({ message: 'All fields required' });

    const existing = await Vendor.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const vendor = await Vendor.create({ name, email, phone, category, address });
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    await vendor.update(req.body);
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    await vendor.destroy();
    res.json({ message: 'Vendor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
