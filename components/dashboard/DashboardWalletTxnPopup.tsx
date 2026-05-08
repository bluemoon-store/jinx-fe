'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent } from 'react'

export type DashboardWalletTxnPopupProps = {
  title?: string
  amount?: string
  invoiceId?: string
  invoiceHref?: string
  address?: string
  addressHref?: string
  txnHash?: string
  txnHashHref?: string
  dateTime?: string
  userId?: string
  onClose?: () => void
}

type DetailRowProps = {
  label: string
  value: string
  underlined?: boolean
  href?: string
}

const DetailRow: FunctionComponent<DetailRowProps> = ({
  label,
  value,
  underlined = false,
  href,
}) => (
  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <span className="leading-num-20 text-num-14 text-muted-foreground dark:text-lightsteelblue-200 font-semibold">
      {label}
    </span>
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`tracking-num--0_01 text-num-16 leading-num-28 text-foreground dark:text-lightsteelblue-200 font-semibold ${
          underlined ? 'underline' : ''
        } focus-visible:ring-fuchsia/40 rounded-sm transition-colors hover:text-foreground/85 dark:hover:text-white focus-visible:ring-2 focus-visible:outline-none`}
      >
        {value}
      </a>
    ) : (
      <span
        className={`tracking-num--0_01 text-num-16 leading-num-28 text-foreground dark:text-lightsteelblue-200 font-semibold ${
          underlined ? 'underline' : ''
        }`}
      >
        {value}
      </span>
    )}
  </div>
)

export const DashboardWalletTxnPopup: FunctionComponent<DashboardWalletTxnPopupProps> = ({
  title = 'Purchase',
  amount = '-25.00 USD',
  invoiceId = 'c3beee33-36d0-42ec-a6c9-3b81..',
  invoiceHref = '#',
  address = '1eksalkcmnzxcsad..',
  addressHref = '#',
  txnHash = '1sldkldasnmcxzdjeqwe..',
  txnHashHref = '#',
  dateTime = 'March 30, 2026 at 11:11 AM',
  userId = 'JINX-LKXJLKNALSDJ',
  onClose,
}) => {
  return (
    <div className="font-nata-sans bg-card text-foreground dark:bg-gray-200 dark:text-white border-border-subtle dark:border-gray-500 py-num-18 w-full max-w-[440px] overflow-hidden rounded-xl border border-solid px-5 text-left shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,0,0,0.1),0px_6.213004112243652px_9.32px_-6.21px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col gap-5">
        <header className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="leading-num-28 tracking-num-0.02 text-foreground dark:text-whitesmoke-100 text-[20px] font-extrabold uppercase">
              TXN DETAILS
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-num-8 h-num-30 w-num-30 border-border-subtle dark:border-[#18263E] flex shrink-0 items-center justify-center border border-solid p-0"
              aria-label="Close"
            >
              <CentralIcon
                name="IconCrossSmall"
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={20}
                ariaHidden={true}
                className="text-muted-foreground dark:text-white/50"
              />
            </button>
          </div>
          <div className="bg-border-subtle dark:bg-gray-100 h-px w-full" aria-hidden />
        </header>

        <main className="font-commissioner flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <b className="leading-num-28 tracking-num-0.02 text-[18px] text-foreground dark:text-white">{title}</b>
            <b className="leading-num-28 tracking-num-0.02 text-[18px] text-foreground dark:text-white">{amount}</b>
          </div>
          <div className="bg-border-subtle dark:bg-gray-100 h-px w-full" aria-hidden />

          <div className="flex flex-col gap-3">
            <DetailRow label="Invoice ID" value={invoiceId} href={invoiceHref} underlined />
            <DetailRow label="Address" value={address} href={addressHref} underlined />
            <DetailRow label="Txn Hash" value={txnHash} href={txnHashHref} underlined />
            <DetailRow label="Date & Time" value={dateTime} />
            <DetailRow label="User ID" value={userId} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardWalletTxnPopup
