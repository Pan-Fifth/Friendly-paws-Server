const prisma = require("../configs/prisma")
const cloudinary = require("../configs/cloudinary")

const eventPageController = {
  getEventBanner: async (req, res) => {
    try {
      const banner = await prisma.eventBanner.findFirst()
      res.status(200).json(banner)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  updateEventBanner: async (req, res) => {
    try {
      const { id } = req.params
      const files = req.files

      let imageUrls = {}

      if (files) {
        for (const [key, file] of Object.entries(files)) {
          const result = await cloudinary.upload(file[0].path)
          imageUrls[key] = result.secure_url
        }
      }

      const updatedBanner = await prisma.eventBanner.update({
        where: { id: parseInt(id) },
        data: {
          image1: imageUrls.image1 || req.body.image1,
          image2: imageUrls.image2 || req.body.image2,
          image3: imageUrls.image3 || req.body.image3
        }
      })

      res.status(200).json(updatedBanner)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = eventPageController
