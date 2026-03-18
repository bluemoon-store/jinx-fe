import { FunctionComponent } from 'react'

export const ShopProgress: FunctionComponent = () => {
  return (
    <div className="w-num-281 text-num-16 font-commissioner flex items-center justify-between gap-4 text-white">
      <div className="h-[3px] w-[196px]">
        <div className="rounded-num-8 bg-fuchsia h-[3px] w-[196px] opacity-[0.25] shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)]" />
        <div className="rounded-num-8 bg-fuchsia -mt-[3px] h-[3px] w-[31.9px] shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)]" />
      </div>
      <div className="flex items-center">
        <div className="leading-num-24 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
          24 of 240
        </div>
      </div>
    </div>
  )
}
