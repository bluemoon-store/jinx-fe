import { FunctionComponent } from 'react'

export const ShopSearchBar: FunctionComponent = () => {
  return (
    <div className="rounded-num-8 border-whitesmoke-200 py-num-10 text-num-16 font-commissioner box-border flex w-full items-center justify-between gap-5 overflow-hidden border-[1px] border-solid bg-gray-200 px-3 text-left text-white">
      <div className="flex items-center gap-2.5">
        <img className="h-num-18 w-[18px]" alt="" />
        <div className="tracking-num--0_01 leading-num-28 font-semibold opacity-[0.5]">
          Search for any product or bundle
        </div>
      </div>
      <img className="rounded-num-8 h-7 w-[30.4px]" alt="" />
    </div>
  )
}
