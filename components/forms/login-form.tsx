'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // TODO: implement login logic
      console.warn('Login:', data.email)
      toast.success('Logged in successfully!')
    } catch {
      toast.error('Failed to login. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
