import { FunctionComponent } from 'react'

export const ShopDetailPagination: FunctionComponent = () => {
  return (
    <footer className="flex w-full items-center justify-center pt-2">
      <div className="flex items-center gap-[7.5px]">
        <img
          className="h-[30px] w-[30px] rounded-[30px] object-contain opacity-[0.25] shadow-[0px_15px_15px_rgba(0,_0,_0,_0.01)]"
          alt=""
        />
        <div className="border-darkslateblue flex flex-col items-center rounded-[30px] border-[1.5px] border-solid bg-gray-200 p-[9px] shadow-[0px_15px_15px_rgba(0,_0,_0,_0.01)]">
          <div className="flex w-full max-w-full items-center gap-[7.5px]">
            <div className="h-3 w-[30px] rounded-[13.5px] bg-white" />
            <div className="h-3 w-3 rounded-[50%] bg-white opacity-[0.25]" />
            <div className="h-3 w-3 rounded-[50%] bg-white opacity-[0.25]" />
            <div className="h-3 w-3 rounded-[50%] bg-white opacity-[0.25]" />
            <div className="h-3 w-3 rounded-[50%] bg-white opacity-[0.25]" />
          </div>
        </div>
        <img
          className="h-[30px] w-[30px] rounded-[30px] shadow-[0px_15px_15px_rgba(0,_0,_0,_0.01)]"
          alt=""
        />
      </div>
    </footer>
  )
}
