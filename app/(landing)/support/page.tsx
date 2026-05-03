'use client'

import { useEffect, useState } from 'react'

import CentralIcon from '@central-icons-react/all'
import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import { useAuthModal } from '@/components/auth/auth-modal-context'
import { CreateTicketForm } from '@/components/support/CreateTicketForm'
import { MessageComposer } from '@/components/support/MessageComposer'
import { MessageList } from '@/components/support/MessageList'
import { TicketHeader } from '@/components/support/TicketHeader'
import { TicketListSidebar } from '@/components/support/TicketListSidebar'
import { Reveal } from '@/components/ui/reveal'
import { useCurrentUser } from '@/hooks/use-auth'
import { useSupportTicketRoom } from '@/hooks/use-support-ticket-room'
import {
  useCreateTicketMutation,
  useMyTicketsQuery,
  useResolveTicketMutation,
  useSendMessageMutation,
  useTicketDetailQuery,
} from '@/hooks/use-support'

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
          <span className="relative leading-7 font-semibold tracking-[-0.01em]">Our support team is Live</span>
        </div>
      </div>
    </div>
  )
}

export default function SupportPage() {
  const { data: user, isLoading: userLoading } = useCurrentUser()
  const isAuthenticated = Boolean(user)

  const { data: listData, isLoading: listLoading } = useMyTicketsQuery({ page: 1, limit: 50 })
  const tickets = listData?.items ?? []

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [isCreatingTicket, setIsCreatingTicket] = useState(false)
  const [composerText, setComposerText] = useState('')

  const { data: ticketDetail, isLoading: detailLoading } = useTicketDetailQuery(selectedTicketId)
  const createMutation = useCreateTicketMutation()
  const sendMutation = useSendMessageMutation()
  const resolveMutation = useResolveTicketMutation()

  useSupportTicketRoom(selectedTicketId)

  useEffect(() => {
    if (tickets.length === 0) setSelectedTicketId(null)
  }, [tickets.length])

  useEffect(() => {
    setComposerText('')
  }, [selectedTicketId])

  const isThreadClosed =
    ticketDetail?.status === 'CLOSED' || ticketDetail?.status === 'RESOLVED'

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
                  <h1 className="tracking-num-0.02 leading-num-28 text-lg font-semibold">Support</h1>
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
                {!userLoading && isAuthenticated ? (
                  <TicketListSidebar
                    tickets={tickets}
                    selectedTicketId={selectedTicketId}
                    onSelectTicket={(id) => {
                      setSelectedTicketId(id)
                      setIsCreatingTicket(false)
                    }}
                    onCreateClick={() => {
                      setSelectedTicketId(null)
                      setIsCreatingTicket(true)
                    }}
                    isLoading={listLoading}
                  />
                ) : (
                  <aside className="hidden border-[#152850] bg-[#010f25] lg:block lg:w-[360px] lg:border-r" />
                )}

                <section className="flex min-h-[430px] flex-1 flex-col bg-[linear-gradient(rgba(6,19,41,0.97),rgba(6,19,41,0.97)),url('/icons/support-bg.svg')] bg-cover bg-center bg-no-repeat p-4 sm:p-6">
                  {userLoading ? (
                    <div className="flex flex-1 items-center justify-center text-sm text-[#828994]">Loading…</div>
                  ) : !isAuthenticated ? (
                    <SupportGuestChatPanel />
                  ) : isCreatingTicket ? (
                    <CreateTicketForm
                      isSubmitting={createMutation.isPending}
                      onCancel={() => setIsCreatingTicket(false)}
                      onSubmit={async (payload) => {
                        const detail = await createMutation.mutateAsync(payload)
                        setSelectedTicketId(detail.id)
                        setIsCreatingTicket(false)
                      }}
                    />
                  ) : tickets.length === 0 || selectedTicketId == null ? (
                    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
                      <p className="max-w-md text-sm leading-relaxed text-[#828994]">
                        Create a ticket from the sidebar to start a conversation with support.
                      </p>
                    </div>
                  ) : detailLoading && !ticketDetail ? (
                    <div className="flex flex-1 items-center justify-center text-sm text-[#828994]">
                      Loading conversation…
                    </div>
                  ) : ticketDetail ? (
                    <>
                      <TicketHeader
                        ticket={ticketDetail}
                        isResolving={resolveMutation.isPending}
                        onResolve={() => resolveMutation.mutate(ticketDetail.id)}
                      />
                      <MessageList messages={ticketDetail.messages ?? []} />
                      <MessageComposer
                        value={composerText}
                        onChange={setComposerText}
                        disabled={Boolean(isThreadClosed)}
                        lockMessage={
                          isThreadClosed
                            ? 'This ticket is resolved or closed. Open a new ticket if you still need help.'
                            : undefined
                        }
                        isSending={sendMutation.isPending}
                        onSend={() => {
                          const t = composerText.trim()
                          if (!t || !selectedTicketId || isThreadClosed) return
                          sendMutation.mutate(
                            { ticketId: selectedTicketId, message: t },
                            {
                              onSuccess: () => setComposerText(''),
                            },
                          )
                        }}
                      />
                    </>
                  ) : (
                    <div className="flex flex-1 items-center justify-center text-sm text-[#828994]">
                      Could not load this ticket.
                    </div>
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
