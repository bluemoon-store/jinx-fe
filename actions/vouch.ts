import {
  vouchesApi,
  type DropClaimVouchResponse,
  type PaginatedResponse,
  type Vouch,
  type VouchListParams,
} from '@/lib/api'

export async function createVouchAction(form: FormData): Promise<Vouch> {
  return vouchesApi.create(form)
}

export async function getVouchesAction(
  params?: VouchListParams
): Promise<PaginatedResponse<Vouch>> {
  return vouchesApi.list(params)
}

export async function getMyVouchesAction(
  params?: VouchListParams
): Promise<PaginatedResponse<Vouch>> {
  return vouchesApi.listMine(params)
}

export async function getProductVouchesAction(
  productId: string,
  params?: VouchListParams
): Promise<PaginatedResponse<Vouch>> {
  return vouchesApi.listForProduct(productId, params)
}

export async function deleteVouchAction(id: string): Promise<void> {
  return vouchesApi.delete(id)
}

export async function createDropClaimVouchAction(form: FormData): Promise<DropClaimVouchResponse> {
  return vouchesApi.createForDropClaim(form)
}

export async function deleteDropClaimVouchAction(id: string): Promise<void> {
  return vouchesApi.deleteForDropClaim(id)
}
