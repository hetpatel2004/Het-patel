import Service, { defaultServices } from '../models/Service.js';
import { getDbStatus } from '../config/db.js';

export const getServices = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const count = await Service.countDocuments();
      if (count === 0) {
        await Service.insertMany(defaultServices);
      }
      const services = await Service.find().sort({ order: 1 });
      return res.status(200).json({ success: true, count: services.length, data: services });
    } else {
      return res.status(200).json({ success: true, count: defaultServices.length, data: defaultServices });
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(200).json({ success: true, count: defaultServices.length, data: defaultServices });
  }
};
