const { body, validationResult } = require("express-validator");
const httpStatusCodes = require("./httpStatusCodes");

const appointmentValidationRules = () => [
  // Validate patientId as a valid MongoDB ObjectId
  body("patientId")
    .notEmpty()
    .withMessage("Patient ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid patient ID"),

  // Validate patientName
  body("patientName")
    .notEmpty()
    .withMessage("Patient name is required")
    .isString()
    .withMessage("Patient name must be a string")
    .trim(),

  // Validate date
  body("date")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Date must be a valid ISO date"),

  // Validate dentist
  body("dentist")
    .notEmpty()
    .withMessage("Dentist name is required")
    .isString()
    .withMessage("Dentist name must be a string")
    .trim(),

  // Validate treatment
  body("treatment")
    .notEmpty()
    .withMessage("Treatment is required")
    .isString()
    .withMessage("Treatment must be a string")
    .trim(),

  // Validate status (optional but must match enum if provided)
  body("status")
    .optional()
    .isIn(["Scheduled", "Completed", "Cancelled"])
    .withMessage("Status must be either Scheduled, Completed, or Cancelled"),

  // Validate notes (optional)
  body("notes").optional().isString().withMessage("Notes must be a string").trim()
];

const validateAppointment = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(httpStatusCodes.BAD_REQUEST).json({
    errors: extractedErrors
  });
};

module.exports = {
  appointmentValidationRules,
  validateAppointment
};
