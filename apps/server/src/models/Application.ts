import mongoose from "mongoose";

export type Status =
  | "Applied"
  | "Phone Screen"
  | "Interview"
  | "Offer"
  | "Rejected";

interface IApplication {
  userId: string;
  company: string;
  role: string;
  jdLink?: string;
  notes?: string;
  dateApplied: Date;
  status: Status;
  salaryRange?: string;
}

const schema = new mongoose.Schema<IApplication>(
  {
    userId: { type: String, required: true },
    company: String,
    role: String,
    jdLink: String,
    notes: String,
    dateApplied: Date,
    status: { type: String, default: "Applied" },
    salaryRange: String,
  },
  {
    timestamps: true,
  },
);

export const Application = mongoose.model("Application", schema);
