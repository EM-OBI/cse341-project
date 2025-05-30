const router = require("express").Router();
const patientsController = require("../controllers/patientsController");
const { patientValidationRules, validatePatient } = require("../utils/patient-validator");
const { ensureAuthenticated } = require("../middlewares/checkAuth");

router.post(
  "/",
  patientValidationRules(),
  ensureAuthenticated,
  validatePatient,
  patientsController.createPatient
);

router.get("/", patientsController.getAllPatients);

router.get("/:id", patientsController.getPatientById);

router.put(
  "/:id",
  ensureAuthenticated,
  patientValidationRules(),
  validatePatient,
  patientsController.updatePatient
);

router.delete("/:id", ensureAuthenticated, patientsController.deletePatient);

module.exports = router;
