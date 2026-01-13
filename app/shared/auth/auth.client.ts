import { createClient } from "./supabase.client";

/**
 * Get current session on client
 */
export async function getSession() {
  const supabase = createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return session;
}

/**
 * Get current user on client
 */
export async function getUser() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Sign out current user
 */
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
