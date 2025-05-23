const router = require("express").Router();
const patientsController = require("../controllers/patientsController");
const { patientValidationRules, validatePatient } = require("../utils/patient-validator");

router.post("/", patientValidationRules(), validatePatient, patientsController.createPatient);

router.get("/", patientsController.getAllPatients);

router.get("/:id", patientsController.getPatientById);

router.put("/:id", patientValidationRules(), validatePatient, patientsController.updatePatient);

router.delete("/:id", patientsController.deletePatient);

module.exports = router;
