"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

/**
 * Authenticates an admin user using the provided password.
 * Sets a secure cookie if successful and redirects to the admin dashboard.
 * 
 * @param formData - The form data containing the password
 * @returns An object with an error message if authentication fails
 */
export async function login(formData: FormData) {
  const password = formData.get('password') as string;
  
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    redirect('/admin');
  }
  
  return { error: 'Invalid password' };
}

/**
 * Logs out the admin user by deleting the authentication cookie
 * and redirecting to the login page.
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  redirect('/admin/login');
}

/**
 * Checks if the current request is authenticated as an admin.
 * 
 * @returns A boolean indicating whether the admin authentication cookie is present
 */
export async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.has('admin_auth');
}
