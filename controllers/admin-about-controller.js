const prisma = require("../configs/prisma");
const cloudinary = require("../configs/cloudinary");
const fs =require("fs/promises")

const adminAboutPageController = {
  // ฟังก์ชันดึงข้อมูล AboutContent
  getAboutContent: async (req, res) => {
    try {

      const aboutContent = await prisma.aboutContent.findMany(); // ใช้ Prisma ดึงข้อมูล
      res.status(200).json(aboutContent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  // ฟังก์ชันอัพเดทข้อมูล AboutContent
  updateAboutContent: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        video_url,
        header_en,
        header_th,
        description_en,
        description_th,
        help_title_en,
        help_title_th,
        help_content_en,
        help_content_th,
        content_en,
        content_th
      } = req.body;

      const files = req.files;
      console.log("file",files)
      
      let updateData = {};
      if (files) {
        const prevImg = await prisma.aboutContent.findFirst({
          where: {
            id: +id
          }
        })
        for(let key in files){
          
          if (prevImg[key].includes("cloudinary")) {
            await cloudinary.uploader.destroy(prevImg[key].match(/\/v\d+\/(.+)\.[a-z]+$/)[1]);
          }
          const imageResult = await cloudinary.uploader.upload(files[key][0].path, {
            folder: "aboutpage",
          });
          updateData[key] = imageResult.secure_url;
          fs.unlink(files[key][0].path)
        }
      }

      // Update all possible fields from schema
      if (video_url) updateData.video_url = video_url;
      if (header_en) updateData.header_en = header_en;
      if (header_th) updateData.header_th = header_th;
      if (description_en) updateData.description_en = description_en;
      if (description_th) updateData.description_th = description_th;
      if (help_title_en) updateData.help_title_en = help_title_en;
      if (help_title_th) updateData.help_title_th = help_title_th;
      if (help_content_en) updateData.help_content_en = help_content_en;
      if (help_content_th) updateData.help_content_th = help_content_th;
      if (content_en) updateData.content_en = content_en;
      if (content_th) updateData.content_th = content_th;

      const updatedContent = await prisma.aboutContent.update({
        where: { id: parseInt(id) },
        data: updateData,
      });

      res.status(200).json(updatedContent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = adminAboutPageController;
