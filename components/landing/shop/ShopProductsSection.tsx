import { FunctionComponent } from 'react'

import CentralIcon from '@central-icons-react/all'

import { ShopProductCard } from './ShopProductCard'

const PRODUCTS = Array.from({ length: 12 }, (_, i) => ({ id: i }))

export const ShopProductsSection: FunctionComponent = () => {
  return (
    <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-5">
        <div className="flex items-center">
          <div className="text-sm font-extrabold uppercase tracking-num-0_02 sm:text-base">
            All Products
          </div>
        </div>
        <div className="text-lightsteelblue-200 font-commissioner flex items-center gap-1.5 text-right text-xs sm:gap-2.5 sm:text-num-14">
          <span className="leading-num-20 font-semibold">Available Products : </span>
          <div className="rounded-num-6 py-num-0 flex items-center justify-center px-1.5 text-center text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
            <b className="leading-num-20 [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              125
            </b>
          </div>
        </div>
      </div>

      <div className="rounded-num-8 border-whitesmoke-200 font-commissioner sm:py-num-10 sm:text-num-16 box-border flex min-h-[44px] w-full items-center justify-between gap-3 overflow-hidden border-[1px] border-solid bg-gray-200 px-3 py-2.5 text-left text-white sm:gap-5">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5">
          <CentralIcon
            name="IconMagnifyingGlass2"
            join="round"
            fill="filled"
            stroke="1"
            radius="1"
            size={20}
            color="#FFFFFF"
          />
          <div className="tracking-num--0_01 leading-num-28 truncate text-sm font-semibold opacity-[0.5] sm:text-base">
            Search for any product or bundle
          </div>
        </div>
        <CentralIcon
          name="IconChevronRightMedium"
          join="round"
          fill="filled"
          stroke="1"
          radius="1"
          size={20}
          color="#FFFFFF"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <ShopProductCard key={p.id} />
        ))}
      </div>

      <div className="flex flex-col items-stretch justify-between gap-4 pt-4 sm:flex-row sm:items-center">
        <button
          type="button"
          className="border-darkslateblue font-commissioner sm:py-num-10 sm:text-num-16 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[30px] border-[1.5px] border-solid bg-gray-200 px-4 py-3 text-sm text-white shadow-[0px_15px_15px_rgba(0,_0,_0,_0.01)] sm:w-auto sm:gap-2.5 sm:px-6"
        >
          <span className="leading-num-24 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
            Load More Products
          </span>
          <CentralIcon
            name="IconChevronDownMedium"
            join="round"
            fill="filled"
            stroke="1"
            radius="1"
            size={20}
            color="#FFFFFF"
          />
        </button>

        <div className="font-commissioner flex w-full items-center justify-between gap-3 text-sm text-white sm:gap-4 sm:text-num-16 lg:max-w-num-281">
          <div className="flex h-[3px] min-w-[60px] flex-1 overflow-hidden rounded-num-8 bg-fuchsia/25 shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)] sm:w-[196px] sm:flex-none">
            <div className="h-full w-[10%] shrink-0 rounded-num-8 bg-fuchsia shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)]" />
          </div>
          <div className="flex shrink-0 items-center">
            <div className="leading-num-24 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              24 of 240
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

