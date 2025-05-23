const Appointment = require("../models/appointmentModel");
const createError = require("http-errors");
const httpStatusCodes = require("../utils/httpStatusCodes");
const mongoose = require("mongoose");

async function createAppointment(data) {
  try {
    const existingAppointment = await Appointment.findOne({
      patientId: data.patientId,
      date: data.date,
      time: data.time
    });

    if (existingAppointment) {
      throw createError(httpStatusCodes.CONFLICT, "Appointment already exists");
    }

    const result = await Appointment.create(data);
    return result;
  } catch (error) {
    throw error;
  }
}

async function getAllAppointments() {
  try {
    return await Appointment.find();
  } catch (error) {
    throw createError(httpStatusCodes.INTERNAL_SERVER_ERROR, "Failed to fetch appointments");
  }
}

async function getAppointmentById(id) {
  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      throw createError(httpStatusCodes.NOT_FOUND, "Appointment does not exist");
    }

    return appointment;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, "Invalid appointment ID");
      return;
    }
    throw error;
  }
}

async function updateAppointment(id, data) {
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, data, { new: true });

    if (!appointment) {
      throw createError(httpStatusCodes.NOT_FOUND, "Appointment does not exist");
    }
    return appointment;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, "Invalid appointment ID");
      return;
    }
    throw error;
  }
}
async function deleteAppointment(id) {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      throw createError(httpStatusCodes.NOT_FOUND, "Appointment does not exist");
    }
    return deletedAppointment;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, "Invalid appointment ID");
      return;
    }
    throw error;
  }
}

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
};
