import { getProductsAction } from '@/actions/product'
import { Reveal } from '@/components/ui/reveal'

import NewlyLaunchedProductsClient from './NewlyLaunchedProductsClient'

export default async function NewlyLaunchedSection() {
  let items: Awaited<ReturnType<typeof getProductsAction>>['items'] = []
  try {
    const result = await getProductsAction({ isNew: true, limit: 5 })
    items = result.items
  } catch {
    items = []
  }

  return (
    <section className="text-base lg:text-[20px]">
      <Reveal variant="fade-up">
        <div className="mx-auto flex w-full max-w-[1476.9px] flex-col items-center gap-2 px-4 text-center sm:px-6 lg:gap-2.5 lg:px-8">
          <div className="font-heydex text-limegreen flex items-center gap-2 text-2xl lg:gap-2.5 lg:text-[32px]">
            <div className="flex items-center gap-1">
              <img className="h-5 w-5 lg:h-7 lg:w-7" alt="" src="/icons/IconStarLines.svg" />
              <div className="tracking-num-0_02">NEWLY</div>
            </div>
            <div className="tracking-num-0_02 font-nata-sans text-foreground font-extrabold">
              LAUNCHED
            </div>
          </div>
          <div className="font-commissioner text-foreground w-full max-w-[580px] text-sm font-medium opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] sm:text-base dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Just added to Jinx Store, all new giftcards for you.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </Reveal>

      <NewlyLaunchedProductsClient items={items} />
    </section>
  )
}
