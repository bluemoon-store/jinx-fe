'use client'

import CentralIcon from '@central-icons-react/all'

import { useAuthModal } from '@/components/auth/auth-modal-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function UnauthenticatedDropsGate() {
  const { openAuthModal } = useAuthModal()

  return (
    <Card className="border-border-subtle bg-card p-6 sm:p-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-fuchsia-500/20 p-3">
          <CentralIcon
            name="IconUser"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={24}
            color="#EB2DFF"
            ariaHidden
          />
        </div>
        <h2 className="text-xl font-bold">Become a member to claim drops</h2>
        <p className="text-sm text-white/75">
          You can browse drops publicly, but claiming a free drop requires an account.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button variant="outline" onClick={() => openAuthModal('signin')}>
            Log In
          </Button>
          <Button onClick={() => openAuthModal('signup')}>Create Account</Button>
        </div>
      </div>
    </Card>
  )
}
