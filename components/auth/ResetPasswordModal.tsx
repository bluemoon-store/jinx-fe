import { FunctionComponent } from 'react'

export type ResetPasswordModalProps = {
  onClose?: () => void
}

const ResetPassword: FunctionComponent<ResetPasswordModalProps> = ({ onClose }) => {
  return (
    <section className="text-num-14 text-whitesmoke-100 font-commissioner box-border flex w-full flex-col items-start overflow-hidden rounded-xl border-[1px] border-solid border-gray-300 bg-gray-200 px-5 py-[18px] text-left shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)]">
      <main className="flex w-[419px] flex-col items-start gap-[15px]">
        <div className="flex flex-col items-center gap-4 self-stretch">
          {/* Header */}
          <header className="font-nata-sans flex flex-col items-start gap-3 self-stretch text-[20px]">
              <div className="flex items-center justify-between gap-5 self-stretch">
                <div className="flex items-center">
                  <div className="leading-num-28 font-extrabold tracking-[0.02em] uppercase">
                    RESET PASSWORD
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-num-8 p-0"
                  aria-label="Close"
                >
                  <img className="rounded-num-8 h-[26px] w-[26px]" alt="" />
                </button>
              </div>
              <img
                className="h-px max-h-full max-w-full self-stretch overflow-hidden"
                alt=""
              />
          </header>
          {/* Intro */}
          <section className="rounded-num-8 text-ghostwhite box-border flex min-w-[416px] flex-col items-start self-stretch bg-gray-100 p-3">
            <div className="flex items-start self-stretch">
              <div className="flex flex-1 flex-col items-start gap-0.5">
                <b className="tracking-num--0_01 flex h-[19px] shrink-0 items-center self-stretch leading-[18px]">
                    Create a new password
                </b>
                <div className="text-lightsteelblue-100 self-stretch text-[13px] leading-[17px] font-medium">{`You will be logged out of all devices once you reset your password. `}</div>
              </div>
            </div>
          </section>
          {/* Form */}
          <section className="text-limegreen flex flex-col items-start gap-4 self-stretch">
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="leading-num-20 text-lightsteelblue-200 font-semibold">
                Password
              </div>
              <div className="rounded-num-8 border-fuchsia text-num-16 flex items-center justify-between gap-5 self-stretch overflow-hidden border-[1px] border-solid bg-gray-100 px-3 py-2.5 text-white shadow-[0px_0px_0px_3px_rgba(235,_45,_255,_0.25)]">
                <div className="flex items-center gap-2">
                  <img className="h-[18px] w-[18px]" alt="" />
                  <div className="tracking-num--0_01 leading-num-28 font-semibold">
                    ••••••••••••••••••|
                  </div>
                </div>
                <img className="rounded-num-8 h-7 w-7" alt="" />
              </div>
              <div className="flex items-center gap-[5px] opacity-[0.75]">
                <img className="h-3.5 w-3.5" alt="" />
                <div className="leading-num-20 font-semibold">At least 8 characters</div>
              </div>
              <div className="flex items-center gap-[5px] opacity-[0.75]">
                <img className="h-3.5 w-3.5" alt="" />
                <div className="leading-num-20 font-semibold">{`At least one number, uppercase & lowercase letter`}</div>
              </div>
              <div className="flex items-center gap-[5px] opacity-[0.75]">
                <img className="h-3.5 w-3.5" alt="" />
                <div className="leading-num-20 font-semibold">
                  At least one special character (# ! @)
                </div>
              </div>
            </div>
            <div className="text-lightsteelblue-200 flex flex-col items-start gap-2 self-stretch">
              <div className="leading-num-20 font-semibold">Confirm Password</div>
              <div className="rounded-num-8 border-whitesmoke-200 text-num-16 flex items-center justify-between gap-5 self-stretch overflow-hidden border-[1px] border-solid bg-gray-100 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <img className="h-[18px] w-[18px]" alt="" />
                  <div className="tracking-num--0_01 leading-num-28 font-semibold opacity-[0.25]">
                    Confirm your password
                  </div>
                </div>
                <img className="rounded-num-8 h-7 w-7" alt="" />
              </div>
            </div>
            <div className="bg-fuchsia text-num-16 flex items-center justify-center self-stretch rounded-[7.79px] px-4 py-3 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)]">
              <div className="tracking-num--0_01 leading-num-28 font-semibold">
                Reset Password
              </div>
            </div>
          </section>
        </div>
        <img
          className="h-px max-h-full max-w-full self-stretch overflow-hidden"
          alt=""
        />
        <footer className="text-num-16 text-lightsteelblue-200 flex items-center justify-center gap-2.5 self-stretch text-center">
          <div className="tracking-num--0_01 leading-num-28 font-semibold">
            Having issues?
          </div>
          <div className="flex items-center justify-center rounded-md px-1.5 py-0 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
            <div className="tracking-num--0_01 leading-num-28 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              Create a Ticket
            </div>
          </div>
        </footer>
      </main>
    </section>
  )
}

export default ResetPassword
