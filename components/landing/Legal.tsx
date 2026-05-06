'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type LegalSectionId = 'terms' | 'privacy' | 'refund' | 'cookies'

type LegalSection = {
  id: LegalSectionId
  navLabel: string
  title: string
  lastRevised: string
  content: React.ReactNode
}

function NavItem({
  isActive,
  label,
  onClick,
}: {
  isActive: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-num-8 min-w-num-190 box-border flex w-full items-center overflow-hidden p-2.5 text-left',
        isActive
          ? 'border border-solid border-active-border text-foreground [background:linear-gradient(90deg,rgba(235,45,255,0.2),rgba(235,45,255,0)),linear-gradient(var(--active-bg),var(--active-bg))]'
          : 'text-foreground/90 hover:bg-hover-bg hover:text-foreground',
      ].join(' ')}
    >
      <span className="leading-num-20 font-semibold">{label}</span>
    </button>
  )
}

export default function Legal() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sections = useMemo<LegalSection[]>(
    () => [
      {
        id: 'terms',
        navLabel: 'Terms of Service',
        title: 'Terms of Service',
        lastRevised: 'March 10, 2026',
        content: (
          <div className="flex w-full flex-col gap-[25px]">
            <section className="flex flex-col gap-[14px]">
              <h2 className="tracking-num--0_01 leading-num-28 font-semibold">Overview</h2>
              <div className="text-num-16 text-body-foreground leading-6 font-medium">
                <p className="m-0">
                  These Terms of Service (“Terms”) govern your access to and use of Bluemoon (“we”,
                  “us”, “our”) websites, apps, and related services (collectively, the “Service”).
                  By using the Service, you agree to these Terms.
                </p>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Eligibility and Accounts
              </h3>
              <div className="leading-num-30 font-medium">
                <ul className="font-inherit m-0 pl-[21px] text-[length:inherit]">
                  <li className="mb-0">
                    You must be at least 13 years old (or the age of digital consent in your
                    jurisdiction) to use the Service.
                  </li>
                  <li className="mb-0">
                    You are responsible for maintaining the confidentiality of your login
                    credentials and for all activity under your account.
                  </li>
                  <li>We may suspend or terminate accounts that violate these Terms.</li>
                </ul>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Acceptable Use
              </h3>
              <div className="leading-num-30 font-medium">
                <p className="m-0">You agree not to:</p>
                <ul className="font-inherit m-0 pl-[21px] text-[length:inherit]">
                  <li className="mb-0">
                    Use the Service for unlawful, harmful, or abusive purposes.
                  </li>
                  <li className="mb-0">
                    Attempt to probe, scan, or test the vulnerability of any system or network.
                  </li>
                  <li className="mb-0">
                    Reverse engineer, decompile, or otherwise attempt to extract source code except
                    where permitted by law.
                  </li>
                  <li>Upload or transmit malware or malicious code.</li>
                </ul>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Fees, Trials, and Billing (If Applicable)
              </h3>
              <p className="leading-6 font-medium">
                Some features may require payment. Prices, renewal terms, and trial periods (if
                offered) will be shown at checkout. Taxes may apply. You authorize us (and our
                payment providers) to charge your payment method for fees you incur.
              </p>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Disclaimers and Limitation of Liability
              </h3>
              <p className="leading-6 font-medium">
                The Service is provided “as is” and “as available.” To the maximum extent permitted
                by law, we disclaim all warranties, and we are not liable for indirect, incidental,
                special, or consequential damages arising out of or related to your use of the
                Service.
              </p>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Contact
              </h3>
              <p className="leading-6 font-medium">
                Questions about these Terms? Contact us at{' '}
                <span className="text-foreground">support@jinx.to</span>.
              </p>
            </section>
          </div>
        ),
      },
      {
        id: 'privacy',
        navLabel: 'Privacy Policy',
        title: 'Privacy Policy',
        lastRevised: 'March 10, 2026',
        content: (
          <div className="flex w-full flex-col gap-[25px]">
            <section className="flex flex-col gap-[14px]">
              <h2 className="tracking-num--0_01 leading-num-28 font-semibold">What this covers</h2>
              <div className="text-num-16 text-body-foreground leading-6 font-medium">
                <p className="m-0">
                  This Privacy Policy explains how Bluemoon collects, uses, shares, and protects
                  information when you use the Service.
                </p>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Information we collect
              </h3>
              <div className="leading-num-30 font-medium">
                <ul className="font-inherit m-0 pl-[21px] text-[length:inherit]">
                  <li className="mb-0">
                    <span className="text-foreground">Account data</span> (e.g., name, email,
                    password hash, profile settings).
                  </li>
                  <li className="mb-0">
                    <span className="text-foreground">Usage data</span> (e.g., pages viewed,
                    features used, device identifiers, IP address, logs).
                  </li>
                  <li className="mb-0">
                    <span className="text-foreground">Payment data</span> (handled by payment
                    processors; we typically receive limited metadata like last 4 digits and billing
                    status).
                  </li>
                  <li>
                    <span className="text-foreground">Support data</span> (messages, attachments,
                    and diagnostic details you provide).
                  </li>
                </ul>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                How we use information
              </h3>
              <div className="leading-num-30 font-medium">
                <ul className="font-inherit m-0 pl-[21px] text-[length:inherit]">
                  <li className="mb-0">Provide, maintain, and improve the Service.</li>
                  <li className="mb-0">Secure accounts, prevent abuse, and debug issues.</li>
                  <li className="mb-0">Process transactions and send service-related notices.</li>
                  <li>Comply with legal obligations and enforce our Terms.</li>
                </ul>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Sharing
              </h3>
              <p className="leading-6 font-medium">
                We may share information with vendors who help operate the Service (hosting,
                analytics, customer support, payment processing), and when required by law. We do
                not sell personal information in the ordinary sense of the word.
              </p>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Your choices
              </h3>
              <div className="leading-num-30 font-medium">
                <ul className="font-inherit m-0 pl-[21px] text-[length:inherit]">
                  <li className="mb-0">
                    Update profile and communication preferences in settings.
                  </li>
                  <li className="mb-0">Request access, deletion, or export where applicable.</li>
                  <li>Control cookies via your browser settings (see Cookie Policy).</li>
                </ul>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Contact
              </h3>
              <p className="leading-6 font-medium">
                Privacy questions? Email{' '}
                <span className="text-foreground">privacy@bluemoon.example</span>.
              </p>
            </section>
          </div>
        ),
      },
      {
        id: 'refund',
        navLabel: 'Refund Policy',
        title: 'Refund Policy',
        lastRevised: 'March 10, 2026',
        content: (
          <div className="flex w-full flex-col gap-[25px]">
            <section className="flex flex-col gap-[14px]">
              <h2 className="tracking-num--0_01 leading-num-28 font-semibold">Summary</h2>
              <div className="text-num-16 text-body-foreground leading-6 font-medium">
                <p className="m-0">
                  This Refund Policy describes how refunds work for paid plans and purchases made
                  through the Service. This is sample text and should be replaced with your actual
                  policy before launch.
                </p>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Eligibility
              </h3>
              <div className="leading-num-30 font-medium">
                <ul className="font-inherit m-0 pl-[21px] text-[length:inherit]">
                  <li className="mb-0">
                    <span className="text-foreground">Monthly plans</span>: refund requests are
                    eligible within 7 days of the initial purchase.
                  </li>
                  <li className="mb-0">
                    <span className="text-foreground">Annual plans</span>: refund requests are
                    eligible within 14 days of the initial purchase.
                  </li>
                  <li>
                    <span className="text-foreground">Renewals</span>: generally non-refundable, but
                    we may review exceptional cases.
                  </li>
                </ul>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Non-refundable items
              </h3>
              <div className="leading-num-30 font-medium">
                <ul className="font-inherit m-0 pl-[21px] text-[length:inherit]">
                  <li className="mb-0">Add-ons or credits that were fully consumed.</li>
                  <li className="mb-0">Chargebacks or fees imposed by third parties.</li>
                  <li>Purchases made via third-party app stores (their policies apply).</li>
                </ul>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                How to request a refund
              </h3>
              <p className="leading-6 font-medium">
                Contact <span className="text-foreground">support@jinx.to</span> with your account
                email, invoice (if available), and a short description of the issue. If approved,
                refunds are typically processed back to the original payment method within 5–10
                business days.
              </p>
            </section>
          </div>
        ),
      },
      {
        id: 'cookies',
        navLabel: 'Cookie Policy',
        title: 'Cookie Policy',
        lastRevised: 'March 10, 2026',
        content: (
          <div className="flex w-full flex-col gap-[25px]">
            <section className="flex flex-col gap-[14px]">
              <h2 className="tracking-num--0_01 leading-num-28 font-semibold">
                How we use cookies
              </h2>
              <div className="text-num-16 text-body-foreground leading-6 font-medium">
                <p className="m-0">
                  Cookies are small text files stored on your device. We use cookies and similar
                  technologies to keep you signed in, remember preferences, measure performance, and
                  improve the Service.
                </p>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Types of cookies
              </h3>
              <div className="leading-num-30 font-medium">
                <ul className="font-inherit m-0 pl-[21px] text-[length:inherit]">
                  <li className="mb-0">
                    <span className="text-foreground">Essential</span>: required for core features
                    like authentication and security.
                  </li>
                  <li className="mb-0">
                    <span className="text-foreground">Preferences</span>: remember your settings
                    (e.g., language, region).
                  </li>
                  <li className="mb-0">
                    <span className="text-foreground">Analytics</span>: help us understand usage to
                    improve the product.
                  </li>
                  <li>
                    <span className="text-foreground">Marketing</span>: used to measure campaigns
                    and show relevant content where applicable.
                  </li>
                </ul>
              </div>
            </section>

            <section className="text-num-16 text-body-foreground flex flex-col gap-3">
              <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                Managing cookies
              </h3>
              <p className="leading-6 font-medium">
                You can control cookies through your browser settings and may be able to delete
                existing cookies. Disabling essential cookies may impact the Service’s
                functionality.
              </p>
            </section>
          </div>
        ),
      },
    ],
    []
  )

  const [activeId, setActiveId] = useState<LegalSectionId>('terms')
  const activeSection = sections.find((s) => s.id === activeId) ?? sections[0]

  useEffect(() => {
    const sectionParam = (searchParams.get('section') ?? '').toLowerCase()
    const nextId: LegalSectionId | null =
      sectionParam === 'privacy'
        ? 'privacy'
        : sectionParam === 'refund'
          ? 'refund'
          : sectionParam === 'cookies'
            ? 'cookies'
            : sectionParam === 'terms'
              ? 'terms'
              : null

    if (nextId && nextId !== activeId) setActiveId(nextId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <section className="text-num-14 font-commissioner w-full text-left text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-16 lg:py-14">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[208px_1fr] lg:gap-16">
          {/* Legal navigation */}
          <aside className="text-muted-foreground flex w-full flex-col items-start self-start lg:sticky lg:top-24">
            <nav className="flex w-full flex-col items-start gap-1">
              <div className="rounded-num-8 min-w-num-190 text-muted-foreground box-border flex w-full items-center px-3 py-2 text-[12px]">
                <div className="leading-[15px] font-semibold uppercase">LEGAL</div>
              </div>

              {sections.map((section) => (
                <NavItem
                  key={section.id}
                  isActive={section.id === activeId}
                  label={section.navLabel}
                  onClick={() => {
                    setActiveId(section.id)
                    ;(router as any).replace(`${pathname}?section=${section.id}`, { scroll: false })
                  }}
                />
              ))}
            </nav>
          </aside>

          {/* Page content */}
          <main className="text-foreground flex w-full flex-col gap-6 text-[18px]">
            <header className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <h1 className="leading-num-28 tracking-num-0.02 font-semibold">
                {activeSection.title}
              </h1>
              <div className="text-muted-foreground text-[12px] leading-[15px] font-semibold">
                Last Revised: {activeSection.lastRevised}
              </div>
            </header>

            <div className="h-px w-full bg-divider" />

            {activeSection.content}
          </main>
        </div>
      </div>
    </section>
  )
}
