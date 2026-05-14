'use client'

import Image from 'next/image'
import CentralIcon from '@central-icons-react/all'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { SupportRow } from '@/components/checkout/shared/SupportRow'
import { useWalletBalanceQuery } from '@/hooks/use-wallet'
import { formatUsd, parseUsdDecimalString } from '@/lib/cart-format'

type Props = {
  totalUsd: number
  onBack: () => void
  onConfirm: () => void
  busy?: boolean
}

export function WalletPaymentConfirm({ totalUsd, onBack, onConfirm, busy }: Props) {
  const balanceQuery = useWalletBalanceQuery()
  const balanceLoaded = balanceQuery.isSuccess
  const currentBalance = parseUsdDecimalString(balanceQuery.data?.balance ?? '0')
  const remainingBalance = currentBalance - totalUsd
  const insufficientFunds = balanceLoaded && remainingBalance < 0

  const balanceLabel = balanceLoaded ? formatUsd(currentBalance) : '—'
  const purchaseLabel = formatUsd(totalUsd)
  const remainingLabel = balanceLoaded ? formatUsd(Math.max(remainingBalance, 0)) : '—'

  const buttonDisabled = busy || !balanceLoaded || insufficientFunds

  return (
    <div className="sm:gap-num-30 flex w-full max-w-[729px] flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="text-ghostwhite focus-visible:ring-fuchsia/40 hidden items-center justify-center bg-transparent p-0 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#041329] focus-visible:outline-none md:inline-flex"
            aria-label="Back"
          >
            <CentralIcon
              name="IconArrowLeft"
              join="round"
              fill="outlined"
              stroke="2"
              radius="1"
              size={22}
              ariaHidden={true}
              className="text-ghostwhite shrink-0"
            />
          </button>
          <h2 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
            COMPLETE PAYMENT
          </h2>
        </div>
        <p className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
          Confirm your wallet payment
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-[#eeeeee1a] bg-gray-500 p-4 sm:gap-8 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-3 sm:items-center">
          <div className="flex min-w-0 items-start gap-3 sm:items-center">
            <Image src={checkoutImg.banknote} alt="" width={32} height={32} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-base font-bold tracking-[0.36px] text-white sm:text-lg">
                Wallet
              </div>
              <p className="text-lightsteelblue-200 text-sm [text-shadow:0px_0px_8.63px_#00000099] sm:text-base">
                Pay using account balance
              </p>
            </div>
          </div>
          <span className="shrink-0 text-base font-bold tracking-[0.4px] text-white sm:text-xl">
            {purchaseLabel}
          </span>
        </div>

        <div className="border-whitesmoke-300 flex flex-col gap-4 rounded-lg border bg-gray-100 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
              Current Balance
            </span>
            <span className="text-ghostwhite text-sm font-semibold sm:text-base">
              {balanceLabel}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
              Purchase Amount
            </span>
            <span className="text-ghostwhite text-sm font-semibold sm:text-base">
              -{purchaseLabel}
            </span>
          </div>
          <Image src={checkoutImg.divider} alt="" width={800} height={1} className="h-px w-full" />
          <div className="flex items-center justify-between gap-3">
            <span className="text-base font-bold text-white sm:text-lg">
              Balance after purchase
            </span>
            <span
              className={`text-base font-bold sm:text-lg ${
                insufficientFunds ? 'text-red-400' : 'text-white'
              }`}
            >
              {insufficientFunds ? formatUsd(remainingBalance) : remainingLabel}
            </span>
          </div>
        </div>

        {insufficientFunds ? (
          <p className="text-center text-sm font-semibold text-red-300 sm:text-base">
            Your wallet balance is not enough to cover this purchase. Please top up your wallet or
            choose a different payment method.
          </p>
        ) : null}

        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={onConfirm}
            disabled={buttonDisabled}
            className="bg-fuchsia focus-visible:ring-fuchsia/40 inline-flex min-h-[52px] w-full max-w-[280px] items-center justify-center rounded-lg px-6 py-3 text-base font-bold tracking-[0.36px] text-white transition-[filter,opacity] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
          >
            {busy ? 'Processing…' : 'Pay using Wallet Balance'}
          </button>
        </div>
      </div>

      <SupportRow />
    </div>
  )
}
