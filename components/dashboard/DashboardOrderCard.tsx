import CentralIcon from '@central-icons-react/all'
import { FunctionComponent } from 'react'

export type DashboardOrderStatus = 'paid' | 'pending' | 'expired'

type Props = {
  brand: string
  itemCount: number
  price: string
  status: DashboardOrderStatus
}

const statusConfig: Record<DashboardOrderStatus, { label: string; icon: string; color: string }> = {
  paid: { label: 'Paid', icon: 'IconCircleCheck', color: 'text-seagreen' },
  pending: { label: 'Pending', icon: 'IconClockAlert', color: 'text-[#FF7009]' },
  expired: { label: 'Expired', icon: 'IconCrossSmall', color: 'text-lightsteelblue-200' },
}

export const DashboardOrderCard: FunctionComponent<Props> = ({
  brand,
  itemCount,
  price,
  status,
}) => {
  const cfg = statusConfig[status]

  return (
    <div className="rounded-num-8 border-darkslateblue box-border flex w-full min-w-0 flex-col items-center justify-center gap-3 border border-solid bg-[#0D1B35] p-3">
      <div className="rounded-num-8 relative flex aspect-[257/125] w-full items-center justify-center overflow-hidden shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
        <img className="h-full w-full scale-110 object-cover" alt="" src="/icons/airbnb.svg" />
      </div>
      <div className="flex w-36 flex-col items-center gap-1.5">
        <div className="tracking-num-0_02 truncate text-center text-sm font-extrabold uppercase sm:text-base">
          {brand}
        </div>
        <div className="font-commissioner sm:text-num-14 flex items-center justify-center gap-1.5 text-xs">
          <span className="leading-num-24 shrink-0 font-medium whitespace-nowrap text-[#EEEEEEBF]">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </span>
          <span className="h-3.5 w-px bg-white/25" aria-hidden />
          <span className="rounded-num-6 bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))] px-1.5 py-0 text-white">
            <b className="leading-num-24">{price}</b>
          </span>
          <span className="h-3.5 w-px bg-white/25" aria-hidden />
          <span
            className={`rounded-num-6 flex items-center gap-0.5 px-1.5 py-0 ${cfg.color} ${
              status === 'paid'
                ? 'bg-[linear-gradient(180deg,_rgba(27,_217,_36,_0.05),_rgba(27,_217,_36,_0.14))]'
                : status === 'pending'
                  ? 'bg-[linear-gradient(180deg,_rgba(246,_147,_26,_0.05),_rgba(246,_147,_26,_0.14))]'
                  : 'bg-[linear-gradient(180deg,_rgba(158,_160,_198,_0.08),_rgba(158,_160,_198,_0.18))]'
            }`}
          >
            <CentralIcon
              name={cfg.icon as any}
              join="round"
              fill="filled"
              stroke="1"
              radius="1"
              size={14}
              ariaHidden={true}
            />
            <span className="leading-num-24 font-semibold">{cfg.label}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
