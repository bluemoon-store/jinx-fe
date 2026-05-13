import { getProductsAction } from '@/actions/product'
import { Reveal } from '@/components/ui/reveal'

import FreshlyRestockedProductsClient from './FreshlyRestockedProductsClient'

export default async function FreshlyRestockedSection() {
  let items: Awaited<ReturnType<typeof getProductsAction>>['items'] = []
  try {
    const result = await getProductsAction({
      isRestocked: true,
      limit: 59,
      sortBy: 'updatedAt',
      sortOrder: 'desc',
    })
    items = result.items
  } catch {
    items = []
  }

  return (
    <section className="overflow-x-hidden text-sm sm:text-base lg:text-lg">
      <Reveal variant="fade-up">
        <div className="mx-auto w-full max-w-[1476.9px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-2 text-center sm:gap-2.5 lg:gap-3">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <div className="tracking-num-0.02 text-2xl font-extrabold sm:text-3xl lg:text-[32px]">
                FRESHLY
              </div>
              <div className="text-mediumslateblue-100 font-heydex flex items-center gap-1.5 sm:gap-2">
                <img
                  className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                  alt=""
                  src="/icons/IconPlanning.svg"
                />
                <div className="tracking-num-0.02 text-2xl font-extrabold sm:text-3xl lg:text-[32px]">
                  ReSToCKED
                </div>
              </div>
            </div>
            <div className="font-commissioner max-w-num-580 sm:leading-num-24 text-foreground text-sm leading-6 font-medium opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] sm:text-base dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
              Products with stocks just refreshed, they keep selling so quick.
              <br className="hidden sm:block" />
              <span className="hidden sm:inline">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      <FreshlyRestockedProductsClient items={items} />
    </section>
  )
}
