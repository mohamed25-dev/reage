const multer = require('multer');

// Multer Config
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },

  filename: (req, file, cb) => {
    let image;
    const ext = file.mimetype.split('/')[1];

    cb(null, `image-${new Date().getTime()}-.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ErrorHandler(400, 'رجاء رفع الصور فقط'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload.fields([
  { name: 'image', maxCount: 1 },
]);
