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
        for (let i = 1; i <= 4; i++) {
          const imageKey = `image${i}`
          if (files[imageKey]) {
            const imageResult = await cloudinary.uploader.upload(files[imageKey][0].path, {
              folder: "homepage",
              transformation: [
                { width: 1920, height: 1080, crop: "fill" },
                { quality: "auto" }
              ]
            })
            updateData[imageKey] = imageResult.secure_url
          }
        }
      }

      // Add content updates if provided
      if (content_en) updateData.content_en = content_en
      if (content_th) updateData.content_th = content_th

      // Validate content format
      if (content_en && !content_en.includes('|') || content_th && !content_th.includes('|')) {
        return res.status(400).json({ message: "Content must contain section separators (|)" })
      }

      const updatedContent = await prisma.homeContent.update({
        where: { id: parseInt(id) },
        data: updateData,
        select: {
          id: true,
          image1: true,
          image2: true,
          image3: true,
          image4: true,
          content_en: true,
          content_th: true
        }
      })

      res.status(200).json({
        message: "Home content updated successfully",
        data: updatedContent
      })
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to update home content",
        error: error.message 
      })
    }
}


   
}

module.exports = adminHomePageController
