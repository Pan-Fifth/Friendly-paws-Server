const prisma = require("../configs/prisma")
const cloudinary = require("../configs/cloudinary")


const adminPageController = {
  getHomeContent: async (req, res) => {
    try {
      const homeContent = await prisma.homeContent.findMany()
      res.status(200).json(homeContent)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  createHomeContent: async (req, res) => {
    try {
      const { content_en, content_th } = req.body
      const files = req.files
    console.log("==============",files)
      // Upload images to Cloudinary
      const image1Result = await cloudinary.uploader.upload(files.image1[0].path, {
        folder: "homepage"
      })
      const image2Result = await cloudinary.uploader.upload(files.image2[0].path, {
        folder: "homepage"
      })
      const image3Result = await cloudinary.uploader.upload(files.image3[0].path, {
        folder: "homepage"
      })

      const newContent = await prisma.homeContent.create({
        data: {
          image1: image1Result.secure_url,
          image2: image2Result.secure_url,
          image3: image3Result.secure_url,
          content_en,
          content_th
        }
      })

      res.status(201).json(newContent)
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

  deleteHomeContent: async (req, res) => {
    try {
      const { id } = req.params

      const content = await prisma.homeContent.findUnique({
        where: { id: parseInt(id) }
      })

      if (content) {
        // Delete all three images from Cloudinary
        for (const imageField of ['image1', 'image2', 'image3']) {
          const publicId = content[imageField].split('/').slice(-1)[0].split('.')[0]
          await cloudinary.uploader.destroy(`homepage/${publicId}`)
        }

        await prisma.homeContent.delete({
          where: { id: parseInt(id) }
        })

        res.status(200).json({ message: "Content deleted successfully" })
      } else {
        res.status(404).json({ message: "Content not found" })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = adminPageController
