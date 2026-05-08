/* eslint-disable react/no-unescaped-entities */
'use client'

import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import CentralIcon from '@central-icons-react/all'

import {
  siteSelectDropdownList,
  siteSelectDropdownOptionInteractive,
  siteSelectDropdownOptionRow,
  siteSelectDropdownPanel,
} from '@/components/ui/siteSelectDropdown'
import { useAddCartItemMutation, useUpdateCartItemMutation } from '@/hooks/use-carts'
import { parseApiError } from '@/lib/api-error'
import { cartStockErrorToastMessage, parseCartStockError } from '@/lib/cart-stock-error'
import { parseUsdDecimalString } from '@/lib/cart-format'
import { sanitizeHtml } from '@/lib/sanitize-html'
import { toast } from '@/lib/toast'
import { sameCartLine, useCartStore } from '@/stores/cart-store'
import { getAccessToken } from '@/lib/token'
import { cn } from '@/lib/utils'
import type { ProductDetail, ProductVariant } from '@/types/product'

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
      <p className="text-muted-foreground m-0 text-sm leading-6 opacity-80">{emptyText}</p>
    ) : null
  }
  const safe = sanitizeHtml(trimmed)
  if (!safe.trim()) {
    return emptyText ? (
      <p className="text-muted-foreground m-0 text-sm leading-6 opacity-80">{emptyText}</p>
    ) : null
  }
  return (
    <div
      className={cn(
        'prose dark:prose-invert max-w-none text-base leading-6 [&_a]:text-fuchsia-600 dark:[&_a]:text-fuchsia-200',
        className
      )}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  )
}

function sortActiveVariants(variants: ProductVariant[]) {
  return [...variants]
    .filter((v) => v.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label))
}

function variantStockMessage(stockQuantity: number): string {
  if (stockQuantity <= 0) return 'Out of stock'
  if (stockQuantity <= 10) return `Only ${stockQuantity} left`
  return `In stock: ${stockQuantity}`
}

type PurchaseControlsProps = {
  productId: string
  productName: string
  productImageSrc?: string
  variants: ProductVariant[]
  /** Override Add to Cart button classes (e.g. Quick Buy modal uses #0D1B35). */
  addToCartButtonClassName?: string
  /** z-index for open dropdown menus (high enough to stack above modals / siblings). */
  dropdownZClass?: string
  /** Called after add to cart succeeds (e.g. close quick-buy modal). */
  onAddToCart?: () => void
}

const DEFAULT_ADD_TO_CART_CLASS =
  'box-border py-num-8 px-num-16 flex h-10 min-h-0 flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] bg-foreground text-background dark:bg-gray-400 dark:text-white shadow-[0px_2px_0px_rgba(13,27,53,0.5)]'

export const ShopDetailPurchaseControls: FunctionComponent<PurchaseControlsProps> = ({
  productId,
  productName,
  productImageSrc,
  variants,
  addToCartButtonClassName = DEFAULT_ADD_TO_CART_CLASS,
  dropdownZClass = 'z-[999]',
  onAddToCart,
}) => {
  const variantList = useMemo(() => sortActiveVariants(variants), [variants])

  const [isVariantOpen, setIsVariantOpen] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!variantList.length) {
      setSelectedVariantId('')
      return
    }
    setSelectedVariantId((prev) => {
      const cur = prev ? variantList.find((v) => v.id === prev) : undefined
      if (cur) {
        if (cur.stockQuantity > 0) return prev
        const fallback = variantList.find((v) => v.stockQuantity > 0)
        return fallback?.id ?? cur.id
      }
      const firstInStock = variantList.find((v) => v.stockQuantity > 0)
      return (firstInStock ?? variantList[0]).id
    })
  }, [variantList])

  const router = useRouter()
  const addCartItemMutation = useAddCartItemMutation()
  const updateCartItemMutation = useUpdateCartItemMutation()
  const addItem = useCartStore((s) => s.addItem)
  const setItemQuantity = useCartStore((s) => s.setItemQuantity)
  const setBackendCartItemId = useCartStore((s) => s.setBackendCartItemId)

  const selectedVariant = variantList.find((v) => v.id === selectedVariantId) ?? variantList[0]

  const variantStockQty = selectedVariant?.stockQuantity ?? 0

  const maxSelectableUnits = selectedVariant ? Math.min(99, Math.max(0, variantStockQty)) : 0

  useEffect(() => {
    if (!selectedVariant) return
    const cap = Math.min(99, Math.max(0, variantStockQty))
    setQuantity((q) => {
      if (cap === 0) return 0
      return Math.max(1, Math.min(q, cap))
    })
  }, [selectedVariantId, variantStockQty])

  const quantityText = String(quantity).padStart(2, '0')

  const onDecrementQuantity = () =>
    setQuantity((q) => {
      if (maxSelectableUnits <= 0) return 0
      return Math.max(1, q - 1)
    })
  const onIncrementQuantity = () =>
    setQuantity((q) => {
      if (maxSelectableUnits <= 0) return 0
      return Math.min(maxSelectableUnits, q + 1)
    })

  const canPurchase = Boolean(selectedVariant && selectedVariant.stockQuantity > 0)
  const unitPrice = selectedVariant ? parseUsdDecimalString(selectedVariant.price) : 0

  const handleAddToCart = () => {
    if (!canPurchase || !selectedVariant) return
    if (quantity < 1 || quantity > maxSelectableUnits) {
      toast.error('Choose a valid quantity for the available stock.')
      return
    }

    const cartKey = {
      id: productId,
      variantId: selectedVariant.id,
      variantLabel: selectedVariant.label,
    }

    const existing = useCartStore.getState().items.find((i) => sameCartLine(i, cartKey))
    const merged = Math.min(99, (existing?.quantity ?? 0) + quantity)
    if (merged > selectedVariant.stockQuantity) {
      toast.error(cartStockErrorToastMessage('insufficientStock'))
      return
    }

    const prevItems = useCartStore.getState().items.map((i) => ({ ...i }))

    addItem(
      {
        id: productId,
        name: productName,
        variantId: selectedVariant.id,
        variantLabel: selectedVariant.label,
        unitPrice,
        thumbUrl: productImageSrc,
      },
      quantity
    )
    onAddToCart?.()

    if (!getAccessToken()) return

    void (async () => {
      try {
        let line = useCartStore.getState().items.find((i) => sameCartLine(i, cartKey))
        if (!line) return

        let qtyForApi = Math.min(line.quantity, selectedVariant.stockQuantity)
        if (qtyForApi < line.quantity) {
          setItemQuantity(cartKey, qtyForApi)
          const afterCap = useCartStore.getState().items.find((i) => sameCartLine(i, cartKey))
          if (!afterCap || qtyForApi < 1) return
          line = afterCap
        }

        if (line.backendCartItemId) {
          await updateCartItemMutation.mutateAsync({
            cartItemId: line.backendCartItemId,
            dto: { quantity: qtyForApi },
          })
          return
        }

        const res = await addCartItemMutation.mutateAsync({
          productId,
          quantity: qtyForApi,
          variantId: selectedVariant.id,
        })

        const backendItem = res.items.find(
          (i) => i.productId === productId && (i.variantId ?? '') === selectedVariant.id
        )
        if (backendItem) {
          setBackendCartItemId(cartKey, backendItem.id)
        }
      } catch (err) {
        useCartStore.setState({ items: prevItems })
        const kind = parseCartStockError(err)
        toast.error(kind ? cartStockErrorToastMessage(kind) : parseApiError(err))
      }
    })()
  }

  return (
    <div className="text-muted-foreground flex w-full flex-col items-start gap-4">
      <div className="font-commissioner flex flex-col items-start gap-2 self-stretch">
        <div className="flex w-full flex-col gap-1">
          <div className="leading-num-20 text-foreground dark:text-white font-semibold">Select Variant</div>
          {selectedVariant ? (
            <p className="text-muted-foreground m-0 text-sm font-medium">
              {variantStockMessage(selectedVariant.stockQuantity)}
            </p>
          ) : null}
        </div>
        <div className="relative box-border w-full overflow-visible rounded-lg border border-solid border-border-subtle bg-card-elevated text-foreground dark:text-white">
          <button
            type="button"
            aria-label={`Select variant for ${productName}`}
            aria-expanded={isVariantOpen}
            disabled={!variantList.length}
            onClick={() => {
              if (!variantList.length) return
              setIsVariantOpen((v) => !v)
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
              className="h-6 w-6 shrink-0 text-foreground dark:text-white opacity-75 transition-transform duration-300 ease-in-out"
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
                  const out = option.stockQuantity <= 0
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-label={`Choose ${option.label}`}
                      disabled={out}
                      onClick={() => {
                        if (out) return
                        setSelectedVariantId(option.id)
                        setIsVariantOpen(false)
                      }}
                      className={[
                        siteSelectDropdownOptionRow,
                        siteSelectDropdownOptionInteractive,
                        'justify-between gap-5',
                        isSelected ? 'bg-foreground/5 dark:bg-white/5' : '',
                        out ? 'cursor-not-allowed opacity-45' : '',
                      ].join(' ')}
                    >
                      <span className="min-w-0 flex-1 truncate">
                        {option.label}
                        {out ? ' (Out)' : ''}
                      </span>
                      {isSelected ? (
                        <CentralIcon
                          name="IconCheckmark2Small"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={18}
                          className="shrink-0 text-foreground dark:text-white"
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
          <div className="leading-num-20 text-foreground dark:text-white font-semibold">Select Quantity</div>
          <div className="rounded-num-8 border-border-subtle px-num-12 py-num-10 text-num-16 w-full overflow-hidden border border-solid bg-card-elevated text-foreground dark:text-white">
            <div className="flex items-center justify-between gap-5 self-stretch">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={maxSelectableUnits <= 0}
                onClick={onDecrementQuantity}
                className="flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CentralIcon
                  name="IconMinusLarge"
                  join="round"
                  fill="outlined"
                  stroke="2"
                  radius="1"
                  size={16}
                  className="text-muted-foreground"
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
                disabled={maxSelectableUnits <= 0 || quantity >= maxSelectableUnits}
                onClick={onIncrementQuantity}
                className="flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CentralIcon
                  name="IconPlusLarge"
                  join="round"
                  fill="outlined"
                  stroke="2"
                  radius="1"
                  size={16}
                  className="text-muted-foreground"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-num-16 flex min-h-10 flex-col items-stretch gap-4 self-stretch text-white sm:flex-row sm:gap-2.5">
        <button
          type="button"
          disabled={!canPurchase || quantity < 1}
          className={cn(
            addToCartButtonClassName,
            (!canPurchase || quantity < 1) && 'cursor-not-allowed opacity-50'
          )}
          onClick={handleAddToCart}
        >
          <CentralIcon
            name="IconBasket1"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            className="text-background dark:text-white"
          />
          <div className="tracking-num--0_01 leading-num-24 font-semibold">Add to Cart</div>
        </button>
        <button
          type="button"
          disabled={!canPurchase || quantity < 1}
          className={cn(
            'bg-fuchsia py-num-8 px-num-16 box-border flex h-10 min-h-0 flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] shadow-[0px_2px_0px_rgba(235,45,255,0.5)]',
            (!canPurchase || quantity < 1) && 'cursor-not-allowed opacity-50'
          )}
          onClick={() => {
            if (!canPurchase || quantity < 1) return
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
          <div className="tracking-num--0_01 leading-num-24 font-semibold text-white">Checkout</div>
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
      <div className="rounded-num-12 text-muted-foreground box-border flex w-full flex-col items-start gap-4 bg-card-elevated p-4 sm:gap-5 sm:p-5">
        <ShopDetailPurchaseControls
          productId={product.id}
          productName={product.name}
          productImageSrc={heroSrc}
          variants={product.variants}
        />
      </div>

      <div className="border-border-subtle h-px w-full border-t border-solid opacity-50" />

      <div className="font-nata-sans flex flex-col items-start gap-4 self-stretch text-center sm:gap-5">
        <div className="flex flex-wrap items-center justify-center gap-1.5 self-stretch sm:gap-[5px]">
          <div className="tracking-num-0.02 text-foreground font-extrabold">EVERY PURCHASE WITH</div>
          <div className="font-heydex flex items-center p-1 text-fuchsia-600 dark:text-fuchsia-200">
            <div className="tracking-num-0.02 font-extrabold">JINX</div>
          </div>
          <div className="tracking-num-0.02 text-foreground font-extrabold">GUARANTEES</div>
        </div>
        <div className="py-num-0 text-num-14 sm:px-num-16 flex w-full flex-wrap items-center justify-center gap-2 self-center px-4 text-center sm:gap-3">
          <div className="rounded-num-8 border-mediumslateblue p-num-10 flex flex-col items-start border border-solid bg-card-elevated dark:[background:linear-gradient(180deg,rgba(139,92,246,0),rgba(139,92,246,0.2)),linear-gradient(#1a0d35,#1a0d35)]">
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
                <div className="tracking-num-0.02 leading-num-20 text-foreground dark:text-white font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,0,0,0.1)] dark:[text-shadow:0px_0px_18.58px_rgba(0,0,0,0.6)]">
                  Instant Access
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-num-8 p-num-10 border-red flex flex-col items-start border border-solid bg-card-elevated dark:[background:linear-gradient(180deg,rgba(255,42,42,0),rgba(255,42,42,0.2)),linear-gradient(#1a0d35,#1a0d35)]">
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
                <div className="tracking-num-0.02 leading-num-20 text-foreground dark:text-white font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,0,0,0.1)] dark:[text-shadow:0px_0px_18.58px_rgba(0,0,0,0.6)]">{`Safe & Secure`}</div>
              </div>
            </div>
          </div>
          <div className="rounded-num-8 border-deepskyblue-200 p-num-10 flex flex-col items-start border border-solid bg-card-elevated dark:[background:linear-gradient(180deg,rgba(0,212,255,0),rgba(0,212,255,0.2)),linear-gradient(#1a0d35,#1a0d35)]">
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
                <div className="tracking-num-0.02 leading-num-20 text-foreground dark:text-white font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,0,0,0.1)] dark:[text-shadow:0px_0px_18.58px_rgba(0,0,0,0.6)]">
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-num-8 border-mediumvioletred p-num-10 flex flex-col items-start border border-solid bg-card-elevated dark:[background:linear-gradient(180deg,rgba(217,27,144,0),rgba(217,27,144,0.2)),linear-gradient(#1a0d35,#1a0d35)]">
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
                <div className="tracking-num-0.02 leading-num-20 text-foreground dark:text-white font-extrabold uppercase [text-shadow:0px_0px_18.58px_rgba(0,0,0,0.1)] dark:[text-shadow:0px_0px_18.58px_rgba(0,0,0,0.6)]">
                  No Hidden Fees
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-border-subtle h-px w-full border-t border-solid opacity-50" />

      <div className="flex w-full flex-col items-start gap-4">
        <div className="rounded-num-12 sm:p-num-18 box-border flex w-full flex-col items-start overflow-hidden bg-card-elevated p-4">
          <button
            type="button"
            aria-expanded={isProductDescriptionOpen}
            className="flex w-full items-center justify-between gap-0 self-stretch"
            onClick={() => setIsProductDescriptionOpen((v) => !v)}
          >
            <b className="tracking-num--0_01 leading-num-28 flex-1 text-left text-foreground dark:text-white">
              Product Description
            </b>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={20}
              className="text-foreground dark:text-white opacity-75 transition-transform duration-300 ease-in-out"
              style={{ transform: isProductDescriptionOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: isProductDescriptionOpen ? '1fr' : '0fr' }}
          >
            <div className="w-full overflow-hidden">
              <div className="bg-border-subtle relative left-1/2 mt-2 h-px w-screen -translate-x-1/2 opacity-50" />
              <div className="pt-num-6 pb-num-6 flex w-full flex-col items-start gap-5 text-foreground dark:text-white">
                <RichHtml html={product.description} emptyText="No description yet." />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-num-12 sm:p-num-18 box-border flex w-full flex-col items-start overflow-hidden bg-card-elevated p-4">
          <button
            type="button"
            aria-expanded={isProcessToRedeemOpen}
            className="flex w-full items-center justify-between gap-0 self-stretch"
            onClick={() => setIsProcessToRedeemOpen((v) => !v)}
          >
            <b className="tracking-num--0_01 leading-num-28 flex-1 text-left text-foreground dark:text-white">Process to Redeem</b>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={20}
              className="text-foreground dark:text-white opacity-75 transition-transform duration-300 ease-in-out"
              style={{ transform: isProcessToRedeemOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: isProcessToRedeemOpen ? '1fr' : '0fr' }}
          >
            <div className="w-full overflow-hidden">
              <div className="bg-border-subtle relative left-1/2 mt-2 h-px w-screen -translate-x-1/2 opacity-50" />
              <div className="pt-num-6 pb-num-6 w-full">
                <RichHtml
                  html={product.redeemProcess}
                  emptyText="Redemption instructions will appear here once available."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-num-12 sm:p-num-18 box-border flex w-full flex-col items-start overflow-hidden bg-card-elevated p-4">
          <button
            type="button"
            aria-expanded={isProductWarrantyOpen}
            className="flex w-full items-center justify-between gap-0 self-stretch"
            onClick={() => setIsProductWarrantyOpen((v) => !v)}
          >
            <b className="tracking-num--0_01 leading-num-28 flex-1 text-left text-foreground dark:text-white">Product Warranty</b>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={20}
              className="text-foreground dark:text-white opacity-75 transition-transform duration-300 ease-in-out"
              style={{ transform: isProductWarrantyOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: isProductWarrantyOpen ? '1fr' : '0fr' }}
          >
            <div className="w-full overflow-hidden">
              <div className="bg-border-subtle relative left-1/2 mt-2 h-px w-screen -translate-x-1/2 opacity-50" />
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
