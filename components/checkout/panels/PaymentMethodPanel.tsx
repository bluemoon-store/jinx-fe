import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'

const rows = [
  { icon: checkoutImg.btc, title: 'Bitcoin', sub: 'BTC', amount: '0.00037 BTC', w: 40, h: 40 },
  { icon: checkoutImg.eth, title: 'Ethereum', sub: 'ETH', amount: '0.012 ETH', w: 40, h: 40 },
  { icon: checkoutImg.tether, title: 'USDT (Tron)', sub: 'USDT - TRX', amount: '25.00 USDT', w: 43, h: 42 },
  { icon: checkoutImg.tetherEth, title: 'USDT (Ethereum)', sub: 'USDT - ERC 20', amount: '25.00 USDT', w: 43, h: 42 },
  { icon: checkoutImg.ltc, title: 'Litecoin', sub: 'LTC', amount: '0.48 LTC', w: 40, h: 40 },
  { icon: checkoutImg.bch, title: 'Bitcoin Cash', sub: 'BCH', amount: '0.056 BCH', w: 40, h: 40 },
] as const

type Props = { onContinue: () => void }

export function PaymentMethodPanel({ onContinue }: Props) {
  return (
    <div className="flex w-full max-w-[729px] flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Image src={checkoutImg.buyerShield} alt="" width={22} height={22} />
          <h2 className="font-nata-sans text-2xl font-extrabold tracking-[0.48px] text-ghostwhite">
            PAYMENT METHOD
          </h2>
        </div>
        <p className="text-base font-semibold text-lightsteelblue-200">Pay securely using any method</p>
      </div>

      <div className="flex flex-col rounded-xl border border-[#eeeeee1a] bg-gray-500">
        {rows.map((row, i) => (
          <div key={row.title}>
            {i > 0 ? (
              <Image src={checkoutImg.divider} alt="" width={800} height={1} className="h-px w-full" />
            ) : null}
            <div className="flex items-center justify-center gap-3 p-[22px]">
              <Image src={row.icon} alt="" width={row.w} height={row.h} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-lg font-bold tracking-[0.36px] text-white">{row.title}</div>
                <div className="text-base text-lightsteelblue-200 [text-shadow:0px_0px_8.63px_#00000099]">
                  {row.sub}
                </div>
              </div>
              <span className="shrink-0 text-xl font-bold tracking-[0.4px] text-white">{row.amount}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[15px]">
        <span className="text-base font-semibold text-white opacity-75">Unavailable Methods</span>
        <div className="flex h-[88px] items-center rounded-xl border border-[#eeeeee1a] bg-gray-500 px-[22px]">
          <div className="flex flex-1 items-center gap-3 opacity-50">
            <Image src={checkoutImg.banknote} alt="" width={32} height={32} />
            <div>
              <div className="text-lg font-bold tracking-[0.36px] text-white">Wallet</div>
              <div className="text-base text-lightsteelblue-200 [text-shadow:0px_0px_8.63px_#00000099]">
                Pay using account balance
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-base text-white [text-shadow:0px_0px_8.63px_#00000099]">
            Sign in to unlock
            <Image src={checkoutImg.lockFrame} alt="" width={14} height={14} />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="w-full rounded-lg bg-fuchsia py-3 text-base font-semibold text-white hover:brightness-110 sm:w-auto sm:self-end sm:px-12"
      >
        Continue
      </button>
    </div>
  )
}
