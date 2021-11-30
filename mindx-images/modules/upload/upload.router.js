const router = require('express').Router();
const multer = require('multer')
const uploadController = require('./upload.controller')

const diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },

    filename: function(req, file, cb) {
        // xử lý chỗ filename => để k bị up đè
        // xử lý chỉ upload ảnh
        cb(null, file.originalname)
    }
});

const memoryStorage = multer.memoryStorage();

const uploadWithMemory = multer({ storage: memoryStorage })
const upload = multer({ storage: diskStorage })

// dù multer cung cấp upload nhiều ảnh 
// api chỉ nên upload 1 ảnh
// client muốn upload nhiều ảnh => gọi nhiều api
router.post('/disk', upload.single('file'), uploadController.uploadToDisk)

router.post('/', uploadWithMemory.single('file'), uploadController.uploadToCloud)

module.exports = router