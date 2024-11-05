const path = require('path')
const multer = require('multer')
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../upload_pic');
        
        // ตรวจสอบว่ามีโฟลเดอร์ upload_pic หรือไม่ ถ้าไม่มีให้สร้างขึ้น
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const { id } = req.user;
        const fullFilename = `${id}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fullFilename);
    }
});

module.exports = multer({ storage: storage });