import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Link from 'next/link'
import { FunctionComponent } from 'react'

import { type DashboardOrderSummaryProps, dashboardOrderStatusConfig } from './DashboardOrderCard'
import { formatOrderBrandLabel } from './dashboard-order-brand'

export const DashboardOrderRow: FunctionComponent<DashboardOrderSummaryProps> = ({
  id,
  brand,
  itemCount,
  price,
  status,
}) => {
  const cfg = dashboardOrderStatusConfig[status]
  const displayName = formatOrderBrandLabel(brand)

  return (
    <div className="flex w-full min-w-0 flex-row items-center gap-3 bg-[#071935] px-3 py-3 transition-colors hover:bg-[#13253F] sm:gap-4 sm:px-4 sm:py-3.5 md:px-5">
      <div className="rounded-num-8 flex h-12 w-[4.75rem] shrink-0 items-center justify-center overflow-hidden bg-[#FF5A5F] shadow-[0px_2px_8px_rgba(0,0,0,0.35)] sm:h-14 sm:w-28">
        <img className="h-full w-full scale-110 object-cover" alt="" src="/icons/airbnb.svg" />
      </div>

      <div className="font-commissioner flex min-w-0 flex-1 flex-col gap-1">
        <div className="text-ghostwhite tracking-num-0_02 truncate text-sm font-bold sm:text-base">
          {displayName}
        </div>
        <div className="text-lightsteelblue-100 sm:text-num-14 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs leading-5">
          <span className="font-medium">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </span>
          <span className="text-lightsteelblue-200" aria-hidden>
            –
          </span>
          <b className="text-ghostwhite font-bold">{price}</b>
          <span className="text-lightsteelblue-200" aria-hidden>
            –
          </span>
          <span className={`inline-flex items-center gap-1 ${cfg.color}`}>
            <CentralIcon
              name={cfg.icon as any}
              join="round"
              fill="filled"
              stroke="1"
              radius="1"
              size={14}
              ariaHidden={true}
            />
            <span className="font-semibold">{cfg.label}</span>
          </span>
        </div>
      </div>

      <Link
        href={`/dashboard/orders/${id}` as Route}
        className="text-ghostwhite font-commissioner sm:text-num-14 rounded-num-8 focus-visible:ring-fuchsia/50 shrink-0 bg-[#13253F] px-3 py-2 text-xs font-semibold focus-visible:ring-2 focus-visible:outline-none sm:px-5 sm:py-2.5 sm:text-sm"
      >
        View Details
      </Link>
    </div>
  )
}
