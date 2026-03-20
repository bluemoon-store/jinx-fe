import Link from 'next/link'
import CentralIcon from '@central-icons-react/all'
import { FunctionComponent } from 'react'

type Props = {
  name: string
  fromPrice: string
  imageSrc: string
  detailHref: `/shop/${string}`
}

export const ShopProductCard: FunctionComponent<Props> = ({
  name,
  fromPrice,
  imageSrc,
  detailHref,
}) => {
  return (
    <Link
      href={detailHref}
      className="rounded-num-8 border-darkslateblue box-border flex w-full min-w-0 flex-col items-center justify-center gap-2 border-[1px] border-solid bg-[#0D1B35] p-3 sm:gap-3"
    >
      <img
        className="max-w-num-257 rounded-num-8 aspect-[257/125] w-full object-cover shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]"
        alt=""
        src={imageSrc}
      />
      <div className="flex w-full flex-col items-center gap-0.5 text-center max-w-none sm:max-w-none">
        <div className="flex items-center justify-center self-stretch">
          <div className="tracking-num-0_02 truncate text-xs font-extrabold uppercase sm:text-sm">
            {name}
          </div>
        </div>
        <div className="text-whitesmoke-300 font-commissioner sm:text-num-16 flex items-center justify-center gap-0.5 text-sm">
          <div className="text-[#C0BABF] leading-num-24 font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">{`from `}</div>
          <div className="rounded-num-6 py-num-0 flex items-center justify-center px-1.5 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
            <b className="leading-num-24 [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">{fromPrice}</b>
          </div>
        </div>
      </div>
      <div className="font-commissioner rounded-num-6 sm:px-num-10 sm:text-num-14 flex min-h-[44px] w-full min-w-0 items-center justify-center gap-1.5 bg-[#19263F] px-4 py-2 text-left text-white sm:gap-[5px] sm:py-1.5">
        <CentralIcon
          name="IconZap"
          join="round"
          fill="filled"
          stroke="1"
          radius="1"
          size={16}
          color="#FFFFFF"
        />
        <span className="tracking-num--0_01 leading-num-26 font-semibold">Quick Buy</span>
      </div>
    </Link>
  )
}
