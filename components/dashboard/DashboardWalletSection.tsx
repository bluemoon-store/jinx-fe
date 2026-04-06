'use client'

import CentralIcon from '@central-icons-react/all'
import { createPortal } from 'react-dom'
import { FunctionComponent, useMemo, useState } from 'react'

import { DashboardWalletTxnPopup } from '@/components/dashboard/DashboardWalletTxnPopup'

type WalletTx = {
  id: string
  kind: 'purchase' | 'credit'
  title: string
  date: string
  time: string
  amountLabel: string
  positive: boolean
  invoiceId: string
  invoiceHref: string
  address: string
  addressHref: string
  txnHash: string
  txnHashHref: string
  userId: string
}

const MOCK_TX: WalletTx[] = [
  {
    id: '1',
    kind: 'purchase',
    title: 'Purchase',
    date: 'March 30, 2026',
    time: '11:11 AM',
    amountLabel: '25.00 USD',
    positive: false,
    invoiceId: 'c3beee33-36d0-42ec-a6c9-3b81..',
    invoiceHref: 'https://example.com/dashboard/orders/1',
    address: '1eksalkcmnzxcsad..',
    addressHref: 'https://www.blockchain.com/explorer/addresses/btc/1eksalkcmnzxcsad',
    txnHash: '1sldkldasnmcxzdjeqwe..',
    txnHashHref: 'https://www.blockchain.com/explorer/transactions/btc/1sldkldasnmcxzdjeqwe',
    userId: 'JINX-LKXJLKNALSDJ',
  },
  {
    id: '2',
    kind: 'credit',
    title: 'Balance Added',
    date: 'March 12, 2026',
    time: '1:37 PM',
    amountLabel: '5.00 USD',
    positive: true,
    invoiceId: '31f06f90-5a41-43de-9829-6bf3..',
    invoiceHref: 'https://example.com/dashboard/orders/2',
    address: '1xj91jd9salkm01a..',
    addressHref: 'https://www.blockchain.com/explorer/addresses/btc/1xj91jd9salkm01a',
    txnHash: '87sld8djaskd77as9sd..',
    txnHashHref: 'https://www.blockchain.com/explorer/transactions/btc/87sld8djaskd77as9sd',
    userId: 'JINX-LKXJLKNALSDJ',
  },
  {
    id: '3',
    kind: 'credit',
    title: 'Balance Added',
    date: 'March 2, 2026',
    time: '4:28 AM',
    amountLabel: '10.00 USD',
    positive: true,
    invoiceId: 'f9dcab21-b5f5-4e5a-a281-74f0..',
    invoiceHref: 'https://example.com/dashboard/orders/3',
    address: '3nnxkajd0092kald..',
    addressHref: 'https://www.blockchain.com/explorer/addresses/btc/3nnxkajd0092kald',
    txnHash: '11aa8b9c3d7723de4ff..',
    txnHashHref: 'https://www.blockchain.com/explorer/transactions/btc/11aa8b9c3d7723de4ff',
    userId: 'JINX-LKXJLKNALSDJ',
  },
]

const secondaryPillClass =
  'rounded-num-8 border-darkslateblue px-num-12 box-border inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border border-solid bg-gray-300 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700'

/** Wallet — balance card, add funds, history; matches dashboard shell + Orders/Reviews layout. */
export const DashboardWalletSection: FunctionComponent = () => {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [historySearch, setHistorySearch] = useState('')
  const [txnDialogRow, setTxnDialogRow] = useState<WalletTx | null>(null)

  const filteredTx = useMemo(() => {
    const q = historySearch.trim().toLowerCase()
    if (!q) return MOCK_TX
    return MOCK_TX.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.id.includes(q) ||
        t.amountLabel.toLowerCase().includes(q) ||
        t.date.toLowerCase().includes(q) ||
        t.invoiceId.toLowerCase().includes(q) ||
        t.address.toLowerCase().includes(q) ||
        t.txnHash.toLowerCase().includes(q)
    )
  }, [historySearch])

  return (
    <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
      {/* Balance + Add funds */}
      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-6 xl:gap-8">
        {/* Account balance card */}
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-lightsteelblue-200 text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Account Balance
          </p>
          <div className="relative flex min-h-[202px] flex-col justify-between overflow-hidden rounded-2xl border border-solid border-[#ffffff26] bg-[url('/icons/wallet-account-balance-background.png')] bg-cover bg-center bg-no-repeat p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="text-ghostwhite min-w-0 text-xs font-semibold tracking-wide opacity-90">
                JINX-LKXJLKNALSDJ
              </div>
              <img
                className="pointer-events-none h-9 w-[76px] shrink-0 object-contain object-right sm:h-11 sm:w-[96px]"
                alt="Jinx"
                src="/icons/Jin X White.svg"
              />
            </div>
            <div className="mt-auto flex flex-col gap-1">
              <span className="text-sm font-semibold text-white/90">Account Balance</span>
              <div className="flex items-end justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="font-commissioner text-[24px] leading-[32px] font-bold tracking-normal text-white tabular-nums"
                    aria-live="polite"
                  >
                    {balanceVisible ? '$0.00' : '$••••'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBalanceVisible((v) => !v)}
                    className="shrink-0 rounded p-0.5 text-[#C3C3E3] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
                    aria-label={balanceVisible ? 'Hide account balance' : 'Show account balance'}
                    aria-pressed={balanceVisible}
                  >
                    <CentralIcon
                      name={balanceVisible ? 'IconEyeOpen' : 'IconEyeSlash'}
                      join="round"
                      fill="outlined"
                      stroke="2"
                      radius="1"
                      size={22}
                      ariaHidden={true}
                    />
                  </button>
                </div>
                <img
                  className="pointer-events-none h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
                  alt=""
                  src="/icons/Chip_Card.svg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add balance */}
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-lightsteelblue-200 text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Add Balance
          </p>
          <div className="rounded-num-8 border-darkslateblue flex min-h-[202px] flex-col gap-4 border border-solid bg-gray-100 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="text-lightsteelblue-200 text-xs font-semibold sm:text-sm">
                  Select Payment Method
                </span>
                <button
                  type="button"
                  className="rounded-num-8 flex min-h-11 w-full items-center justify-between gap-2 border border-solid border-[#16243B] bg-[#051329] px-3 py-2.5 text-left"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <img
                      className="h-7 w-7 shrink-0"
                      alt=""
                      src="/icons/Crypto Logos/Bitcoin.svg"
                    />
                    <span className="tracking-num--0_01 text-sm font-semibold text-white sm:text-base">
                      Bitcoin
                    </span>
                  </span>
                  <CentralIcon
                    name="IconChevronDownMedium"
                    join="round"
                    fill="filled"
                    stroke="2"
                    radius="1"
                    size={18}
                    ariaHidden={true}
                    className="shrink-0 text-[#C3C3E3]"
                  />
                </button>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="text-lightsteelblue-200 text-xs font-semibold sm:text-sm">
                  Enter Amount
                </span>
                <div className="rounded-num-8 flex min-h-11 w-full items-center justify-between gap-2 border border-solid border-[#16243B] bg-[#051329] px-3 py-2.5">
                  <div className="flex min-w-0 items-baseline gap-1.5">
                    <span className="text-base font-bold text-white">$</span>
                    <span className="text-lightsteelblue-200 text-base font-semibold">0.00</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-white">
                    <span>USD</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/50">BTC</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="rounded-num-8 flex w-full flex-wrap items-center gap-2 border border-solid border-[#16243B] bg-[#051329] px-3 py-2 sm:w-auto">
                <span className="text-lightsteelblue-200 text-xs font-semibold sm:text-sm">
                  Exchange Rate
                </span>
                <span className="text-sm font-bold text-white">1 BTC</span>
                <CentralIcon
                  name="IconArrowRightLeft"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={16}
                  ariaHidden={true}
                  className="text-[#C3C3E3]"
                />
                <span className="text-sm font-bold text-white">$68,487.94</span>
              </div>
              <button
                type="button"
                className="rounded-num-8 px-num-12 box-border flex min-h-12 w-full shrink-0 items-center justify-center gap-2 bg-fuchsia-200 pt-px pb-0.5 text-sm font-semibold text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)] sm:w-auto sm:min-w-[200px]"
              >
                <CentralIcon
                  name="IconPlusLarge"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={18}
                  ariaHidden={true}
                  className="text-white"
                />
                Add Balance
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-darkslateblue" aria-hidden />

      {/* Balance history */}
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="tracking-num-0.02 text-base leading-7 font-bold text-white sm:text-lg">
              Balance History
            </h2>
            <p className="text-lightsteelblue-200 mt-0.5 text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)] sm:text-base">
              All your recent transactions using account balance
            </p>
          </div>
          <button type="button" className={secondaryPillClass}>
            <CentralIcon
              name="IconFilter1"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={20}
              ariaHidden={true}
              className="text-[#C3C3E3]"
            />
            Filter
          </button>
        </div>

        <div className="text-lightsteelblue-100 lg:text-num-16 flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <div className="rounded-num-8 px-num-12 flex min-h-11 w-full min-w-0 flex-1 items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-0 sm:min-w-[min(100%,280px)]">
            <CentralIcon
              name="IconMagnifyingGlass"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={18}
              ariaHidden={true}
              className="shrink-0 text-[#C3C3E3]"
            />
            <input
              type="search"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              placeholder="Search using Invoice ID, Txn Hash, Address"
              className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 min-w-0 flex-1 border-none bg-transparent px-0 py-1 text-sm font-semibold text-white placeholder-white/50 outline-none focus:ring-0"
            />
          </div>
          <div className="rounded-num-8 px-num-12 flex min-h-11 w-fit max-w-full shrink-0 items-center gap-2 border border-solid border-[#16243B] bg-gray-100 py-2">
            <span className="text-sm font-semibold opacity-50">Status</span>
            <span className="text-sm font-semibold">All</span>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={16}
              ariaHidden={true}
              className="shrink-0 text-[#C3C3E3]"
            />
          </div>
          <div className="rounded-num-8 px-num-12 flex min-h-11 w-fit max-w-full shrink-0 items-center gap-2 border border-solid border-[#16243B] bg-gray-100 py-2">
            <span className="text-sm font-semibold opacity-50">Sort by</span>
            <span className="text-sm font-semibold">Newest</span>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={16}
              ariaHidden={true}
              className="shrink-0 text-[#C3C3E3]"
            />
          </div>
        </div>

        {filteredTx.length === 0 ? (
          <div className="text-ghostwhite font-commissioner flex flex-col items-center gap-2 py-12 text-center">
            <img className="size-28 opacity-90 sm:size-36" alt="" src="/icons/not-found.svg" />
            <b className="tracking-num--0_01 text-base sm:text-lg">No transactions match</b>
            <p className="text-lightsteelblue-100 sm:text-num-14 max-w-[411px] text-sm leading-6 font-medium">
              Try another search term.
            </p>
          </div>
        ) : (
          <div className="rounded-num-8 border-darkslateblue overflow-hidden border border-solid bg-gray-100">
            <div className="flex flex-col">
              {filteredTx.map((tx) => (
                <button
                  type="button"
                  key={tx.id}
                  onClick={() => setTxnDialogRow(tx)}
                  className="border-darkslateblue hover:bg-gray-700/20 focus-visible:ring-fuchsia/35 flex w-full cursor-pointer flex-col gap-3 border-b border-solid p-4 text-left transition-colors last:border-b-0 focus-visible:ring-2 focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
                  aria-label={`View transaction details for ${tx.title} on ${tx.date}`}
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#051329]">
                      <CentralIcon
                        name={tx.kind === 'purchase' ? 'IconBasket1' : 'IconCoinsAdd'}
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={24}
                        ariaHidden={true}
                        className="text-[#C3C3E3]"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="tracking-num-0.02 text-base leading-7 font-bold text-white">
                        {tx.title}
                      </div>
                      <div className="text-lightsteelblue-200 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                        <span>{tx.date}</span>
                        <span
                          className="bg-darkslateblue hidden h-3 w-px sm:inline-block"
                          aria-hidden
                        />
                        <span>{tx.time}</span>
                      </div>
                    </div>
                  </div>
                  <p className="shrink-0 text-right text-xl font-bold tracking-tight text-white">
                    {tx.positive ? (
                      <>
                        <span className="mr-0.5 text-[#1ad824]">+</span>
                        {tx.amountLabel}
                      </>
                    ) : (
                      <>−{tx.amountLabel}</>
                    )}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {txnDialogRow && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="fixed inset-0 z-110 flex min-h-dvh w-full items-center justify-center p-4 sm:p-6 lg:px-8"
              role="presentation"
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/60"
                aria-label="Close dialog"
                onClick={() => setTxnDialogRow(null)}
              />
              <div className="relative z-10 flex w-full max-w-[min(100vw-2rem,480px)] justify-center">
                <DashboardWalletTxnPopup
                  title={txnDialogRow.title}
                  amount={`${txnDialogRow.positive ? '+' : '-'}${txnDialogRow.amountLabel}`}
                  invoiceId={txnDialogRow.invoiceId}
                  invoiceHref={txnDialogRow.invoiceHref}
                  address={txnDialogRow.address}
                  addressHref={txnDialogRow.addressHref}
                  txnHash={txnDialogRow.txnHash}
                  txnHashHref={txnDialogRow.txnHashHref}
                  dateTime={`${txnDialogRow.date} at ${txnDialogRow.time}`}
                  userId={txnDialogRow.userId}
                  onClose={() => setTxnDialogRow(null)}
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
