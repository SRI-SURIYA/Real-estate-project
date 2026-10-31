const Property = require('../models/Property');

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch properties.' });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch property.' });
  }
};

const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Property creation failed.' });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProperty);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Property update failed.' });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    await property.deleteOne();
    res.json({ message: 'Property removed successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Property deletion failed.' });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
