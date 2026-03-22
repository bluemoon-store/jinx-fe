'use client'

import { DashboardDeletionSection } from '@/components/dashboard/DashboardDeletionSection'
import { DashboardOrdersSection } from '@/components/dashboard/DashboardOrdersSection'
import { DashboardSecuritySection } from '@/components/dashboard/DashboardSecuritySection'
import { DashboardGeneralSection } from '@/components/dashboard/DashboardGeneralSection'
import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import { Reveal } from '@/components/ui/reveal'
import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useCallback, useState } from 'react'

/** Same width rhythm as /shop: main max-w-[1920px], inner max-w-[1476.9px] px-4 sm:px-6 lg:px-8 (no xl/2xl extra inset). */
const UserDashboardHomeEmpty: FunctionComponent = () => {
  const [selectedSidebar, setSelectedSidebar] = useState('Orders')
  const [hoveredSidebar, setHoveredSidebar] = useState<string | null>(null)
  const [ordersFilteredCount, setOrdersFilteredCount] = useState(16)

  const handleOrdersFilteredCount = useCallback((count: number) => {
    setOrdersFilteredCount(count)
  }, [])

  const accountItems = [
    { label: 'Orders', icon: 'IconBasket2' },
    { label: 'Drops', icon: 'IconAirdrop2' },
    { label: 'Wallet', icon: 'IconBanknote2' },
    { label: 'Reviews', icon: 'IconStar' },
  ]

  const settingItems = [
    { label: 'General', icon: 'IconSettingsSliderThree' },
    { label: 'Security', icon: 'IconShieldKeyhole' },
    { label: 'Deletion', icon: 'IconTrashCan' },
  ]

  const headerNavItem = [...accountItems, ...settingItems].find((i) => i.label === selectedSidebar)
  const headerIcon = (headerNavItem?.icon ?? 'IconBasket2') as string

  return (
    <div className="text-ghostwhite font-commissioner sm:text-num-14 flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-400 pt-16 text-left text-sm sm:pt-[95px] lg:text-[18px]">
      <Navbar />
      <main className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col gap-4 pb-8 sm:gap-6 lg:gap-12">
        <div className="mx-auto flex w-full max-w-[1476.9px] flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-[224px_1fr] sm:gap-6 lg:gap-8">
            <Reveal variant="slide-left" className="min-w-0">
              <aside
                aria-label="Account navigation"
                className="text-lightsteelblue-200 flex min-w-0 flex-col gap-5 sm:gap-4"
              >
                <div className="flex flex-col gap-1">
                  <div className="rounded-num-8 px-num-12 text-slategray flex items-center py-2 text-xs font-semibold uppercase sm:text-[12px]">
                    Account
                  </div>
                  {accountItems.map((item) => {
                    const isSelected = selectedSidebar === item.label
                    const isHoverActive = hoveredSidebar === item.label && !isSelected

                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setSelectedSidebar(item.label)}
                        onMouseEnter={() => setHoveredSidebar(item.label)}
                        onMouseLeave={() => setHoveredSidebar(null)}
                        className={[
                          'p-num-10 box-border flex min-h-11 w-full items-center gap-2 overflow-hidden border border-transparent text-left transition-colors',
                          item.label === 'Wallet' ? 'justify-between gap-3 sm:gap-5' : '',
                          isSelected
                            ? 'rounded-num-8 text-ghostwhite border-[#3B3161] [background:linear-gradient(90deg,_rgba(235,_45,_255,_0.2),_rgba(235,_45,_255,_0)),_linear-gradient(#071935,_#071935)]'
                            : 'rounded-num-8 hover:bg-gray-700',
                          isHoverActive ? 'bg-gray-700' : '',
                        ].join(' ')}
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <CentralIcon
                            name={item.icon as any}
                            join="round"
                            fill="filled"
                            stroke="2"
                            radius="1"
                            size={16}
                            ariaHidden={true}
                            color={isSelected ? '#EB2DFF' : undefined}
                          />
                          <span className="leading-num-20 sm:text-num-14 truncate text-sm font-semibold">
                            {item.label}
                          </span>
                        </div>
                        {item.label === 'Wallet' ? (
                          <b className="tracking-num--0_01 font-nata-sans leading-num-20 sm:text-num-14 shrink-0 text-sm text-white">
                            $0.00
                          </b>
                        ) : null}
                      </button>
                    )
                  })}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="rounded-num-8 px-num-12 text-slategray flex items-center py-2 text-xs font-semibold uppercase sm:text-[12px]">
                    SETTINGS
                  </div>
                  {settingItems.map((item) => {
                    const isSelected = selectedSidebar === item.label
                    const isHoverActive = hoveredSidebar === item.label && !isSelected

                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setSelectedSidebar(item.label)}
                        onMouseEnter={() => setHoveredSidebar(item.label)}
                        onMouseLeave={() => setHoveredSidebar(null)}
                        className={[
                          'rounded-num-8 p-num-10 box-border flex min-h-11 w-full items-center gap-2 overflow-hidden border border-transparent text-left transition-colors',
                          isSelected
                            ? 'text-ghostwhite border-[#3B3161] [background:linear-gradient(90deg,_rgba(235,_45,_255,_0.2),_rgba(235,_45,_255,_0)),_linear-gradient(#071935,_#071935)]'
                            : 'hover:bg-gray-700',
                          isHoverActive ? 'bg-gray-700' : '',
                        ].join(' ')}
                      >
                        <CentralIcon
                          name={item.icon as any}
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={16}
                          ariaHidden={true}
                          color={isSelected ? '#EB2DFF' : undefined}
                        />
                        <span className="leading-num-20 sm:text-num-14 text-sm font-semibold">
                          {item.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </aside>
            </Reveal>

            <section className="flex min-h-[min(60vh,520px)] min-w-0 flex-col gap-4 md:min-h-0 md:gap-8">
              <Reveal variant="slide-right" delay={80}>
                <div className="flex w-full flex-col gap-3 text-white md:flex-row md:items-center md:justify-between md:gap-4 lg:gap-5">
                  <div className="flex items-center gap-2">
                    <CentralIcon
                      name={headerIcon as any}
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={16}
                      ariaHidden={true}
                      color="#EB2DFF"
                    />
                    <b className="leading-num-28 tracking-num-0_02 md:text-num-16 text-base sm:text-lg">
                      {selectedSidebar === 'Orders'
                        ? `Orders (${ordersFilteredCount})`
                        : selectedSidebar}
                    </b>
                  </div>
                  <div className="text-lightsteelblue-200 flex w-full min-w-0 flex-wrap items-center gap-2 self-stretch rounded-md bg-gray-300 px-3 py-2.5 text-xs sm:w-fit sm:self-auto sm:px-2 sm:py-1.5 sm:text-[12px]">
                    <span className="shrink-0 leading-[15px] font-semibold">ID</span>
                    <div className="text-ghostwhite flex min-w-0 items-center gap-1.5">
                      <span className="leading-[15px] font-semibold break-all">
                        JNX-LKXJLKNALSDJ
                      </span>
                      <CentralIcon
                        name="IconSquareBehindSquare1"
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
                </div>
              </Reveal>

              {selectedSidebar === 'Orders' ? (
                <Reveal variant="fade-up" delay={140}>
                  <DashboardOrdersSection onFilteredCountChange={handleOrdersFilteredCount} />
                </Reveal>
              ) : selectedSidebar === 'General' ? (
                <Reveal variant="fade-up" delay={140}>
                  <DashboardGeneralSection />
                </Reveal>
              ) : selectedSidebar === 'Security' ? (
                <Reveal variant="fade-up" delay={140}>
                  <DashboardSecuritySection />
                </Reveal>
              ) : selectedSidebar === 'Deletion' ? (
                <Reveal variant="fade-up" delay={140}>
                  <DashboardDeletionSection />
                </Reveal>
              ) : (
                <Reveal variant="fade-up" delay={220}>
                  <div className="flex flex-1 flex-col items-center justify-center py-12 sm:py-16">
                    <p className="text-lightsteelblue-100 sm:text-num-14 max-w-md text-center text-sm leading-6">
                      This section is coming soon. Choose{' '}
                      <span className="text-ghostwhite font-semibold">Orders</span> to view your
                      purchases.
                    </p>
                  </div>
                </Reveal>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default UserDashboardHomeEmpty
