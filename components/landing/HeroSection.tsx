import { FunctionComponent } from 'react'

const HeroSection: FunctionComponent = () => {
  return (
    <div className="rounded-num-8 text-num-16 absolute top-[96px] left-[calc(50%_-_737px)] h-[591px] w-[1475px] overflow-hidden [background:linear-gradient(180deg,_#4e2bff,_#b600c7)]">
      <img
        className="absolute top-[calc(50%_-_800.22px)] left-[calc(50%_-_789.5px)] h-[1601.4px] w-[1580px] shrink-0 opacity-[0.05]"
        alt=""
      />
      <div className="absolute top-[calc(50%_-_170.5px)] left-[calc(50%_-_215.5px)] flex shrink-0 flex-col items-center gap-6">
        <div className="text-num-14 flex items-center justify-center gap-[13px] self-stretch overflow-hidden border-b-[1px] border-solid border-white px-6 py-[18px] [background:linear-gradient(180deg,_rgba(13,_5,_32,_0),_rgba(255,_255,_255,_0.31))]">
          <img className="relative h-4 w-4" alt="" />
          <div className="tracking-num-0_02 relative overflow-hidden leading-[18px] font-extrabold text-ellipsis whitespace-nowrap">
            WELCOME TO JINX.TO
          </div>
          <img className="relative h-4 w-4" alt="" />
        </div>
        <div className="flex flex-col items-center gap-[5px] text-[40px]">
          <div className="tracking-num-0_02 relative leading-[42px] font-black uppercase [text-shadow:0px_0px_18.58px_rgba(0,_0,_0,_0.6)]">
            Drop in. Cash out.
          </div>
          <div className="tracking-num-0_02 font-heydex relative text-[57.47px] leading-[60.34px] [text-shadow:0px_0px_26.7px_rgba(0,_0,_0,_0.6)]">
            ReDeeM InstAnTLY
          </div>
        </div>
        <div className="leading-num-20 font-commissioner relative self-stretch font-medium text-white opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
          The fastest way to grab digital goods with neon-tier deals and zero friction.
        </div>
        <div className="py-num-12 font-commissioner box-border flex h-12 items-center justify-center rounded-[7.79px] bg-white px-12 text-left text-fuchsia-100 shadow-[0px_2px_0px_rgba(139,_92,_246,_0.5)]">
          <b className="tracking-num--0_01 leading-num-28 relative shrink-0">Explore the Store</b>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
