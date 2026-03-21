'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useState } from 'react'

export type SignInModalProps = {
  onClose?: () => void
  onContinueToDashboard?: () => void
  onForgotPassword?: () => void
  onSignUp?: () => void
}

const inputRowClass =
  'rounded-num-8 border-[#18263E] text-lightsteelblue-200 px-num-12 text-num-16 flex items-center gap-2.5 self-stretch overflow-hidden border border-solid bg-gray-100 py-2.5 transition-[border-color,box-shadow,color] focus-within:border-fuchsia focus-within:text-fuchsia focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]'

const inputClass =
  'tracking-num--0_01 leading-num-28 font-semibold min-w-0 h-7 flex-1 appearance-none border-0 bg-transparent p-0 text-white shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:font-semibold placeholder:text-white placeholder:opacity-25'

const passwordRowClass =
  'rounded-num-8 border-[#18263E] text-lightsteelblue-200 px-num-12 text-num-16 flex items-center justify-between gap-5 self-stretch overflow-hidden border border-solid bg-gray-100 py-2.5 transition-[border-color,box-shadow,color] focus-within:border-fuchsia focus-within:text-fuchsia focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]'

const SignInModal: FunctionComponent<SignInModalProps> = ({
  onClose,
  onContinueToDashboard,
  onForgotPassword,
  onSignUp,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className="text-ghostwhite font-nata-sans mx-auto box-border flex w-full flex-col items-start overflow-hidden rounded-xl border-[1px] border-solid border-gray-500 bg-gray-200 p-4 text-left text-[20px] shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)] lg:w-fit">
      <main className="text-whitesmoke-100 flex w-[419px] flex-col items-start gap-[15px]">
        <form
          className="flex flex-col items-start gap-4 self-stretch"
          onSubmit={(e) => {
            e.preventDefault()
            onContinueToDashboard?.()
          }}
        >
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex items-center justify-between gap-5 self-stretch">
              <div className="flex items-center">
                <div className="leading-num-28 font-extrabold tracking-[0.02em] uppercase">
                  LOG IN
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-num-8 flex h-[30px] w-[30px] shrink-0 items-center justify-center border border-solid border-[#18263E] p-0"
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
          </div>

          <div className="text-num-14 text-lightsteelblue font-commissioner flex flex-col items-start gap-[13px] self-stretch">
            <div className="flex flex-col items-start gap-2 self-stretch">
              <label htmlFor="signin-username" className="leading-num-20 font-semibold">
                Username{' '}
              </label>
              <div className={inputRowClass}>
                <CentralIcon
                  name="IconPeopleCircle"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={18}
                  ariaHidden={true}
                  className="shrink-0"
                />
                <input
                  id="signin-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 self-stretch">
              <label htmlFor="signin-password" className="leading-num-20 font-semibold">
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
                    id="signin-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={inputClass}
                  />
                </div>
                <button
                  type="button"
                  className="rounded-num-8 flex h-7 w-7 shrink-0 items-center justify-center bg-[#051329] p-1.5"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  <CentralIcon
                    name={showPassword ? 'IconEyeOpen' : 'IconEyeSlash'}
                    join="round"
                    fill="outlined"
                    stroke="2"
                    radius="1"
                    size={18}
                    ariaHidden={true}
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-fuchsia py-num-12 text-num-16 mt-2 flex w-full cursor-pointer items-center justify-center self-stretch rounded-[7.79px] px-4 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)]"
            >
              <div className="tracking-num--0_01 leading-num-28 font-semibold">
                Continue to Dashboard
              </div>
            </button>

            <button
              type="button"
              onClick={onForgotPassword}
              className="leading-num-20 text-lightsteelblue-200 self-stretch text-center font-semibold"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        <div className="h-px w-full self-stretch bg-gray-100" />

        <footer className="text-num-16 text-lightsteelblue font-commissioner flex items-center justify-center gap-2.5 self-stretch text-center">
          <div className="tracking-num--0_01 leading-num-28 text-lightsteelblue-200 font-semibold">
            Don’t have an account?
          </div>
          <button
            type="button"
            onClick={onSignUp}
            className="flex items-center justify-center rounded-md px-1.5 py-0 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]"
          >
            <div className="tracking-num--0_01 leading-num-28 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              Create Account
            </div>
          </button>
        </footer>
      </main>
    </section>
  )
}

export default SignInModal
