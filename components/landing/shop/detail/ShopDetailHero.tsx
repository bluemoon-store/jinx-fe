import { FunctionComponent } from 'react'
import type { ProductDetail } from '@/types/product'
import CentralIcon from '@central-icons-react/all'

type Props = {
  product: ProductDetail
}

export const ShopDetailHero: FunctionComponent<Props> = ({ product }) => {
  const heroSrc = product.heroImageUrl ?? product.primaryImageUrl ?? ''

  return (
    <section className="text-whitesmoke-200 flex flex-col items-start justify-center">
      <div className="flex flex-col items-start self-stretch">
        <div className="border-whitesmoke-300 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[14.61px] border-[1.8px] border-solid bg-gray-100 px-4 pt-6 pb-4 sm:gap-5 sm:px-6 sm:pt-8 sm:pb-5 md:px-8 md:pt-10 md:pb-5 lg:px-12 lg:pt-[50px] lg:pb-[25px] xl:px-[50px]">
          <div className="h-full w-full overflow-hidden rounded-[14.61px] shadow-[0px_0px_15.76px_rgba(0,_0,_0,_0.6)]">
            <img alt="" src={heroSrc} className="max-h-full max-w-full scale-110 object-contain" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {product.tags.includes('Hot') && (
              <div className="flex items-center gap-[3.7px] rounded-[90.41px] border-[0.9px] border-solid border-[#FF0000] bg-[#FF0000]/25 px-[7.3px] py-[3.7px] shadow-[0px_2.7397475242614746px_0px_rgba(255,_42,_42,_0.1)]">
                <CentralIcon
                  name="IconFire3"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={16}
                  className="text-[#FF0000]"
                />
                <div className="leading-num-20 font-semibold">Hot</div>
              </div>
            )}
            {product.tags.includes('NFA') && (
              <div className="flex items-center gap-[3.7px] rounded-[90.41px] border-[0.9px] border-solid border-[#006BB6] bg-[#006BB6]/25 px-[7.3px] py-[3.7px] shadow-[0px_2.7397475242614746px_0px_rgba(0,_107,_182,_0.1)]">
                <CentralIcon
                  name="IconLock"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={16}
                  className="text-[#006BB6]"
                />
                <div className="flex flex-col items-center">
                  <div className="leading-num-20 font-semibold">NFA</div>
                </div>
              </div>
            )}
            {product.tags.includes('New') && (
              <div className="flex items-center gap-[3.7px] rounded-[90.41px] border-[0.9px] border-solid border-[#FFD900] bg-[#FFD900]/25 px-[7.3px] py-[3.7px] shadow-[0px_2.7397475242614746px_0px_rgba(255,_237,_49,_0.1)]">
                <CentralIcon
                  name="IconStar"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={16}
                  className="text-[#FFD900]"
                />
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
