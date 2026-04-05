/* eslint-disable react/no-unescaped-entities */
'use client'

import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import CentralIcon from '@central-icons-react/all'

import { useCartStore } from '@/lib/cart-store'

type Props = {
  productName: string
}

const VARIANT_OPTIONS = [
  { id: 'fully', label: '$50 Points | Fully Unlocked', unitPrice: 50 },
  { id: 'partial', label: '$25 Points | Partially Unlocked', unitPrice: 25 },
] as const

/** Temporarily use Canada flag for all regions. */
const CANADA_FLAG_SRC = '/icons/flag.svg'

const STATE_OPTIONS = [
  { id: 'ab', label: 'AB', flagSrc: CANADA_FLAG_SRC },
  { id: 'bc', label: 'BC', flagSrc: CANADA_FLAG_SRC },
  { id: 'cd', label: 'CD', flagSrc: CANADA_FLAG_SRC },
] as const

type PurchaseControlsProps = {
  productName: string
  /** Override Add to Cart button classes (e.g. Quick Buy modal uses #0D1B35). */
  addToCartButtonClassName?: string
  /** z-index for open dropdown menus (raise in modals so lists paint above the card). */
  dropdownZClass?: string
  /** Called after add to cart succeeds (e.g. close quick-buy modal). */
  onAddToCart?: () => void
}

const DEFAULT_ADD_TO_CART_CLASS =
  'py-num-12 px-num-16 flex min-h-[44px] flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] bg-gray-400 shadow-[0px_2px_0px_rgba(13,_27,_53,_0.5)]'

export const ShopDetailPurchaseControls: FunctionComponent<PurchaseControlsProps> = ({
  productName,
  addToCartButtonClassName = DEFAULT_ADD_TO_CART_CLASS,
  dropdownZClass = 'z-20',
  onAddToCart,
}) => {
  const [isVariantOpen, setIsVariantOpen] = useState(false)
  const [isStateOpen, setIsStateOpen] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState<
    (typeof VARIANT_OPTIONS)[number]['id']
  >(VARIANT_OPTIONS[0].id)
  const [selectedStateId, setSelectedStateId] = useState<(typeof STATE_OPTIONS)[number]['id']>(
    STATE_OPTIONS[0].id
  )
  const [quantity, setQuantity] = useState(1)

  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)

  const selectedVariant =
    VARIANT_OPTIONS.find((v) => v.id === selectedVariantId) ?? VARIANT_OPTIONS[0]
  const selectedState = STATE_OPTIONS.find((s) => s.id === selectedStateId) ?? STATE_OPTIONS[0]

  const quantityText = String(quantity).padStart(2, '0')

  const onDecrementQuantity = () => setQuantity((q) => Math.max(1, q - 1))
  const onIncrementQuantity = () => setQuantity((q) => Math.min(99, q + 1))

  return (
    <div className="text-lightsteelblue-200 flex w-full flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="leading-num-20 font-semibold">Select Variant</div>
        <div className="rounded-num-8 border-whitesmoke-300 relative w-full overflow-visible border-[1px] border-solid bg-[#0D1B35] text-white">
          <button
            type="button"
            aria-label={`Select variant for ${productName}`}
            aria-expanded={isVariantOpen}
            onClick={() => {
              setIsVariantOpen((v) => !v)
              setIsStateOpen(false)
            }}
            className="px-num-12 py-num-10 text-num-16 flex w-full items-center justify-between gap-5 self-stretch"
          >
            <div className="flex min-w-0 items-center">
              <div className="tracking-num--0_01 leading-num-28 truncate font-semibold">
                {selectedVariant.label}
              </div>
            </div>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={20}
              className="text-white opacity-75 transition-transform duration-300 ease-in-out"
              style={{ transform: isVariantOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {isVariantOpen && (
            <div
              className={`rounded-num-8 border-whitesmoke-300/20 absolute top-full right-0 left-0 ${dropdownZClass} -mt-[1px] overflow-hidden border border-solid bg-gray-400`}
            >
              <div className="flex flex-col">
                {VARIANT_OPTIONS.map((option, idx) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-label={`Choose ${option.label}`}
                    onClick={() => {
                      setSelectedVariantId(option.id)
                      setIsVariantOpen(false)
                    }}
                    className={[
                      'px-num-12 py-num-10 text-num-16 w-full text-left',
                      'hover:bg-gray-300/20',
                      idx !== 0 ? 'border-whitesmoke-300/20 border-t' : '',
                    ].join(' ')}
                  >
                    <div className="tracking-num--0_01 leading-num-28 font-semibold">
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-4 self-stretch sm:flex-row sm:gap-5">
        <div className="flex flex-1 flex-col items-start gap-2">
          <div className="leading-num-20 font-semibold">Select State</div>
          <div className="rounded-num-8 border-whitesmoke-300 relative w-full overflow-visible border-[1px] border-solid bg-[#0D1B35] text-white">
            <button
              type="button"
              aria-label={`Select state for ${productName}`}
              aria-expanded={isStateOpen}
              onClick={() => {
                setIsStateOpen((v) => !v)
                setIsVariantOpen(false)
              }}
              className="px-num-12 py-num-10 text-num-16 flex w-full items-center justify-between gap-5 self-stretch"
            >
              <div className="flex min-w-0 items-center gap-2">
                <img
                  className="h-full max-h-[18px] w-full max-w-[28px] object-cover"
                  alt=""
                  src={selectedState.flagSrc}
                />
                <div className="tracking-num--0_01 leading-num-28 font-semibold">
                  {selectedState.label}
                </div>
              </div>
              <CentralIcon
                name="IconChevronDownMedium"
                join="round"
                fill="outlined"
                stroke="1"
                radius="1"
                size={20}
                className="text-white opacity-75 transition-transform duration-300 ease-in-out"
                style={{ transform: isStateOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {isStateOpen && (
              <div
                className={`rounded-num-8 border-whitesmoke-300/20 absolute top-full right-0 left-0 ${dropdownZClass} -mt-[1px] overflow-hidden border border-solid bg-gray-400`}
              >
                <div className="flex flex-col">
                  {STATE_OPTIONS.map((option, idx) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-label={`Choose ${option.label}`}
                      onClick={() => {
                        setSelectedStateId(option.id)
                        setIsStateOpen(false)
                      }}
                      className={[
                        'px-num-12 py-num-10 text-num-16 w-full text-left',
                        'hover:bg-gray-300/20',
                        idx !== 0 ? 'border-whitesmoke-300/20 border-t' : '',
                      ].join(' ')}
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <img
                          className="h-full max-h-[18px] w-full max-w-[28px] object-cover"
                          alt=""
                          src={option.flagSrc}
                        />
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          {option.label}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start gap-2">
          <div className="leading-num-20 font-semibold">Select Quantity</div>
          <div className="rounded-num-8 border-whitesmoke-300 px-num-12 py-num-10 text-num-16 w-full overflow-hidden border-[1px] border-solid bg-[#0D1B35] text-white">
            <div className="flex items-center justify-between gap-5 self-stretch">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={onDecrementQuantity}
                className="flex items-center justify-center"
              >
                <CentralIcon
                  name="IconMinusLarge"
                  join="round"
                  fill="outlined"
                  stroke="2"
                  radius="1"
                  size={16}
                  className="text-whitesmoke-200"
                />
              </button>

              <div className="flex items-center">
                <div className="tracking-num--0_01 leading-num-28 font-semibold">
                  {quantityText}
                </div>
              </div>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={onIncrementQuantity}
                className="flex items-center justify-center"
              >
                <CentralIcon
                  name="IconPlusLarge"
                  join="round"
                  fill="outlined"
                  stroke="2"
                  radius="1"
                  size={16}
                  className="text-whitesmoke-200"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-num-16 flex min-h-[44px] flex-col items-stretch gap-4 self-stretch text-white sm:flex-row sm:gap-2.5">
        <button
          type="button"
          className={addToCartButtonClassName}
          onClick={() => {
            addItem(
              {
                id: productName,
                name: productName,
                variantLabel: selectedVariant.label,
                stateCode: selectedState.label,
                unitPrice: selectedVariant.unitPrice,
              },
              quantity
            )
            onAddToCart?.()
          }}
        >
          <CentralIcon
            name="IconBasket1"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            className="text-white"
          />
          <div className="tracking-num--0_01 leading-num-28 font-semibold">Add to Cart</div>
        </button>
        <button
          type="button"
          className="bg-fuchsia py-num-12 px-num-16 flex min-h-[44px] flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)]"
          onClick={() => {
            addItem(
              {
                id: productName,
                name: productName,
                variantLabel: selectedVariant.label,
                stateCode: selectedState.label,
                unitPrice: selectedVariant.unitPrice,
              },
              quantity
            )
            router.push('/checkout' as Route)
          }}
        >
          <CentralIcon
            name="IconDollar"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            className="text-white"
          />
          <div className="tracking-num--0_01 leading-num-28 font-semibold">Checkout</div>
        </button>
      </div>
    </div>
  )
}

export const ShopDetailPurchasePanel: FunctionComponent<Props> = ({ productName }) => {
  const [isProductDescriptionOpen, setIsProductDescriptionOpen] = useState(true)
  const [isProcessToRedeemOpen, setIsProcessToRedeemOpen] = useState(false)
  const [isProductWarrantyOpen, setIsProductWarrantyOpen] = useState(false)

  return (
    <>
      <div className="rounded-num-12 text-lightsteelblue-200 box-border flex w-full flex-col items-start gap-4 bg-gray-100 p-4 sm:gap-5 sm:p-5">
        <ShopDetailPurchaseControls productName={productName} />
      </div>

      <div className="border-darkslateblue h-px w-full border-t border-solid" />

      <div className="font-nata-sans flex flex-col items-start gap-4 self-stretch text-center sm:gap-5">
        <div className="flex flex-wrap items-center justify-center gap-1.5 self-stretch sm:gap-[5px]">
          <div className="tracking-num-0_02 font-extrabold">EVERY PURCHASE WITH</div>
          <div className="font-heydex flex items-center p-1 text-fuchsia-200">
            <div className="tracking-num-0.02 font-extrabold">JINX</div>
          </div>
          <div className="tracking-num-0_02 font-extrabold">GUARANTEES</div>
        </div>
        <div className="py-num-0 text-num-14 sm:px-num-16 flex flex-wrap items-center justify-center gap-2 px-4 text-left sm:gap-3">
          <div className="rounded-num-8 border-mediumslateblue p-num-10 flex flex-col items-start border-[1px] border-solid [background:linear-gradient(180deg,_rgba(139,_92,_246,_0),_rgba(139,_92,_246,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]">
            <div className="flex items-center justify-center gap-3">
              <CentralIcon
                name="IconClockAlert"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                className="text-[#8B5CF6]"
              />
              <div className="flex flex-col items-start">
                <div className="tracking-num-0_02 leading-num-20 font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">
                  Instant Access
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-num-8 p-num-10 border-red flex flex-col items-start border-[1px] border-solid [background:linear-gradient(180deg,_rgba(255,_42,_42,_0),_rgba(255,_42,_42,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]">
            <div className="flex items-center justify-center gap-3">
              <CentralIcon
                name="IconShieldCheck"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                className="text-[#FF2A2A]"
              />
              <div className="flex flex-col items-start">
                <div className="tracking-num-0_02 leading-num-20 font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">{`Safe & Secure`}</div>
              </div>
            </div>
          </div>
          <div className="rounded-num-8 border-deepskyblue-200 p-num-10 flex flex-col items-start border-[1px] border-solid [background:linear-gradient(180deg,_rgba(0,_212,_255,_0),_rgba(0,_212,_255,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]">
            <div className="flex items-center justify-center gap-3">
              <CentralIcon
                name="IconSupport"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                className="text-[#00D4FF]"
              />
              <div className="flex flex-col items-start">
                <div className="tracking-num-0_02 leading-num-20 font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-num-8 border-mediumvioletred p-num-10 flex flex-col items-start border-[1px] border-solid [background:linear-gradient(180deg,_rgba(217,_27,_144,_0),_rgba(217,_27,_144,_0.2)),_linear-gradient(#1a0d35,_#1a0d35)]">
            <div className="flex items-center justify-center gap-3">
              <CentralIcon
                name="IconShieldCrossed"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                className="text-[#D91B90]"
              />
              <div className="flex flex-col items-start">
                <div className="tracking-num-0_02 leading-num-20 font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">
                  No Hidden Fees
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-darkslateblue h-px w-full border-t border-solid" />

      <div className="flex w-full flex-col items-start gap-4">
        <div className="rounded-num-12 sm:p-num-18 box-border flex w-full flex-col items-start overflow-hidden bg-gray-100 p-4">
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
              style={{ transform: isProductDescriptionOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
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

        <div className="rounded-num-12 sm:p-num-18 box-border flex w-full flex-col items-start overflow-hidden bg-gray-100 p-4">
          <button
            type="button"
            aria-expanded={isProcessToRedeemOpen}
            className="flex w-full items-center justify-between gap-0 self-stretch"
            onClick={() => setIsProcessToRedeemOpen((v) => !v)}
          >
            <b className="tracking-num--0_01 leading-num-28 flex-1 text-left">Process to Redeem</b>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={20}
              className="text-white opacity-75 transition-transform duration-300 ease-in-out"
              style={{ transform: isProcessToRedeemOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: isProcessToRedeemOpen ? '1fr' : '0fr' }}
          >
            <div className="w-full overflow-hidden">
              <div className="bg-whitesmoke-300 relative left-1/2 mt-2 h-px w-screen -translate-x-1/2" />
              {/* Content area (add text later). Padding shows when expanded */}
              <div className="pt-num-6 pb-num-6 w-full">
                <div className="flex flex-col items-start gap-5 text-white">
                  <div className="leading-num-24 opacity-[0.8]">
                    <b>Step 1: Add to Cart</b>
                    <p className="m-0">
                      Choose your variant and quantity, then click{' '}
                      <span className="font-medium">Add to Cart</span>.
                    </p>
                  </div>

                  <div className="leading-num-24 opacity-[0.8]">
                    <b>Step 2: Complete Checkout</b>
                    <p className="m-0">
                      Finish payment using the available options, and confirm your order.
                    </p>
                  </div>

                  <div className="leading-num-24 opacity-[0.8]">
                    <b>Step 3: Redeem on the Platform</b>
                    <p className="m-0">
                      After purchase, your code will appear in your account. Enter the code at
                      checkout on the e-commerce platform.
                    </p>
                    <ul className="m-0 pl-[21px] text-[length:inherit]">
                      <li className="mb-0">
                        <span className="font-medium">If you need help</span>, contact support from
                        the page footer.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-num-12 sm:p-num-18 box-border flex w-full flex-col items-start overflow-hidden bg-gray-100 p-4">
          <button
            type="button"
            aria-expanded={isProductWarrantyOpen}
            className="flex w-full items-center justify-between gap-0 self-stretch"
            onClick={() => setIsProductWarrantyOpen((v) => !v)}
          >
            <b className="tracking-num--0_01 leading-num-28 flex-1 text-left">Product Warranty</b>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={20}
              className="text-white opacity-75 transition-transform duration-300 ease-in-out"
              style={{ transform: isProductWarrantyOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: isProductWarrantyOpen ? '1fr' : '0fr' }}
          >
            <div className="w-full overflow-hidden">
              <div className="bg-whitesmoke-300 relative left-1/2 mt-2 h-px w-screen -translate-x-1/2" />
              {/* Content area (add text later). Padding shows when expanded */}
              <div className="pt-num-6 pb-num-6 w-full">
                <div className="flex flex-col items-start gap-5 text-white">
                  <div className="leading-num-24 opacity-[0.8]">
                    <b>Warranty Coverage</b>
                    <p className="m-0">
                      If your code is invalid or cannot be applied, we will help you resolve it as
                      quickly as possible.
                    </p>
                  </div>

                  <div className="leading-num-24 opacity-[0.8]">
                    <b>How to Request Help</b>
                    <p className="m-0">Contact support within 48 hours with your order details.</p>
                    <ul className="m-0 pl-[21px] text-[length:inherit]">
                      <li className="mb-0">
                        <span className="font-medium">Include your order id</span> and screenshot
                        (if available).
                      </li>
                      <li>
                        <span className="font-medium">
                          We will investigate and provide a replacement or resolution.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
