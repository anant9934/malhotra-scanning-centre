"use server";

import { redirect } from 'next/navigation';
import { createSession, deleteSession, verifySession } from '@/lib/session';
import { LoginSchema } from '@/lib/schemas';
import bcrypt from 'bcryptjs';

// In production, the admin password MUST be securely hashed and stored in the database.
// Since we don't have an Admin table yet, we are comparing against a hashed ENV variable.
// E.g. $2a$12$R9h/cIPz0gi.URNNX3cam2OsX...
// E.g. $2a$12$R9h/cIPz0gi.URNNX3cam2OsX...

/**
 * Authenticates an admin user using the provided password.
 * Sets a secure JWT session if successful and redirects to the admin dashboard.
 * 
 * @param formData - The form data containing the password
 * @returns An object with an error message if authentication fails
 */
export async function login(formData: FormData) {
  try {
    const parsedData = LoginSchema.parse({
      password: formData.get('password'),
    });
    
    // Clean up any accidentally copied quotes from the environment variable
    const rawEnvHash = process.env.ADMIN_PASSWORD_HASH || '';
    const cleanEnvHash = rawEnvHash.replace(/^['"]|['"]$/g, '');
    
    // Use the clean hash, or fallback to the exact hash for 'admin123'
    const ADMIN_PASSWORD_HASH = cleanEnvHash || '$2a$12$R.vLqGg3sB7F83O4aL9Gvu/d5x25oKxM9x5H7sB8/Z8x4rK/M7uC6';
    
    // Secure constant-time hash comparison
    const isMatch = await bcrypt.compare(parsedData.password, ADMIN_PASSWORD_HASH);
    
    if (isMatch) {
      await createSession('SUPER_ADMIN');
      // Redirect must happen outside try/catch if it's Next.js redirect
    } else {
      return { error: 'Invalid password' };
    }
  } catch (error) {
    return { error: 'Validation failed' };
  }
  
  redirect('/admin');
}

/**
 * Logs out the admin user by deleting the secure JWT session.
 */
export async function logout() {
  await deleteSession();
  redirect('/admin/login');
}

/**
 * Checks if the current request is authenticated as an admin.
 * 
 * @returns A boolean indicating whether the admin session is valid
 */
export async function checkAuth() {
  const session = await verifySession();
  return !!session;
}
