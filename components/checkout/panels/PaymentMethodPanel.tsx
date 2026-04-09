'use client'

import Image from 'next/image'
import CentralIcon from '@central-icons-react/all'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { useAuthModal } from '@/components/auth/auth-modal-context'

const rows = [
  { icon: checkoutImg.btc, title: 'Bitcoin', sub: 'BTC', amount: '0.00037 BTC', w: 40, h: 40 },
  { icon: checkoutImg.eth, title: 'Ethereum', sub: 'ETH', amount: '0.012 ETH', w: 40, h: 40 },
  {
    icon: checkoutImg.tether,
    title: 'USDT (Tron)',
    sub: 'USDT - TRX',
    amount: '25.00 USDT',
    w: 43,
    h: 42,
  },
  {
    icon: checkoutImg.tetherEth,
    title: 'USDT (Ethereum)',
    sub: 'USDT - ERC 20',
    amount: '25.00 USDT',
    w: 43,
    h: 42,
  },
  { icon: checkoutImg.ltc, title: 'Litecoin', sub: 'LTC', amount: '0.48 LTC', w: 40, h: 40 },
  { icon: checkoutImg.bch, title: 'Bitcoin Cash', sub: 'BCH', amount: '0.056 BCH', w: 40, h: 40 },
] as const

type Props = { onBack: () => void; onContinue: () => void }

export function PaymentMethodPanel({ onBack, onContinue }: Props) {
  const { openAuthModal } = useAuthModal()

  return (
    <div className="flex w-full max-w-[729px] flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="text-ghostwhite focus-visible:ring-fuchsia/40 inline-flex items-center justify-center bg-transparent p-0 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#041329] focus-visible:outline-none"
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
            PAYMENT METHOD
          </h2>
        </div>
        <p className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
          Pay securely using any method
        </p>
      </div>

      <div className="flex flex-col rounded-xl border border-[#eeeeee1a] bg-gray-500">
        {rows.map((row, i) => (
          <div key={row.title}>
            {i > 0 ? (
              <Image
                src={checkoutImg.divider}
                alt=""
                width={800}
                height={1}
                className="h-px w-full"
              />
            ) : null}
            <button
              type="button"
              onClick={onContinue}
              className="focus-visible:ring-fuchsia/40 flex w-full flex-wrap items-center justify-center gap-3 p-4 text-left transition-colors hover:bg-[#0E1B30] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-500 focus-visible:outline-none sm:p-[22px]"
            >
              <Image src={row.icon} alt="" width={row.w} height={row.h} className="shrink-0" />
              <div className="min-w-0 flex-1 basis-[min(100%,12rem)]">
                <div className="text-base font-bold tracking-[0.36px] text-white sm:text-lg">
                  {row.title}
                </div>
                <div className="text-lightsteelblue-200 text-sm [text-shadow:0px_0px_8.63px_#00000099] sm:text-base">
                  {row.sub}
                </div>
              </div>
              <span className="shrink-0 text-base font-bold tracking-[0.4px] text-white sm:text-xl">
                {row.amount}
              </span>
            </button>
          </div>
        ))}
      </div>

      <div className="gap-num-15 flex flex-col">
        <span className="text-base font-semibold text-white opacity-75">Unavailable Methods</span>
        <div className="flex min-h-[88px] flex-col items-stretch justify-center gap-3 rounded-xl border border-[#eeeeee1a] bg-gray-500 px-4 py-4 sm:flex-row sm:items-center sm:px-[22px]">
          <div className="flex flex-1 items-center gap-3 opacity-50">
            <Image src={checkoutImg.banknote} alt="" width={32} height={32} />
            <div>
              <div className="text-lg font-bold tracking-[0.36px] text-white">Wallet</div>
              <div className="text-lightsteelblue-200 text-base [text-shadow:0px_0px_8.63px_#00000099]">
                Pay using account balance
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openAuthModal('signin')}
            className="focus-visible:ring-fuchsia/40 flex items-center gap-2 text-sm font-semibold text-white transition-opacity [text-shadow:0px_0px_8.63px_#00000099] hover:opacity-85 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-500 focus-visible:outline-none sm:text-base"
          >
            Sign in to unlock
            <Image src={checkoutImg.lockFrame} alt="" width={14} height={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
