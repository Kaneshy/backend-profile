import mongoose from 'mongoose';

const StickerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  lev: {
    type: Number,
  }
}, {
  timestamps: true // Enable createdAt and updatedAt fields
});

const StickerGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  privacy: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  badgets: [StickerSchema], // Make sure 'badgets' is intentional and not a typo for 'badges'
}, {
  timestamps: true // Enable createdAt and updatedAt fields
});

// Avoid overwriting the model if it already exists
const StickerGroup = mongoose.models.StickerGroup || mongoose.model('StickerGroup', StickerGroupSchema);

export default StickerGroup;