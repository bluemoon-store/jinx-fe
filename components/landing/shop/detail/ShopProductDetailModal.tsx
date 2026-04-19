'use client'

import { FunctionComponent, useState } from 'react'
import CentralIcon from '@central-icons-react/all'

import { BrandLoader } from '@/components/ui/BrandLoader'
import { useProductDetailQuery } from '@/hooks/use-products'
import type { ProductTag } from '@/types/product'

import { ShopDetailPurchaseControls } from './ShopDetailPurchasePanel'

type Props = {
  productSlug: string
  onClose: () => void
}

const ADD_TO_CART_MODAL_CLASS =
  'box-border py-num-8 px-num-16 flex h-10 min-h-0 flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] bg-[#0D1B35] shadow-[0px_2px_0px_rgba(13,_27,_53,_0.5)]'

function ProductTagBadges({ tags }: { tags: ProductTag[] }) {
  if (!tags.length) return null
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {tags.includes('Hot') ? (
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
      ) : null}
      {tags.includes('NFA') ? (
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
          <div className="leading-num-20 font-semibold">NFA</div>
        </div>
      ) : null}
      {tags.includes('New') ? (
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
          <div className="leading-num-20 font-semibold">New</div>
        </div>
      ) : null}
    </div>
  )
}

const ShopProductDetailModal: FunctionComponent<Props> = ({ productSlug, onClose }) => {
  const { data: product, isLoading, isError } = useProductDetailQuery(productSlug)
  const [isProductDescriptionOpen, setIsProductDescriptionOpen] = useState(true)

  const imageSrc = product?.primaryImageUrl ?? ''

  return (
    <section className="text-ghostwhite font-commissioner border-darkslateblue mx-auto my-auto box-border flex w-full max-w-[860px] flex-col items-start overflow-x-hidden overflow-y-auto rounded-xl border-[1px] border-solid bg-gray-400 px-5 py-[18px] text-left text-[20px] shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)]">
      <div className="flex flex-col items-center gap-5 self-stretch">
        <header className="flex flex-col items-start gap-3 self-stretch">
          <div className="flex items-center justify-between gap-5 self-stretch">
            <div className="flex items-center">
              <div className="leading-num-28 font-extrabold tracking-[0.02em] uppercase">
                {isLoading ? 'Loading…' : product?.name ?? 'Product'}
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

        {isLoading ? (
          <div className="flex w-full flex-col items-center gap-6 py-12">
            <BrandLoader />
          </div>
        ) : isError || !product ? (
          <div className="text-lightsteelblue-100 w-full px-4 py-8 text-center text-sm">
            We couldn&apos;t load this product. Try again from the shop.
          </div>
        ) : (
          <div className="text-whitesmoke-200 flex items-start justify-center gap-5 self-stretch text-center text-[12px]">
            <div className="flex flex-col items-start justify-center">
              <div className="flex flex-col items-start self-stretch">
                <div className="border-whitesmoke-300 rounded-num-8 flex flex-col items-center justify-center gap-4 overflow-hidden border-[1.8px] border-solid bg-gray-100 p-4 sm:gap-5 sm:p-6 md:p-8 lg:p-[25px]">
                  <div className="h-full w-full overflow-hidden rounded-[14.61px] shadow-[0px_0px_15.76px_rgba(0,_0,_0,_0.6)]">
                    {imageSrc ? (
                      <img
                        alt=""
                        src={imageSrc}
                        className="max-h-full max-w-full scale-110 object-contain"
                      />
                    ) : (
                      <div className="bg-gray-300/30 aspect-video w-full min-h-[120px]" aria-hidden />
                    )}
                  </div>
                  <ProductTagBadges tags={product.tags} />
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
                      {product.description.trim().startsWith('<') ? (
                        <div
                          className="prose prose-invert max-w-none text-sm leading-6"
                          dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                      ) : (
                        <p className="m-0 text-sm leading-6 opacity-80">{product.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative isolate w-full min-w-0 overflow-visible">
                <ShopDetailPurchaseControls
                  productId={product.id}
                  productName={product.name}
                  productImageSrc={imageSrc}
                  variants={product.variants}
                  regions={product.regions}
                  addToCartButtonClassName={ADD_TO_CART_MODAL_CLASS}
                  dropdownZClass="z-[100]"
                  onAddToCart={onClose}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ShopProductDetailModal
