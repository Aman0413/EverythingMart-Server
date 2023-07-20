const router = require("express").Router();
const {
  getAllOrders,
  uploadCSVFile,
  getDataByOrderId,
} = require("../controllers/Orders");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

router.get("/getAllOrders", getAllOrders);
router.post("/uploadFile", upload.single("csvFile"), uploadCSVFile);
router.get("/getData", getDataByOrderId);

module.exports = router;
