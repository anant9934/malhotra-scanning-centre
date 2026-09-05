import { z } from 'zod';

// Appointment Form Schema
export const AppointmentSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long").trim().regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  investigation: z.string().min(2, "Investigation is required").max(150),
  preferredCentre: z.enum(['Maqsudan', 'Rama Mandi']),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  preferredTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  message: z.string().max(1000, "Message is too long").optional().default(""),
});

// Admin Login Schema
export const LoginSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

// Settings Update Schema (Basic)
export const PriceUpdateSchema = z.object({
  serviceId: z.string().min(1).max(50),
  investigationName: z.string().min(1).max(100),
  newPrice: z.string().min(1).max(50),
});

export const CentreInfoSchema = z.object({
  centreId: z.string().min(1).max(50),
  field: z.string().min(1).max(50),
  value: z.string().min(1).max(500),
});
