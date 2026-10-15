import { getProfile, updateProfile } from '../data/dbStore.js';

export const getProfileData = async (req, res) => {
  try {
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
