import { FunctionComponent } from 'react'
import type { ShopRelatedProduct } from './types'

type Props = {
  related: ShopRelatedProduct[]
}

export const ShopDetailRelatedProducts: FunctionComponent<Props> = ({ related }) => {
  return (
    <section className="font-nata-sans w-full text-[20px]">
      <div className="flex items-center justify-between gap-4 pb-4 text-left">
        <div className="tracking-num-0_02 font-extrabold uppercase text-ghostwhite">Related Products</div>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-[17px] sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-4">
      {related.map((p) => (
        <div
          key={p.id}
          className="w-num-281 rounded-num-8 border-darkslateblue p-num-12 box-border flex flex-col items-center justify-center gap-3 border-[1px] border-solid bg-gray-200"
        >
          <img
            className="w-num-257 h-num-125 rounded-num-8 shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]"
            alt=""
            src={p.imageSrc}
          />
          <div className="flex w-36 flex-col items-center gap-0.5">
            <div className="flex items-center justify-center self-stretch">
              <div className="tracking-num-0_02 font-extrabold uppercase">{p.name}</div>
            </div>
            <div className="text-num-16 text-whitesmoke-300 font-commissioner flex items-center justify-center gap-0.5">
              <div className="leading-num-24 font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">{`from `}</div>
              <div className="rounded-num-6 py-num-0 px-num-6 flex items-center justify-center text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
                <b className="leading-num-24 [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                  {p.fromPrice}
                </b>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </section>
  )
}
