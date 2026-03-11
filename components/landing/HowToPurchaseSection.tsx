'use client'

import { FunctionComponent, useState } from 'react'
import { cn } from '@/lib/utils'

const HowToPurchaseSection: FunctionComponent = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)

  const steps = [
    {
      id: 1,
      title: 'SELECT GIFTCARD',
      description: 'Browse our catalog of giftcards and select the one you want.',
      iconSrc: '/icons/IconCursorClick.svg',
    },
    {
      id: 2,
      title: 'CHOOSE PAYMENT',
      description: 'We accept all major cryptocurrencies from BTC, ETH, USDT and LTC.',
      iconSrc: '/icons/IconBitcoinLogo.svg',
    },
    {
      id: 3,
      title: 'RECEIVE PRODUCTS',
      description: 'Your giftcard will be delivered digitally, or directly to your Jinx Account.',
      iconSrc: '/icons/IconShoppingBag1.svg',
    },
  ]

  return (
    <section>
      {/* Section header */}
      <div className="mx-auto flex w-full max-w-[1476.9px] flex-col items-center gap-2 px-4 text-center sm:px-6 lg:gap-2.5 lg:px-8">
        <div className="flex items-center gap-1 text-xl sm:text-2xl lg:text-[32px]">
          <div className="tracking-num-0_02 font-extrabold">HOW TO</div>
          <div className="text-gold font-heydex flex items-center gap-1 lg:gap-[5px]">
            <img className="h-5 w-5 lg:h-7 lg:w-7" alt="" src="/icons/IconBasket2.svg" />
            <div className="tracking-num-0_02">PuRChASE</div>
          </div>
        </div>
        <div className="font-commissioner w-full max-w-[580px] text-sm font-medium text-white opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)] sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>

      {/* Steps grid */}
      <div className="mx-auto mt-6 w-full max-w-[1476.9px] px-4 sm:px-6 lg:mt-10 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-4">
          {steps.map((step) => {
            const isSelected = selectedStep === step.id

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setSelectedStep(step.id)}
                className={cn(
                  'rounded-num-8 focus-visible:ring-cornflowerblue box-border flex w-full flex-col justify-end border-[1px] border-solid p-4 text-left text-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none sm:min-h-[200px] sm:p-5 lg:min-h-[300px] lg:p-6 lg:text-[24px]',
                  isSelected
                    ? 'border-cornflowerblue [background:linear-gradient(180deg,_rgba(92,_133,_246,_0),_rgba(92,_133,_246,_0.2)),_linear-gradient(#0d1b35,_#0d1b35)]'
                    : 'border-darkslateblue [background:linear-gradient(180deg,_rgba(139,_92,_246,_0),_rgba(139,_92,_246,_0.05)),_linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_linear-gradient(#0d1b35,_#0d1b35)]'
                )}
              >
                <div className="mx-auto flex w-full max-w-[325.5px] flex-col items-center gap-2 lg:gap-3">
                  <div className="flex items-start justify-center gap-2.5 self-stretch lg:gap-3">
                    <div
                      className={cn(
                        'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-solid transition-opacity duration-200 lg:h-10 lg:w-10',
                        isSelected
                          ? 'border-cornflowerblue bg-[rgba(92,133,246,0.15)]'
                          : 'border-darkslateblue bg-white/5 opacity-40'
                      )}
                    >
                      <img className="h-5 w-5 lg:h-6 lg:w-6" alt="" src={step.iconSrc} />
                    </div>
                    <div className="tracking-num-0_02 leading-tight font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">
                      {step.title}
                    </div>
                  </div>
                  <div className="font-commissioner text-lightsteelblue-200 self-stretch text-sm leading-snug font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)] lg:text-base">
                    {step.description}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowToPurchaseSection
