/** Single cart line: brand, subtitle, region flag, quantity stepper */
type CartLineRowProps = {
  title: string
  subtitle: string
  regionCode: string
}

const CartLineRow = ({ title, subtitle, regionCode }: CartLineRowProps) => (
  <div className="flex items-center gap-3 self-stretch">
    <img className="max-h-full w-10" alt="" />
    <div className="flex flex-1 flex-col items-start justify-center gap-0.5">
      <b className="tracking-num--0_01 leading-num-20">{title}</b>
      <div className="text-lightsteelblue flex items-center gap-2 text-center">
        <div className="leading-num-20 font-medium">{subtitle}</div>
        <div className="border-whitesmoke-200 box-border h-px w-[9px] shrink-0 border-t-[1px] border-solid" />
        <div className="flex items-center gap-1.5">
          <div className="h-num-14_4 w-num-19_2 grid shrink-0 place-items-stretch overflow-hidden rounded-[1.2px] border-[0.6px] border-solid border-gray-300 shadow-[0px_1.2000732421875px_1.8px_rgba(0,_0,_0,_0.1)]">
            <img className="col-span-full row-span-full h-full w-full object-cover" alt="" />
            <div
              className="col-span-full row-span-full [background:linear-gradient(240.64deg,_rgba(255,_255,_255,_0.3),_rgba(0,_0,_0,_0.27)_26.27%,_rgba(255,_255,_255,_0.26)_37%,_rgba(0,_0,_0,_0.55)_48.7%,_rgba(0,_0,_0,_0.24)_59.44%,_rgba(255,_255,_255,_0.3)_73.64%,_rgba(39,_39,_39,_0.22)_90.15%,_rgba(0,_0,_0,_0.2))]"
              aria-hidden
            />
          </div>
          <div className="leading-num-20 font-medium">{regionCode}</div>
        </div>
      </div>
    </div>
    <div className="border-whitesmoke-100 flex items-center gap-2.5 overflow-hidden rounded-lg border-[1px] border-solid bg-gray-100 px-2 py-1 text-[16px] text-white">
      <img className="h-3.5 w-3.5" alt="" />
      <div className="flex items-center">
        <div className="tracking-num--0_01 leading-7 font-semibold">01</div>
      </div>
      <img className="h-3.5 w-3.5" alt="" />
    </div>
  </div>
)

/** Filled cart: line items, total, checkout CTA */
const CartDropdownFilled = () => {
  return (
    <section className="border-whitesmoke-200 text-num-14 text-ghostwhite font-commissioner box-border flex w-full flex-col items-center justify-center gap-[15px] rounded-lg border-[1px] border-solid bg-gray-200 p-[15px] text-left">
      <CartLineRow title="Dominos" subtitle="$25 Gift Card" regionCode="AB" />
      <img className="h-px max-h-full max-w-full self-stretch overflow-hidden" alt="" />
      <CartLineRow title="Netflix" subtitle="1 Year 4K Ultra HD" regionCode="CA" />
      <img className="h-px max-h-full max-w-full self-stretch overflow-hidden" alt="" />
      <div className="text-lightsteelblue flex items-center justify-between gap-5 self-stretch text-center text-[13px]">
        <div className="leading-num-20 font-medium">Cart Total</div>
        <b className="text-[16px] leading-6 text-white [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
          $109.99
        </b>
      </div>
      <img className="h-px max-h-full max-w-full self-stretch overflow-hidden" alt="" />
      <footer className="flex w-full items-start text-white">
        <div className="bg-fuchsia box-border flex h-[38px] flex-1 items-center justify-center gap-2 rounded-lg px-3 pt-px pb-0.5 shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)]">
          <div className="tracking-num--0_01 leading-[26px] font-semibold">Proceed to Checkout</div>
          <img className="h-[6.7px] w-[3.3px] object-contain" alt="" />
        </div>
      </footer>
    </section>
  )
}

/** Empty cart: illustration, copy, browse CTA */
const CartDropdownEmpty = () => {
  return (
    <section className="border-whitesmoke text-ghostwhite font-commissioner box-border flex w-full flex-col items-center justify-center gap-2.5 rounded-lg border-[1px] border-solid bg-gray-100 p-[15px] text-left text-sm">
      <main className="flex w-full max-w-[203px] flex-col items-center">
        <img className="h-[107px] w-[133px]" alt="" />
        <div className="flex flex-col items-center gap-[5px] self-stretch">
          <header className="flex flex-col items-center self-stretch">
            <b className="leading-5 tracking-[-0.01em]">Your Cart is Empty</b>
          </header>
          <p className="text-lightsteelblue m-0 self-stretch text-center text-[13px] leading-5 font-medium">
            There’s nothing in your cart.
            <br />
            Let’s get shopping!
          </p>
        </div>
      </main>
      <footer className="flex w-full items-center justify-center rounded-md bg-gray-200 px-2.5 py-1.5 text-white">
        <div className="leading-[26px] font-semibold tracking-[-0.01em]">Browse Store</div>
      </footer>
    </section>
  )
}

export type CartDropdownProps = {
  empty?: boolean
}

const CartDropdown = ({ empty = false }: CartDropdownProps) =>
  empty ? <CartDropdownEmpty /> : <CartDropdownFilled />

export { CartDropdownFilled, CartDropdownEmpty }
export default CartDropdown
