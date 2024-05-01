import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  course: { type: String, required: true, trim: true },
  hobby: { type: String, trim: true },
  admissionDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false, index: true },
  isDeletedAt: { type: Date, default: null },
});
