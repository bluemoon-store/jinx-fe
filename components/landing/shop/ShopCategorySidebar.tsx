import { FunctionComponent } from 'react'

type CategoryItem = {
  label: string
  active?: boolean
  highlight?: boolean
}

const CATEGORIES: CategoryItem[] = [
  { label: 'All Giftcards', highlight: true },
  { label: 'Cashout' },
  { label: 'Hotels' },
  { label: 'Food', active: true },
  { label: 'Flights' },
  { label: 'Groceries' },
  { label: 'Shopping' },
  { label: 'Clothing' },
  { label: 'Gas/Oil' },
  { label: 'Tickets' },
  { label: 'Lifestyle' },
  { label: 'Jewelry' },
  { label: 'Rentals' },
  { label: 'Streaming' },
]

export const ShopCategorySidebar: FunctionComponent = () => {
  return (
    <aside className="text-num-16 text-lightsteelblue-200 font-commissioner flex w-full flex-col items-start justify-center gap-3 text-left sm:w-56">
      <div className="tracking-num-0_02 font-extrabold uppercase text-ghostwhite">Category</div>
      {CATEGORIES.map((c) => {
        if (c.highlight) {
          return (
            <div
              key={c.label}
              className="rounded-num-8 border-whitesmoke-400 p-num-10 flex items-center gap-2 self-stretch border-[1px] border-solid text-white [background:linear-gradient(90deg,_rgba(235,_45,_255,_0.2),_rgba(235,_45,_255,_0)),_linear-gradient(#071935,_#071935)]"
            >
              <img className="h-5 w-5" alt="" />
              <div className="flex flex-col items-center">
                <div className="tracking-num--0_01 leading-num-28 font-semibold">
                  {c.label}
                </div>
              </div>
            </div>
          )
        }

        return (
          <div
            key={c.label}
            className={[
              'rounded-num-12 px-num-15 flex items-center gap-2 self-stretch py-2',
              c.active ? 'bg-gray-700' : '',
            ].join(' ')}
          >
            <img className="h-5 w-5" alt="" />
            <div className="flex flex-col items-center">
              <div className="tracking-num--0_01 leading-num-28 font-semibold">
                {c.label}
              </div>
            </div>
          </div>
        )
      })}
    </aside>
  )
}
