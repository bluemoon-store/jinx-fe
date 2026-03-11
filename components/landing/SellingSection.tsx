import { FunctionComponent } from 'react'

const SellingSection: FunctionComponent = () => {
  type SellingLogo = {
    src: string
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
      logo: {
        src: '/icons/dominos.svg',
      },
    },
    {
      name: 'Chipotle',
      price: '$2.50',
      logo: {
        src: '/icons/dominos.svg',
      },
    },
    {
      name: 'Best Buy',
      price: '$2.50',
      logo: {
        src: '/icons/dominos.svg',
      },
    },
    {
      name: 'Netflix',
      price: '$2.50',
      logo: {
        src: '/icons/dominos.svg',
      },
    },
    {
      name: 'PlayStation',
      price: '$2.50',
      logo: {
        src: '/icons/dominos.svg',
      },
    },
    {
      name: 'Dominos',
      price: '$2.50',
      logo: {
        src: '/icons/dominos.svg',
      },
    },
    {
      name: 'Chipotle',
      price: '$2.50',
      logo: {
        src: '/icons/dominos.svg',
      },
    },
    {
      name: 'Best Buy',
      price: '$2.50',
      logo: {
        src: '/icons/dominos.svg',
      },
    },
    {
      name: 'Netflix',
      price: '$2.50',
      logo: {
        src: '/icons/dominos.svg',
      },
    },
    {
      name: 'PlayStation',
      price: '$2.50',
      logo: {
        src: '/icons/dominos.svg',
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
          <div className="font-commissioner max-w-num-580 sm:leading-num-24 text-sm leading-6 font-medium text-white opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)] sm:text-base">
            From everyday essentials to premium digital rewards
            <br /> discover categories built for instant access.
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="mx-auto mt-8 w-full max-w-[1476.9px] px-4 sm:mt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="max-w-num-281 w-full text-lg sm:text-[20px]"
            >
              {/* Outer: reserves space for the logo that pokes above the card */}
              <div className="relative flex flex-col items-center pt-[50px] sm:pt-14">
                {/* Vector 6 — flames background, behind the card, shifted down */}
                <img
                  className="pointer-events-none absolute inset-x-0 top-6 bottom-0 z-0 mx-auto h-[calc(50%-24px)] w-[85%] object-cover"
                  alt=""
                  src="/icons/Vector 6.svg"
                />

                {/* Logo — positioned relative, pulled up to overlap the card top */}
                <div className="relative z-20 -mb-[48px] flex h-[96px] w-[96px] items-center justify-center sm:-mb-[54px] sm:h-[110px] sm:w-[110px]">
                  <img
                    className="h-full w-full object-contain"
                    alt={`${item.name} logo`}
                    src={item.logo.src}
                  />
                </div>

                {/* Card box — z-10, sits behind the logo */}
                <div
                  className="rounded-num-8 relative z-10 box-border flex w-full flex-col items-center justify-end gap-3 px-4 pt-[56px] pb-4 sm:pt-[62px]"
                  style={{
                    border: '1px solid transparent',
                    background:
                      'linear-gradient(180deg, rgba(255,42,42,0), rgba(255,42,42,0.25)) padding-box, linear-gradient(#0d1b35, #0d1b35) padding-box, linear-gradient(76.58deg, #ff2a2a, rgba(255,42,42,0)) border-box',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, padding-box, border-box',
                  }}
                >
                  {/* Name + price */}
                  <div className="flex w-36 flex-col items-center gap-0.5">
                    <div className="flex items-center justify-center gap-[5px] self-stretch">
                      <div className="tracking-num-0.02 font-extrabold uppercase">{item.name}</div>
                      <img className="h-num-20.2 w-num-31 shrink-0" alt="" src="/icons/Hot.svg" />
                    </div>
                    <div className="text-num-16 text-whitesmoke-200 font-commissioner flex items-center justify-center gap-0.5">
                      <div className="leading-num-24 font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                        from{' '}
                      </div>
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
