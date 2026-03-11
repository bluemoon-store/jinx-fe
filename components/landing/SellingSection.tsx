import { FunctionComponent } from 'react'

const SellingSection: FunctionComponent = () => {
  type SellingLogo =
    | { variant: 'image'; src: string; alt?: string; className?: string }
    | {
        variant: 'nested'
        src: string
        alt?: string
        wrapperClassName: string
        imageClassName: string
      }

  type SellingItem = {
    name: string
    price: string
    logo: SellingLogo
  }

  const items: SellingItem[] = [
    {
      name: 'Dominos',
      price: '$2.50',
      logo: { variant: 'image', src: '/icons/Group 1865111722.svg', alt: 'Dominos logo' },
    },
    {
      name: 'Chipotle',
      price: '$2.50',
      logo: {
        variant: 'nested',
        src: '/icons/Vector 6.svg',
        alt: 'Dominos logo',
        wrapperClassName:
          'rounded-num-8 border-darkslateblue box-border flex h-full w-full items-center justify-center border-[1px] border-solid shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)] [background:linear-gradient(180deg,_#fff,_#fefefe)]',
        imageClassName: 'h-7 w-7 overflow-hidden sm:h-[32px] sm:w-[32px]',
      },
    },
    {
      name: 'Best Buy',
      price: '$2.50',
      logo: { variant: 'image', src: '/icons/Vector 6.svg', alt: 'Chipotle logo' },
    },
    {
      name: 'Netflix',
      price: '$2.50',
      logo: {
        variant: 'nested',
        src: '/icons/Vector 6.svg',
        alt: 'Chipotle logo',
        wrapperClassName:
          'rounded-num-8 bg-saddlebrown border-darkslateblue box-border flex h-full w-full items-center justify-center border-[1px] border-solid shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]',
        imageClassName: 'h-14 w-14 sm:h-[70px] sm:w-[70px]',
      },
    },
    {
      name: 'PlayStation',
      price: '$2.50',
      logo: {
        variant: 'image',
        src: '/icons/Vector 6.svg',
        alt: 'Best Buy logo',
        className: 'object-contain',
      },
    },
    {
      name: 'Dominos',
      price: '$2.50',
      logo: {
        variant: 'nested',
        src: '/icons/Vector 6.svg',
        alt: 'Best Buy logo',
        wrapperClassName:
          'rounded-num-8 border-darkslateblue box-border flex h-full w-full items-center justify-center border-[1px] border-solid shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)] [background:linear-gradient(180deg,_#005eff,_#1955bc)]',
        imageClassName: 'h-6 w-6 overflow-hidden sm:h-[28px] sm:w-[28px]',
      },
    },
    {
      name: 'Chipotle',
      price: '$2.50',
      logo: { variant: 'image', src: '/icons/Vector 6.svg', alt: 'Netflix logo' },
    },
    {
      name: 'Best Buy',
      price: '$2.50',
      logo: {
        variant: 'nested',
        src: '/icons/Vector 6.svg',
        alt: 'Netflix logo',
        wrapperClassName:
          'rounded-num-8 border-darkslateblue box-border flex h-full w-full items-center justify-center border-[1px] border-solid shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)] [background:linear-gradient(180deg,_#000,_#0a0a0a)]',
        imageClassName: 'h-12 w-12 sm:h-[58px] sm:w-[58px]',
      },
    },
    {
      name: 'Netflix',
      price: '$2.50',
      logo: {
        variant: 'nested',
        src: '/icons/Vector 6.svg',
        alt: 'PlayStation logo',
        wrapperClassName:
          'rounded-num-8 bg-dodgerblue border-darkslateblue box-border flex h-full w-full items-center justify-center border-[1px] border-solid shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]',
        imageClassName: 'h-10 w-10 sm:h-[50px] sm:w-[50px]',
      },
    },
    {
      name: 'PlayStation',
      price: '$2.50',
      logo: {
        variant: 'nested',
        src: '/icons/Vector 6.svg',
        alt: 'PlayStation logo',
        wrapperClassName:
          'rounded-num-8 bg-saddlebrown border-darkslateblue box-border flex h-full w-full items-center justify-center border-[1px] border-solid shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]',
        imageClassName: 'h-14 w-14 sm:h-[70px] sm:w-[70px]',
      },
    },
  ]

  return (
    <section>
      {/* Section header */}
      <div className="mx-auto w-full max-w-[1476.9px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 text-center sm:gap-2.5">
        <div className="flex items-center gap-[5px]">
          <div className="flex items-center gap-0.5">
            <div className="font-heydex flex items-center gap-[5px] text-[#FF2A2A]">
              <img className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" alt="" src="/icons/IconFire3.svg" />
              <div className="tracking-num-0.02 text-xl sm:text-2xl lg:text-[32px]">Hot</div>
            </div>
          </div>
          <div className="tracking-num-0.02 text-xl font-extrabold sm:text-2xl lg:text-[32px]">SELLING</div>
        </div>
        <div className="font-commissioner max-w-num-580 text-sm font-medium leading-6 text-white opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)] sm:text-base sm:leading-num-24">
          From everyday essentials to premium digital rewards
          <br /> discover categories built for instant access.
        </div>
      </div>
      </div>

      {/* Cards grid */}
      <div className="mx-auto mt-8 w-full max-w-[1476.9px] px-4 sm:mt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="w-full max-w-num-281 text-lg sm:text-[20px]">
              <div className="flex flex-col items-center">
                <img
                  className="rounded-num-8 h-auto w-full max-w-num-243.7 object-cover"
                  alt=""
                  src="/icons/Vector 6.svg"
                />

                <div className="rounded-num-8 box-border flex w-full flex-col items-center justify-center gap-3 px-4 py-4 [background:linear-gradient(180deg,rgba(255,42,42,0),rgba(255,42,42,0.25))_padding-box,linear-gradient(#0d1b35,#0d1b35)_padding-box,linear-gradient(76.58deg,#ff2a2a,rgba(255,42,42,0))_border-box,linear-gradient(237.38deg,#ff2a2a,rgba(255,42,42,0))_border-box] [border:1px_solid_transparent]">
                  {/* Logo */}
                  <div className="flex h-[88px] w-[88px] items-center justify-center sm:h-num-100 sm:w-num-100">
                    {item.logo.variant === 'nested' ? (
                      <div className={item.logo.wrapperClassName}>
                        <img
                          className={item.logo.imageClassName}
                          alt={item.logo.alt ?? ''}
                          src={item.logo.src}
                        />
                      </div>
                    ) : (
                      <img
                        className={`h-full w-full ${item.logo.className ?? ''}`}
                        alt={item.logo.alt ?? ''}
                        src={item.logo.src}
                      />
                    )}
                  </div>

                  {/* Name + price */}
                  <div className="flex w-36 flex-col items-center gap-0.5">
                    <div className="flex items-center justify-center gap-[5px] self-stretch">
                      <div className="tracking-num-0.02 font-extrabold uppercase">{item.name}</div>
                      <img className="h-num-20.2 w-num-31 shrink-0" alt="" src="/icons/Hot.svg" />
                      {/* <img
                        className="h-num-18 hidden w-[34px] shrink-0"
                        alt=""
                        src="/icons/Hot.svg"
                      /> */}
                    </div>
                    <div className="text-num-16 text-whitesmoke-200 font-commissioner flex items-center justify-center gap-0.5">
                      <div className="leading-num-24 font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">{`from `}</div>
                      <div className="rounded-num-6 py-num-0 flex items-center justify-center px-1.5 text-white [background:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.14))]">
                        <b className="leading-num-24 [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                          {item.price}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SellingSection
