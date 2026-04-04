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
      className="p-num-15 w-full max-w-[320px] rounded-lg border border-solid border-white/10 bg-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      role="dialog"
      aria-label="Shopping cart"
    >
      <div className="gap-num-15 text-num-14 text-ghostwhite font-commissioner flex flex-col text-left">
        <div className="flex items-center gap-3">
          <img className="max-h-full w-10" alt="" />
          <div className="flex flex-1 flex-col items-start justify-center gap-0.5">
            <b className="tracking-num--0_01 leading-num-20">{items[0]?.name ?? 'Cart item'}</b>
            <div className="text-lightsteelblue flex items-center gap-2 text-center">
              <div className="leading-num-20 font-medium">
                {items[0]?.variantLabel ?? 'Variant'}
              </div>
              <div className="border-whitesmoke-200 box-border h-px w-[9px] border-t" />
              <div className="flex items-center gap-1.5">
                <div className="h-num-14_4 w-num-19_2 box-border shrink-0 overflow-hidden rounded-[1.2px] border-[0.6px] border-gray-300 shadow-[0px_1.2000732421875px_1.8px_rgba(0,0,0,0.1)]">
                  <img className="w-num-19_2 h-num-14_4 object-cover" alt="" />
                  <div className="w-num-19_2 h-num-14_4 [background:linear-gradient(240.64deg,rgba(255,255,255,0.3),rgba(0,0,0,0.27)_26.27%,rgba(255,255,255,0.26)_37%,rgba(0,0,0,0.55)_48.7%,rgba(0,0,0,0.24)_59.44%,rgba(255,255,255,0.3)_73.64%,rgba(39,39,39,0.22)_90.15%,rgba(0,0,0,0.2))]" />
                </div>
                <div className="leading-num-20 font-medium">{items[0]?.stateCode ?? 'AB'}</div>
              </div>
            </div>
          </div>
          <div className="box-border flex items-center gap-2.5 overflow-hidden rounded-lg border border-white/10 bg-gray-100 px-2 py-1 text-[16px] text-white">
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

        <img className="h-px max-h-full max-w-full self-stretch overflow-hidden" alt="" />

        {items.slice(1).map((item) => (
          <div
            key={`${item.id}-${item.variantLabel}-${item.stateCode}`}
            className="flex items-center gap-3"
          >
            <img className="h-10 w-10" alt="" />
            <div className="flex flex-1 flex-col items-start justify-center gap-0.5">
              <b className="tracking-num--0_01 leading-num-20">{item.name}</b>
              <div className="text-lightsteelblue flex items-center gap-2 text-center">
                <div className="leading-num-20 font-medium">{item.variantLabel}</div>
                <div className="border-whitesmoke-200 box-border h-px w-[9px] border-t" />
                <div className="flex items-center gap-1.5">
                  <div className="h-num-14_4 w-num-19_2 box-border shrink-0 overflow-hidden rounded-[1.2px] border-[0.6px] border-gray-300 shadow-[0px_1.2000732421875px_1.8px_rgba(0,0,0,0.1)]">
                    <img className="w-num-19_2 h-num-14_4 object-cover" alt="" />
                    <div className="w-num-19_2 h-num-14_4 [background:linear-gradient(240.64deg,rgba(255,255,255,0.3),rgba(0,0,0,0.27)_26.27%,rgba(255,255,255,0.26)_37%,rgba(0,0,0,0.55)_48.7%,rgba(0,0,0,0.24)_59.44%,rgba(255,255,255,0.3)_73.64%,rgba(39,39,39,0.22)_90.15%,rgba(0,0,0,0.2))]" />
                  </div>
                  <div className="leading-num-20 font-medium">{item.stateCode}</div>
                </div>
              </div>
            </div>
            <div className="box-border flex items-center gap-2.5 overflow-hidden rounded-lg border border-white/10 bg-gray-100 px-2 py-1 text-[16px] text-white">
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

        <img className="h-px max-h-full max-w-full self-stretch overflow-hidden" alt="" />

        <div className="text-lightsteelblue flex items-center justify-between gap-5 self-stretch text-center text-[13px]">
          <div className="leading-num-20 font-medium">Cart Total</div>
          <b className="text-[16px] leading-6 text-white [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            {totalQuantity.toString().padStart(2, '0')} item{totalQuantity === 1 ? '' : 's'}
          </b>
        </div>

        <img className="h-px max-h-full max-w-full self-stretch overflow-hidden" alt="" />

        <div className="flex items-start self-stretch text-white">
          <button
            type="button"
            className="bg-fuchsia flex h-[38px] flex-1 items-center justify-center gap-2 rounded-lg px-3 pt-px pb-0.5 shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
          >
            <div className="tracking-num--0_01 leading-[26px] font-semibold">
              Proceed to Checkout
            </div>
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
