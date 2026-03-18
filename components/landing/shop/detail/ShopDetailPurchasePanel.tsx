import { FunctionComponent } from 'react'

type Props = {
  productName: string
}

export const ShopDetailPurchasePanel: FunctionComponent<Props> = ({ productName }) => {
  return (
    <>
      <div className="rounded-num-12 text-lightsteelblue-200 box-border flex w-full flex-col items-start gap-5 bg-gray-200 p-5">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="leading-num-20 font-semibold">Select Variant</div>
          <div className="rounded-num-8 border-whitesmoke-400 py-num-10 px-num-12 text-num-16 flex items-center justify-between gap-5 self-stretch overflow-hidden border-[1px] border-solid bg-gray-400 text-white">
            <div className="flex items-center">
              <div className="tracking-num--0_01 leading-num-28 font-semibold">
                $50 Points | Fully Unlocked
              </div>
            </div>
            <img className="max-h-full w-[18px] object-contain" alt="" />
          </div>
        </div>

        <div className="flex items-start gap-5 self-stretch">
          <div className="flex flex-1 flex-col items-start gap-2">
            <div className="leading-num-20 font-semibold">Select State</div>
            <div className="rounded-num-8 border-whitesmoke-400 py-num-10 px-num-12 text-num-16 flex items-center justify-between gap-5 self-stretch overflow-hidden border-[1px] border-solid bg-gray-400 text-white">
              <div className="flex items-center gap-2">
                <div className="box-border grid h-[19.2px] w-[25.6px] shrink-0 overflow-hidden rounded-[1.6px] border-[0.8px] border-solid border-gray-600 shadow-[0px_1.60009765625px_2.4px_rgba(0,_0,_0,_0.1)]">
                  <img className="col-start-1 row-start-1 h-[19.2px] w-[25.6px] object-cover" alt="" />
                  <div className="col-start-1 row-start-1 h-[19.2px] w-[25.6px] [background:linear-gradient(240.64deg,_rgba(255,_255,_255,_0.3),_rgba(0,_0,_0,_0.27)_26.27%,_rgba(255,_255,_255,_0.26)_37%,_rgba(0,_0,_0,_0.55)_48.7%,_rgba(0,_0,_0,_0.24)_59.44%,_rgba(255,_255,_255,_0.3)_73.64%,_rgba(39,_39,_39,_0.22)_90.15%,_rgba(0,_0,_0,_0.2))]" />
                </div>
                <div className="tracking-num--0_01 leading-num-28 font-semibold">AB</div>
              </div>
              <img className="max-h-full w-[18px] object-contain" alt="" />
            </div>
          </div>

          <div className="flex flex-1 flex-col items-start gap-2">
            <div className="leading-num-20 font-semibold">Select Quantity</div>
            <div className="rounded-num-8 border-whitesmoke-400 py-num-10 px-num-12 text-num-16 flex items-center justify-between gap-5 self-stretch overflow-hidden border-[1px] border-solid bg-gray-400 text-white">
              <img className="h-num-18 w-[18px]" alt="" />
              <div className="flex items-center">
                <div className="tracking-num--0_01 leading-num-28 font-semibold">01</div>
              </div>
              <img className="h-num-18 w-[18px]" alt="" />
            </div>
          </div>
        </div>

        <div className="text-num-16 flex items-start gap-2.5 self-stretch text-white">
          <div className="py-num-12 px-num-16 flex flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] bg-gray-400 shadow-[0px_2px_0px_rgba(13,_27,_53,_0.5)]">
            <img className="h-num-18 w-[18px]" alt="" />
            <div className="tracking-num--0_01 leading-num-28 font-semibold">
              Add to Cart
            </div>
          </div>
          <div className="bg-fuchsia py-num-12 px-num-16 flex flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)]">
            <img className="h-num-18 w-[18px]" alt="" />
            <div className="tracking-num--0_01 leading-num-28 font-semibold">Checkout</div>
          </div>
        </div>
      </div>

      <div className="font-nata-sans flex flex-col items-start gap-5 self-stretch text-center">
        <img className="h-px max-h-full max-w-full self-stretch overflow-hidden" alt="" />
        <div className="flex items-center justify-center gap-[5px] self-stretch">
          <div className="tracking-num-0_02 font-extrabold">EVERY PURCHASE WITH</div>
          <img className="h-[24.9px] w-[45px]" alt="" />
          <div className="tracking-num-0_02 font-extrabold">GUARANTEES</div>
        </div>
        <div className="py-num-0 px-num-16 text-num-14 flex items-center justify-center gap-3 self-stretch text-left">
          <div className="rounded-num-8 border-mediumslateblue p-num-10 flex flex-col items-start border-[1px] border-solid [background:linear-gradient(180deg,_rgba(139,_92,_246,_0),_rgba(139,_92,_246,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]">
            <div className="flex items-center justify-center gap-3">
              <img className="h-5 w-5" alt="" />
              <div className="flex flex-col items-start">
                <div className="tracking-num-0_02 leading-num-20 font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">
                  Instant Access
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-num-8 p-num-10 flex flex-col items-start border-[1px] border-solid border-red-200 [background:linear-gradient(180deg,_rgba(255,_42,_42,_0),_rgba(255,_42,_42,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]">
            <div className="flex items-center justify-center gap-3">
              <img className="h-5 w-5" alt="" />
              <div className="flex flex-col items-start">
                <div className="tracking-num-0_02 leading-num-20 font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">{`Safe & Secure`}</div>
              </div>
            </div>
          </div>
          <div className="rounded-num-8 border-deepskyblue-200 p-num-10 flex flex-col items-start border-[1px] border-solid [background:linear-gradient(180deg,_rgba(0,_212,_255,_0),_rgba(0,_212,_255,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]">
            <div className="flex items-center justify-center gap-3">
              <img className="h-5 w-5" alt="" />
              <div className="flex flex-col items-start">
                <div className="tracking-num-0_02 leading-num-20 font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-num-8 border-mediumvioletred p-num-10 flex flex-col items-start border-[1px] border-solid [background:linear-gradient(180deg,_rgba(217,_27,_144,_0),_rgba(217,_27,_144,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]">
            <div className="flex items-center justify-center gap-3">
              <img className="h-5 w-5" alt="" />
              <div className="flex flex-col items-start">
                <div className="tracking-num-0_02 leading-num-20 font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">
                  No Hidden Fees
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="h-px max-h-full max-w-full self-stretch overflow-hidden" alt="" />
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="rounded-num-12 box-border flex w-full flex-col items-start gap-3 bg-gray-200 p-[18px]">
          <div className="flex items-center justify-between gap-0 self-stretch">
            <b className="tracking-num--0_01 leading-num-28 flex-1">Product Description</b>
            <img className="max-h-full w-[18px] object-contain" alt="" />
          </div>
          <img
            className="h-px max-h-full max-w-full self-stretch overflow-hidden"
            alt=""
          />
          <div className="flex flex-col items-start gap-5 text-white">
            <div className="leading-num-24 opacity-[0.8]">
              <p className="m-0">
                <b>50 Points&nbsp;can get you:</b>
              </p>
              <ul className="m-0 pl-[21px] text-[length:inherit]">
                <li className="mb-0">
                  <span className="font-medium">No Name Cake</span>
                </li>
                <li className="mb-0">
                  <span className="font-medium">Non-alcoholic drink</span>
                </li>
                <li className="mb-0">
                  <span className="font-medium">Alternative Crust Upgrade</span>
                </li>
                <li>
                  <span className="font-medium">or $1 donation to non-profit partners</span>
                </li>
              </ul>
            </div>
            <div className="leading-num-24 opacity-[0.8]">
              <p className="m-0">
                <b>100 Points&nbsp;can get you:&nbsp;</b>
              </p>
              <ul className="m-0 pl-[21px] text-[length:inherit]">
                <li className="mb-0">
                  <span className="font-medium">Cheesy Garlic Bread</span>
                </li>
                <li className="mb-0">
                  <span className="font-medium">Free Delivery</span>
                </li>
                <li>
                  <span className="font-medium">or $2 donation to non-profit partners</span>
                </li>
              </ul>
            </div>
            <div className="leading-num-24 opacity-[0.8]">
              <p className="m-0">
                <b>150 Points can get you:</b>
              </p>
              <ul className="m-0 pl-[21px] text-[length:inherit]">
                <li className="mb-0">
                  <span className="font-medium">Pizza</span>
                </li>
                <li className="mb-0">
                  <span className="font-medium">Salad</span>
                </li>
                <li className="mb-0">
                  <span className="font-medium">Any Single Menu Item</span>
                </li>
                <li>
                  <span className="font-medium">or $3 donation to non-profit partners</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-num-12 box-border flex w-full flex-col items-start bg-gray-200 p-[18px]">
          <div className="flex items-center justify-between gap-0 self-stretch">
            <b className="tracking-num--0_01 leading-num-28 flex-1">Process to Redeem</b>
            <img className="max-h-full w-[18px] object-contain" alt="" />
          </div>
        </div>

        <div className="rounded-num-12 box-border flex w-full flex-col items-start bg-gray-200 p-[18px]">
          <div className="flex items-center justify-between gap-0 self-stretch">
            <b className="tracking-num--0_01 leading-num-28 flex-1">Product Warranty</b>
            <img className="max-h-full w-[18px] object-contain" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
