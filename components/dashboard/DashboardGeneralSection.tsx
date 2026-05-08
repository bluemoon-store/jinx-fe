'use client'

import CentralIcon from '@central-icons-react/all'
import { useTheme } from 'next-themes'
import { FunctionComponent, useState } from 'react'

import { useAuth } from '@/hooks/use-auth'
import { parseApiError } from '@/lib/api-error'
import { toast } from '@/lib/toast'

const secondaryActionBtnClass =
  'rounded-num-8 border-border-subtle bg-card-elevated text-foreground dark:border-darkslateblue dark:bg-gray-300 dark:text-inherit px-num-12 box-border flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden border border-solid py-2.5 font-inherit sm:min-h-0 sm:w-auto sm:justify-start sm:py-2'

const themeOptionSelectedClass =
  'bg-fuchsia box-border flex min-h-11 w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-[7.79px] px-2 py-2.5 font-inherit text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)] sm:min-h-0 sm:w-auto sm:gap-[7.8px] sm:px-4 sm:py-2'
const themeOptionUnselectedClass =
  'rounded-num-8 border-border-subtle bg-card-elevated text-foreground dark:border-darkslateblue dark:bg-gray-300 dark:text-inherit px-num-12 box-border flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden border border-solid py-2.5 font-inherit sm:min-h-0 sm:w-auto sm:py-2'

/** General settings: profile, email, theme — layout refactored from Figma (flex/grid, no absolute). */
export const DashboardGeneralSection: FunctionComponent = () => {
  const { theme, setTheme } = useTheme()
  const { user, sendVerificationEmail } = useAuth()
  const [isSendingVerification, setIsSendingVerification] = useState(false)
  const selectedTheme: 'dark' | 'light' | 'system' =
    theme === 'dark' || theme === 'light' || theme === 'system' ? theme : 'system'
  const isVerified = user?.isVerified === true
  const emailDisplay = user?.email ?? ''

  function themeLabel(t: 'dark' | 'light' | 'system') {
    return t === 'dark' ? 'Dark' : t === 'light' ? 'Light' : 'System'
  }

  function toastThemeUpdated(t: 'dark' | 'light' | 'system') {
    toast.info('Theme updated', {
      description: `Switched to ${themeLabel(t)}.`,
    })
  }

  return (
    <section className="font-commissioner text-foreground dark:text-white lg:gap-num-30 flex min-h-0 w-full min-w-0 flex-col gap-4 text-left text-sm sm:gap-6 lg:min-h-[606px] lg:text-[18px]">
      {/* Primary settings blocks */}
      <div className="lg:gap-num-30 flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
        {/* Avatar upload */}
        <div className="rounded-num-8 border-border-subtle bg-card-elevated dark:border-darkslateblue dark:bg-gray-100 box-border flex w-full min-w-0 shrink-0 flex-col gap-3 overflow-hidden border border-solid p-3 sm:min-h-[98.7px] sm:flex-row sm:items-center sm:p-4">
          <img
            className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-[66.7px] sm:w-[66.7px] sm:rounded-[13.33px]"
            alt=""
            src="/icons/Ellipse 1.svg"
          />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <b className="tracking-num-0_02 sm:leading-num-28 self-stretch text-base leading-6 lg:text-[18px]">
              User Avatar
            </b>
            <div className="text-muted-foreground dark:text-lightsteelblue-200 sm:text-num-16 self-stretch text-sm leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
              Upload a new avatar. Max size: 2 MB. Supported formats: PNG or JPG.
            </div>
          </div>
          <div className="text-muted-foreground dark:text-lightsteelblue-100 flex w-full min-w-0 shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <button type="button" className={secondaryActionBtnClass}>
              <CentralIcon
                name="IconArrowOutOfBox"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                ariaHidden={true}
              />
              <span className="tracking-num--0_01 sm:text-num-16 sm:leading-num-28 text-sm leading-6 font-semibold">
                Upload
              </span>
            </button>
            <button
              type="button"
              className={secondaryActionBtnClass}
              onClick={() => {
                toast.info('Avatar removed', {
                  description: 'This is a demo toast (no API call yet).',
                })
              }}
            >
              <CentralIcon
                name="IconTrashCan"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                ariaHidden={true}
                color="#ff2a2a"
              />
              <span className="tracking-num--0_01 sm:text-num-16 sm:leading-num-28 text-sm leading-6 font-semibold">
                Remove
              </span>
            </button>
          </div>
        </div>

        <div className="bg-divider h-px w-full" />

        {/* Email */}
        <div className="flex w-full min-w-0 flex-col gap-4 self-stretch sm:gap-5 lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-1 items-center justify-center lg:justify-start">
            <div className="flex w-full max-w-full flex-col items-start gap-0.5">
              <b className="tracking-num-0_02 sm:leading-num-28 self-stretch text-base leading-6 lg:text-[18px]">
                Email Address
              </b>
              <div className="text-muted-foreground dark:text-lightsteelblue-200 sm:text-num-16 self-stretch text-sm leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                Change your primary email address.
              </div>
            </div>
          </div>
          <div className="rounded-num-8 border-border-subtle bg-card-elevated dark:border-darkslateblue dark:bg-gray-100 sm:p-num-12 sm:text-num-16 flex w-full min-w-0 flex-1 flex-col items-start justify-center overflow-hidden border border-solid p-3 text-sm lg:max-w-none lg:flex-[0.955]">
            <div className="flex flex-col gap-3 self-stretch sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:gap-5">
              <div className="rounded-num-8 flex min-w-0 flex-wrap items-center gap-2 overflow-hidden sm:gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <CentralIcon
                    name="IconEmail2"
                    join="round"
                    fill="filled"
                    stroke="2"
                    radius="1"
                    size={20}
                    ariaHidden={true}
                  />
                  <div className="tracking-num--0_01 sm:text-num-16 sm:leading-num-28 min-w-0 text-sm leading-6 font-semibold break-all sm:break-normal">
                    {emailDisplay || '—'}
                  </div>
                </div>
                <div className="bg-divider h-3.5 w-px shrink-0" />
                {isVerified ? (
                  <div className="text-limegreen flex items-center justify-center gap-0.5 rounded-md px-1.5 py-0 text-center [background:linear-gradient(180deg,_rgba(27,_217,_36,_0.05),_rgba(27,_217,_36,_0.14))]">
                    <CentralIcon
                      name="IconSubscriptionTick1"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={20}
                      ariaHidden={true}
                      color="#25d366"
                    />
                    <div className="leading-6 font-semibold dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                      Verified
                    </div>
                  </div>
                ) : (
                  <div className="text-red flex items-center justify-center gap-0.5 rounded-md px-1.5 py-0 text-center [background:linear-gradient(180deg,_rgba(255,_42,_42,_0.05),_rgba(255,_42,_42,_0.14))]">
                    <CentralIcon
                      name="IconCrossSmall"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={20}
                      ariaHidden={true}
                      color="#ff2a2a"
                    />
                    <div className="leading-6 font-semibold text-red-500 dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                      Not Verified
                    </div>
                  </div>
                )}
              </div>
              <div className="text-muted-foreground dark:text-lightsteelblue-100 flex w-full items-stretch sm:w-auto sm:items-center">
                <button
                  type="button"
                  className={`${secondaryActionBtnClass} shrink-0 text-center sm:text-left`}
                  disabled={isVerified || isSendingVerification || !emailDisplay}
                  onClick={async () => {
                    setIsSendingVerification(true)
                    try {
                      await sendVerificationEmail()
                      toast.success('Verification email sent', {
                        description: 'Check your inbox for the verification link.',
                      })
                    } catch (e) {
                      toast.error(parseApiError(e))
                    } finally {
                      setIsSendingVerification(false)
                    }
                  }}
                >
                  <CentralIcon
                    name="IconPaperPlaneTopRight"
                    join="round"
                    fill="filled"
                    stroke="2"
                    radius="1"
                    size={20}
                    ariaHidden={true}
                  />
                  <span className="tracking-num--0_01 sm:text-num-16 sm:leading-num-28 text-sm leading-6 font-semibold whitespace-nowrap">
                    {isSendingVerification ? 'Sending…' : 'Resend Verification'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-divider h-px w-full" />

        {/* Theme */}
        <div className="flex w-full min-w-0 flex-col gap-3 self-stretch sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <b className="tracking-num-0_02 sm:leading-num-28 self-stretch text-base leading-6 lg:text-[18px]">
              Theme Preference
            </b>
            <div className="text-muted-foreground dark:text-lightsteelblue-200 sm:text-num-16 self-stretch text-sm leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
              Customize the website's appearance.
            </div>
          </div>
          <div
            className="text-muted-foreground dark:text-lightsteelblue-100 lg:text-num-16 grid w-full min-w-0 grid-cols-3 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-2"
            role="group"
            aria-label="Theme preference"
          >
            <button
              type="button"
              aria-pressed={selectedTheme === 'dark'}
              onClick={() => {
                setTheme('dark')
                toastThemeUpdated('dark')
              }}
              className={
                selectedTheme === 'dark'
                  ? `${themeOptionSelectedClass} sm:w-[88px]`
                  : themeOptionUnselectedClass
              }
            >
              <CentralIcon
                name="IconMoon"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                ariaHidden={true}
              />
              <span className="tracking-num--0_01 sm:text-num-16 sm:leading-num-28 shrink-0 text-xs leading-tight font-semibold">
                Dark
              </span>
            </button>
            <button
              type="button"
              aria-pressed={selectedTheme === 'light'}
              onClick={() => {
                setTheme('light')
                toastThemeUpdated('light')
              }}
              className={
                selectedTheme === 'light' ? themeOptionSelectedClass : themeOptionUnselectedClass
              }
            >
              <CentralIcon
                name="IconSun"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                ariaHidden={true}
              />
              <span className="tracking-num--0_01 sm:text-num-16 sm:leading-num-28 text-xs leading-tight font-semibold">
                Light
              </span>
            </button>
            <button
              type="button"
              aria-pressed={selectedTheme === 'system'}
              onClick={() => {
                setTheme('system')
                toastThemeUpdated('system')
              }}
              className={
                selectedTheme === 'system' ? themeOptionSelectedClass : themeOptionUnselectedClass
              }
            >
              <CentralIcon
                name="IconAppearanceDarkMode"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                ariaHidden={true}
              />
              <span className="tracking-num--0_01 sm:text-num-16 sm:leading-num-28 text-xs leading-tight font-semibold">
                System
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
