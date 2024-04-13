const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../middleware/checkAuth");
const reminderController = require("../controller/reminder_controller");

router.get("/", forwardAuthenticated, reminderController.home);
router.get("/reminder/home", ensureAuthenticated, reminderController.home);

router.get("/reminder", ensureAuthenticated, reminderController.list);
router.get("/reminder/new", ensureAuthenticated, reminderController.new);
router.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
router.post("/reminder/", ensureAuthenticated, reminderController.create);
router.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

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

router.get("/session/:id", ensureAuthenticated, reminderController.destroy);

module.exports = router;
