import { FunctionComponent } from 'react'

const HeroSection: FunctionComponent = () => {
  return (
    <section className="text-num-16 lg:rounded-num-8 mx-auto grid h-[500px] max-h-[500px] min-h-[400px] w-full max-w-[1475px] grid-rows-1 place-items-center overflow-hidden rounded-none px-4 py-12 [background:linear-gradient(180deg,_#4e2bff,_#b600c7)] sm:h-[560px] sm:max-h-[560px] sm:min-h-[500px] sm:px-6 sm:py-16 lg:h-[591px] lg:max-h-[591px] lg:min-h-[591px] lg:px-8">
      {/* Decorative background image - grid child for overlay, does not affect row height */}
      <img
        className="col-start-1 row-start-1 h-full w-full shrink-0 object-cover object-center opacity-[0.05]"
        alt=""
      />
      {/* Hero content - centered in the section */}
      <div className="col-start-1 row-start-1 flex h-full w-full max-w-2xl flex-col items-center justify-center gap-4 sm:gap-5 lg:gap-6">
        <div className="text-num-14 flex w-full items-center justify-center gap-2 overflow-hidden border-b border-solid border-white px-4 py-3 [background:linear-gradient(180deg,_rgba(13,_5,_32,_0),_rgba(255,_255,_255,_0.31))] sm:gap-[13px] sm:px-6 sm:py-[18px]">
          <img className="h-3 w-3 sm:h-4 sm:w-4" alt="" src="/icons/IconSparkle3.svg" />
          <div className="tracking-num-0_02 overflow-hidden text-xs leading-[18px] font-extrabold text-ellipsis whitespace-nowrap sm:text-sm">
            WELCOME TO JINX.TO
          </div>
          <img className="h-3 w-3 sm:h-4 sm:w-4" alt="" src="/icons/IconSparkle3.svg" />
        </div>
        <div className="flex flex-col items-center gap-1 text-center sm:gap-[5px]">
          <div className="tracking-num-0_02 text-2xl leading-tight font-black uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)] sm:text-3xl sm:leading-[42px] lg:text-[40px]">
            Drop in. Cash out.
          </div>
          <div className="font-heydex tracking-num-0_02 text-3xl leading-tight [text-shadow:0px_0px_26.7px_rgba(0,_0,_0,_0.6)] sm:text-4xl sm:leading-[48px] lg:text-[57.47px] lg:leading-[60.34px]">
            ReDeeM InstAnTLY
          </div>
        </div>
        <p className="leading-num-20 lg:font-commissioner w-full text-center text-sm font-medium text-white opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)] sm:text-base">
          The fastest way to grab digital goods with neon-tier deals and zero friction.
        </p>
        <button className="py-num-12 font-commissioner box-border flex h-12 min-h-[44px] w-full items-center justify-center rounded-[7.79px] bg-white px-8 text-left text-fuchsia-100 shadow-[0px_2px_0px_rgba(139,_92,_246,_0.5)] sm:w-auto sm:px-12">
          <b className="tracking-num--0_01 leading-num-28 shrink-0">Explore the Store</b>
        </button>
      </div>
    </section>
  )
}

export default HeroSection
