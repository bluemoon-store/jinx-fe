export default function FAQs() {
  return (
    <section className="text-num-14 font-commissioner w-full overflow-hidden text-left text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-16 lg:py-14">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[208px_1fr] lg:gap-16">
          {/* FAQ navigation */}
          <aside className="text-lightsteelblue-200 w-full lg:sticky lg:top-24 lg:self-start">
            <nav className="flex w-full flex-col items-start gap-1">
              <div className="rounded-num-8 px-num-12 min-w-num-190 text-slategray box-border flex w-full items-center py-2 text-[12px]">
                <div className="leading-[15px] font-semibold uppercase">FAQs</div>
              </div>

              <div className="rounded-num-8 border-whitesmoke-300 min-w-num-190 box-border flex w-full items-center overflow-hidden border border-solid p-2.5 text-white [background:linear-gradient(90deg,rgba(235,45,255,0.2),rgba(235,45,255,0)),linear-gradient(#071935,#071935)]">
                <div className="leading-num-20 font-semibold">General</div>
              </div>
              <div className="rounded-num-8 min-w-num-190 box-border flex w-full items-center overflow-hidden p-2.5">
                <div className="leading-num-20 font-semibold">Orders</div>
              </div>
              <div className="rounded-num-8 min-w-num-190 box-border flex w-full items-center overflow-hidden p-2.5">
                <div className="leading-num-20 font-semibold">Replacements</div>
              </div>
              <div className="rounded-num-8 min-w-num-190 box-border flex w-full items-center overflow-hidden p-2.5">
                <div className="leading-num-20 font-semibold">Refunds</div>
              </div>
            </nav>
          </aside>

          {/* FAQ content */}
          <main className="w-full">
            {/* Header */}
            <header className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-[18px]">
                <img className="h-5 w-5" alt="" />
                <h1 className="tracking-num-0.02 leading-num-28 font-semibold">
                  Frequently asked questions
                </h1>
              </div>

              <div className="text-lightsteelblue-200 flex w-fit items-center justify-center gap-2 rounded-md bg-gray-300 px-2 py-1.5 text-[12px]">
                <div className="leading-[15px] font-semibold">Can’t find answer to your query?</div>
                <div className="text-ghostwhite flex items-center gap-1">
                  <img className="h-3.5 w-3.5" alt="" />
                  <div className="leading-[15px] font-semibold">Contact Support</div>
                </div>
              </div>
            </header>

            {/* Search */}
            <div className="text-num-16 text-lightsteelblue-100 mt-6 flex w-full items-center">
              <div className="rounded-num-8 border-whitesmoke-200 px-num-12 flex w-full items-center gap-2 overflow-hidden border border-solid bg-gray-200 py-2">
                <img className="h-num-18 w-num-18 opacity-[0.5]" alt="" />
                <div className="tracking-num--0_01 leading-num-28 font-semibold opacity-[0.25]">
                  Search for a question or a keyword
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="mt-10 flex w-full flex-col gap-5 text-[18px]">
              <section className="flex w-full flex-col gap-5">
                <div className="flex items-center">
                  <h2 className="tracking-num-0.02 leading-num-28 font-semibold">General</h2>
                </div>

                <div className="text-num-16 text-ghostwhite flex flex-col gap-3">
                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex items-center justify-center border border-solid bg-gray-200">
                      <div className="flex w-full items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          What kind of digital giftcards does Jinx.to offer?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex items-center justify-center border border-solid bg-gray-200">
                      <div className="flex w-full items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          What makes Jinx.to a safe platform to shop on?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex flex-col gap-[11.9px] border border-solid bg-gray-200">
                      <div className="flex items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          Can I use other cryptocurrencies to shop?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                      <div className="text-lightsteelblue-100 leading-6 font-medium">
                        We've partnered with top brands to bring you the best deals on the market.
                        Our team works around the clock to ensure that every gift card is 100%
                        legitimate and delivered instantly. Shop with confidence, knowing that your
                        purchase is protected by our guarantee.
                      </div>
                    </div>
                  </div>

                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex items-center justify-center border border-solid bg-gray-200">
                      <div className="flex w-full items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          How do I browse for giftcards on Jinx.to?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <img className="h-px w-full max-w-full overflow-hidden" alt="" />

              <section className="flex w-full flex-col gap-5">
                <div className="flex items-center">
                  <h2 className="tracking-num-0.02 leading-num-28 font-semibold">Orders</h2>
                </div>

                <div className="text-num-16 text-ghostwhite flex flex-col gap-3">
                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex items-center justify-center border border-solid bg-gray-200">
                      <div className="flex w-full items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          Can I get a refund for a giftcard I purchased?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex items-center justify-center border border-solid bg-gray-200">
                      <div className="flex w-full items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          How long does it take to receive my giftcard?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <img className="h-px w-full max-w-full overflow-hidden" alt="" />

              <section className="flex w-full flex-col gap-5">
                <div className="flex items-center">
                  <h2 className="tracking-num-0.02 leading-num-28 font-semibold">Replacements</h2>
                </div>

                <div className="text-num-16 text-ghostwhite flex flex-col gap-3">
                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex items-center justify-center border border-solid bg-gray-200">
                      <div className="flex w-full items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          Can I get a refund for a giftcard I purchased?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex items-center justify-center border border-solid bg-gray-200">
                      <div className="flex w-full items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          How long does it take to receive my giftcard?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <img className="h-px w-full max-w-full overflow-hidden" alt="" />

              <section className="flex w-full flex-col gap-5">
                <div className="flex items-center">
                  <h2 className="tracking-num-0.02 leading-num-28 font-semibold">Refunds</h2>
                </div>

                <div className="text-num-16 text-ghostwhite flex flex-col gap-3">
                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex items-center justify-center border border-solid bg-gray-200">
                      <div className="flex w-full items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          Can I get a refund for a giftcard I purchased?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex items-center justify-center border border-solid bg-gray-200">
                      <div className="flex w-full items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          How do I redeem a giftcard on Jinx.to?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex flex-col gap-[11.9px] border border-solid bg-gray-200">
                      <div className="flex items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          Are there any fees associated with buying giftcards?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                      <div className="text-lightsteelblue-100 leading-6 font-medium">
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia.
                      </div>
                    </div>
                  </div>

                  <div className="rounded-num-8 border-darkslateblue flex flex-col border border-solid bg-gray-200">
                    <div className="rounded-num-8 border-darkslateblue p-num-19.1 flex items-center justify-center border border-solid bg-gray-200">
                      <div className="flex w-full items-center justify-between gap-0">
                        <div className="tracking-num--0_01 leading-num-28 font-semibold">
                          How long does it take to receive my giftcard?
                        </div>
                        <img className="rounded-num-8 h-8 w-8" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
