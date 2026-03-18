import { FunctionComponent } from 'react'

export const ShopProductsHeader: FunctionComponent = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <div className="flex items-center">
        <div className="tracking-num-0_02 font-extrabold uppercase">All Products</div>
      </div>
      <div className="text-num-14 text-lightsteelblue-200 font-commissioner flex items-center gap-2.5 text-right">
        <div className="leading-num-20 font-semibold">{`Available Products : `}</div>
        <div className="rounded-num-6 py-num-0 flex items-center justify-center px-1.5 text-center text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
          <b className="leading-num-20 [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">125</b>
        </div>
      </div>
    </div>
  )
}
