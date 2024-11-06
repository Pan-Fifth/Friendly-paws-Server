const prisma = require("../configs/prisma")

const donationPageController = {
  getDonationContent: async (req, res) => {
    try {
      const content = await prisma.donationContent.findFirst()
      res.status(200).json(content)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  updateDonationContent: async (req, res) => {
    try {
      const { id } = req.params
      const updatedContent = await prisma.donationContent.update({
        where: { id: parseInt(id) },
        data: {
          title_en: req.body.title_en,
          title_th: req.body.title_th,
          description_en: req.body.description_en,
          description_th: req.body.description_th,
          typing_en: req.body.typing_en,
          typing_th: req.body.typing_th,
          form_title_en: req.body.form_title_en,
          form_title_th: req.body.form_title_th,
          form_desc_en: req.body.form_desc_en,
          form_desc_th: req.body.form_desc_th,
          donation_options: req.body.donation_options,
          custom_amount_en: req.body.custom_amount_en,
          custom_amount_th: req.body.custom_amount_th,
          impact_message_en: req.body.impact_message_en,
          impact_message_th: req.body.impact_message_th,
          donate_button_en: req.body.donate_button_en,
          donate_button_th: req.body.donate_button_th,
          close_button_en: req.body.close_button_en,
          close_button_th: req.body.close_button_th
        }
      })
      res.status(200).json(updatedContent)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = donationPageController
