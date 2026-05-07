import { FunctionComponent } from 'react'
import CentralIcon from '@central-icons-react/all'

import { sanitizeHtml } from '@/lib/sanitize-html'
import type { ProductDetail } from '@/types/product'

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

      <div className="text-whitesmoke-100 font-nata-sans flex flex-col items-start gap-2 self-stretch text-2xl sm:text-3xl lg:text-[30px]">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <div className="tracking-num-0_02 min-w-0 flex-1 leading-8 font-extrabold uppercase">
            {product.name}
          </div>
          {product.flair?.trim() ? (
            <span className="shrink-0 rounded-full border border-solid border-fuchsia-300/40 bg-fuchsia-500/15 px-2.5 py-1 text-xs font-semibold tracking-wide text-fuchsia-100 uppercase sm:text-sm">
              {product.flair.trim()}
            </span>
          ) : null}
        </div>
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

      {product.description.trim() ? (
        <div
          className="text-num-16 leading-num-24 font-roobert-trial text-lightsteelblue-100 prose prose-invert max-w-none self-stretch font-medium [&_a]:text-fuchsia-200"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description) }}
        />
      ) : null}
    </div>
  )
}
