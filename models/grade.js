const mongoose = require("mongoose")

const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    grade: { type: Number, min: 0, max: 100, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  });
  
  module.exports = mongoose.model("Grade", gradeSchema);
  