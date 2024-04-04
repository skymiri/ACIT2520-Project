const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/checkAuth");
const reminderController = require("../controller/reminder_controller");
const authController = require("../controller/auth_controller");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/reminder", ensureAuthenticated, reminderController.list);
router.get("/reminder/new", ensureAuthenticated, reminderController.new);
router.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
router.post("/reminder/", ensureAuthenticated, reminderController.create);
router.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

// ⭐ Implement these two routes below!
router.post(
  "/reminder/update/:id",
  ensureAuthenticated,
  reminderController.update
);
router.post(
  "/reminder/delete/:id",
  ensureAuthenticated,
  reminderController.delete
);

module.exports = router;
