import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    shortLabel: { type: String, default: '' },
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
export default Skill;
