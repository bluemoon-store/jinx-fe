export default function Policies() {
  return (
    <section className="text-num-14 font-commissioner w-full overflow-hidden text-left text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-16 lg:py-14">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[208px_1fr] lg:gap-16">
          {/* Legal navigation */}
          <aside className="text-muted-foreground flex w-full flex-col items-start">
            <nav className="flex w-full flex-col items-start gap-1">
              <div className="rounded-num-8 min-w-num-190 text-slategray box-border flex w-full items-center px-3 py-2 text-[12px]">
                <div className="leading-[15px] font-semibold uppercase">LEGAL</div>
              </div>

              <div className="rounded-num-8 min-w-num-190 box-border flex w-full items-center overflow-hidden p-2.5">
                <div className="leading-num-20 font-semibold">Terms of Service</div>
              </div>
              <div className="rounded-num-8 border-border-subtle min-w-num-190 box-border flex w-full items-center overflow-hidden border border-solid p-2.5 text-foreground [background:linear-gradient(90deg,rgba(235,45,255,0.2),rgba(235,45,255,0)),linear-gradient(var(--card-elev),var(--card-elev))]">
                <div className="leading-num-20 font-semibold">Privacy Policy</div>
              </div>
              <div className="rounded-num-8 min-w-num-190 box-border flex w-full items-center overflow-hidden p-2.5">
                <div className="leading-num-20 font-semibold">Refund Policy</div>
              </div>
              <div className="rounded-num-8 min-w-num-190 box-border flex w-full items-center overflow-hidden p-2.5">
                <div className="leading-num-20 font-semibold">Cookie Policy</div>
              </div>
            </nav>
          </aside>

          {/* Page content */}
          <main className="text-foreground flex w-full flex-col gap-6 text-[18px]">
            <header className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <h1 className="leading-num-28 tracking-num-0.02 font-semibold">Privacy Policy</h1>
              <div className="text-muted-foreground text-[12px] leading-[15px] font-semibold">
                Last Revised: March 10, 2026
              </div>
            </header>

            <div className="flex w-full flex-col gap-[25px]">
              <section className="flex flex-col gap-[21px]">
                <h2 className="tracking-num--0_01 leading-num-28 font-semibold">Main Heading H1</h2>
                <div className="text-num-16 text-muted-foreground leading-6 font-medium">
                  {`Welcome to Website Name!`}
                  <br />
                  {``}
                  <br />
                  {`These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com.`}
                  <br />
                  {`By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.`}
                  <br />
                  {``}
                  <br />
                  {`The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. `}
                </div>
              </section>

              <section className="text-num-16 text-muted-foreground flex flex-col gap-3">
                <h3 className="tracking-num--0_01 leading-num-28 text-foreground font-semibold">
                  Secondary heading H2
                </h3>
                <p className="leading-6 font-medium">
                  We employ the use of cookies. By accessing Website Name, you agreed to use cookies
                  in agreement with the Company Name's Privacy Policy.
                </p>
                <div className="leading-num-30 font-medium">
                  <p className="m-0">
                    The following terminology applies to these Terms and Conditions, Privacy
                    Statement and Disclaimer Notice and all Agreements:
                  </p>
                  <ul className="font-inherit m-0 pl-[21px] text-[length:inherit]">
                    <li className="mb-0">
                      “Client”, “You” and “Your” refers to you, the person log on this website and
                      compliant to the Company's terms and conditions.
                    </li>
                    <li className="mb-0">
                      “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company.
                    </li>
                    <li>{`“Party”, “Parties”, or “Us”, refers to both the Client and ourselves. `}</li>
                  </ul>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
