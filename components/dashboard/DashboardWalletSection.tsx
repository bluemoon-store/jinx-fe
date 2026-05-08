'use client'

import CentralIcon from '@central-icons-react/all'
import { createPortal } from 'react-dom'
import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'

import { DashboardWalletTxnPopup } from '@/components/dashboard/DashboardWalletTxnPopup'
import { DashboardLoadMoreFooter } from '@/components/dashboard/DashboardLoadMoreFooter'
import { useExchangeRatesQuery } from '@/hooks/use-payments'
import {
  useCreateWalletTopUpMutation,
  useWalletBalanceQuery,
  useWalletTransactionsInfiniteQuery,
  useWalletTopUpStatusQuery,
} from '@/hooks/use-wallet'
import { formatUsd, parseUsdDecimalString } from '@/lib/cart-format'
import { toast } from '@/lib/toast'
import {
  siteSelectDropdownList,
  siteSelectDropdownOptionInteractive,
  siteSelectDropdownOptionRow,
  siteSelectDropdownPanel,
} from '@/components/ui/siteSelectDropdown'
import type { ApiCryptoCurrency, ApiWalletTopUp, ApiWalletTransaction } from '@/types/api'
import { cn } from '@/lib/utils'

type WalletTxStatus = 'paid' | 'pending' | 'expired'

type WalletTx = {
  id: string
  kind: 'purchase' | 'credit'
  title: string
  date: string
  time: string
  amountLabel: string
  positive: boolean
  status?: WalletTxStatus
  invoiceId: string
  invoiceHref: string
  address: string
  addressHref: string
  txnHash: string
  txnHashHref: string
  userId: string
}

type SortOption = 'newest' | 'oldest' | 'amount_desc' | 'amount_asc'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'amount_desc', label: 'Amount (High to Low)' },
  { value: 'amount_asc', label: 'Amount (Low to High)' },
]

type CoinOption = {
  value: ApiCryptoCurrency
  label: string
  iconSrc: string
}

const COIN_OPTIONS: CoinOption[] = [
  { value: 'BTC', label: 'Bitcoin', iconSrc: '/icons/Crypto Logos/Bitcoin.svg' },
  {
    value: 'ETH',
    label: 'Ethereum',
    iconSrc: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---ethereum-eth.svg',
  },
  { value: 'USDT_TRC20', label: 'USDT (Tron)', iconSrc: '/icons/Crypto Logos/Tether.svg' },
  { value: 'LTC', label: 'Litecoin', iconSrc: '/icons/Crypto Logos/Litecoin LTC.svg' },
  { value: 'BCH', label: 'Bitcoin Cash', iconSrc: '/icons/Crypto Logos/Bitcoin-1.svg' },
]

const WALLET_TX_PAGE_SIZE = 12
const DEFAULT_USER_LABEL = 'JINX-LKXJLKNALSDJ'

function coinUnitLabel(coin: ApiCryptoCurrency): string {
  if (coin === 'USDT_TRC20' || coin === 'USDT_ERC20') return 'USDT'
  if (coin === 'USDC_ERC20') return 'USDC'
  return coin
}

function mapTransactionToWalletTx(tx: ApiWalletTransaction): WalletTx {
  const dateObj = new Date(tx.createdAt)
  const amount = parseUsdDecimalString(tx.amount)
  const date = Number.isNaN(dateObj.getTime())
    ? '-'
    : dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const time = Number.isNaN(dateObj.getTime())
    ? '-'
    : dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  const isCredit = tx.type === 'DEPOSIT' || tx.type === 'REFUND' || tx.type === 'ADMIN_ADJUST'
  const title =
    tx.type === 'PURCHASE'
      ? 'Purchase'
      : tx.type === 'REFUND'
        ? 'Refund'
        : tx.type === 'ADMIN_ADJUST'
          ? 'Balance Adjusted'
          : 'Balance Added'

  return {
    id: tx.id,
    kind: isCredit ? 'credit' : 'purchase',
    title,
    date,
    time,
    amountLabel: `${Math.abs(amount).toFixed(2)} USD`,
    positive: isCredit,
    status: tx.type === 'DEPOSIT' ? 'paid' : undefined,
    invoiceId: tx.referenceId ?? '-',
    invoiceHref: tx.referenceId ? `/dashboard/orders/${tx.referenceId}` : '#',
    address: tx.description || '-',
    addressHref: '#',
    txnHash: tx.id,
    txnHashHref: '#',
    userId: DEFAULT_USER_LABEL,
  }
}

const walletCoinTriggerClass =
  'rounded-num-8 bg-card-elevated text-foreground dark:text-white border-border-subtle dark:border-[#16243B] flex min-h-11 w-full items-center justify-between gap-2 border border-solid px-3 py-2.5 text-left'

const walletFilterTriggerClass = cn(
  'rounded-num-8 px-num-12 bg-card-elevated text-foreground dark:text-lightsteelblue-100 border-border-subtle dark:border-[#16243B] flex min-h-11 items-center gap-2 border border-solid py-2'
)

/** Wallet — balance card, add funds, history; matches dashboard shell + Orders/Reviews layout. */
export const DashboardWalletSection: FunctionComponent = () => {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [amountUnit, setAmountUnit] = useState<'USD' | 'CRYPTO'>('USD')
  const [selectedCoin, setSelectedCoin] = useState<CoinOption>(COIN_OPTIONS[0])
  const [amountInput, setAmountInput] = useState('10.00')
  const [coinMenuOpen, setCoinMenuOpen] = useState(false)
  const coinMenuRef = useRef<HTMLDivElement>(null)
  const [historySearch, setHistorySearch] = useState('')
  const [txnDialogRow, setTxnDialogRow] = useState<WalletTx | null>(null)
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const sortMenuRef = useRef<HTMLDivElement>(null)
  const [topUpModalOpen, setTopUpModalOpen] = useState(false)
  const [createdTopUp, setCreatedTopUp] = useState<ApiWalletTopUp | null>(null)
  const walletSortParams =
    sortOption === 'oldest'
      ? { sortBy: 'createdAt' as const, sortOrder: 'asc' as const }
      : sortOption === 'amount_desc'
        ? { sortBy: 'amount' as const, sortOrder: 'desc' as const }
        : sortOption === 'amount_asc'
          ? { sortBy: 'amount' as const, sortOrder: 'asc' as const }
          : { sortBy: 'createdAt' as const, sortOrder: 'desc' as const }

  const balanceQuery = useWalletBalanceQuery()
  const txQuery = useWalletTransactionsInfiniteQuery({
    limit: WALLET_TX_PAGE_SIZE,
    sortBy: walletSortParams.sortBy,
    sortOrder: walletSortParams.sortOrder,
  })
  const ratesQuery = useExchangeRatesQuery()
  const createTopUpMutation = useCreateWalletTopUpMutation()
  const topUpStatusQuery = useWalletTopUpStatusQuery(createdTopUp?.id)

  const walletBalanceAmount = parseUsdDecimalString(balanceQuery.data?.balance ?? '0')
  const walletBalanceLabel = formatUsd(walletBalanceAmount)

  const selectedRate = ratesQuery.data?.rates.find(
    (r) => r.cryptocurrency === selectedCoin.value
  )?.rate
  const selectedCoinUnit = coinUnitLabel(selectedCoin.value)
  const amountUsd = Number.parseFloat(amountInput)
  const computedCryptoAmount =
    amountUnit === 'CRYPTO' && selectedRate && Number.isFinite(amountUsd) && amountUsd > 0
      ? (amountUsd / selectedRate).toFixed(6)
      : null

  const txRows = useMemo(
    () => (txQuery.data?.pages ?? []).flatMap((page) => page.items.map(mapTransactionToWalletTx)),
    [txQuery.data?.pages]
  )
  const toggleMenu = (menu: 'coin' | 'status' | 'sort') => {
    setCoinMenuOpen((prev) => (menu === 'coin' ? !prev : false))
    setSortMenuOpen((prev) => (menu === 'sort' ? !prev : false))
  }

  useEffect(() => {
    if (!coinMenuOpen && !sortMenuOpen) return
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      if (coinMenuRef.current?.contains(target) || sortMenuRef.current?.contains(target)) return
      setCoinMenuOpen(false)
      setSortMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setCoinMenuOpen(false)
      setSortMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [coinMenuOpen, sortMenuOpen])

  const filteredTx = useMemo(() => {
    const q = historySearch.trim().toLowerCase()
    if (!q) return txRows
    return txRows.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.id.includes(q) ||
        t.amountLabel.toLowerCase().includes(q) ||
        t.date.toLowerCase().includes(q) ||
        t.invoiceId.toLowerCase().includes(q) ||
        t.address.toLowerCase().includes(q) ||
        t.txnHash.toLowerCase().includes(q)
    )
  }, [historySearch, txRows])

  useEffect(() => {
    if (!topUpStatusQuery.data || !createdTopUp) return
    const status = topUpStatusQuery.data.status
    if (status === 'CONFIRMED' || status === 'FORWARDED') {
      toast.success('Wallet top-up confirmed')
      setTopUpModalOpen(false)
      setCreatedTopUp(null)
      return
    }
    if (status === 'EXPIRED' || status === 'FAILED') {
      toast.error('Top-up expired or failed. Please try again.')
    }
  }, [createdTopUp, topUpStatusQuery.data])

  const totalTxItems = txQuery.data?.pages?.[0]?.metadata.totalItems ?? 0
  const shownTxItems = filteredTx.length
  const canLoadMoreTx =
    !historySearch.trim() && !txQuery.isFetchingNextPage && Boolean(txQuery.hasNextPage)

  return (
    <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
      {/* Balance + Add funds */}
      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-6 xl:gap-8">
        {/* Account balance card */}
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-muted-foreground text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
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
                    {balanceVisible ? walletBalanceLabel : '$••••'}
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
          <p className="text-muted-foreground text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Add Balance
          </p>
          <div className="rounded-num-8 border-border-subtle bg-card-elevated dark:border-darkslateblue dark:bg-gray-100 flex min-h-[202px] flex-col gap-4 border border-solid p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="text-muted-foreground text-xs font-semibold sm:text-sm">
                  Select Payment Method
                </span>
                <div className="relative" ref={coinMenuRef}>
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={coinMenuOpen}
                    aria-label="Select payment coin"
                    onClick={() => toggleMenu('coin')}
                    className={walletCoinTriggerClass}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <img className="h-7 w-7 shrink-0" alt="" src={selectedCoin.iconSrc} />
                      <span className="tracking-num--0_01 text-sm font-semibold text-foreground dark:text-white sm:text-base">
                        {selectedCoin.label}
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
                      className="text-muted-foreground shrink-0"
                    />
                  </button>
                  {coinMenuOpen ? (
                    <ul
                      role="listbox"
                      aria-label="Payment coin options"
                      className={`absolute top-full left-0 z-20 mt-2 w-full overflow-hidden ${siteSelectDropdownPanel}`}
                    >
                      <div className={siteSelectDropdownList}>
                        {COIN_OPTIONS.map((coin) => (
                          <button
                            type="button"
                            role="option"
                            aria-selected={selectedCoin.value === coin.value}
                            className={cn(
                              siteSelectDropdownOptionRow,
                              siteSelectDropdownOptionInteractive,
                              'text-foreground dark:text-ghostwhite sm:text-num-14 lg:text-num-16 gap-2 text-sm',
                              selectedCoin.value === coin.value && 'bg-foreground/5 dark:bg-white/5'
                            )}
                            onClick={() => {
                              setSelectedCoin(coin)
                              setCoinMenuOpen(false)
                            }}
                          >
                            <img className="h-6 w-6 shrink-0" alt="" src={coin.iconSrc} />
                            <span>{coin.label}</span>
                          </button>
                        ))}
                      </div>
                    </ul>
                  ) : null}
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="text-muted-foreground text-xs font-semibold sm:text-sm">
                  Enter Amount
                </span>
                <div className="rounded-num-8 bg-card border-border-subtle dark:border-[#16243B] dark:bg-[#051329] flex h-12.5 w-full items-center justify-between gap-2 border border-solid px-3 py-2">
                  <div className="flex min-w-0 items-baseline gap-1.5">
                    <span className="text-base font-bold text-foreground dark:text-white">$</span>
                    <input
                      inputMode="decimal"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value.replace(/[^0-9.]/g, ''))}
                      className="text-muted-foreground dark:text-lightsteelblue-200 w-full min-w-0 border-none bg-transparent text-base font-semibold outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setAmountUnit((u) => (u === 'USD' ? 'CRYPTO' : 'USD'))}
                    className="focus-visible:ring-fuchsia/40 text-foreground dark:text-white flex shrink-0 items-center gap-2 rounded px-1 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
                    aria-label={`Switch amount unit to ${amountUnit === 'USD' ? selectedCoinUnit : 'USD'}`}
                  >
                    <span className={amountUnit === 'USD' ? 'text-white' : 'text-white/50'}>
                      USD
                    </span>
                    <span className="text-white/40">/</span>
                    <span className={amountUnit === 'CRYPTO' ? 'text-white' : 'text-white/50'}>
                      {selectedCoinUnit}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="rounded-num-8 bg-card border-border-subtle dark:border-[#16243B] dark:bg-[#051329] flex w-full flex-wrap items-center gap-2 border border-solid px-3 py-2 sm:w-auto">
                <span className="text-muted-foreground text-xs font-semibold sm:text-sm">
                  Exchange Rate
                </span>
                <span className="text-foreground dark:text-white text-sm font-bold">1 {selectedCoinUnit}</span>
                <CentralIcon
                  name="IconArrowRightLeft"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={16}
                  ariaHidden={true}
                  className="text-muted-foreground"
                />
                <span className="text-foreground dark:text-white text-sm font-bold">
                  {selectedRate ? formatUsd(selectedRate) : '-'}
                </span>
              </div>
              <button
                type="button"
                disabled={createTopUpMutation.isPending}
                onClick={async () => {
                  const parsedAmount = Number.parseFloat(amountInput)
                  if (!Number.isFinite(parsedAmount) || parsedAmount < 1) {
                    toast.error('Minimum top-up amount is $1.00')
                    return
                  }
                  try {
                    const topUp = await createTopUpMutation.mutateAsync({
                      cryptocurrency: selectedCoin.value,
                      amountUsd: parsedAmount,
                    })
                    setCreatedTopUp(topUp)
                    setTopUpModalOpen(true)
                  } catch {
                    toast.error('Could not create top-up request')
                  }
                }}
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

      <div className="bg-divider h-px w-full" aria-hidden />

      {/* Balance history */}
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="tracking-num-0.02 text-foreground dark:text-white text-base leading-7 font-bold sm:text-lg">
              Balance History
            </h2>
            <p className="text-muted-foreground mt-0.5 text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)] sm:text-base">
              All your recent transactions using account balance
            </p>
          </div>
        </div>

        <div className="text-muted-foreground dark:text-lightsteelblue-100 lg:text-num-16 flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <div className="rounded-num-8 px-num-12 bg-card-elevated border-border-subtle dark:border-[#16243B] flex min-h-11 w-full min-w-0 flex-1 items-center gap-2 overflow-hidden border border-solid py-0 sm:min-w-[min(100%,280px)]">
            <CentralIcon
              name="IconMagnifyingGlass"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={18}
              ariaHidden={true}
              className="text-muted-foreground shrink-0"
            />
            <input
              type="search"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              placeholder="Search by invoice ID, transaction hash, or address"
              className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-foreground placeholder:text-muted-foreground min-w-0 flex-1 border-none bg-transparent px-0 py-1 text-sm font-normal outline-none focus:ring-0"
            />
          </div>
          <div className="relative w-fit max-w-full shrink-0" ref={sortMenuRef}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortMenuOpen}
              aria-label="Sort transactions"
              onClick={() => toggleMenu('sort')}
              className={cn(walletFilterTriggerClass, 'w-fit max-w-full')}
            >
              <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
                Sort by
              </span>
              <span className="text-sm font-semibold">
                {SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? 'Newest'}
              </span>
              <CentralIcon
                name="IconChevronDownMedium"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={16}
                ariaHidden={true}
                className="text-muted-foreground shrink-0"
              />
            </button>
            {sortMenuOpen ? (
              <ul
                role="listbox"
                aria-label="Sort by"
                className={`absolute top-full left-0 z-20 mt-2 min-w-42 overflow-hidden ${siteSelectDropdownPanel}`}
              >
                <div className={siteSelectDropdownList}>
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={sortOption === opt.value}
                      className={cn(
                        siteSelectDropdownOptionRow,
                        siteSelectDropdownOptionInteractive,
                        'text-foreground dark:text-ghostwhite sm:text-num-14 lg:text-num-16 text-sm whitespace-nowrap',
                        sortOption === opt.value && 'bg-foreground/5 dark:bg-white/5'
                      )}
                      onClick={() => {
                        setSortOption(opt.value)
                        setSortMenuOpen(false)
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </ul>
            ) : null}
          </div>
        </div>

        {txQuery.isPending ? (
          <div className="flex py-12">
            <div
              className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-400"
              role="status"
              aria-label="Loading transactions"
            />
          </div>
        ) : filteredTx.length === 0 ? (
          <div className="text-foreground dark:text-ghostwhite font-commissioner flex flex-col items-center gap-2 py-12 text-center">
            <img className="size-28 opacity-90 sm:size-36" alt="" src="/icons/not-found.svg" />
            <b className="tracking-num--0_01 text-base sm:text-lg">No transactions found</b>
            <p className="text-muted-foreground dark:text-lightsteelblue-100 sm:text-num-14 max-w-[411px] text-sm leading-6 font-medium">
              Your wallet activity will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-num-8 border-border-subtle bg-card-elevated dark:border-darkslateblue dark:bg-gray-100 overflow-hidden border border-solid">
              <div className="flex flex-col">
                {filteredTx.map((tx) => (
                  <button
                    type="button"
                    key={tx.id}
                    onClick={() => setTxnDialogRow(tx)}
                    className="border-border-subtle dark:border-darkslateblue focus-visible:ring-fuchsia/35 flex w-full cursor-pointer flex-col gap-3 border-b border-solid p-4 text-left transition-colors last:border-b-0 hover:bg-hover-bg dark:hover:bg-gray-700/20 focus-visible:ring-2 focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
                    aria-label={`View transaction details for ${tx.title} on ${tx.date}`}
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
                      <div className="bg-card border-border-subtle dark:bg-[#051329] flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border">
                        <CentralIcon
                          name={tx.kind === 'purchase' ? 'IconBasket1' : 'IconCoinsAdd'}
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          ariaHidden={true}
                          className="text-muted-foreground"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="tracking-num-0.02 text-foreground dark:text-white text-base leading-7 font-bold">
                          {tx.title}
                        </div>
                        <div className="text-muted-foreground dark:text-lightsteelblue-200 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                          <span>{tx.date}</span>
                          <span
                            className="bg-darkslateblue hidden h-3 w-px sm:inline-block"
                            aria-hidden
                          />
                          <span>{tx.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground dark:text-white shrink-0 text-right text-xl font-bold tracking-tight">
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
            <nav aria-label="Wallet transactions load more">
              <DashboardLoadMoreFooter
                shown={shownTxItems}
                total={historySearch.trim() ? shownTxItems : totalTxItems}
                canLoadMore={canLoadMoreTx}
                onLoadMore={() => void txQuery.fetchNextPage()}
              />
            </nav>
          </>
        )}
      </div>

      {topUpModalOpen && createdTopUp && typeof document !== 'undefined'
        ? createPortal(
            <div className="fixed inset-0 z-120 flex min-h-dvh w-full items-center justify-center p-4 sm:p-6">
              <button
                type="button"
                className="absolute inset-0 bg-black/70"
                onClick={() => setTopUpModalOpen(false)}
                aria-label="Close top-up dialog"
              />
              <div className="relative z-10 w-full max-w-[560px] rounded-xl border border-border-subtle bg-card text-foreground dark:border-[#eeeeee1a] dark:bg-gray-500 dark:text-white p-5 text-center sm:p-6">
                <div className="relative mb-4 flex items-center justify-start gap-3 text-left">
                  <h3 className="font-nata-sans text-lg font-extrabold text-foreground dark:text-white sm:text-xl">
                    COMPLETE TOP-UP
                  </h3>
                  <button
                    type="button"
                    onClick={() => setTopUpModalOpen(false)}
                    className="rounded-num-8 absolute top-1/2 right-0 h-8 w-8 -translate-y-1/2 border border-border-subtle text-muted-foreground dark:border-[#18263E] dark:text-white/60"
                  >
                    x
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-muted-foreground dark:text-lightsteelblue-200 text-sm">
                    Send exactly <b className="text-foreground dark:text-white">{createdTopUp.amount}</b>{' '}
                    {createdTopUp.cryptocurrency} to the address below.
                  </div>
                  {createdTopUp.qrCode ? (
                    <img
                      src={createdTopUp.qrCode}
                      alt="Top-up QR code"
                      className="mx-auto h-auto w-full max-w-[220px] rounded-lg bg-white p-2"
                    />
                  ) : null}
                  <div className="rounded-num-8 border border-border-subtle bg-card-elevated text-foreground dark:border-[#16243B] dark:bg-[#051329] dark:text-white p-3 text-center text-xs sm:text-sm">
                    {createdTopUp.paymentAddress}
                  </div>
                  <div className="text-muted-foreground dark:text-lightsteelblue-200 text-xs sm:text-sm">
                    Status:{' '}
                    <span className="font-semibold text-foreground dark:text-white">
                      {topUpStatusQuery.data?.status ?? createdTopUp.status}
                    </span>{' '}
                    | Confirmations{' '}
                    {topUpStatusQuery.data?.confirmations ?? createdTopUp.confirmations}/
                    {topUpStatusQuery.data?.requiredConfirmations ??
                      createdTopUp.requiredConfirmations}
                  </div>
                  <div className="text-muted-foreground dark:text-lightsteelblue-200 text-xs sm:text-sm">
                    Expires: {new Date(createdTopUp.expiresAt).toLocaleString('en-US')}
                  </div>
                  {computedCryptoAmount ? (
                    <div className="text-muted-foreground dark:text-lightsteelblue-200 text-xs sm:text-sm">
                      Approx amount: {computedCryptoAmount} {createdTopUp.cryptocurrency}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}

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
