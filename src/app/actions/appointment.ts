"use server";

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Submits a new appointment booking.
 * 
 * @param formData - The form data containing patient details and preferences
 * @returns An object indicating success or failure
 */
export async function submitAppointment(formData: FormData) {
  try {
    const patientName = formData.get('patientName') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const investigation = formData.get('investigation') as string;
    const preferredCentre = formData.get('preferredCentre') as string;
    const preferredDate = formData.get('preferredDate') as string;
    const preferredTime = formData.get('preferredTime') as string;
    const message = formData.get('message') as string | null;

    if (!patientName || !phoneNumber || !investigation || !preferredDate) {
      return { success: false, error: "Missing required fields" };
    }

    await prisma.appointment.create({
      data: {
        patientName,
        phoneNumber,
        investigation,
        preferredCentre: preferredCentre || 'Maqsudan',
        preferredDate,
        preferredTime: preferredTime || 'Morning',
        message: message || '',
        status: 'Pending'
      }
    });

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error("Failed to submit appointment:", error);
    return { success: false, error: "Database error" };
  }
}

/**
 * Retrieves all appointments from the database, ordered by creation date (descending).
 * 
 * @returns An object containing the list of appointments or an error message
 */
export async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: appointments };
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
