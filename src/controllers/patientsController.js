const patientService = require("../services/patientService");
const httpStatusCodes = require("../utils/httpStatusCodes");

async function createPatient(req, res, next) {
  const patient = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address,
    medicalHistory: req.body.medicalHistory
  };
  try {
    await patientService.createPatient(patient);
    res.status(httpStatusCodes.CREATED).send();
  } catch (error) {
    next(error);
  }
}

async function getAllPatients(req, res, next) {
  try {
    const patients = await patientService.getAllPatients();
    res.setHeader("Content-Type", "application/json");
    res.status(httpStatusCodes.OK).json(patients);
  } catch (error) {
    next(error);
  }
}

async function getPatientById(req, res, next) {
  const id = req.params.id;

  try {
    const patient = await patientService.getPatientById(id);
    res.setHeader("Content-Type", "application/json");
    res.status(httpStatusCodes.OK).json(patient);
  } catch (error) {
    next(error);
  }
}

async function updatePatient(req, res, next) {
  const id = req.params.id;

  const patient = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address,
    medicalHistory: req.body.medicalHistory
  };

  try {
    await patientService.updatePatient(id, patient);
    res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
}

async function deletePatient(req, res, next) {
  const id = req.params.id;

  try {
    await patientService.deletePatient(id);
    res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
};
