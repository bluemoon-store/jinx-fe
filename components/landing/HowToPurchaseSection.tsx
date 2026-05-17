import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/reveal'
import { LANDING_TEXT_DEFAULTS } from '@/lib/landing-texts'

type Props = {
  description?: string
}

export default async function HowToPurchaseSection({
  description = LANDING_TEXT_DEFAULTS.howToDesc,
}: Props = {}) {
  const steps = [
    {
      id: 1,
      title: 'SELECT GIFTCARD',
      description: 'Browse our catalog of giftcards and select the one you want.',
      iconSrc: '/icons/IconCursorClick.svg',
      imageSrc: '/icons/purchase-1.svg',
    },
    {
      id: 2,
      title: 'CHOOSE PAYMENT',
      description: 'We accept all major cryptocurrencies from BTC, ETH, USDT and LTC.',
      iconSrc: '/icons/IconBitcoinLogo.svg',
      imageSrc: '/icons/purchase-2.svg',
    },
    {
      id: 3,
      title: 'RECEIVE PRODUCTS',
      description: 'Your giftcard will be delivered digitally, or directly to your Jinx Account.',
      iconSrc: '/icons/IconShoppingBag1.svg',
      imageSrc: '/icons/purchase-3.svg',
    },
  ]

  return (
    <section>
      {/* Section header */}
      <Reveal variant="fade-up">
        <div className="mx-auto flex w-full max-w-[1476.9px] flex-col items-center gap-2 px-4 text-center sm:px-6 lg:gap-2.5 lg:px-8">
          <div className="flex items-center gap-1 text-2xl sm:text-3xl lg:text-[32px]">
            <div className="tracking-num-0_02 font-extrabold">HOW TO</div>
            <div className="text-gold font-heydex flex items-center gap-1 lg:gap-[5px]">
              <img className="h-5 w-5 lg:h-7 lg:w-7" alt="" src="/icons/IconBasket2.svg" />
              <div className="tracking-num-0_02">PuRChASE</div>
            </div>
          </div>
          <div className="font-commissioner max-w-num-580 sm:leading-num-24 text-foreground text-sm leading-6 font-medium opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] sm:text-base dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            {description}
          </div>
        </div>
      </Reveal>

      {/* Steps grid */}
      <div className="mx-auto mt-6 w-full max-w-[1476.9px] px-4 sm:px-6 lg:mt-10 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-4">
          {steps.map((step, idx) => {
            return (
              <Reveal key={step.id} variant="fade-up" delay={idx * 120}>
                <button
                  key={step.id}
                  type="button"
                  className={cn(
                    'group rounded-num-8 focus-visible:ring-cornflowerblue border-border-subtle hover:border-cornflowerblue bg-card hover:bg-card-elevated box-border flex w-full flex-col justify-end border-[1px] border-solid p-4 text-left text-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none sm:min-h-[200px] sm:p-5 lg:min-h-[300px] lg:p-6 lg:text-[24px]',
                    'dark:border-darkslateblue dark:bg-[linear-gradient(180deg,_rgba(139,_92,_246,_0),_rgba(139,_92,_246,_0.05)),_linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_linear-gradient(#0d1b35,_#0d1b35)] dark:hover:[background:linear-gradient(180deg,_rgba(92,_133,_246,_0),_rgba(92,_133,_246,_0.2)),_linear-gradient(#0d1b35,_#0d1b35)]'
                  )}
                >
                  <div className="mx-auto flex w-full max-w-[325.5px] flex-col items-center gap-2 lg:gap-3">
                    <img className="mb-2.5 h-full w-full lg:mb-3" alt="" src={step.imageSrc} />
                    <div className="flex items-center justify-center gap-2.5 self-stretch lg:gap-3">
                      <div
                        className={cn(
                          'border-border-subtle bg-foreground/10 dark:border-darkslateblue flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-solid opacity-70 transition-opacity duration-200 group-hover:opacity-100 lg:h-10 lg:w-10 dark:bg-white/5'
                        )}
                      >
                        <img className="h-5 w-5 lg:h-6 lg:w-6" alt="" src={step.iconSrc} />
                      </div>
                      <div className="tracking-num-0_02 text-foreground leading-tight font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_18.58px_rgba(0,0,0,0.6)]">
                        {step.title}
                      </div>
                    </div>
                    <div className="font-commissioner text-muted-foreground dark:text-lightsteelblue-200 self-stretch text-center text-sm leading-snug font-medium [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] lg:text-base dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                      {step.description}
                    </div>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
