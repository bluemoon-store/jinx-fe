import { FunctionComponent } from 'react'

const Navbar: FunctionComponent = () => {
  return (
    <div className="py-num-0 text-whitesmoke-100 font-commissioner absolute top-[0px] left-[0px] box-border flex h-[75px] w-[1920px] items-center justify-between gap-0 overflow-y-auto border-b-[1px] border-solid border-gray-100 px-56">
      <div className="flex h-20 flex-1 shrink-0 items-center gap-[15px]">
        <img className="h-[45.3px] w-[82px]" alt="" />
        <div className="h-num-19 relative box-border w-px border-r-[1px] border-solid border-white opacity-[0.25]" />
        <div className="flex items-center gap-3.5 self-stretch opacity-[0.75]">
          <div className="flex flex-col items-start justify-center self-stretch">
            <div className="px-num-4 flex flex-1 flex-col items-start py-[13.6px]">
              <div className="py-num-16 px-num-0 flex items-center gap-2">
                <img className="relative h-[21px] w-[21px]" alt="" />
                <div className="flex flex-col items-center">
                  <div className="leading-num-20 relative font-semibold">Shop</div>
                </div>
                <img className="relative h-5 w-4" alt="" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center self-stretch">
            <div className="px-num-4 flex flex-1 flex-col items-start py-[13.6px]">
              <div className="py-num-16 px-num-0 flex items-center gap-2">
                <img className="relative h-[21px] w-[21px]" alt="" />
                <div className="flex flex-col items-center">
                  <div className="leading-num-20 relative font-semibold">Drops</div>
                </div>
                <img className="relative h-5 w-4" alt="" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center self-stretch">
            <div className="px-num-4 flex flex-1 flex-col items-start py-[13.6px]">
              <div className="py-num-16 px-num-0 flex items-center gap-2">
                <img className="relative h-[21px] w-[21px]" alt="" />
                <div className="flex flex-col items-center">
                  <div className="leading-num-20 relative font-semibold">FAQs</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center self-stretch">
            <div className="px-num-4 flex flex-1 flex-col items-start py-[13.6px]">
              <div className="py-num-16 px-num-0 flex items-center gap-2">
                <img className="relative h-[21px] w-[21px]" alt="" />
                <div className="flex flex-col items-center">
                  <div className="leading-num-20 relative font-semibold">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-num-16 text-ghostwhite flex h-20 flex-1 shrink-0 items-center justify-end text-left">
        <div className="px-num-0 flex items-center justify-center gap-2 self-stretch rounded-xl py-[26px]">
          <div className="flex shrink-0 items-center justify-center gap-2 self-stretch">
            <div className="rounded-num-8 border-whitesmoke-300 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center border-[1px] border-solid bg-gray-300 pt-px pb-0.5">
              <div className="h-num-18 relative w-[82.8px]">
                <div className="absolute top-[0px] left-[0px] flex items-center">
                  <div className="flex items-center justify-center gap-2.5">
                    <img className="relative h-4 w-4" alt="" />
                    <img className="h-num-18 w-[30.8px] rounded-[31.5px]" alt="" />
                    <img className="relative h-4 w-4" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-num-8 border-whitesmoke-300 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center border-[1px] border-solid bg-gray-300 pt-px pb-0.5">
              <div className="relative h-7 w-[37px]">
                <div className="absolute top-[0px] left-[0px] flex items-center">
                  <div className="flex items-center justify-center gap-2.5">
                    <img className="relative h-4 w-4" alt="" />
                    <b className="tracking-num--0_01 leading-num-28 relative">0</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-num-8 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 bg-fuchsia-200 pt-px pb-0.5 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)]">
              <img className="relative h-4 w-4" alt="" />
              <div className="tracking-num--0_01 leading-num-28 relative font-semibold">Wallet</div>
              <div className="tracking-num--0_01 leading-num-28 font-nata-sans relative font-extrabold">
                $0.00
              </div>
            </div>
          </div>
          <div className="h-num-19 relative box-border w-px shrink-0 border-r-[1px] border-solid border-white opacity-[0.25]" />
          <div className="flex h-[46px] shrink-0 items-center gap-2">
            <img className="rounded-num-8 h-[38px] w-[38px]" alt="" />
            <div className="h-num-19 relative box-border w-px border-r-[1px] border-solid border-white opacity-[0.25]" />
            <img className="rounded-num-8 max-h-full w-10 self-stretch object-cover" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
