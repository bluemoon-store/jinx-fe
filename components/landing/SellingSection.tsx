import { getProductsAction } from '@/actions/product'
import { Reveal } from '@/components/ui/reveal'

import SellingHotProductsClient from './SellingHotProductsClient'

export default async function SellingSection() {
  let items: Awaited<ReturnType<typeof getProductsAction>>['items'] = []
  try {
    const result = await getProductsAction({ isHot: true, limit: 10 })
    items = result.items
  } catch {
    items = []
  }

  return (
    <section>
      <Reveal variant="fade-up">
        <div className="mx-auto w-full max-w-[1476.9px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-2 text-center sm:gap-2.5">
            <div className="flex items-center gap-[5px]">
              <div className="flex items-center gap-0.5">
                <div className="font-heydex flex items-center gap-[5px] text-[#FF2A2A]">
                  <img
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                    alt=""
                    src="/icons/IconFire3.svg"
                  />
                  <div className="tracking-num-0.02 text-xl sm:text-2xl lg:text-[32px]">Hot</div>
                </div>
              </div>
              <div className="tracking-num-0.02 text-xl font-extrabold sm:text-2xl lg:text-[32px]">
                SELLING
              </div>
            </div>
            <div className="font-commissioner max-w-num-580 sm:leading-num-24 text-foreground text-sm leading-6 font-medium opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] sm:text-base dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
              From everyday essentials to premium digital rewards
              <br /> discover categories built for instant access.
            </div>
          </div>
        </div>
      </Reveal>

      <SellingHotProductsClient items={items} />
    </section>
  )
}
