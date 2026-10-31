const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['House', 'Apartment', 'Villa', 'Commercial', 'Land'], default: 'House' },
    bedrooms: { type: Number, default: 1 },
    bathrooms: { type: Number, default: 1 },
    area: { type: Number, default: 0 },
    image: { type: String, default: 'https://images.unsplash.com/' },
    status: { type: String, enum: ['For Sale', 'For Rent', 'Featured'], default: 'For Sale' },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
