'use client'

import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import { useAuthModal } from '@/components/auth/auth-modal-context'
import { Reveal } from '@/components/ui/reveal'
import CentralIcon from '@central-icons-react/all'
import { useState } from 'react'

type Ticket = {
  id: string
  preview: string
  time: string
  unread: number
}

function SupportGuestChatPanel() {
  const { openAuthModal } = useAuthModal()

  return (
    <div className="font-commissioner box-border flex h-full min-h-0 w-full flex-1 shrink-0 flex-col items-center justify-center overflow-hidden rounded-t-none rounded-br-xl rounded-bl-none p-6 text-left text-base text-white sm:p-[34px]">
      <div className="flex w-full max-w-[520px] flex-col items-stretch justify-center gap-6 overflow-hidden rounded-lg border border-solid border-[#111E33] bg-[#051329] p-4 sm:p-5">
        <div className="flex flex-col items-center justify-center gap-1.5 self-stretch text-center text-lg">
          <CentralIcon
            name="IconUser"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={28}
            color="#EA2CFF"
            className="shrink-0"
          />
          <div className="flex items-center">
            <b className="tracking-num-0.02 relative leading-7">Become a member</b>
          </div>
          <p className="relative text-base leading-6 font-medium opacity-75 [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            You are not a registered member.
            <br />
            Create account or Login to get customer support.
          </p>
        </div>

        <div className="h-px max-h-full w-full max-w-full shrink-0 self-stretch bg-white opacity-[0.05]" />

        <div className="flex w-full max-w-full flex-col items-stretch gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => openAuthModal('signin')}
            className="box-border flex h-[52px] min-h-[52px] flex-1 items-center justify-center rounded-lg border border-solid border-[#1E2E47] bg-[#071935] px-4 pt-px pb-0.5 leading-7 font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-90 sm:flex-[0.85]"
          >
            Log In
          </button>
          <div className="flex flex-1 flex-col items-stretch sm:min-w-0">
            <button
              type="button"
              onClick={() => openAuthModal('signup')}
              className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-[7.79px] bg-[#EA2CFF] px-4 py-3 leading-7 font-semibold tracking-[-0.01em] text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)] transition-opacity hover:opacity-90"
            >
              <CentralIcon
                name="IconUser"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={16}
                color="#FFFFFF"
              />
              Create Account
            </button>
          </div>
        </div>

        <div className="h-px max-h-full w-full max-w-full shrink-0 self-stretch bg-white opacity-[0.05]" />

        <div className="gap-num-15 flex items-center justify-center self-stretch text-center text-[#1AD824]">
          <span className="relative flex h-4 w-4 shrink-0 animate-[pulse_0.8s_ease-in-out_infinite] items-center justify-center rounded-full bg-[#0B5B2A]">
            <span className="h-2 w-2 rounded-full bg-[#1AD824]" />
          </span>
          <span className="relative leading-7 font-semibold tracking-[-0.01em]">
            Our support team is Live
          </span>
        </div>
      </div>
    </div>
  )
}

export default function SupportPage() {
  const { isAuthenticated } = useAuthModal()
  const tickets: Ticket[] = [
    { id: 'EB2DFF', preview: 'You: okay, let me know', time: '12:36 PM', unread: 4 },
    { id: 'EB2DFA', preview: 'You: okay, let me know', time: '12:10 PM', unread: 2 },
    { id: 'EB2DF5', preview: 'You: okay, let me know', time: '11:52 AM', unread: 0 },
    { id: 'EB2DEE', preview: 'You: okay, let me know', time: '11:13 AM', unread: 0 },
  ]
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[0]?.id ?? null)
  const [isCreatingTicket, setIsCreatingTicket] = useState(false)

  const messages = [
    {
      side: 'left' as const,
      text: 'Hello, welcome to Jinx Support. How may I help you?',
      time: '12:34 PM',
    },
    {
      side: 'right' as const,
      text: 'I need help to refund my order. My order ID is EB2DFF.',
      time: '12:35 PM',
    },
    {
      side: 'left' as const,
      text: 'Thank you for sharing your order ID. I will check your order details and provide the best support.',
      time: '12:35 PM',
    },
    { side: 'right' as const, text: 'Okay, let me know.', time: '12:36 PM' },
  ]

  return (
    <div className="text-num-14 text-ghostwhite font-commissioner flex min-h-screen w-full flex-col bg-gray-400 text-left">
      <Navbar />
      <main className="flex flex-1 flex-col pt-14 sm:pt-[75px]">
        <Reveal variant="fade-up" threshold={0}>
          <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 py-10 lg:px-16 lg:py-14">
            <section className="border-darkslateblue overflow-hidden rounded-xl border border-solid bg-[#0d1b35]">
              <header className="flex flex-col gap-4 border-b border-[#152850] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <CentralIcon
                    name="IconRescueRing"
                    join="round"
                    fill="filled"
                    stroke="2"
                    radius="1"
                    size={20}
                    color="#FF00FF"
                  />
                  <h1 className="tracking-num-0.02 leading-num-28 text-lg font-semibold">
                    Support
                  </h1>
                  <span className="inline-flex items-center gap-2 rounded-[10px] bg-[#1ad82433] px-2.5 py-1 text-sm font-semibold text-[#1ad824]">
                    <span className="relative flex h-4 w-4 shrink-0 animate-[pulse_0.8s_ease-in-out_infinite] items-center justify-center rounded-full bg-[#0B5B2A]">
                      <span className="h-2 w-2 rounded-full bg-[#1AD824]" />
                    </span>
                    Active
                  </span>
                </div>
                <p className="max-w-xl text-sm leading-6 text-[#C2C6CD] sm:text-base lg:text-right">
                  Need help with an order, payment, or your account?
                  <br />
                  Our team is here to assist you.
                </p>
              </header>

              <div className="flex flex-col lg:h-[640px] lg:flex-row">
                <aside className="flex flex-col border-b border-[#152850] bg-[#010f25] lg:w-[360px] lg:border-r lg:border-b-0">
                  <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#0D1B35] lg:max-h-none">
                    {!isAuthenticated || tickets.length === 0 ? (
                      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
                        <CentralIcon
                          name="IconTicket"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={36}
                          color="#EA2CFF"
                          className="mb-2"
                        />
                        <h3 className="text-lg font-semibold text-white">No Tickets Created</h3>
                        <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-[#828994]">
                          You have no tickets on your account
                        </p>
                      </div>
                    ) : (
                      <div className="max-h-[380px] flex-1 overflow-y-auto lg:max-h-none">
                        {tickets.map((ticket) => (
                          <button
                            key={ticket.id}
                            type="button"
                            onClick={() => {
                              setSelectedTicketId(ticket.id)
                              setIsCreatingTicket(false)
                            }}
                            className={`flex w-full items-center justify-between gap-3 border-b border-[#152850] bg-[#0D1B35] px-4 py-4 text-left transition-colors sm:px-6 ${
                              selectedTicketId === ticket.id ? 'bg-[#051329]' : 'hover:bg-[#051329]'
                            }`}
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                                  selectedTicketId === ticket.id ? 'bg-[#EA2CFF]' : 'bg-[#152950]'
                                }`}
                              >
                                <CentralIcon
                                  name="IconTicket"
                                  join="round"
                                  fill="filled"
                                  stroke="2"
                                  radius="1"
                                  size={18}
                                  color="#ffffff"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold sm:text-base">
                                  Order ID {ticket.id}
                                </p>
                                <p className="truncate text-sm text-[#828994]">{ticket.preview}</p>
                              </div>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-2">
                              <span className="text-xs text-[#828994] sm:text-sm">
                                {ticket.time}
                              </span>
                              {ticket.unread > 0 ? (
                                <span className="rounded-md bg-[#ea2cff] px-1.5 py-0.5 text-xs font-semibold text-white">
                                  {ticket.unread}
                                </span>
                              ) : null}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="border-t border-[#152850] bg-[#0D1B35] p-4 sm:p-6">
                    <button
                      type="button"
                      onClick={() => setIsCreatingTicket(true)}
                      className="h-14 w-full rounded-[9px] bg-[linear-gradient(180deg,#EA2CFF_0%,#CF2DEB_100%)] text-lg font-semibold text-white shadow-[0px_2px_0px_#eb2dff80] transition-opacity hover:opacity-90"
                    >
                      Create New Ticket
                    </button>
                  </div>
                </aside>

                <section className="flex min-h-[430px] flex-1 flex-col bg-[linear-gradient(rgba(6,19,41,0.97),rgba(6,19,41,0.97)),url('/icons/support-bg.svg')] bg-cover bg-center bg-no-repeat p-4 sm:p-6">
                  {!isAuthenticated ? (
                    <SupportGuestChatPanel />
                  ) : isCreatingTicket ? (
                    <div className="flex h-full w-full flex-1 items-center justify-center">
                      <div className="w-full max-w-[520px] rounded-xl border border-[#111E33] bg-[#051329] p-4 sm:p-5">
                        <div className="mb-4 flex flex-col items-center justify-center gap-1.5 border-b border-[#111E33] pb-4 text-center">
                          <CentralIcon
                            name="IconTicket"
                            join="round"
                            fill="filled"
                            stroke="2"
                            radius="1"
                            size={26}
                            color="#EA2CFF"
                          />
                          <h3 className="text-lg font-semibold text-white">Create a Ticket</h3>
                          <p className="text-sm text-[#C2C6CD]">
                            Enter your Order ID to create a ticket and get support
                          </p>
                        </div>

                        <form className="space-y-4">
                          <div>
                            <label
                              htmlFor="order-id"
                              className="mb-2 block text-sm font-medium text-[#9EA0C6]"
                            >
                              Order ID <span className="text-[#EA2CFF]">*</span>
                            </label>
                            <input
                              id="order-id"
                              type="text"
                              className="h-12 w-full rounded-lg border border-[#111E33] bg-[#031128] px-3 text-sm text-white placeholder:text-[#677084] focus:ring-2 focus:ring-[#ea2cff] focus:outline-none"
                            />
                          </div>

                          <button
                            type="button"
                            className="h-12 w-full rounded-lg bg-[linear-gradient(180deg,#EA2CFF_0%,#CF2DEB_100%)] text-sm font-semibold text-white shadow-[0px_2px_0px_#eb2dff80] transition-opacity hover:opacity-90"
                          >
                            Create Ticket
                          </button>
                        </form>

                        <div className="mt-4 flex items-center justify-center gap-2 text-center text-sm font-semibold text-[#1AD824]">
                          <span className="relative flex h-4 w-4 shrink-0 animate-[pulse_0.8s_ease-in-out_infinite] items-center justify-center rounded-full bg-[#0B5B2A]">
                            <span className="h-2 w-2 rounded-full bg-[#1AD824]" />
                          </span>
                          Our support team is Live
                        </div>
                      </div>
                    </div>
                  ) : tickets.length === 0 || selectedTicketId == null ? (
                    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
                      <p className="max-w-md text-sm leading-relaxed text-[#828994]">
                        Create a ticket from the sidebar to start a conversation with support.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 flex flex-col gap-3 rounded-lg border border-[#111E33] bg-[#051329] p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EA2CFF]">
                            <CentralIcon
                              name="IconTicket"
                              join="round"
                              fill="filled"
                              stroke="2"
                              radius="1"
                              size={18}
                              color="#ffffff"
                            />
                          </div>
                          <div>
                            <p className="text-base font-semibold">Order ID {selectedTicketId}</p>
                            <p className="text-sm text-[#828994]">Created: Apr 21, 2026</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-5">
                          <span className="text-sm font-semibold text-white">Issue solved?</span>
                          <button
                            type="button"
                            className="inline-flex h-10 items-center gap-2 rounded-md bg-[#121F34] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1A2A45]"
                          >
                            <CentralIcon
                              name="IconCircleCheck"
                              join="round"
                              fill="filled"
                              stroke="2"
                              radius="1"
                              size={16}
                              color="#1AD824"
                            />
                            Close Ticket
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
                        {messages.map((message, index) => (
                          <div
                            key={`${message.time}-${index}`}
                            className={`flex items-end gap-2 ${
                              message.side === 'right' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {message.side === 'right' ? (
                              <>
                                <span className="text-xs text-[#646B86]">{message.time}</span>
                                <div className="max-w-[90%] rounded-lg bg-[#ea2cff] px-4 py-3 text-sm font-semibold text-white sm:max-w-[78%] sm:text-base">
                                  {message.text}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EA2CFF] text-base font-semibold text-white">
                                  <CentralIcon
                                    name="IconUser"
                                    join="round"
                                    fill="filled"
                                    stroke="2"
                                    radius="1"
                                    size={18}
                                    color="#FFFFFF"
                                  />
                                </div>
                                <div className="max-w-[90%] rounded-lg border border-[#152850] bg-[#0d1b35] px-4 py-3 text-sm text-[#c2c2e2] sm:max-w-[78%] sm:text-base">
                                  {message.text}
                                </div>
                                <span className="text-xs text-[#646B86]">{message.time}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <form className="mt-5">
                        <div className="relative flex-1">
                          <div className="pointer-events-none absolute top-1/2 left-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md bg-[#121F34]">
                            <CentralIcon
                              name="IconPaperclip1"
                              join="round"
                              fill="filled"
                              stroke="2"
                              radius="1"
                              size={16}
                              color="#C3C3E3"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Write your message here"
                            className="h-13 w-full rounded-lg border border-[#111E33] bg-[#051329] pr-28 pl-14 text-sm text-white placeholder:text-[#444E5F] focus:ring-2 focus:ring-[#ea2cff] focus:outline-none"
                          />
                          <button
                            type="button"
                            className="absolute top-1/2 right-1.5 inline-flex h-8 -translate-y-1/2 items-center gap-1.5 rounded-md bg-[#ea2cff] px-4 text-sm font-semibold text-white shadow-[0px_2px_0px_#eb2dff80] transition-opacity hover:opacity-90"
                          >
                            Send
                            <CentralIcon
                              name="IconArrowCornerDownRight"
                              join="round"
                              fill="filled"
                              stroke="2"
                              radius="1"
                              size={14}
                              color="#FFFFFF"
                            />
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </section>
              </div>
            </section>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
