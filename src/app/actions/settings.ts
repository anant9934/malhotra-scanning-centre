"use server";

import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'src/data/admin-settings.json');

async function readSettings() {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeSettings(data: object) {
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Retrieves the current admin settings from the local JSON file.
 * 
 * @returns An object containing the success status and the settings data
 */
export async function getSettings() {
  try {
    const settings = await readSettings();
    return { success: true, data: settings };
  } catch (e) {
    return { success: false, data: {} };
  }
}

/**
 * Updates the price of a specific investigation for a given service.
 * 
 * @param serviceId - The ID of the service (e.g., 'ultrasound')
 * @param investigationName - The name of the investigation
 * @param newPrice - The new price value
 * @returns An object indicating success or failure
 */
export async function updateServicePrice(serviceId: string, investigationName: string, newPrice: string) {
  try {
    const settings = await readSettings();
    if (!settings.prices) settings.prices = {};
    if (!settings.prices[serviceId]) settings.prices[serviceId] = {};
    settings.prices[serviceId][investigationName] = newPrice;
    await writeSettings(settings);
    revalidatePath('/services');
    revalidatePath('/admin');
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Failed to update price' };
  }
}

/**
 * Updates information for a specific centre (e.g., address, contact details).
 * 
 * @param centreId - The ID of the centre (e.g., 'maqsudan' or 'ramamandi')
 * @param field - The specific field to update (e.g., 'phone')
 * @param value - The new value for the field
 * @returns An object indicating success or failure
 */
export async function updateCentreInfo(centreId: string, field: string, value: string) {
  try {
    const settings = await readSettings();
    if (!settings.centres) settings.centres = {};
    if (!settings.centres[centreId]) settings.centres[centreId] = {};
    settings.centres[centreId][field] = value;
    await writeSettings(settings);
    revalidatePath('/centres');
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Failed to update centre info' };
  }
}

/**
 * Updates a general site setting (e.g., tagline, global phone number).
 * 
 * @param key - The key of the setting to update
 * @param value - The new value
 * @returns An object indicating success or failure
 */
export async function updateSiteSettings(key: string, value: string) {
  try {
    const settings = await readSettings();
    if (!settings.site) settings.site = {};
    settings.site[key] = value;
    await writeSettings(settings);
    revalidatePath('/');
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Failed to update setting' };
  }
}

/**
 * Replaces all settings with a new configuration object.
 * 
 * @param newSettings - The new complete settings object
 * @returns An object indicating success or failure
 */
export async function updateSettings(newSettings: any) {
  try {
    await writeSettings(newSettings);
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/centres');
    revalidatePath('/services');
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Failed to save settings' };
  }
}

/**
 * Deletes an appointment from the database.
 * 
 * @param id - The unique ID of the appointment to delete
 * @returns An object indicating success or failure
 */
export async function deleteAppointment(id: string) {
  const { prisma } = await import('@/lib/prisma');
  try {
    await prisma.appointment.delete({ where: { id } });
    revalidatePath('/admin');
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Failed to delete appointment' };
  }
}
