import { FunctionComponent } from 'react'

export const ShopProductCard: FunctionComponent = () => {
  return (
    <div className="rounded-num-8 border-darkslateblue w-num-281 box-border flex flex-col items-center justify-center gap-3 border-[1px] border-solid bg-gray-200 p-3">
      <img
        className="w-num-257 h-num-125 rounded-num-8 shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]"
        alt=""
      />
      <div className="flex w-36 flex-col items-center gap-0.5">
        <div className="flex items-center justify-center self-stretch">
          <div className="tracking-num-0_02 font-extrabold uppercase">AIRBNB</div>
        </div>
        <div className="text-num-16 text-whitesmoke-300 font-commissioner flex items-center justify-center gap-0.5">
          <div className="leading-num-24 font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">{`from `}</div>
          <div className="rounded-num-6 py-num-0 flex items-center justify-center px-1.5 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
            <b className="leading-num-24 [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              $2.50
            </b>
          </div>
        </div>
      </div>
      <div className="w-num-253 rounded-num-6 px-num-10 text-num-14 font-commissioner box-border flex items-center justify-center gap-[5px] bg-gray-700 py-1.5 text-left text-white">
        <img className="h-4 w-4" alt="" />
        <div className="tracking-num--0_01 leading-num-26 font-semibold">Quick Buy</div>
      </div>
    </div>
  )
}
