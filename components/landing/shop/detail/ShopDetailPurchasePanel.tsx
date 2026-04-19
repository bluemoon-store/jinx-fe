/* eslint-disable react/no-unescaped-entities */
'use client'

import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import CentralIcon from '@central-icons-react/all'

import { CountryFlag } from '@/components/ui/CountryFlag'
import {
  siteSelectDropdownList,
  siteSelectDropdownOptionInteractive,
  siteSelectDropdownOptionRow,
  siteSelectDropdownPanel,
} from '@/components/ui/siteSelectDropdown'
import { useAddCartItemMutation, useUpdateCartItemMutation } from '@/hooks/use-carts'
import { parseUsdDecimalString } from '@/lib/cart-format'
import { sameCartLine, useCartStore } from '@/stores/cart-store'
import { getAccessToken } from '@/lib/token'
import { cn } from '@/lib/utils'
import type { ProductDetail, ProductRegion, ProductVariant } from '@/types/product'

function RichHtml({
  html,
  className,
  emptyText,
}: {
  html: string | null
  className?: string
  emptyText?: string
}) {
  const trimmed = html?.trim() ?? ''
  if (!trimmed) {
    return emptyText ? (
      <p className="text-lightsteelblue-100 m-0 text-sm leading-6 opacity-80">{emptyText}</p>
    ) : null
  }
  return (
    <div
      className={cn(
        'prose prose-invert max-w-none text-base leading-6 [&_a]:text-fuchsia-200',
        className
      )}
      dangerouslySetInnerHTML={{ __html: trimmed }}
    />
  )
}

function sortActiveVariants(variants: ProductVariant[]) {
  return [...variants]
    .filter((v) => v.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label))
}

function sortActiveRegions(regions: ProductRegion[]) {
  return [...regions]
    .filter((r) => r.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label))
}

type PurchaseControlsProps = {
  productId: string
  productName: string
  productImageSrc?: string
  variants: ProductVariant[]
  regions: ProductRegion[]
  /** Override Add to Cart button classes (e.g. Quick Buy modal uses #0D1B35). */
  addToCartButtonClassName?: string
  /** z-index for open dropdown menus (high enough to stack above modals / siblings). */
  dropdownZClass?: string
  /** Called after add to cart succeeds (e.g. close quick-buy modal). */
  onAddToCart?: () => void
}

const DEFAULT_ADD_TO_CART_CLASS =
  'box-border py-num-8 px-num-16 flex h-10 min-h-0 flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] bg-gray-400 shadow-[0px_2px_0px_rgba(13,_27,_53,_0.5)]'

export const ShopDetailPurchaseControls: FunctionComponent<PurchaseControlsProps> = ({
  productId,
  productName,
  productImageSrc,
  variants,
  regions,
  addToCartButtonClassName = DEFAULT_ADD_TO_CART_CLASS,
  dropdownZClass = 'z-[999]',
  onAddToCart,
}) => {
  const variantList = useMemo(() => sortActiveVariants(variants), [variants])
  const regionList = useMemo(() => sortActiveRegions(regions), [regions])

  const [isVariantOpen, setIsVariantOpen] = useState(false)
  const [isStateOpen, setIsStateOpen] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState('')
  const [selectedRegionId, setSelectedRegionId] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (variantList[0]) setSelectedVariantId(variantList[0].id)
  }, [variantList])

  useEffect(() => {
    if (regionList[0]) setSelectedRegionId(regionList[0].id)
  }, [regionList])

  const router = useRouter()
  const addCartItemMutation = useAddCartItemMutation()
  const updateCartItemMutation = useUpdateCartItemMutation()
  const addItem = useCartStore((s) => s.addItem)
  const setBackendCartItemId = useCartStore((s) => s.setBackendCartItemId)

  const selectedVariant = variantList.find((v) => v.id === selectedVariantId) ?? variantList[0]
  const selectedRegion = regionList.find((r) => r.id === selectedRegionId) ?? regionList[0]

  const quantityText = String(quantity).padStart(2, '0')

  const onDecrementQuantity = () => setQuantity((q) => Math.max(1, q - 1))
  const onIncrementQuantity = () => setQuantity((q) => Math.min(99, q + 1))

  const canPurchase = Boolean(selectedVariant && selectedRegion)
  const unitPrice = selectedVariant ? parseUsdDecimalString(selectedVariant.price) : 0

  const handleAddToCart = () => {
    if (!canPurchase || !selectedVariant || !selectedRegion) return
    addItem(
      {
        id: productId,
        name: productName,
        variantId: selectedVariant.id,
        variantLabel: selectedVariant.label,
        regionLabel: selectedRegion.label,
        regionCountry: selectedRegion.countryCode,
        unitPrice,
        thumbUrl: productImageSrc,
      },
      quantity
    )
    onAddToCart?.()

    if (!getAccessToken()) return

    void (async () => {
      try {
        const line = useCartStore.getState().items.find((i) =>
          sameCartLine(i, {
            id: productId,
            variantId: selectedVariant.id,
            variantLabel: selectedVariant.label,
            regionLabel: selectedRegion.label,
          })
        )
        if (!line) return

        if (line.backendCartItemId) {
          await updateCartItemMutation.mutateAsync({
            cartItemId: line.backendCartItemId,
            dto: { quantity: line.quantity },
          })
          return
        }

        const res = await addCartItemMutation.mutateAsync({
          productId,
          quantity: line.quantity,
          variantId: selectedVariant.id,
          regionLabel: selectedRegion.label,
          regionCountry: selectedRegion.countryCode,
        })

        const backendItem = res.items.find(
          (i) =>
            i.productId === productId &&
            (i.variantId ?? '') === selectedVariant.id &&
            (i.regionLabel ?? '') === selectedRegion.label
        )
        if (backendItem) {
          setBackendCartItemId(
            {
              id: productId,
              variantId: selectedVariant.id,
              variantLabel: selectedVariant.label,
              regionLabel: selectedRegion.label,
              regionCountry: selectedRegion.countryCode,
            },
            backendItem.id
          )
        }
      } catch (err) {
        console.error('add-to-cart backend sync', err)
      }
    })()
  }

  return (
    <div className="text-lightsteelblue-200 flex w-full flex-col items-start gap-4">
      <div className="font-commissioner flex flex-col items-start gap-2 self-stretch">
        <div className="leading-num-20 font-semibold">Select Variant</div>
        <div className="relative box-border w-full overflow-visible rounded-lg border-[1px] border-solid border-[rgba(238,238,238,0.1)] bg-gray-200 text-white">
          <button
            type="button"
            aria-label={`Select variant for ${productName}`}
            aria-expanded={isVariantOpen}
            disabled={!variantList.length}
            onClick={() => {
              if (!variantList.length) return
              setIsVariantOpen((v) => !v)
              setIsStateOpen(false)
            }}
            className={`${siteSelectDropdownOptionRow} w-full items-center justify-between gap-5 disabled:opacity-50`}
          >
            <div className="min-w-0 flex-1 truncate">
              {selectedVariant?.label ?? 'No variants available'}
            </div>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={24}
              className="h-6 w-6 shrink-0 text-white opacity-75 transition-transform duration-300 ease-in-out"
              style={{ transform: isVariantOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {isVariantOpen && variantList.length > 0 && (
            <div
              className={`absolute top-full right-0 left-0 ${dropdownZClass} mt-2 overflow-hidden ${siteSelectDropdownPanel}`}
            >
              <div className={siteSelectDropdownList}>
                {variantList.map((option) => {
                  const isSelected = option.id === selectedVariantId
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-label={`Choose ${option.label}`}
                      onClick={() => {
                        setSelectedVariantId(option.id)
                        setIsVariantOpen(false)
                      }}
                      className={[
                        siteSelectDropdownOptionRow,
                        siteSelectDropdownOptionInteractive,
                        'justify-between gap-5',
                        isSelected ? 'bg-white/5' : '',
                      ].join(' ')}
                    >
                      <span className="min-w-0 flex-1 truncate">{option.label}</span>
                      {isSelected ? (
                        <CentralIcon
                          name="IconCheckmark2Small"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={18}
                          className="shrink-0 text-white"
                          ariaHidden={true}
                        />
                      ) : null}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-4 self-stretch sm:flex-row sm:gap-5">
        <div className="flex flex-1 flex-col items-start gap-2">
          <div className="leading-num-20 font-semibold">Select State</div>
          <div className="rounded-num-8 border-whitesmoke-300 relative w-full overflow-visible border border-solid bg-[#051329] text-white">
            <button
              type="button"
              aria-label={`Select state for ${productName}`}
              aria-expanded={isStateOpen}
              disabled={!regionList.length}
              onClick={() => {
                if (!regionList.length) return
                setIsStateOpen((v) => !v)
                setIsVariantOpen(false)
              }}
              className="px-num-12 py-num-10 text-num-16 flex w-full items-center justify-between gap-5 self-stretch disabled:opacity-50"
            >
              <div className="flex min-w-0 items-center gap-2">
                {selectedRegion ? (
                  <>
                    <CountryFlag
                      countryCode={selectedRegion.countryCode}
                      alt={`${selectedRegion.label} flag`}
                      className="max-h-num-18 h-full w-full max-w-[28px]"
                      size={28}
                      shape="rectangle"
                    />
                    <div className="tracking-num--0_01 leading-num-28 font-semibold">
                      {selectedRegion.label}
                    </div>
                  </>
                ) : (
                  <div className="tracking-num--0_01 leading-num-28 font-semibold">
                    No regions available
                  </div>
                )}
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

            {isStateOpen && regionList.length > 0 && (
              <div
                className={`absolute top-full right-0 left-0 ${dropdownZClass} mt-2 overflow-hidden ${siteSelectDropdownPanel}`}
              >
                <div className={siteSelectDropdownList}>
                  {regionList.map((option) => {
                    const isSelected = option.id === selectedRegionId
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-label={`Choose ${option.label}`}
                        onClick={() => {
                          setSelectedRegionId(option.id)
                          setIsStateOpen(false)
                        }}
                        className={[
                          'px-num-12 py-num-10 text-num-16 flex w-full items-center text-left',
                          siteSelectDropdownOptionInteractive,
                          'justify-between gap-5',
                          isSelected ? 'bg-white/5' : '',
                        ].join(' ')}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <CountryFlag
                            countryCode={option.countryCode}
                            alt={`${option.label} flag`}
                            className="max-h-num-18 h-full w-full max-w-[28px]"
                            size={28}
                            shape="rectangle"
                          />
                          <div className="tracking-num--0_01 leading-num-28 font-semibold">
                            {option.label}
                          </div>
                        </div>
                        {isSelected ? (
                          <CentralIcon
                            name="IconCheckmark2Small"
                            join="round"
                            fill="filled"
                            stroke="2"
                            radius="1"
                            size={18}
                            className="shrink-0 text-white"
                            ariaHidden={true}
                          />
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start gap-2">
          <div className="leading-num-20 font-semibold">Select Quantity</div>
          <div className="rounded-num-8 border-whitesmoke-300 px-num-12 py-num-10 text-num-16 w-full overflow-hidden border-[1px] border-solid bg-[#051329] text-white">
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

      <div className="text-num-16 flex min-h-10 flex-col items-stretch gap-4 self-stretch text-white sm:flex-row sm:gap-2.5">
        <button
          type="button"
          disabled={!canPurchase}
          className={cn(addToCartButtonClassName, !canPurchase && 'cursor-not-allowed opacity-50')}
          onClick={handleAddToCart}
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
          <div className="tracking-num--0_01 leading-num-24 font-semibold">Add to Cart</div>
        </button>
        <button
          type="button"
          disabled={!canPurchase}
          className={cn(
            'bg-fuchsia py-num-8 px-num-16 box-border flex h-10 min-h-0 flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)]',
            !canPurchase && 'cursor-not-allowed opacity-50'
          )}
          onClick={() => {
            if (!canPurchase) return
            handleAddToCart()
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
          <div className="tracking-num--0_01 leading-num-24 font-semibold">Checkout</div>
        </button>
      </div>
    </div>
  )
}

type PanelProps = {
  product: ProductDetail
}

export const ShopDetailPurchasePanel: FunctionComponent<PanelProps> = ({ product }) => {
  const [isProductDescriptionOpen, setIsProductDescriptionOpen] = useState(true)
  const [isProcessToRedeemOpen, setIsProcessToRedeemOpen] = useState(false)
  const [isProductWarrantyOpen, setIsProductWarrantyOpen] = useState(false)

  const heroSrc = product.heroImageUrl ?? product.primaryImageUrl ?? undefined

  return (
    <>
      <div className="rounded-num-12 text-lightsteelblue-200 box-border flex w-full flex-col items-start gap-4 bg-gray-100 p-4 sm:gap-5 sm:p-5">
        <ShopDetailPurchaseControls
          productId={product.id}
          productName={product.name}
          productImageSrc={heroSrc}
          variants={product.variants}
          regions={product.regions}
        />
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
        <div className="py-num-0 text-num-14 sm:px-num-16 flex flex-wrap items-center justify-center gap-2 px-4 text-center sm:gap-3">
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
                {product.description.trim().startsWith('<') ? (
                  <RichHtml html={product.description} emptyText="No description yet." />
                ) : (
                  <p className="text-num-16 leading-num-24 text-lightsteelblue-100 m-0 font-medium opacity-90">
                    {product.description || 'No description yet.'}
                  </p>
                )}
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
              <div className="pt-num-6 pb-num-6 w-full">
                <RichHtml
                  html={product.redeemProcess}
                  emptyText="Redemption instructions will appear here once available."
                />
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
              <div className="pt-num-6 pb-num-6 w-full">
                <RichHtml
                  html={product.warrantyText}
                  emptyText="Warranty details will appear here once available."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
