import mongoose from 'mongoose';
import { type } from 'os';

const BadgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  lev: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true // Enable createdAt and updatedAt fields
});

const BadgeGroupSchema = new mongoose.Schema({
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
  badgets: [BadgeSchema], // Make sure 'badgets' is intentional and not a typo for 'badges'
}, {
  timestamps: true // Enable createdAt and updatedAt fields
});

// Avoid overwriting the model if it already exists
const BadgeGroup = mongoose.models.BadgeGroup || mongoose.model('BadgeGroup', BadgeGroupSchema);

export default BadgeGroup;