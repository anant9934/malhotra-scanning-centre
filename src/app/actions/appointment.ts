"use server";

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getAppointmentSchema } from '@/lib/schemas';
import { encrypt, decrypt } from '@/lib/encryption';
import { getDictionary } from '@/i18n/dictionaries';
import { Locale } from '@/i18n/config';

/**
 * Submits a new appointment booking with validation and encryption.
 * 
 * @param formData - The form data containing patient details and preferences
 * @param locale - Current locale for localized validation errors
 * @returns An object indicating success or failure
 */
export async function submitAppointment(formData: FormData, locale: Locale = 'en') {
  try {
    const rawData = {
      patientName: formData.get('patientName'),
      phoneNumber: formData.get('phoneNumber'),
      investigation: formData.get('investigation'),
      preferredCentre: formData.get('preferredCentre') || 'Maqsudan',
      preferredDate: formData.get('preferredDate'),
      preferredTime: formData.get('preferredTime') || 'Any',
      message: formData.get('message') || '',
    };

    // Fetch localized dictionary for validation messages
    const dictionary = await getDictionary(locale);
    const AppointmentSchema = getAppointmentSchema(dictionary);

    // 1. Zod Validation (Input Sanitization)
    const validatedData = AppointmentSchema.parse(rawData);

    // 2. Encryption (Data Protection at Rest)
    const encryptedName = encrypt(validatedData.patientName);
    const encryptedPhone = encrypt(validatedData.phoneNumber);

    await prisma.appointment.create({
      data: {
        patientName: encryptedName,
        phoneNumber: encryptedPhone,
        investigation: validatedData.investigation,
        preferredCentre: validatedData.preferredCentre,
        preferredDate: validatedData.preferredDate,
        preferredTime: validatedData.preferredTime,
        message: validatedData.message,
        status: 'Pending'
      }
    });

    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to submit appointment:", error);
    // Do not leak database errors to the client, but return Zod validation errors
    if (error.errors && error.errors.length > 0) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "System error occurred. Please try again." };
  }
}

/**
 * Retrieves all appointments, decrypting sensitive fields.
 * 
 * @returns An object containing the list of appointments or an error message
 */
export async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Decrypt data before returning to Admin UI
    const decryptedAppointments = appointments.map(app => ({
      ...app,
      patientName: decrypt(app.patientName),
      phoneNumber: decrypt(app.phoneNumber),
    }));

    return { success: true, data: decryptedAppointments };
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return { success: false, error: "Database error" };
  }
}

/**
 * Updates the status of an existing appointment.
 * 
 * @param id - The unique ID of the appointment to update
 * @param status - The new status (e.g., 'Pending', 'Confirmed', 'Completed', 'Cancelled')
 * @returns An object indicating success or failure
 */
export async function updateAppointmentStatus(id: string, status: string) {
  try {
    // Basic validation
    if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
      return { success: false, error: "Invalid status" };
    }

    await prisma.appointment.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Database error" };
  }
}
