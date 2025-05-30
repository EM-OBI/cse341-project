const router = require("express").Router();
const appointmentsController = require("../controllers/appointmentsController");
const {
  appointmentValidationRules,
  validateAppointment
} = require("../utils/appointment-validator");
const { ensureAuthenticated } = require("../middlewares/checkAuth");

router.post(
  "/",
  ensureAuthenticated,
  appointmentValidationRules(),
  validateAppointment,
  appointmentsController.createAppointment
);

router.get("/", ensureAuthenticated, appointmentsController.getAllAppointments);

router.get("/:id", appointmentsController.getAppointmentById);

router.put(
  "/:id",
  ensureAuthenticated,
  appointmentValidationRules(),
  validateAppointment,
  appointmentsController.updateAppointment
);

router.delete("/:id", ensureAuthenticated, appointmentsController.deleteAppointment);

module.exports = router;
