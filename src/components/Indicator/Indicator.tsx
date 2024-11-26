import { FaBurst } from "react-icons/fa6"
import { IoMdTime } from "react-icons/io"

export default function Indicator() {
  return (
    <div className="flex items-center h-20 w-full border-2 border-pink-400">
      <div className="flex flex-col w-24 h-full p-1 border-r-2 border-pink-400">
        <div className="flex items-center gap-1 text-white">
          <FaBurst className="w-3 h-3" />
          <span className="text-xs leading-none">MINE</span>
        </div>
        <span className="text-4xl text-center mt-1.5 my-auto leading-none font-bold text-pink-100">01</span>
      </div>
      <div className="flex flex-col w-52 h-full p-1 border-r-2 border-pink-400">
        <div className="flex items-center gap-1 text-white">
          <IoMdTime className="w-3 h-3" />
          <span className="text-xs leading-none">TIME</span>
        </div>
        <span className="text-4xl text-center mt-1.5 my-auto leading-none font-bold text-pink-100">00:00:01</span>
      </div>
      <button className="flex items-center justify-center w-48 h-full p-1 text-4xl text-pink-500 font-bold hover:bg-white hover:bg-opacity-10">
        START!
      </button>
    </div>
  )
}
