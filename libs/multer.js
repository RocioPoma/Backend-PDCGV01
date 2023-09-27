const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads/documents')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${Date.now()}-${file.originalname}`)
  },
  
});

module.exports = multer({ storage: storage })