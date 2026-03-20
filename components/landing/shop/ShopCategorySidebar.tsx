import CentralIcon from '@central-icons-react/all'
import { FunctionComponent } from 'react'

type CategoryItem = {
  label: string
  icon: string
  active?: boolean
  highlight?: boolean
}

const CATEGORIES: CategoryItem[] = [
  { label: 'All Giftcards', icon: 'IconSquareGridMagnifyingGlass', highlight: true },
  { label: 'Cashout', icon: 'IconDollar' },
  { label: 'Hotels', icon: 'IconFoodBell' },
  { label: 'Food', icon: 'IconCookies', active: true },
  { label: 'Flights', icon: 'IconAirplane' },
  { label: 'Groceries', icon: 'IconApples' },
  { label: 'Shopping', icon: 'IconShoppingBag2' },
  { label: 'Clothing', icon: 'IconFashion' },
  { label: 'Gas/Oil', icon: 'IconGas' },
  { label: 'Tickets', icon: 'IconTicket' },
  { label: 'Lifestyle', icon: 'IconPeopleIdCard' },
  { label: 'Jewelry', icon: 'IconDiamondShine' },
  { label: 'Rentals', icon: 'IconCarFrontView' },
  { label: 'Streaming', icon: 'IconClapboardWide' },
]

export const ShopCategorySidebar: FunctionComponent = () => {
  return (
    <aside className="text-lightsteelblue-200 font-commissioner sm:text-num-16 flex w-full flex-col gap-2 text-left text-sm sm:w-56 sm:gap-3">
      <div className="tracking-num-0_02 text-ghostwhite shrink-0 font-extrabold uppercase">
        Category
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible sm:pb-0">
        {CATEGORIES.map((c) => {
          if (c.highlight) {
            return (
              <button
                key={c.label}
                type="button"
                className="rounded-num-8 border-whitesmoke-400 sm:p-num-10 flex min-h-[44px] shrink-0 items-center gap-2 border-[1px] border-solid p-3 text-left text-white [background:linear-gradient(90deg,_rgba(235,_45,_255,_0.2),_rgba(235,_45,_255,_0)),_linear-gradient(#071935,_#071935)] sm:w-full"
              >
                <CentralIcon
                  name={c.icon as any}
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={20}
                  color="#EB2DFF"
                />
                <div className="flex flex-col items-center">
                  <div className="tracking-num--0_01 leading-num-28 text-left font-semibold">
                    {c.label}
                  </div>
                </div>
              </button>
            )
          }

          return (
            <button
              key={c.label}
              type="button"
              className={[
                'rounded-num-12 sm:px-num-15 flex min-h-[44px] shrink-0 items-center gap-2 px-3 py-2 sm:w-full',
                c.active ? 'bg-gray-700' : '',
              ].join(' ')}
            >
              <CentralIcon
                name={c.icon as any}
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={20}
              />
              <div className="flex flex-col items-center">
                <div className="tracking-num--0_01 leading-num-28 text-left font-semibold">
                  {c.label}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
