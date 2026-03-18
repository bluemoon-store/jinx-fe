import { FunctionComponent } from 'react'

type HotSellingItem = {
  name: string
  variant?: 'default' | 'withIconBg'
  logoObjectCover?: boolean
}

const ITEMS: HotSellingItem[] = [
  { name: 'Dominos' },
  { name: 'BEST BUY', logoObjectCover: true },
  { name: 'CHIPOTLE' },
  { name: 'NETFLIX' },
  { name: 'PLAYSTATION', variant: 'withIconBg' },
  { name: 'NETFLIX' },
  { name: 'CHIPOTLE' },
  { name: 'PLAYSTATION', variant: 'withIconBg' },
  { name: 'BEST BUY', logoObjectCover: true },
  { name: 'Dominos' },
]

export const HotSellingProducts: FunctionComponent = () => {
  return (
    <section className="w-full">
      <div className="flex flex-wrap content-start items-start justify-between gap-x-[17.3px] gap-y-4">
      {ITEMS.map((item, idx) => (
        <div
          key={`${item.name}-${idx}`}
          className="w-num-281 rounded-num-8 box-border flex shrink-0 flex-col items-start overflow-hidden p-3 [background:linear-gradient(180deg,_rgba(255,_42,_42,_0),_rgba(255,_42,_42,_0.25))_padding-box,_linear-gradient(#0d1b35,_#0d1b35)_padding-box,_linear-gradient(76.58deg,_#ff2a2a,_rgba(255,_42,_42,_0))_border-box,_linear-gradient(237.38deg,_#ff2a2a,_rgba(255,_42,_42,_0))_border-box] [border:1px_solid_transparent]"
        >
          <div className="flex items-center gap-[17px] self-stretch">
            {item.variant === 'withIconBg' ? (
              <div className="rounded-num-6 bg-dodgerblue border-darkslateblue h-num-60 box-border flex w-[60px] items-center justify-center border-[0.8px] border-solid shadow-[0px_0px_6.47px_rgba(0,_0,_0,_0.6)]">
                <img className="h-[30px] w-[30px]" alt="" />
              </div>
            ) : (
              <img
                className={[
                  'max-h-full w-[60px]',
                  item.logoObjectCover ? 'object-cover' : '',
                ].join(' ')}
                alt=""
              />
            )}

            <div className="flex w-36 flex-col items-start justify-center gap-[5px]">
              <div className="flex items-center gap-[5px] self-stretch">
                <div className="tracking-num-0_02 shrink-0 font-extrabold uppercase">
                  {item.name}
                </div>
                <img className="h-num-20_2 w-num-31 shrink-0" alt="" />
                <img className="h-num-18 w-num-34 hidden shrink-0" alt="" />
              </div>
              <div className="text-num-16 text-whitesmoke-300 font-commissioner flex items-center justify-center gap-0.5">
                <div className="leading-num-24 font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">{`from `}</div>
                <div className="rounded-num-6 py-num-0 flex items-center justify-center px-1.5 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
                  <b className="leading-num-24 [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                    $2.50
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </section>
  )
}
