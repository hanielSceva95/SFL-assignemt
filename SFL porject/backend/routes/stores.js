const express = require("express");
const router = express.Router();
const storesController = require("../controllers/storesController");

router.post("/stores", storesController.find);

router.post("/fetchLLData", storesController.fetchLLData);

router.post("/fetchZoomData", storesController.fetchZoomData);

router.get("/fetchStoreDetails/:id", storesController.view);

module.exports = router;
