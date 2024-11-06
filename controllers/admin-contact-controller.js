const prisma = require("../configs/prisma")
const cloudinary = require("../configs/cloudinary")

const contactPageController = {
  getContact: async (req, res) => {
    try {
      const contact = await prisma.contact.findMany()
      res.status(200).json(contact)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}