const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../upload_pic')),
    filename: (req, file, cb) => {
        const userId = req.user ? req.user.id : 'guest';  // ใช้ 'guest' เมื่อไม่มี req.user
        // const {id} = req.user
        const fullFilename = `${userId}_${Date.now()}_${path.extname(file.originalname)}`
        cb(null, fullFilename)
    }
})

module.exports = multer({ storage: storage })