'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useMemo, useState } from 'react'

type WalletTx = {
  id: string
  kind: 'purchase' | 'credit'
  title: string
  date: string
  time: string
  amountLabel: string
  positive: boolean
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
  },
  {
    id: '2',
    kind: 'credit',
    title: 'Balance Added',
    date: 'March 12, 2026',
    time: '1:37 PM',
    amountLabel: '5.00 USD',
    positive: true,
  },
  {
    id: '3',
    kind: 'credit',
    title: 'Balance Added',
    date: 'March 2, 2026',
    time: '4:28 AM',
    amountLabel: '10.00 USD',
    positive: true,
  },
]

const secondaryPillClass =
  'rounded-num-8 border-darkslateblue px-num-12 box-border inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border border-solid bg-gray-300 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700'

/** Wallet — balance card, add funds, history; matches dashboard shell + Orders/Reviews layout. */
export const DashboardWalletSection: FunctionComponent = () => {
  const [historySearch, setHistorySearch] = useState('')

  const filteredTx = useMemo(() => {
    const q = historySearch.trim().toLowerCase()
    if (!q) return MOCK_TX
    return MOCK_TX.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.id.includes(q) ||
        t.amountLabel.toLowerCase().includes(q) ||
        t.date.toLowerCase().includes(q)
    )
  }, [historySearch])

  return (
    <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
      {/* Balance + Add funds */}
      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-6 xl:gap-8">
        {/* Account balance card */}
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-lightsteelblue-200 text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
            Account Balance
          </p>
          <div
            className="relative flex min-h-[202px] flex-col justify-between overflow-hidden rounded-2xl border border-solid border-[#ffffff26] p-5 sm:p-6"
            style={{
              background:
                'radial-gradient(50% 50% at 100% 0%, rgba(255,45,153,1) 0%, rgba(235,45,255,1) 53%, rgba(149,9,237,1) 100%)',
            }}
          >
            <div className="text-ghostwhite text-xs font-semibold tracking-wide opacity-90">
              JINX-LKXJLKNALSDJ
            </div>
            <div className="mt-auto flex flex-col gap-1">
              <span className="text-sm font-semibold text-white/90">Account Balance</span>
              <div className="flex items-center gap-2">
                <span className="font-nata-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  $0.00
                </span>
                <CentralIcon
                  name="IconBanknote2"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={22}
                  ariaHidden={true}
                  className="shrink-0 text-white/90"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add balance */}
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-lightsteelblue-200 text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
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
                    className="shrink-0 text-white/70"
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
                  className="text-white/80"
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
                />
                Add Balance
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-[#152950]" aria-hidden />

      {/* Balance history */}
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="tracking-num-0_02 text-base font-bold leading-7 text-white sm:text-lg">
              Balance History
            </h2>
            <p className="text-lightsteelblue-200 mt-0.5 text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)] sm:text-base">
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
              className="text-lightsteelblue-200 shrink-0"
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
              className="shrink-0"
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
              className="shrink-0"
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
                <div
                  key={tx.id}
                  className="border-darkslateblue flex flex-col gap-3 border-b border-solid p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                        tx.kind === 'purchase' ? 'bg-[#ffffff14]' : 'bg-[#1ad82422]'
                      }`}
                    >
                      <CentralIcon
                        name={tx.kind === 'purchase' ? 'IconBasket2' : 'IconBanknote2'}
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={24}
                        ariaHidden={true}
                        className={tx.kind === 'purchase' ? 'text-white' : 'text-[#1ad824]'}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="tracking-num-0_02 text-base font-bold leading-7 text-white">
                        {tx.title}
                      </div>
                      <div className="text-lightsteelblue-200 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                        <span>{tx.date}</span>
                        <span className="hidden h-3 w-px bg-[#152950] sm:inline-block" aria-hidden />
                        <span>{tx.time}</span>
                      </div>
                    </div>
                  </div>
                  <p
                    className={`shrink-0 text-right text-xl font-bold tracking-tight ${
                      tx.positive ? 'text-[#1ad824]' : 'text-white'
                    }`}
                  >
                    {tx.positive ? (
                      <>
                        <span className="mr-0.5">+</span>
                        {tx.amountLabel}
                      </>
                    ) : (
                      <>−{tx.amountLabel}</>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
