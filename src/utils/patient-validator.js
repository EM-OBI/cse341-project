const { body, validationResult } = require("express-validator");
const httpStatusCodes = require("./httpStatusCodes");

const patientValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("First name cannot be empty")
      .isString()
      .withMessage("First name must be a string")
      .trim()
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters"),

    body("lastName")
      .notEmpty()
      .withMessage("Last name cannot be empty")
      .isString()
      .withMessage("Last name must be a string")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters"),

    body("email")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid email format"),

    body("phoneNumber")
      .notEmpty()
      .withMessage("Phone number is required")
      .trim()
      .matches(/^\+?[0-9]{7,15}$/)
      .withMessage("Invalid phone number"),

    body("dateOfBirth")
      .notEmpty()
      .withMessage("Date of birth is required")
      .isISO8601()
      .withMessage("Date of birth must be a valid date")
      .toDate(),

    body("address").optional().isString().withMessage("Address must be a string").trim(),

    body("medicalHistory")
      .optional()
      .isArray()
      .withMessage("Medical history must be an array of strings")
      .custom((arr) => arr.every((item) => typeof item === "string"))
      .withMessage("Each medical history entry must be a string")
  ];
};

const validatePatient = (req, res, next) => {
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
  patientValidationRules,
  validatePatient
};
