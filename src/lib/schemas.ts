import { z } from 'zod';

// Appointment Form Schema
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAppointmentSchema = (dict: Record<string, any>) => z.object({
  patientName: z.string().min(2, dict.appointment.validation.nameMin).max(100, dict.appointment.validation.nameMax).trim().regex(/^[a-zA-Z\s]+$/, dict.appointment.validation.nameRegex),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, dict.appointment.validation.phoneExact),
  investigation: z.string().min(2, dict.appointment.validation.investigationRequired).max(150),
  preferredCentre: z.enum(['Maqsudan', 'Rama Mandi', 'Any']),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, dict.appointment.validation.dateInvalid),
  preferredTime: z.string().default('Any'),
  message: z.string().max(1000, dict.appointment.validation.messageMax).optional().default(""),
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
