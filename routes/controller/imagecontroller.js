import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, new Date() + "--" + file.originalname);
  },
});

// filtering files using image type

const fileFilter = (req, file, callback) => {
  // reject a file

  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg " || 
    file.mimetype == "application/pdf" ||
    file.mimetype == "application/photoshop"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// uploading  middleware

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  fileFilter: fileFilter,
});

// let upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload.single("demo");
