import { FunctionComponent } from 'react'

/** General settings: profile, email, theme — layout refactored from Figma (flex/grid, no absolute). */
export const DashboardSettingsSection: FunctionComponent = () => {
  return (
    <section className="font-commissioner flex min-h-[606px] w-full flex-col gap-num-30 text-left text-[18px] text-white">
      {/* Title + account ID */}
      <header className="flex w-full flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <img className="h-5 w-5" alt="" />
          <b className="leading-num-28 tracking-num-0_02">General</b>
        </div>
        <div className="text-lightsteelblue-200 flex items-center justify-center gap-2 rounded-md bg-gray-200 px-2 py-1.5 text-right text-[12px]">
          <div className="leading-num-15 font-semibold">ID</div>
          <div className="text-ghostwhite flex items-center gap-1">
            <div className="leading-num-15 font-semibold">JINX-LKXJLKNALSDJ</div>
            <img className="h-3.5 w-3.5" alt="" />
          </div>
        </div>
      </header>

      {/* Primary settings blocks */}
      <div className="flex min-h-0 flex-1 flex-col gap-num-30">
        {/* Avatar upload */}
        <div className="rounded-num-8 border-darkslateblue box-border flex min-h-[98.7px] w-full shrink-0 flex-col gap-3 overflow-hidden border border-solid bg-gray-100 p-4 sm:flex-row sm:items-center">
          <img className="h-[66.7px] w-[66.7px] shrink-0 rounded-[13.33px] object-cover" alt="" />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <b className="leading-num-28 self-stretch tracking-num-0_02">User Avatar</b>
            <div className="text-num-16 text-lightsteelblue-200 self-stretch leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              Upload a new avatar. Max size: 2 MB. Supported formats: PNG or JPG.
            </div>
          </div>
          <div className="text-num-16 text-lightsteelblue-100 flex shrink-0 flex-wrap items-center gap-2">
            <div className="rounded-num-8 border-whitesmoke px-num-12 flex items-center gap-2 overflow-hidden border border-solid bg-gray-300 py-2">
              <img className="h-5 w-5" alt="" />
              <div className="tracking-num--0_01 leading-num-28 font-semibold">Upload</div>
            </div>
            <div className="rounded-num-8 border-whitesmoke px-num-12 flex items-center gap-2 overflow-hidden border border-solid bg-gray-300 py-2">
              <img className="h-5 w-5" alt="" />
              <div className="tracking-num--0_01 leading-num-28 font-semibold">Remove</div>
            </div>
          </div>
        </div>

        <img className="h-px max-h-full w-full max-w-full shrink-0" alt="" />

        {/* Email */}
        <div className="flex w-full flex-col gap-5 self-stretch lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-1 items-center justify-center lg:justify-start">
            <div className="flex w-full max-w-full flex-col items-start gap-0.5">
              <b className="leading-num-28 self-stretch tracking-num-0_02">Email Address</b>
              <div className="text-num-16 text-lightsteelblue-200 self-stretch leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                Change your primary email address.
              </div>
            </div>
          </div>
          <div className="rounded-num-8 border-darkslateblue p-num-12 text-num-16 flex w-full min-w-0 flex-[0.955] flex-col items-start justify-center overflow-hidden border border-solid bg-gray-100 lg:max-w-none">
            <div className="flex flex-col gap-4 self-stretch sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <div className="rounded-num-8 flex min-w-0 flex-wrap items-center gap-3 overflow-hidden">
                <div className="flex items-center gap-2">
                  <img className="h-5 w-5 shrink-0" alt="" />
                  <div className="tracking-num--0_01 leading-num-28 font-semibold">hi@echodzns.com</div>
                </div>
                <img className="h-3.5 w-1 shrink-0 object-contain opacity-[0.25]" alt="" />
                <div className="text-red flex items-center justify-center gap-0.5 rounded-md px-1.5 py-0 text-center [background:linear-gradient(180deg,_rgba(255,_42,_42,_0.05),_rgba(255,_42,_42,_0.14))]">
                  <img className="h-3.5 w-3.5 shrink-0" alt="" />
                  <div className="leading-6 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                    Not Verified
                  </div>
                </div>
              </div>
              <div className="text-lightsteelblue-100 flex items-center">
                <div className="rounded-num-8 border-whitesmoke px-num-12 flex items-center gap-2 overflow-hidden border border-solid bg-gray-300 py-2">
                  <img className="h-5 w-5" alt="" />
                  <div className="tracking-num--0_01 leading-num-28 font-semibold">
                    Resend Verification
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img className="h-px max-h-full w-full max-w-full shrink-0" alt="" />

        {/* Theme */}
        <div className="flex w-full flex-col gap-3 self-stretch sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <b className="leading-num-28 self-stretch tracking-num-0_02">Theme Preference</b>
            <div className="text-num-16 text-lightsteelblue-200 self-stretch leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              Customize the website's appearance.
            </div>
          </div>
          <div className="text-num-16 text-lightsteelblue-100 flex flex-wrap items-center gap-2">
            <div className="bg-fuchsia box-border flex w-[88px] shrink-0 items-center justify-center gap-[7.8px] overflow-hidden rounded-[7.79px] px-4 py-2 text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)]">
              <img className="h-5 w-5 shrink-0" alt="" />
              <div className="tracking-num--0_01 leading-num-28 shrink-0 font-semibold">Dark</div>
            </div>
            <div className="rounded-num-8 border-whitesmoke px-num-12 flex items-center gap-2 overflow-hidden border border-solid bg-gray-300 py-2">
              <img className="h-5 w-5" alt="" />
              <div className="tracking-num--0_01 leading-num-28 font-semibold">Light</div>
            </div>
            <div className="rounded-num-8 border-whitesmoke px-num-12 flex items-center gap-2 overflow-hidden border border-solid bg-gray-300 py-2">
              <img className="h-5 w-5" alt="" />
              <div className="tracking-num--0_01 leading-num-28 font-semibold">System</div>
            </div>
          </div>
        </div>
      </div>

      {/* Figma variant: verified email row — anchored to bottom of section via flex */}
      <footer className="mt-auto flex w-full justify-end">
        <div className="rounded-num-8 border-darkslateblue text-num-16 flex w-full max-w-full flex-col items-start justify-center overflow-hidden border border-solid bg-gray-100 p-5 sm:max-w-md">
          <div className="flex items-center justify-center self-stretch">
            <div className="rounded-num-8 flex flex-wrap items-center gap-3 overflow-hidden">
              <div className="flex items-center gap-2">
                <img className="h-5 w-5" alt="" />
                <div className="tracking-num--0_01 leading-num-28 font-semibold">hi@echodzns.com</div>
              </div>
              <img className="h-3.5 w-1 object-contain opacity-[0.25]" alt="" />
              <div className="text-limegreen flex items-center justify-center gap-0.5 rounded-md px-1.5 py-0 text-center [background:linear-gradient(180deg,_rgba(27,_217,_36,_0.05),_rgba(27,_217,_36,_0.14))]">
                <img className="h-3.5 w-3.5" alt="" />
                <div className="leading-6 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                  Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
