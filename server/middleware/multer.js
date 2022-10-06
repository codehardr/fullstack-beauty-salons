import multer from 'multer'
import { access, mkdir } from 'fs/promises'

const uploadFolder = './uploads'

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      await access(uploadFolder)
    } catch {
      await mkdir(uploadFolder)
    }
    cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split('.')
    ext = ext[ext.length - 1]
    const uniqueSuffix = String(Date.now()) + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '.' + ext)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, next) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif'
    ) {
      next(null, true)
    } else {
      next(null, false)
    }
  },
})

export default upload
