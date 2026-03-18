import { FunctionComponent } from 'react'
import type { ShopProductDetail } from './types'

type Props = {
  product: ShopProductDetail
}

export const ShopDetailHero: FunctionComponent<Props> = ({ product }) => {
  return (
    <section className="text-whitesmoke-200 flex flex-col items-start justify-center">
      <div className="flex flex-col items-start self-stretch">
        <div className="border-whitesmoke-400 flex flex-col items-center justify-center gap-5 overflow-hidden rounded-[14.61px] border-[1.8px] border-solid bg-gray-200 px-[50px] pb-[25px] pt-[50px]">
          <img
            className="h-[228.3px] w-[469.4px] rounded-[14.61px] shadow-[0px_0px_15.76px_rgba(0,_0,_0,_0.6)]"
            alt=""
            src={product.heroImageSrc}
          />
          <div className="flex items-start justify-center gap-3">
            {product.tags.includes('Hot') && (
              <div className="flex items-center gap-[3.7px] rounded-[90.41px] border-[0.9px] border-solid border-red-100 bg-red-300 px-[7.3px] py-[3.7px] shadow-[0px_2.7397475242614746px_0px_rgba(255,_42,_42,_0.1)]">
                <img className="max-h-full w-4" alt="" />
                <div className="leading-num-20 font-semibold">Hot</div>
              </div>
            )}
            {product.tags.includes('NFA') && (
              <div className="bg-steelblue-200 border-steelblue-100 flex items-center gap-[3.7px] rounded-[90.41px] border-[0.9px] border-solid px-[7.3px] py-[3.7px] shadow-[0px_2.7397475242614746px_0px_rgba(0,_107,_182,_0.1)]">
                <img className="max-h-full w-4" alt="" />
                <div className="flex flex-col items-center">
                  <div className="leading-num-20 font-semibold">NFA</div>
                </div>
              </div>
            )}
            {product.tags.includes('New') && (
              <div className="bg-gold-200 border-gold-100 flex items-center gap-[3.7px] rounded-[90.41px] border-[0.9px] border-solid px-[7.3px] py-[3.7px] shadow-[0px_2.7397475242614746px_0px_rgba(255,_237,_49,_0.1)]">
                <img className="max-h-full w-4" alt="" />
                <div className="flex flex-col items-center">
                  <div className="leading-num-20 font-semibold">New</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
