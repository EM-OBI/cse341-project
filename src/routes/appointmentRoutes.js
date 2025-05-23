const router = require("express").Router();
const appointmentsController = require("../controllers/appointmentsController");
const {
  appointmentValidationRules,
  validateAppointment
} = require("../utils/appointment-validator");

router.post(
  "/",
  appointmentValidationRules(),
  validateAppointment,
  appointmentsController.createAppointment
);

router.get("/", appointmentsController.getAllAppointments);

router.get("/:id", appointmentsController.getAppointmentById);

router.put(
  "/:id",
  appointmentValidationRules(),
  validateAppointment,
  appointmentsController.updateAppointment
);

router.delete("/:id", appointmentsController.deleteAppointment);

module.exports = router;
