'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function logout() {
  cookies().delete('next-auth.csrf-token')
  cookies().delete('next-auth.session-token')
  redirect('/accounts/login')
}
