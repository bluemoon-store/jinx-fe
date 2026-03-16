'use client'

import { FunctionComponent } from 'react'
import { Reveal } from '@/components/ui/reveal'

const FeaturesSection: FunctionComponent = () => {
  const features = [
    {
      title: 'Instant Access',
      description: 'Get instant access to your favorite brands and services.',
      borderClass: 'border-mediumslateblue-200',
      icon: '/icons/IconClockAlert.svg',
      bgClass:
        '[background:linear-gradient(180deg,_rgba(139,_92,_246,_0),_rgba(139,_92,_246,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]',
    },
    {
      title: 'Exclusive Deals',
      description: 'Get access to exclusive deals and discounts.',
      borderClass: 'border-coral',
      icon: '/icons/IconShieldCrossed.svg',
      bgClass:
        '[background:linear-gradient(180deg,_rgba(246,_138,_92,_0),_rgba(246,_138,_92,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]',
    },
    {
      title: 'No Hidden Fees',
      description: "We don't charge any hidden fees or taxes.",
      borderClass: 'border-mediumvioletred-200',
      icon: '/icons/IconSupport.svg',
      bgClass:
        '[background:linear-gradient(180deg,_rgba(217,_27,_144,_0),_rgba(217,_27,_144,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]',
    },
    {
      title: 'Easy to Use',
      description: 'Our platform is easy to use and navigate.',
      borderClass: 'border-hotpink',
      icon: '/icons/IconShieldCheck.svg',
      bgClass:
        '[background:linear-gradient(180deg,_rgba(246,_92,_138,_0),_rgba(246,_92,_138,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]',
    },
    {
      title: 'Safe & Secure',
      description: 'Your transactions are safe, secure and encrypted.',
      borderClass: 'border-red',
      icon: '/icons/IconReview.svg',
      bgClass:
        '[background:linear-gradient(180deg,_rgba(255,_42,_42,_0),_rgba(255,_42,_42,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]',
    },
    {
      title: 'Fast Delivery',
      description: 'Your giftcards are delivered instantly to your account.',
      borderClass: 'border-mediumspringgreen',
      icon: '/icons/IconTouch.svg',
      bgClass:
        '[background:linear-gradient(180deg,_rgba(12,_201,_103,_0),_rgba(12,_201,_103,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]',
    },
    {
      title: '24/7 Support',
      description: 'Our support team is available 24/7 to help you.',
      borderClass: 'border-deepskyblue-200',
      icon: '/icons/IconBasket1.svg',
      bgClass:
        '[background:linear-gradient(180deg,_rgba(0,_212,_255,_0),_rgba(0,_212,_255,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]',
    },
    {
      title: 'Wide Selection',
      description: 'We have a wide selection of giftcards to choose from.',
      borderClass: 'border-mediumslateblue-200',
      icon: '/icons/IconFullscreen.svg',
      bgClass:
        '[background:linear-gradient(180deg,_rgba(139,_92,_246,_0),_rgba(139,_92,_246,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]',
    },
  ] as const

  return (
    <section className="text-left text-sm lg:text-base">
      {/* Section header */}
      <Reveal variant="fade-up">
        <div className="mx-auto flex w-full max-w-[1476.9px] flex-col items-center gap-2 px-4 text-center sm:px-6 lg:gap-2.5 lg:px-8">
          <div className="flex items-center gap-1 text-xl sm:text-2xl lg:text-[32px]">
            <div className="tracking-num-0_02 font-extrabold">PACKED WITH</div>
            <div className="text-mediumvioletred-100 font-heydex flex items-center gap-1 lg:gap-[5px]">
              <img className="h-5 w-5 lg:h-7 lg:w-7" alt="" src="/icons/IconSpeedDots.svg" />
              <div className="tracking-num-0_02">FeatuRES</div>
            </div>
          </div>
          <div className="font-commissioner w-full max-w-[580px] text-sm font-medium text-white opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)] sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </Reveal>

      {/* Feature grid */}
      <div className="mx-auto mt-6 w-full max-w-[1476.9px] px-4 sm:px-6 lg:mt-10 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
          {features.map((feature, idx) => (
            <Reveal
              key={feature.title}
              variant="scale-in"
              delay={idx * 60}
              className={`rounded-num-8 flex flex-col items-start border-[1px] border-solid p-4 lg:p-[16px] ${feature.borderClass} ${feature.bgClass}`}
            >
              <div className="flex w-full items-start justify-start gap-2.5 lg:gap-3">
                <img
                  className="mt-0.5 h-5 w-5 flex-shrink-0 lg:h-7 lg:w-7"
                  alt=""
                  src={feature.icon}
                />
                <div className="flex flex-1 flex-col items-start gap-1 lg:gap-[5px]">
                  <div className="tracking-num-0_02 self-stretch leading-snug font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">
                    {feature.title}
                  </div>
                  <div className="font-commissioner text-lightsteelblue-200 self-stretch text-sm leading-snug font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                    {feature.description}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
