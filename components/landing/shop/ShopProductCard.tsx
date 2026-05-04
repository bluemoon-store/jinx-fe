import Link from 'next/link'
import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, MouseEvent } from 'react'

type Props = {
  name: string
  fromPrice: string
  imageSrc: string
  flair?: string | null
  iconUrl?: string | null
  detailHref: `/shop/${string}`
  onQuickBuy?: () => void
}

export const ShopProductCard: FunctionComponent<Props> = ({
  name,
  fromPrice,
  imageSrc,
  flair,
  iconUrl,
  detailHref,
  onQuickBuy,
}) => {
  const flairText = flair?.trim() ?? ''
  const handleQuickBuyClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onQuickBuy?.()
  }

  return (
    <div className="rounded-num-8 border-darkslateblue box-border flex w-full min-w-0 flex-col items-center justify-center gap-2 border-[1px] border-solid bg-[#0D1B35] p-3 sm:gap-3">
      <Link href={detailHref} className="flex w-full flex-col items-center gap-2 sm:gap-3">
        <img
          className="max-w-num-257 rounded-num-8 aspect-[257/125] w-full object-cover shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]"
          alt=""
          src={imageSrc}
        />
        <div className="flex w-full max-w-none flex-col items-center gap-0.5 text-center sm:max-w-none">
          <div className="flex min-w-0 flex-wrap items-center justify-center gap-1.5 self-stretch">
            {iconUrl ? (
              <img
                src={iconUrl}
                alt=""
                className="border-darkslateblue size-5 shrink-0 rounded object-cover ring-1 ring-white/10 sm:size-6"
              />
            ) : null}
            <div className="tracking-num-0_02 min-w-0 truncate text-xs font-extrabold uppercase sm:text-sm">
              {name}
            </div>
            {flairText ? (
              <span className="border-fuchsia-300/40 bg-fuchsia-500/15 text-fuchsia-100 shrink-0 rounded-full border border-solid px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase sm:text-[11px]">
                {flairText}
              </span>
            ) : null}
          </div>
          <div className="text-whitesmoke-300 font-commissioner sm:text-num-16 flex items-center justify-center gap-0.5 text-sm">
            <div className="leading-num-24 font-medium text-[#C0BABF] [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">{`from `}</div>
            <div className="rounded-num-6 py-num-0 flex items-center justify-center px-1.5 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
              <b className="leading-num-24 [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                {fromPrice}
              </b>
            </div>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={handleQuickBuyClick}
        className="font-commissioner rounded-num-6 sm:px-num-10 sm:text-num-14 py-num-8 box-border flex h-10 w-full min-w-0 items-center justify-center gap-1.5 bg-[#19263F] px-4 text-left text-white sm:gap-[5px]"
      >
        <CentralIcon
          name="IconZap"
          join="round"
          fill="filled"
          stroke="1"
          radius="1"
          size={16}
          color="#FFFFFF"
        />
        <span className="tracking-num--0_01 leading-num-24 font-semibold">Quick Buy</span>
      </button>
    </div>
  )
}
