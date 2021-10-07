const multer = require('multer');
const makeError = require('http-errors');

// Multer Config
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];

    cb(null, `image-${new Date().getTime()}-.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(makeError(400, 'رجاء رفع الصور فقط'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload.fields([
  { name: 'image', maxCount: 1 },
]);
