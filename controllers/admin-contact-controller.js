const prisma = require("../configs/prisma");
const cloudinary = require("../configs/cloudinary");

const adminContactController = {
  // ฟังก์ชันดึงข้อมูล ContactInfo
  getContactInfo: async (req, res) => {
    try {
      const contactInfo = await prisma.contactInfo.findMany(); // ดึงข้อมูล ContactInfo
      res.status(200).json(contactInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  // ฟังก์ชันอัพเดทข้อมูล ContactInfo
  updateContactInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        header_en,
        header_th,
        content_en,
        content_th,
        generalInfo_en,
        generalInfo_th,
        email,
        phone,
        openingTimes_en,
        openingTimes_th,
        address_en,
        address_th,
        latitude,
        longitude
      } = req.body;
  
      let updateData = {};
  
      // Map all fields to updateData if they exist
      if (header_en) updateData.header_en = header_en;
      if (header_th) updateData.header_th = header_th;
      if (content_en) updateData.content_en = content_en;
      if (content_th) updateData.content_th = content_th;
      if (generalInfo_en) updateData.generalInfo_en = generalInfo_en;
      if (generalInfo_th) updateData.generalInfo_th = generalInfo_th;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (openingTimes_en) updateData.openingTimes_en = openingTimes_en;
      if (openingTimes_th) updateData.openingTimes_th = openingTimes_th;
      if (address_en) updateData.address_en = address_en;
      if (address_th) updateData.address_th = address_th;
      if (latitude) updateData.latitude = latitude;
      if (longitude) updateData.longitude = longitude;
  
      const updatedContactInfo = await prisma.contactInfo.update({
        where: { id: parseInt(id) },
        data: updateData,
      });
  
      res.status(200).json(updatedContactInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }  
};

module.exports = adminContactController;
