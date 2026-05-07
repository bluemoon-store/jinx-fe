const tabs = [
  'All Giftcards',
  'Cashout',
  'Food',
  'Flights',
  'Groceries',
  'Shopping',
  'Clothing',
  'Gas/Oil',
  'Tickets',
  'Jewelry',
  'Rentals',
  'Streaming',
]

export default function CategoryTabs() {
  return (
    <nav aria-label="Giftcard categories" className="w-full">
      <div className="mx-auto w-full max-w-[1476.9px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 lg:gap-3">
          {tabs.map((label) => (
            <div key={label} className="group relative w-full sm:w-auto">
              {/* Bottom layer (non-blurred shadow) */}
              <div className="absolute inset-0 translate-y-1 rounded-[99px] bg-[#003bbf] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              <button
                type="button"
                className="font-commissioner sm:px-num-12 relative z-10 flex min-h-[44px] w-full transform cursor-pointer items-center gap-2 rounded-[99px] border border-dashed border-border-subtle px-4 py-3 text-sm text-muted-foreground transition-all duration-200 group-hover:-rotate-1 hover:border-[#005eff] hover:bg-[#005eff] hover:text-white sm:w-auto sm:gap-1 sm:py-2 sm:text-base"
              >
                <img className="h-4 w-4 shrink-0" alt="" src="/icons/IconDollar.svg" />
                <span className="leading-num-20 font-semibold">{label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
