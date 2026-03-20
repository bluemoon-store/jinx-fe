import { FunctionComponent } from 'react'

export const ShopTopBar: FunctionComponent = () => {
  return (
    <header className="py-num-0 text-num-14 text-whitesmoke-100 font-commissioner box-border flex min-h-[75px] w-full items-center justify-between gap-2 overflow-y-auto border-b-[1px] border-solid border-gray-100 px-4 sm:gap-4 sm:px-6 lg:px-8 xl:px-24 2xl:px-56">
      <div className="flex items-center gap-[5px]">
        <img className="max-h-full w-[18px]" alt="" />
        <div className="tracking-num-0_02 font-extrabold">HOT SELLING PRODUCTS</div>
      </div>
      <div className="border-darkslateblue text-num-14 font-commissioner flex items-center justify-center gap-2 rounded-3xl border-[1.2px] border-solid bg-gray-200 px-3 py-2 text-white shadow-[0px_12px_12px_rgba(0,_0,_0,_0.01)]">
        <div className="leading-num-20 font-semibold">Hide Products</div>
        <img className="h-[3.9px] w-2 object-contain" alt="" />
      </div>
    </header>
  )
}
