const prisma = require("../configs/prisma")
const cloudinary = require("../configs/cloudinary")


const adminHomePageController = {
  getHomeContent: async (req, res) => {
    try {
      const homeContent = await prisma.homeContent.findMany()
      res.status(200).json(homeContent)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  updateHomeContent: async (req, res) => {
    try {
      const { id } = req.params
      const { content_en, content_th } = req.body
      const files = req.files

      let updateData = {}

      // Handle image uploads if provided
      if (files) {
        if (files.image1) {
          const image1Result = await cloudinary.uploader.upload(files.image1[0].path, {
            folder: "homepage"
          })
          updateData.image1 = image1Result.secure_url
        }
        if (files.image2) {
          const image2Result = await cloudinary.uploader.upload(files.image2[0].path, {
            folder: "homepage"
          })
          updateData.image2 = image2Result.secure_url
        }
        if (files.image3) {
          const image3Result = await cloudinary.uploader.upload(files.image3[0].path, {
            folder: "homepage"
          })
          updateData.image3 = image3Result.secure_url
        }
      }

      // Add content updates if provided
      if (content_en) updateData.content_en = content_en
      if (content_th) updateData.content_th = content_th

      const updatedContent = await prisma.homeContent.update({
        where: { id: parseInt(id) },
        data: updateData
      })

      res.status(200).json(updatedContent)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

   
}

module.exports = adminHomePageController
