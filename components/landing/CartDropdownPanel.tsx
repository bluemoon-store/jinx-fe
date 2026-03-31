'use client'

import type { FunctionComponent } from 'react'

import CentralIcon from '@central-icons-react/all'

import { useCartStore } from '@/lib/cart-store'

import { CartEmptyDropdownPanel } from './CartEmptyDropdownPanel'

export const CartDropdownPanel: FunctionComponent = () => {
  const items = useCartStore((s) => s.items)

  if (!items.length) {
    return <CartEmptyDropdownPanel />
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div
      className="rounded-lg w-full max-w-[320px] border border-solid border-white/10 bg-gray-200 p-num-15 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      role="dialog"
      aria-label="Shopping cart"
    >
      <div className="flex flex-col gap-num-15 text-left text-num-14 text-ghostwhite font-commissioner">
        <div className="flex items-center gap-3">
          <img className="w-10 max-h-full" alt="" />
          <div className="flex-1 flex flex-col items-start justify-center gap-0.5">
            <b className="tracking-num--0_01 leading-num-20">
              {items[0]?.name ?? 'Cart item'}
            </b>
            <div className="flex items-center gap-2 text-center text-lightsteelblue">
              <div className="leading-num-20 font-medium">
                {items[0]?.variantLabel ?? 'Variant'}
              </div>
              <div className="h-px w-[9px] border-whitesmoke-200 border-t box-border" />
              <div className="flex items-center gap-1.5">
                <div className="h-num-14_4 w-num-19_2 shadow-[0px_1.2000732421875px_1.8px_rgba(0,0,0,0.1)] rounded-[1.2px] border-gray-300 border-[0.6px] box-border overflow-hidden shrink-0">
                  <img className="w-num-19_2 h-num-14_4 object-cover" alt="" />
                  <div className="[background:linear-gradient(240.64deg,rgba(255,255,255,0.3),rgba(0,0,0,0.27)_26.27%,rgba(255,255,255,0.26)_37%,rgba(0,0,0,0.55)_48.7%,rgba(0,0,0,0.24)_59.44%,rgba(255,255,255,0.3)_73.64%,rgba(39,39,39,0.22)_90.15%,rgba(0,0,0,0.2))] w-num-19_2 h-num-14_4" />
                </div>
                <div className="leading-num-20 font-medium">
                  {items[0]?.stateCode ?? 'AB'}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-gray-100 border border-white/10 box-border overflow-hidden flex items-center py-1 px-2 gap-2.5 text-[16px] text-white">
            <CentralIcon
              name="IconMinusLarge"
              join="round"
              fill="outlined"
              stroke="2"
              radius="1"
              size={14}
              className="h-3.5 w-3.5"
            />
            <div className="flex items-center">
              <div className="tracking-num--0_01 leading-7 font-semibold">
                {totalQuantity.toString().padStart(2, '0')}
              </div>
            </div>
            <CentralIcon
              name="IconPlusLarge"
              join="round"
              fill="outlined"
              stroke="2"
              radius="1"
              size={14}
              className="h-3.5 w-3.5"
            />
          </div>
        </div>

        <img className="self-stretch h-px max-w-full overflow-hidden max-h-full" alt="" />

        {items.slice(1).map((item) => (
          <div
            key={`${item.id}-${item.variantLabel}-${item.stateCode}`}
            className="flex items-center gap-3"
          >
            <img className="h-10 w-10" alt="" />
            <div className="flex-1 flex flex-col items-start justify-center gap-0.5">
              <b className="tracking-num--0_01 leading-num-20">{item.name}</b>
              <div className="flex items-center gap-2 text-center text-lightsteelblue">
                <div className="leading-num-20 font-medium">{item.variantLabel}</div>
                <div className="h-px w-[9px] border-whitesmoke-200 border-t box-border" />
                <div className="flex items-center gap-1.5">
                  <div className="h-num-14_4 w-num-19_2 shadow-[0px_1.2000732421875px_1.8px_rgba(0,0,0,0.1)] rounded-[1.2px] border-gray-300 border-[0.6px] box-border overflow-hidden shrink-0">
                    <img className="w-num-19_2 h-num-14_4 object-cover" alt="" />
                    <div className="[background:linear-gradient(240.64deg,rgba(255,255,255,0.3),rgba(0,0,0,0.27)_26.27%,rgba(255,255,255,0.26)_37%,rgba(0,0,0,0.55)_48.7%,rgba(0,0,0,0.24)_59.44%,rgba(255,255,255,0.3)_73.64%,rgba(39,39,39,0.22)_90.15%,rgba(0,0,0,0.2))] w-num-19_2 h-num-14_4" />
                  </div>
                  <div className="leading-num-20 font-medium">{item.stateCode}</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-gray-100 border border-white/10 box-border overflow-hidden flex items-center py-1 px-2 gap-2.5 text-[16px] text-white">
              <CentralIcon
                name="IconMinusLarge"
                join="round"
                fill="outlined"
                stroke="2"
                radius="1"
                size={14}
                className="h-3.5 w-3.5"
              />
              <div className="flex items-center">
                <div className="tracking-num--0_01 leading-7 font-semibold">
                  {item.quantity.toString().padStart(2, '0')}
                </div>
              </div>
              <CentralIcon
                name="IconPlusLarge"
                join="round"
                fill="outlined"
                stroke="2"
                radius="1"
                size={14}
                className="h-3.5 w-3.5"
              />
            </div>
          </div>
        ))}

        <img className="self-stretch h-px max-w-full overflow-hidden max-h-full" alt="" />

        <div className="self-stretch flex items-center justify-between gap-5 text-center text-[13px] text-lightsteelblue">
          <div className="leading-num-20 font-medium">Cart Total</div>
          <b className="text-[16px] leading-6 text-white [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            {totalQuantity.toString().padStart(2, '0')} item{totalQuantity === 1 ? '' : 's'}
          </b>
        </div>

        <img className="self-stretch h-px max-w-full overflow-hidden max-h-full" alt="" />

        <div className="self-stretch flex items-start text-white">
          <button
            type="button"
            className="h-[38px] flex-1 shadow-[0px_2px_0px_rgba(235,45,255,0.25)] rounded-lg bg-fuchsia flex items-center justify-center pt-px px-3 pb-0.5 gap-2"
          >
            <div className="tracking-num--0_01 leading-[26px] font-semibold">Proceed to Checkout</div>
            <CentralIcon
              name="IconArrowRight"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={10}
              className="h-[6.7px] w-[3.3px]"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartDropdownPanel

