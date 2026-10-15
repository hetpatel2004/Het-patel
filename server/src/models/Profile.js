import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Het Patel' },
    title: { type: String, default: 'Full Stack MERN Developer & Web Engineer' },
    subtitle: { type: String, default: '' },
    bio: { type: String, default: '' },
    email: { type: String, default: 'hetpatel2004hp@gmail.com' },
    phone: { type: String, default: '+91 97274 76950' },
    location: { type: String, default: 'Ahmedabad, Gujarat, India' },
    availability: { type: String, default: 'Available for Freelance & Contract Work • 2026' },
    github: { type: String, default: 'https://github.com/hetpatel2004' },
    linkedin: { type: String, default: 'https://linkedin.com/in/het-patel-0a158b22a' },
    whatsapp: { type: String, default: 'https://wa.me/919727476950' },
    education: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
export default Profile;
