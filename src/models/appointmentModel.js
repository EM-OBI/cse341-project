const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    patientName: {
      type: String,
      ref: "Patient",
      required: true
    },
    date: {
      type: Date,
      required: true,
      trim: true
    },
    dentist: {
      type: String,
      required: true
    },
    treatment: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled"
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
