const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/grievanceController");

router.post("/", auth, ctrl.create);
router.get("/", auth, ctrl.getAll);
router.get("/search", auth, ctrl.search);
router.get("/:id", auth, ctrl.getById);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.delete);

module.exports = router;