'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import type { LoginInput } from '@/lib/validations'

export async function loginAction(data: LoginInput) {
  try {
    // TODO: implement actual auth logic
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    revalidatePath('/')
    redirect('/dashboard')
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Login failed',
    }
  }
}

export async function logoutAction() {
  // TODO: clear session/cookies
  redirect('/login')
}
