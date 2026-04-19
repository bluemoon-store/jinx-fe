import { api } from '@/lib/api'
import type { BackendResponse } from '@/types/auth'
import type {
  ProductCard,
  ProductCategory,
  ProductDetail,
  ProductRegion,
  ProductTag,
  ProductVariant,
} from '@/types/product'

/** Query params for public product list — matches planned GET /products filters. */
export type GetProductsParams = {
  isHot?: boolean
  isNew?: boolean
  isRestocked?: boolean
  isFeatured?: boolean
  categorySlug?: string
  page?: number
  limit?: number
  /** Uses GET /products/search when non-empty */
  search?: string
}

export type ProductsPageResult = {
  items: ProductCard[]
  total: number
  page: number
  limit: number
}

type UnknownRecord = Record<string, unknown>

function pickStr(v: unknown): string | undefined {
  return typeof v === 'string' ? v : undefined
}

function pickNum(v: unknown): number | undefined {
  return typeof v === 'number' && !Number.isNaN(v) ? v : undefined
}

function pickBool(v: unknown): boolean | undefined {
  return typeof v === 'boolean' ? v : undefined
}

function mapVariant(raw: UnknownRecord): ProductVariant {
  return {
    id: pickStr(raw.id) ?? '',
    label: pickStr(raw.label) ?? '',
    price: pickStr(raw.price) ?? String(raw.price ?? ''),
    currency: pickStr(raw.currency) ?? 'USD',
    stockQuantity: pickNum(raw.stockQuantity ?? raw.stock_quantity) ?? 0,
    isActive: pickBool(raw.isActive ?? raw.is_active) ?? true,
    sortOrder: pickNum(raw.sortOrder ?? raw.sort_order) ?? 0,
  }
}

function mapRegion(raw: UnknownRecord): ProductRegion {
  return {
    id: pickStr(raw.id) ?? '',
    label: pickStr(raw.label) ?? '',
    countryCode: pickStr(raw.countryCode ?? raw.country_code) ?? '',
    isActive: pickBool(raw.isActive ?? raw.is_active) ?? true,
    sortOrder: pickNum(raw.sortOrder ?? raw.sort_order) ?? 0,
  }
}

function deriveTags(isHot: boolean, isNew: boolean, isNFA: boolean): ProductTag[] {
  const tags: ProductTag[] = []
  if (isHot) tags.push('Hot')
  if (isNFA) tags.push('NFA')
  if (isNew) tags.push('New')
  return tags
}

function mapProductCard(raw: UnknownRecord): ProductCard {
  const categoryRaw = (raw.category ?? {}) as UnknownRecord
  const isHot = pickBool(raw.isHot ?? raw.is_hot) ?? false
  const isNew = pickBool(raw.isNew ?? raw.is_new) ?? false
  const isNFA = pickBool(raw.isNFA ?? raw.is_nfa) ?? false
  const isRestocked = pickBool(raw.isRestocked ?? raw.is_restocked) ?? false

  return {
    id: pickStr(raw.id) ?? '',
    name: pickStr(raw.name) ?? '',
    slug: pickStr(raw.slug) ?? '',
    fromPrice: pickStr(raw.fromPrice ?? raw.from_price) ?? '0',
    primaryImageUrl: pickStr(raw.primaryImageUrl ?? raw.primary_image_url) ?? null,
    category: {
      name: pickStr(categoryRaw.name) ?? '',
      slug: pickStr(categoryRaw.slug) ?? '',
    },
    isHot,
    isNew,
    isNFA,
    isRestocked,
    stockQuantity: pickNum(raw.stockQuantity ?? raw.stock_quantity) ?? 0,
  }
}

function mapProductDetail(raw: UnknownRecord): ProductDetail {
  const card = mapProductCard(raw)
  const variantsRaw = raw.variants
  const regionsRaw = raw.regions
  const relatedRaw = raw.related

  const variants = Array.isArray(variantsRaw)
    ? variantsRaw.map((v) => mapVariant(v as UnknownRecord))
    : []
  const regions = Array.isArray(regionsRaw)
    ? regionsRaw.map((r) => mapRegion(r as UnknownRecord))
    : []
  const related = Array.isArray(relatedRaw)
    ? relatedRaw.map((r) => mapProductCard(r as UnknownRecord))
    : []

  const breadcrumbsRaw = raw.breadcrumbs
  const breadcrumbs = Array.isArray(breadcrumbsRaw)
    ? breadcrumbsRaw.filter((b): b is string => typeof b === 'string')
    : ['All Products', card.category.name].filter(Boolean)

  const heroImageUrl = pickStr(raw.heroImageUrl ?? raw.hero_image_url) ?? card.primaryImageUrl

  return {
    ...card,
    shortNotice: pickStr(raw.shortNotice ?? raw.short_notice) ?? null,
    description: pickStr(raw.description ?? raw.summary) ?? '',
    redeemProcess: pickStr(raw.redeemProcess ?? raw.redeem_process) ?? null,
    warrantyText: pickStr(raw.warrantyText ?? raw.warranty_text) ?? null,
    countryOfOrigin: pickStr(raw.countryOfOrigin ?? raw.country_of_origin) ?? null,
    heroImageUrl,
    breadcrumbs,
    variants,
    regions,
    related,
    tags: deriveTags(card.isHot, card.isNew, card.isNFA),
  }
}

function unwrapData<T>(res: { data: BackendResponse<T> }): T {
  return res.data.data
}

function parseProductsPayload(payload: unknown): ProductsPageResult {
  if (Array.isArray(payload)) {
    const items = payload.map((p) => mapProductCard(p as UnknownRecord))
    return {
      items,
      total: items.length,
      page: 1,
      limit: items.length || 12,
    }
  }

  if (payload && typeof payload === 'object') {
    const o = payload as UnknownRecord
    const list = o.items ?? o.data ?? o.products
    const items = Array.isArray(list) ? list.map((p) => mapProductCard(p as UnknownRecord)) : []
    const total = pickNum(o.total ?? o.totalCount ?? o.total_count) ?? items.length
    const page = pickNum(o.page ?? o.currentPage ?? o.current_page) ?? 1
    const limit =
      pickNum(o.limit ?? o.perPage ?? o.per_page) ?? (items.length > 0 ? items.length : 12)
    return { items, total, page, limit }
  }

  return { items: [], total: 0, page: 1, limit: 12 }
}

export async function getProductsAction(params?: GetProductsParams): Promise<ProductsPageResult> {
  const search = params?.search?.trim()
  const q: UnknownRecord = {}

  if (params?.isHot !== undefined) q.isHot = params.isHot
  if (params?.isNew !== undefined) q.isNew = params.isNew
  if (params?.isRestocked !== undefined) q.isRestocked = params.isRestocked
  if (params?.isFeatured !== undefined) q.isFeatured = params.isFeatured
  if (params?.categorySlug) q.categorySlug = params.categorySlug
  if (params?.page !== undefined) q.page = params.page
  if (params?.limit !== undefined) q.limit = params.limit

  if (search) {
    const res = await api.get<BackendResponse<unknown>>('/products/search', {
      params: { q: search, page: params?.page, limit: params?.limit },
    })
    return parseProductsPayload(unwrapData(res))
  }

  const res = await api.get<BackendResponse<unknown>>('/products', { params: q })
  return parseProductsPayload(unwrapData(res))
}

export async function getProductBySlugAction(slug: string): Promise<ProductDetail> {
  const res = await api.get<BackendResponse<unknown>>(`/products/slug/${encodeURIComponent(slug)}`)
  const raw = unwrapData(res) as unknown
  if (!raw || typeof raw !== 'object') {
    throw new Error('Product not found')
  }
  return mapProductDetail(raw as UnknownRecord)
}

export async function getCategoriesAction(): Promise<ProductCategory[]> {
  const res = await api.get<BackendResponse<unknown>>('/products/categories')
  const data = unwrapData(res)
  const list = Array.isArray(data) ? data : ((data as UnknownRecord)?.items ?? [])
  if (!Array.isArray(list)) return []

  return list.map((c) => {
    const row = c as UnknownRecord
    return {
      name: pickStr(row.name) ?? '',
      slug: pickStr(row.slug) ?? '',
      icon: pickStr(row.icon) ?? 'IconSquareGridMagnifyingGlass',
    }
  })
}
