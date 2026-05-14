import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Link from 'next/link'
import { FunctionComponent } from 'react'

import { type DashboardOrderSummaryProps, dashboardOrderStatusConfig } from './DashboardOrderCard'
import { formatOrderBrandLabel } from './dashboard-order-brand'

export const DashboardOrderRow: FunctionComponent<DashboardOrderSummaryProps> = ({
  id,
  brand,
  imageUrl,
  itemCount,
  price,
  status,
}) => {
  const cfg = dashboardOrderStatusConfig[status]
  const displayName = formatOrderBrandLabel(brand)

  return (
    <div className="group hover:bg-hover-bg flex w-full min-w-0 flex-row items-center gap-3 bg-transparent px-3 py-3 transition-colors sm:gap-4 sm:px-4 sm:py-3.5 md:px-5 dark:bg-gray-700 dark:hover:bg-[#13253F]">
      <div className="bg-card-elevated rounded-num-8 flex h-12 w-19 shrink-0 items-center justify-center overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.35)] sm:h-14 sm:w-28 dark:bg-[#0D1B35]">
        <img
          className="h-full w-full scale-110 object-cover"
          alt=""
          src={imageUrl ?? '/icons/airbnb.svg'}
        />
      </div>

      <div className="font-commissioner flex min-w-0 flex-1 flex-col gap-1">
        <div className="text-foreground dark:text-ghostwhite tracking-num-0.02 truncate text-sm font-bold sm:text-base">
          {displayName}
        </div>
        <div className="text-muted-foreground dark:text-lightsteelblue-100 sm:text-num-14 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs leading-5">
          <span className="font-medium">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </span>
          <span className="text-muted-foreground/70 dark:text-lightsteelblue-200" aria-hidden>
            –
          </span>
          <b className="text-foreground dark:text-ghostwhite font-bold">{price}</b>
          <span className="text-muted-foreground/70 dark:text-lightsteelblue-200" aria-hidden>
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

      <div className="flex shrink-0 items-center gap-2">
        {status === 'paid' && (
          <Link
            href={`/dashboard/orders/${id}?vouch=true` as Route}
            className="text-fuchsia font-commissioner sm:text-num-14 rounded-num-8 focus-visible:ring-fuchsia/50 bg-fuchsia/10 hover:bg-fuchsia/20 hidden px-3 py-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none sm:px-5 sm:py-2.5 sm:text-sm md:block"
          >
            Share Vouch
          </Link>
        )}
        <Link
          href={
            status === 'pending'
              ? (`/checkout?step=3&orderId=${id}` as Route)
              : (`/dashboard/orders/${id}` as Route)
          }
          className="text-foreground bg-card-elevated dark:text-ghostwhite font-commissioner sm:text-num-14 rounded-num-8 focus-visible:ring-fuchsia/50 group-hover:bg-foreground/10 shrink-0 px-3 py-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none sm:px-5 sm:py-2.5 sm:text-sm dark:bg-[#13253F] dark:group-hover:bg-white/10"
        >
          {status === 'pending' ? 'Complete Payment' : 'View Details'}
        </Link>
      </div>
    </div>
  )
}
