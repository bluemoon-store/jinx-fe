import { FunctionComponent } from 'react'
import type { ShopProductDetail } from './types'

type Props = {
  product: ShopProductDetail
}

export const ShopDetailSummary: FunctionComponent<Props> = ({ product }) => {
  return (
    <div className="text-num-14 text-whitesmoke-200 flex flex-col items-start gap-5 self-stretch">
      <div className="flex items-center gap-[7px] self-stretch text-center">
        {product.breadcrumbs.map((crumb, idx) => (
          <div key={`${crumb}-${idx}`} className="contents">
            <div
              className={`leading-num-20 font-semibold ${idx === product.breadcrumbs.length - 1 ? '' : 'opacity-[0.25]'}`}
            >
              {crumb}
            </div>
            {idx !== product.breadcrumbs.length - 1 && (
              <img className="h-[7.5px] w-[3.8px] object-contain opacity-[0.25]" alt="" />
            )}
          </div>
        ))}
      </div>

      <div className="text-whitesmoke-100 font-nata-sans flex flex-col items-start self-stretch text-[30px]">
        <div className="tracking-num-0_02 leading-8 font-extrabold uppercase">
          {product.name}
        </div>
      </div>

      <div className="rounded-num-8 border-whitesmoke-400 p-num-10 flex items-center justify-center gap-2.5 border-[1.8px] border-solid bg-gray-200 text-center">
        <img className="h-4 w-4" alt="" />
        <div className="leading-num-20 font-semibold">{product.shortNotice}</div>
      </div>

      <div className="text-num-16 leading-num-24 font-roobert-trial text-lightsteelblue-100 self-stretch font-medium">
        {product.summary}
      </div>
    </div>
  )
}
