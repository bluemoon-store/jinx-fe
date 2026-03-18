import { FunctionComponent } from 'react'

export const ShopDecorations: FunctionComponent = () => {
  return (
    <section aria-hidden className="flex w-full items-start justify-between gap-6">
      <div className="flex items-start gap-6">
        <img className="h-[107.8px] w-[65.9px] opacity-[0.25]" alt="" />
        <img className="h-[52px] w-[52px] object-cover" alt="" />
      </div>

      <div className="flex items-start gap-6">
        <img className="h-[107.8px] w-[65.9px] object-contain opacity-[0.25]" alt="" />
        <img className="h-[91.6px] w-[121.2px] object-contain opacity-[0.25]" alt="" />
      </div>
    </section>
  )
}
