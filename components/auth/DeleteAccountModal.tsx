'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useId, useState } from 'react'

export type DeleteAccountModalProps = {
  onClose?: () => void
  onDeleteConfirm?: (password: string) => Promise<void>
}

const passwordRowClass =
  'rounded-num-8 border-[#18263E] text-lightsteelblue-200 px-num-12 text-sm sm:text-num-16 flex min-h-11 items-center justify-between gap-3 self-stretch overflow-hidden border border-solid bg-gray-100 py-2.5 transition-[border-color,box-shadow,color] focus-within:border-[#ff2a2a] focus-within:text-[#ff2a2a] focus-within:shadow-[0px_0px_0px_3px_rgba(255,42,42,0.22)] sm:gap-5'

const passwordVisibilityHitClass =
  'inline-flex shrink-0 touch-manipulation items-center justify-center rounded-num-8 p-2 [-webkit-tap-highlight-color:transparent] sm:p-0'

const passwordVisibilityFaceClass =
  'flex h-7 w-7 items-center justify-center rounded-num-8 bg-[#051329] p-1.5'

const inputClass =
  'tracking-num--0_01 leading-num-28 font-normal min-w-0 h-7 flex-1 appearance-none border-0 bg-transparent p-0 text-white/75 shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:font-normal placeholder:text-white placeholder:opacity-[0.1875]'

const deleteButtonClass =
  'text-num-16 box-border flex min-h-11 w-full cursor-pointer touch-manipulation items-center justify-center self-stretch rounded-[7.79px] bg-[#ff2a2a] px-4 py-3.5 text-white shadow-[0px_2px_0px_rgba(255,42,42,0.45)] [-webkit-tap-highlight-color:transparent] sm:py-num-12 disabled:cursor-not-allowed disabled:opacity-60'

type DataBadge = { label: string; icon: string; iconColor: string }

const DATA_BADGES: DataBadge[] = [
  { label: 'Orders', icon: 'IconBasket2', iconColor: '#eb45ff' },
  { label: 'Drops', icon: 'IconAirdrop2', iconColor: '#3B82F6' },
  { label: 'Reviews', icon: 'IconStar', iconColor: '#f97316' },
  { label: 'Wallet', icon: 'IconBanknote2', iconColor: '#22c55e' },
]

const DeleteAccountModal: FunctionComponent<DeleteAccountModalProps> = ({
  onClose,
  onDeleteConfirm,
}) => {
  const confirmId = useId()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [understood, setUnderstood] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canDelete = password.trim().length > 0 && understood && !isSubmitting

  const handleDelete = async () => {
    if (!canDelete) return
    setIsSubmitting(true)
    try {
      await onDeleteConfirm?.(password)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="text-ghostwhite font-nata-sans mx-auto box-border flex w-full max-w-[419px] flex-col items-start overflow-hidden rounded-xl border border-dashed border-red-500 bg-[#111429] p-4 text-left text-base shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)] sm:p-5 sm:text-lg lg:max-w-[520px] lg:p-6 lg:text-[20px]">
      <main className="text-whitesmoke-100 flex w-full min-w-0 flex-col items-start gap-3 sm:gap-[15px]">
        <header className="font-nata-sans flex w-full min-w-0 flex-col items-start gap-3 self-stretch">
          <div className="flex items-center justify-between gap-2 self-stretch sm:gap-5">
            <div className="flex min-w-0 flex-1 items-center">
              <h2 className="leading-num-28 text-lg font-extrabold tracking-[0.02em] uppercase sm:text-xl lg:text-[20px]">
                delete account
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-num-8 box-border flex h-[30px] w-[30px] shrink-0 touch-manipulation items-center justify-center border border-solid border-[#18263E] p-0 [-webkit-tap-highlight-color:transparent]"
              aria-label="Close"
            >
              <CentralIcon
                name="IconCrossSmall"
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={20}
                ariaHidden={true}
                className="text-white/50"
              />
            </button>
          </div>
          <div className="h-px w-full self-stretch bg-gray-100" />
        </header>

        <section className="text-ghostwhite flex w-full min-w-0 flex-col items-start gap-3 self-stretch">
          <p className="text-num-14 font-commissioner sm:text-num-14 leading-snug font-medium text-[#9EA0C6]">
            This will erase all your account data including all the following:
          </p>
          <div className="flex w-full min-w-0 flex-wrap gap-2">
            {DATA_BADGES.map((b) => (
              <div
                key={b.label}
                className="border-darkslateblue flex items-center gap-1.5 rounded-full border border-solid bg-[#0D1B35] px-3 py-1.5"
              >
                <CentralIcon
                  name={b.icon as never}
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={18}
                  ariaHidden={true}
                  color={b.iconColor}
                />
                <span className="text-num-14 sm:text-num-14 leading-5 font-semibold text-white">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px w-full self-stretch bg-gray-100" aria-hidden />

        <section className="text-num-14 font-commissioner flex w-full min-w-0 flex-col items-start gap-3 self-stretch sm:gap-[13px]">
          <p className="sm:text-num-14 text-sm leading-5 font-medium text-[#9EA0C6]">
            Enter your password to confirm account deletion
          </p>
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label
              htmlFor="delete-account-password"
              className="leading-num-20 font-semibold text-[#9EA0C6]"
            >
              Password
            </label>
            <div className={passwordRowClass}>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <CentralIcon
                  name="IconKey1"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={18}
                  ariaHidden={true}
                  className="shrink-0"
                />
                <input
                  id="delete-account-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={inputClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className={passwordVisibilityHitClass}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                <span className={passwordVisibilityFaceClass}>
                  <CentralIcon
                    name={showPassword ? 'IconEyeOpen' : 'IconEyeSlash'}
                    join="round"
                    fill="outlined"
                    stroke="2"
                    radius="1"
                    size={18}
                    ariaHidden={true}
                  />
                </span>
              </button>
            </div>
          </div>

          <label
            htmlFor={confirmId}
            className="flex cursor-pointer flex-row items-start gap-3 self-stretch text-left sm:items-center"
          >
            <input
              id={confirmId}
              type="checkbox"
              className="peer sr-only"
              checked={understood}
              onChange={(e) => setUnderstood(e.target.checked)}
            />
            <span
              aria-hidden
              className="rounded-num-8 mt-0.5 box-border flex h-6 w-6 shrink-0 items-center justify-center border border-solid border-[#18263E] bg-gray-100 peer-checked:border-[#ff2a2a] peer-checked:bg-[#ff2a2a] sm:mt-0"
            >
              <CentralIcon
                name="IconCheckmark2"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={14}
                ariaHidden={true}
                className={understood ? 'block text-white' : 'hidden text-white'}
              />
            </span>
            <span className="sm:text-num-14 min-w-0 flex-1 text-sm leading-snug font-semibold text-white">
              Yes, I understand that deleting my account is permanent and I will lose access to my
              data.
            </span>
          </label>

          <button
            type="button"
            onClick={handleDelete}
            disabled={!canDelete}
            className={deleteButtonClass}
          >
            <span className="tracking-num--0_01 leading-num-28 font-semibold">
              {isSubmitting ? 'Deleting…' : 'Yes, Delete My Account'}
            </span>
          </button>
        </section>
      </main>
    </section>
  )
}

export default DeleteAccountModal
