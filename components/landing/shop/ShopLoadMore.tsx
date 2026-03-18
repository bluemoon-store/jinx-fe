import { FunctionComponent } from 'react'

export const ShopLoadMore: FunctionComponent = () => {
  return (
    <div className="border-darkslateblue py-num-10 text-num-16 font-commissioner flex items-center justify-center gap-2.5 rounded-[30px] border-[1.5px] border-solid bg-gray-200 px-6 text-white shadow-[0px_15px_15px_rgba(0,_0,_0,_0.01)]">
      <div className="leading-num-24 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
        Load More Products
      </div>
      <img className="h-[3.9px] w-2" alt="" />
    </div>
  )
}
