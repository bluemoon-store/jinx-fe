'use client'

import { FunctionComponent, useState } from 'react'
import CentralIcon from '@central-icons-react/all'

import { ShopDetailPurchaseControls } from './ShopDetailPurchasePanel'

type Props = {
  productName: string
  imageSrc: string
  onClose: () => void
}

const ADD_TO_CART_MODAL_CLASS =
  'py-num-12 px-num-16 flex min-h-[44px] flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] bg-[#0D1B35] shadow-[0px_2px_0px_rgba(13,_27,_53,_0.5)]'

const ShopProductDetailModal: FunctionComponent<Props> = ({ productName, imageSrc, onClose }) => {
  const [isProductDescriptionOpen, setIsProductDescriptionOpen] = useState(true)

  return (
    <section className="text-ghostwhite font-commissioner border-darkslateblue mx-auto my-auto box-border flex w-full max-w-[860px] flex-col items-start overflow-x-hidden overflow-y-auto rounded-xl border-[1px] border-solid bg-gray-400 px-5 py-[18px] text-left text-[20px] shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)]">
      <div className="flex flex-col items-center gap-5 self-stretch">
        <header className="flex flex-col items-start gap-3 self-stretch">
          <div className="flex items-center justify-between gap-5 self-stretch">
            <div className="flex items-center">
              <div className="leading-num-28 font-extrabold tracking-[0.02em] uppercase">
                {productName}
              </div>
            </div>
            <button
              type="button"
              aria-label="Close quick buy"
              onClick={onClose}
              className="rounded-num-8 flex h-[26px] w-[26px] items-center justify-center bg-gray-300/20"
            >
              <CentralIcon
                name="IconCrossLarge"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                className="text-whitesmoke-200"
              />
            </button>
          </div>
          <img className="h-px max-h-full max-w-full self-stretch overflow-hidden" alt="" />
        </header>
        <div className="text-whitesmoke-200 flex items-start justify-center gap-5 self-stretch text-center text-[12px]">
          <div className="flex flex-col items-start justify-center">
            <div className="flex flex-col items-start self-stretch">
              <div className="border-whitesmoke-300 rounded-num-8 flex flex-col items-center justify-center gap-4 overflow-hidden border-[1.8px] border-solid bg-gray-100 p-4 sm:gap-5 sm:p-6 md:p-8 lg:p-[25px]">
                <div className="h-full w-full overflow-hidden rounded-[14.61px] shadow-[0px_0px_15.76px_rgba(0,_0,_0,_0.6)]">
                  <img
                    alt=""
                    src={imageSrc}
                    className="max-h-full max-w-full scale-110 object-contain"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-[3.7px] rounded-[90.41px] border-[0.9px] border-solid border-[#FF0000] bg-[#FF0000]/25 px-[7.3px] py-[3.7px] shadow-[0px_2.7397475242614746px_0px_rgba(255,_42,_42,_0.1)]">
                    <CentralIcon
                      name="IconFire3"
                      join="round"
                      fill="filled"
                      stroke="1"
                      radius="1"
                      size={16}
                      className="text-[#FF0000]"
                    />
                    <div className="leading-num-20 font-semibold">Hot</div>
                  </div>
                  <div className="flex items-center gap-[3.7px] rounded-[90.41px] border-[0.9px] border-solid border-[#006BB6] bg-[#006BB6]/25 px-[7.3px] py-[3.7px] shadow-[0px_2.7397475242614746px_0px_rgba(0,_107,_182,_0.1)]">
                    <CentralIcon
                      name="IconLock"
                      join="round"
                      fill="filled"
                      stroke="1"
                      radius="1"
                      size={16}
                      className="text-[#006BB6]"
                    />
                    <div className="flex flex-col items-center">
                      <div className="leading-num-20 font-semibold">NFA</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[3.7px] rounded-[90.41px] border-[0.9px] border-solid border-[#FFD900] bg-[#FFD900]/25 px-[7.3px] py-[3.7px] shadow-[0px_2.7397475242614746px_0px_rgba(255,_237,_49,_0.1)]">
                    <CentralIcon
                      name="IconStar"
                      join="round"
                      fill="filled"
                      stroke="1"
                      radius="1"
                      size={16}
                      className="text-[#FFD900]"
                    />
                    <div className="flex flex-col items-center">
                      <div className="leading-num-20 font-semibold">New</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-num-16 flex min-w-0 flex-1 flex-col items-start gap-5 text-left text-white">
            <div className="rounded-num-8 border-darkslateblue box-border flex w-full flex-col items-start overflow-hidden border-[1px] border-solid bg-gray-100/10 p-[15px]">
              <button
                type="button"
                aria-expanded={isProductDescriptionOpen}
                className="flex w-full items-center justify-between gap-0 self-stretch"
                onClick={() => setIsProductDescriptionOpen((v) => !v)}
              >
                <b className="tracking-num--0_01 leading-num-28 flex-1 text-left">
                  Product Description
                </b>
                <CentralIcon
                  name="IconChevronDownMedium"
                  join="round"
                  fill="outlined"
                  stroke="1"
                  radius="1"
                  size={20}
                  className="text-white opacity-75 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: isProductDescriptionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isProductDescriptionOpen ? '1fr' : '0fr' }}
              >
                <div className="w-full overflow-hidden">
                  <div className="bg-whitesmoke-300 relative left-1/2 mt-2 h-px w-screen -translate-x-1/2" />
                  <div className="pt-num-6 pb-num-6 flex w-full flex-col items-start gap-5 text-white">
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
              </div>
            </div>

            <div className="relative isolate w-full min-w-0 overflow-visible">
              <ShopDetailPurchaseControls
                productName={productName}
                productImageSrc={imageSrc}
                addToCartButtonClassName={ADD_TO_CART_MODAL_CLASS}
                dropdownZClass="z-[100]"
                onAddToCart={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShopProductDetailModal
