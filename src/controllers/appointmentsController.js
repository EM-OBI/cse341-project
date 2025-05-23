const appointmentService = require("../services/appointmentService");
const patientService = require("../services/patientService");
const httpStatusCodes = require("../utils/httpStatusCodes");

async function createAppointment(req, res, next) {
  const id = req.body.patientId;
  const patient = await patientService.getPatientById(id);

  if (!patient) {
    return res
      .status(httpStatusCodes.BAD_REQUEST)
      .json({ error: "Patient does not exist. Please create patient first." });
  }

  const appointment = {
    patientId: patient._id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    date: req.body.date,
    dentist: req.body.dentist,
    treatment: req.body.treatment,
    status: req.body.status,
    notes: req.body.notes
  };

  try {
    await appointmentService.createAppointment(appointment);
    res.status(httpStatusCodes.CREATED).send();
  } catch (error) {
    next(error);
  }
}

async function getAllAppointments(req, res, next) {
  try {
    const appointments = await appointmentService.getAllAppointments();

    res.setHeader("Content-Type", "application/json");
    res.status(httpStatusCodes.OK).json(appointments);
  } catch (error) {
    next(error);
  }
}

async function getAppointmentById(req, res, next) {
  const id = req.params.id;

  try {
    const appointment = await appointmentService.getAppointmentById(id);
    res.setHeader("Content-Type", "application/json");
    res.status(httpStatusCodes.OK).json(appointment);
  } catch (error) {
    next(error);
  }
}

async function updateAppointment(req, res, next) {
  const id = req.params.id;
  const patientId = req.body.patientId;
  const patient = await patientService.getPatientById(patientId);

  const appointment = {
    patientId: patientId,
    patientName: `${patient.firstName} ${patient.lastName}`,
    date: req.body.date,
    dentist: req.body.dentist,
    treatment: req.body.treatment,
    status: req.body.status,
    notes: req.body.notes
  };

  try {
    await appointmentService.updateAppointment(id, appointment);
    res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
}

async function deleteAppointment(req, res, next) {
  const id = req.params.id;

  try {
    await appointmentService.deleteAppointment(id);
    res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
};
