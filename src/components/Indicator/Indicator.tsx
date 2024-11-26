import { FaBurst } from "react-icons/fa6"
import { IoMdTime } from "react-icons/io"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { padSingleDigit } from "../../utils/utils"
import { STATUS } from "../../types/constants"
import { reloadBoard } from "../../store/slices/control"

export default function Indicator() {
  const flagCount = useAppSelector((state) => state.control.flagCount)
  const mineCount = useAppSelector((state) => state.control.mineCount)
  const status = useAppSelector((state) => state.control.status)
  const dispatch = useAppDispatch()

  const getStatusText = (status: STATUS) => {
    switch (status) {
      case STATUS.READY:
      case STATUS.RUN:
      case STATUS.SUCCESS:
        return "RETRY🎬"

      case STATUS.GAMEOVER:
        return "GAMEOVER😂"
    }
  }

  console.log(status)

  return (
    <div className="flex items-center h-20 w-full border-2 border-pink-400">
      <div className="flex flex-col w-1/5 h-full p-1 border-r-2 border-pink-400">
        <div className="flex items-center gap-1 text-white">
          <FaBurst className="w-3 h-3" />
          <span className="text-xs leading-none">MINE</span>
        </div>
        <span // 남은 지뢰 개수
          className="text-4xl text-center mt-1.5 my-auto leading-none font-bold text-pink-100"
        >
          {padSingleDigit(mineCount - flagCount > 0 ? mineCount - flagCount : 0)}
        </span>
      </div>
      <div className="flex flex-col w-2/5 h-full p-1 border-r-2 border-pink-400">
        <div className="flex items-center gap-1 text-white">
          <IoMdTime className="w-3 h-3" />
          <span className="text-xs leading-none">TIME</span>
        </div>
        <span className="text-4xl text-center mt-1.5 my-auto leading-none font-bold text-pink-100">00:00:01</span>
      </div>
      <button
        onClick={() => {
          dispatch(reloadBoard())
        }}
        className="flex items-center justify-center w-1/2 h-full p-1 text-[26px] text-pink-500 font-bold hover:bg-white hover:bg-opacity-10"
      >
        {getStatusText(status)}
      </button>
    </div>
  )
}
