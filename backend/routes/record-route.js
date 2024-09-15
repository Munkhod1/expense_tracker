const { Router } = require("express");
const {
  getAllRecord,
  getInfo,
  getChartData,
  createRecord,
} = require("../controllers/record-controller");

const router = Router();

router.route("/info").get(getInfo);
router.route("/chart").get(getChartData);
router.route("/").get(getAllRecord).post(createRecord);
//энд auth, нэмж бичих үед сервер унтарч байна
module.exports = router;
