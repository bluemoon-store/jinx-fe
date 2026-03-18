import { FunctionComponent } from 'react'

export const ShopDetailTopNav: FunctionComponent = () => {
  return (
    <header className="py-num-0 text-whitesmoke-200 box-border flex min-h-[75px] w-full items-center justify-between gap-4 overflow-y-auto border-b-[1px] border-solid border-gray-100 px-6 lg:px-56">
      <div className="flex h-20 flex-1 shrink-0 items-center gap-[15px]">
        <img className="h-[45.3px] w-[82px]" alt="" />
        <div className="box-border h-[19px] w-px border-r-[1px] border-solid border-white opacity-[0.25]" />
        <div className="flex items-center gap-3.5 self-stretch">
          <div className="flex flex-col items-start justify-center self-stretch text-white">
            <div className="px-num-4 flex flex-1 flex-col items-center justify-center py-[13.6px]">
              <div className="rounded-num-12 py-num-6 px-num-12 flex items-start gap-1.5">
                <img className="h-[21px] w-[21px]" alt="" />
                <div className="leading-num-20 font-semibold">Shop</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center self-stretch opacity-[0.75]">
            <div className="px-num-4 flex flex-1 flex-col items-start py-[13.6px]">
              <div className="py-num-16 px-num-0 flex items-center gap-2">
                <img className="h-[21px] w-[21px]" alt="" />
                <div className="flex flex-col items-center">
                  <div className="leading-num-20 font-semibold">Drops</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center self-stretch opacity-[0.75]">
            <div className="px-num-4 flex flex-1 flex-col items-start py-[13.6px]">
              <div className="py-num-16 px-num-0 flex items-center gap-2">
                <img className="h-[21px] w-[21px]" alt="" />
                <div className="flex flex-col items-center">
                  <div className="leading-num-20 font-semibold">FAQs</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center self-stretch opacity-[0.75]">
            <div className="px-num-4 flex flex-1 flex-col items-start py-[13.6px]">
              <div className="py-num-16 px-num-0 flex items-center gap-2">
                <img className="h-[21px] w-[21px]" alt="" />
                <div className="flex flex-col items-center">
                  <div className="leading-num-20 font-semibold">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-num-16 text-ghostwhite flex h-20 flex-1 shrink-0 items-center justify-end text-left">
        <div className="rounded-num-12 px-num-0 flex items-center justify-center gap-2 self-stretch py-[26px]">
          <div className="flex shrink-0 items-center justify-center gap-2 self-stretch">
            <div className="rounded-num-8 border-whitesmoke-500 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center border-[1px] border-solid bg-gray-300 pt-px pb-0.5">
              <div className="flex h-num-18 w-[82.8px] items-center justify-center">
                <div className="flex items-center justify-center gap-2.5">
                  <img className="h-4 w-4" alt="" />
                  <img className="h-num-18 w-[30.8px] rounded-[31.5px]" alt="" />
                  <img className="h-4 w-4" alt="" />
                </div>
              </div>
            </div>
            <div className="rounded-num-8 border-whitesmoke-500 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center border-[1px] border-solid bg-gray-300 pt-px pb-0.5">
              <div className="flex h-7 w-[37px] items-center justify-center">
                <div className="flex items-center justify-center gap-2.5">
                  <img className="h-4 w-4" alt="" />
                  <b className="tracking-num--0_01 leading-num-28">0</b>
                </div>
              </div>
            </div>
            <div className="rounded-num-8 bg-fuchsia px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 pt-px pb-0.5 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)]">
              <img className="h-4 w-4" alt="" />
              <div className="tracking-num--0_01 leading-num-28 font-semibold">Wallet</div>
              <div className="tracking-num--0_01 leading-num-28 font-nata-sans font-extrabold">
                $0.00
              </div>
            </div>
          </div>
          <div className="box-border h-[19px] w-px shrink-0 border-r-[1px] border-solid border-white opacity-[0.25]" />
          <div className="flex h-[46px] shrink-0 items-center gap-2">
            <img className="rounded-num-8 h-[38px] w-[38px]" alt="" />
            <div className="box-border h-[19px] w-px border-r-[1px] border-solid border-white opacity-[0.25]" />
            <img className="rounded-num-8 max-h-full w-10 self-stretch object-cover" alt="" />
          </div>
        </div>
      </div>
    </header>
  )
}
