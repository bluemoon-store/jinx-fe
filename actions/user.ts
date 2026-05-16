import { api } from '@/lib/api'
import type { User } from '@/types/api'
import type { BackendResponse } from '@/types/auth'

type BackendUser = Omit<User, 'name'> & { name?: string }

function mapUser(beUser: BackendUser): User {
  return {
    ...beUser,
    name:
      [beUser.firstName, beUser.lastName].filter(Boolean).join(' ').trim() || beUser.userName || '',
  }
}

export async function uploadAvatarAction(file: File): Promise<User> {
  const form = new FormData()
  form.append('file', file)
  const res = await api.post<BackendResponse<BackendUser>>('/user/avatar', form)
  return mapUser(res.data.data)
}

export async function removeAvatarAction(): Promise<User> {
  const res = await api.delete<BackendResponse<BackendUser>>('/user/avatar')
  return mapUser(res.data.data)
}
