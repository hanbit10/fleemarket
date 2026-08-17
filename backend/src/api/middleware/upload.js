import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../../config/s3.js";

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const storage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,

    key: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, `product-images/${fileName}`);
    },
  }),

  fileFilter: fileFilter,
}).array("files");

export default storage;
