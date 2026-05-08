import { FunctionComponent } from 'react'

/** Figma: summary + fuchsia track/fill (#eb2dff / 25% track) + pill button on gray-100 (#0d1b35) + darkslateblue border (#152950). */
export const DashboardLoadMoreFooter: FunctionComponent<{
  shown: number
  total: number
  onLoadMore: () => void
  canLoadMore: boolean
}> = ({ shown, total, onLoadMore, canLoadMore }) => {
  const ratio = total > 0 ? shown / total : 0

  return (
    <div className="font-commissioner text-foreground dark:text-white relative flex w-full flex-col items-center justify-center gap-5 pt-2 text-center text-base sm:gap-5">
      <div className="flex w-full max-w-[261px] flex-col items-center justify-center gap-2.5">
        <div className="flex items-center justify-center">
          <p className="relative leading-6 font-semibold [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Showing {shown} out of {total}
          </p>
        </div>
        <div className="relative h-[3.5px] w-[196px] max-w-full">
          <div
            className="bg-fuchsia/25 absolute top-0 left-0 h-[3px] w-full rounded-lg shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
            aria-hidden
          />
          <div
            className="bg-fuchsia absolute top-[0.5px] left-0 h-[3px] max-w-full rounded-lg shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
            style={{ width: `${ratio * 100}%` }}
            aria-hidden
          />
        </div>
      </div>
      {canLoadMore ? (
        <button
          type="button"
          onClick={onLoadMore}
          className="border-border-subtle bg-card text-foreground dark:border-darkslateblue dark:bg-gray-100 dark:text-white rounded-num-30 flex items-center justify-center border-[1.5px] border-solid px-6 py-2.5 shadow-[0px_15px_15px_rgba(0,0,0,0.01)] transition-opacity"
        >
          <span className="relative leading-6 font-semibold [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Load More
          </span>
        </button>
      ) : null}
    </div>
  )
}
