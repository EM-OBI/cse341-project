const Patient = require("../models/patientModel");
const createError = require("http-errors");
const httpStatusCodes = require("../utils/httpStatusCodes");
const mongoose = require("mongoose");

async function createPatient(data) {
  try {
    const existingPatient = await Patient.findOne({
      $or: [{ email: data.email }, { phoneNumber: data.phoneNumber }]
    });

    if (existingPatient) {
      throw createError(
        httpStatusCodes.CONFLICT,
        "Patient already exists with this email or phone number"
      );
    }

    const result = await Patient.create(data);
    return result;
  } catch (error) {
    throw error;
  }
}

async function getAllPatients() {
  try {
    return await Patient.find();
  } catch (error) {
    throw createError(httpStatusCodes.INTERNAL_SERVER_ERROR, "Failed to fetch patients");
  }
}

async function getPatientById(id) {
  try {
    const patient = await Patient.findById(id);

    if (!patient) {
      throw createError(httpStatusCodes.NOT_FOUND, "Patient does not exist");
    }

    return patient;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, "Invalid patient ID");
      return;
    }
    throw error;
  }
}

//Update Patient by ID
async function updatePatient(id, data) {
  try {
    const patient = await Patient.findByIdAndUpdate(id, data, { new: true });

    if (!patient) {
      throw createError(httpStatusCodes.NOT_FOUND, "Patient does not exist");
    }

    return patient;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, "Invalid patient ID");
      return;
    }
    throw error;
  }
}

async function deletePatient(id) {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      throw createError(httpStatusCodes.NOT_FOUND, "Patient does not exist");
    }
    return deletedPatient;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, "Invalid patient ID");
      return;
    }
    throw error;
  }
}

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
};
