import { FunctionComponent } from 'react'

export const ShopAnnotations: FunctionComponent = () => {
  return (
    <section>
      <div className="grid gap-4 text-left text-white opacity-[0.25] sm:grid-cols-2 lg:grid-cols-3">
        <div className="text-num-14 leading-num-20 font-commissioner font-semibold">
          Hover Effect
          <br />
          for category
          <br />
          Sticky on scroll
        </div>
        <div className="text-num-14 leading-num-20 font-commissioner font-semibold">
          When user searches
          <br />
          it shows <br />
          Search Results : “%N”
        </div>
        <div className="text-num-14 leading-num-20 font-commissioner flex items-center font-semibold">
          Shows the currently viewing/total products
        </div>
      </div>
    </section>
  )
}
