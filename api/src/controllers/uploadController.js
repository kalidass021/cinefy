import multer from 'multer';
import fileFilter from '../utils/fileFilter.js';
import multerStorage from '../utils/multerStorage.js';
import error from '../utils/error.js';

// initialize multer with storage, and fileFilter configuration
// multer expects storage and fileFilter keywords
const upload = multer({ storage: multerStorage, fileFilter });
const uploadSingleImage = upload.single('image');

export const uploadImage = (req, res, next) => {
  try {
    uploadSingleImage(req, res, (err) => {
      if (err) {
        console.error(`Error during image upload ${err}`);
        return next(err);
      }

      if (!req.file) {
        // handle case where no file is provided
        return next(error(400, 'No image file provided'));
      }

      res.status(200).json({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
      });
    });
  } catch (err) {
    console.error(`Unexpected error during image upload ${err}`);
    next(err);
  }
};
