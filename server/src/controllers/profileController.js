import { getProfile, updateProfile } from '../data/dbStore.js';
import Profile from '../models/Profile.js';
import { getDbStatus } from '../config/db.js';

export const getProfileData = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      try {
        const dbProfile = await Profile.findOne().sort({ updatedAt: -1 });
        if (dbProfile) {
          return res.status(200).json({
            success: true,
            data: {
              name: dbProfile.name,
              title: dbProfile.title,
              subtitle: dbProfile.subtitle,
              bio: dbProfile.bio,
              email: dbProfile.email,
              phone: dbProfile.phone,
              location: dbProfile.location,
              availability: dbProfile.availability,
              github: dbProfile.github,
              linkedin: dbProfile.linkedin,
              whatsapp: dbProfile.whatsapp,
              education: dbProfile.education || [],
            },
          });
        }
      } catch (dbErr) {
        console.warn('[MongoDB Profile Fetch Warning]', dbErr.message);
      }
    }

    const profile = getProfile();
    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};

export const updateProfileData = async (req, res) => {
  try {
    const updated = updateProfile(req.body);

    const { connected } = getDbStatus();
    if (connected) {
      try {
        const existing = await Profile.findOne();
        if (existing) {
          await Profile.findByIdAndUpdate(existing._id, req.body);
        } else {
          await Profile.create(req.body);
        }
      } catch (dbErr) {
        console.warn('[MongoDB Profile Update Warning]', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Profile details updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};
