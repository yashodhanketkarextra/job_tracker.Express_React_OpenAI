export const statuses = [
  "Applied",
  "Phone Screen",
  "Interview",
  "Offer",
  "Rejected",
] as const;

export type Status = (typeof statuses)[number];

export interface IApplication {
  _id: string;
  userId: string;
  company: string;
  role: string;
  jdLink?: string;
  notes?: string;
  dateApplied: Date;
  status: Status;
  salaryRange?: string;
  skills?: string[];
}

export interface IUser {
  email: string;
  password: string;
}
