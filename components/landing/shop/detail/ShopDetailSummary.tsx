import { FunctionComponent } from 'react'
import type { ProductDetail } from '@/types/product'
import CentralIcon from '@central-icons-react/all'

type Props = {
  product: ProductDetail
}

export const ShopDetailSummary: FunctionComponent<Props> = ({ product }) => {
  return (
    <div className="text-num-14 text-whitesmoke-200 flex flex-col items-start gap-4 self-stretch sm:gap-5">
      <div className="flex flex-wrap items-center gap-1.5 self-stretch text-center sm:gap-[7px]">
        {product.breadcrumbs.map((crumb, idx) => (
          <div key={`${crumb}-${idx}`} className="contents">
            <div
              className={`leading-num-20 font-semibold ${idx === product.breadcrumbs.length - 1 ? '' : 'opacity-[0.25]'}`}
            >
              {crumb}
            </div>
            {idx !== product.breadcrumbs.length - 1 && (
              <CentralIcon
                name="IconChevronRight"
                join="round"
                fill="outlined"
                stroke="2"
                radius="1"
                size={12}
                className="text-whitesmoke-200 opacity-25"
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-whitesmoke-100 font-nata-sans flex flex-col items-start self-stretch text-2xl sm:text-3xl lg:text-[30px]">
        <div className="tracking-num-0_02 leading-8 font-extrabold uppercase">{product.name}</div>
      </div>

      {product.shortNotice ? (
        <div className="rounded-num-8 border-whitesmoke-300 p-num-10 flex items-center justify-center gap-2.5 border-[1.8px] border-solid bg-gray-100 text-center">
          <CentralIcon
            name="IconCloudCheck"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            className="text-whitesmoke-200"
          />
          <div className="leading-num-20 font-semibold">{product.shortNotice}</div>
        </div>
      ) : null}

      <div className="text-num-16 leading-num-24 font-roobert-trial text-lightsteelblue-100 self-stretch font-medium">
        {product.description}
      </div>
    </div>
  )
}
