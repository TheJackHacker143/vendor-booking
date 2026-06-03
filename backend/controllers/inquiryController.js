const { Op } = require('sequelize');
const Inquiry = require('../models/Inquiry');
const Vendor = require('../models/Vendor');

exports.getAll = async (req, res) => {
  try {
    const { search, status } = req.query;
    const where = {};
    if (search) where.customerName = { [Op.like]: `%${search}%` };
    if (status) where.status = status;
    const inquiries = await Inquiry.findAll({ where, include: [{ model: Vendor, as: 'vendor', attributes: ['name', 'category'] }], order: [['createdAt', 'DESC']] });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id, { include: [{ model: Vendor, as: 'vendor' }] });
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { eventName, customerName, eventDate, vendorId, budget, status } = req.body;
    if (!eventName || !customerName || !eventDate || !vendorId || !budget)
      return res.status(400).json({ message: 'All fields required' });

    const vendor = await Vendor.findByPk(vendorId);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    const inquiry = await Inquiry.create({ eventName, customerName, eventDate, vendorId, budget, status });
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    await inquiry.update(req.body);
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    await inquiry.destroy();
    res.json({ message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalVendors = await Vendor.count();
    const totalInquiries = await Inquiry.count();
    const pending = await Inquiry.count({ where: { status: 'Pending' } });
    const approved = await Inquiry.count({ where: { status: 'Approved' } });
    const rejected = await Inquiry.count({ where: { status: 'Rejected' } });
    res.json({ totalVendors, totalInquiries, pending, approved, rejected });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
